"""Fill empty French accents in Audrey-Normal by compositing existing glyphs."""

from __future__ import annotations

from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "fonts" / "audrey" / "Audrey-Normal.otf"
ROOT_COPY = Path(__file__).resolve().parents[2] / "public" / "fonts" / "audrey" / "Audrey-Normal.otf"


def contours(gs, name: str):
    rec = RecordingPen()
    gs[name].draw(rec)
    groups, cur = [], []
    for op, pts in rec.value:
        cur.append((op, pts))
        if op in ("closePath", "endPath"):
            groups.append(cur)
            cur = []
    if cur:
        groups.append(cur)
    return groups


def bounds_of(contour):
    xs, ys = [], []
    for _op, pts in contour:
        for p in pts:
            xs.append(p[0])
            ys.append(p[1])
    return min(xs), min(ys), max(xs), max(ys)


def glyph_bounds(gs, name: str):
    pen = BoundsPen(None)
    gs[name].draw(pen)
    return pen.bounds


def replay(pen, contour, dx=0.0, dy=0.0):
    for op, pts in contour:
        if op == "closePath":
            pen.closePath()
        elif op == "endPath":
            pen.endPath()
        else:
            getattr(pen, op)(*[(p[0] + dx, p[1] + dy) for p in pts])


def body_contours(gs, name: str):
    out = []
    for c in contours(gs, name):
        _x0, y0, _x1, _y1 = bounds_of(c)
        if y0 < 420:
            out.append(c)
    return out


def accent_contours(gs, name: str):
    out = []
    for c in contours(gs, name):
        _x0, y0, _x1, _y1 = bounds_of(c)
        if y0 >= 420:
            out.append(c)
    return out


def top_xs(contour):
    ys = [p[1] for _op, pts in contour for p in pts]
    ymax = max(ys)
    xs = [p[0] for _op, pts in contour for p in pts if abs(p[1] - ymax) < 1.5]
    return min(xs), max(xs)


def center_x(gs, name: str):
    b = glyph_bounds(gs, name)
    return (b[0] + b[2]) / 2


def dot_contour(gs):
    for c in contours(gs, "i"):
        _x0, y0, _x1, _y1 = bounds_of(c)
        if y0 >= 480:
            return c
    raise RuntimeError("i-dot missing")


def commit(font, cs, private, global_subrs, name: str, width: int, rec: RecordingPen):
    bpen = BoundsPen(None)
    for op, pts in rec.value:
        if op == "closePath":
            bpen.closePath()
        elif op == "endPath":
            bpen.endPath()
        else:
            getattr(bpen, op)(*pts)
    lsb = int(round(bpen.bounds[0])) if bpen.bounds else 0
    default_w = getattr(private, "defaultWidthX", 0) or 0
    nominal_w = getattr(private, "nominalWidthX", 0) or 0
    encoded_width = None if width == default_w else width - nominal_w
    t2 = T2CharStringPen(encoded_width, None)
    for op, pts in rec.value:
        if op == "closePath":
            t2.closePath()
        elif op == "endPath":
            t2.endPath()
        else:
            getattr(t2, op)(*pts)
    cs[name] = t2.getCharString(private=private, globalSubrs=global_subrs)
    font["hmtx"].metrics[name] = (width, lsb)


def add_circumflex(rec: RecordingPen, gs, target_cx: float, grave_src="ograve", acute_src="oacute", cap=False):
    grave = accent_contours(gs, grave_src)[0]
    acute = accent_contours(gs, acute_src)[0]
    gmin, _gmax = top_xs(grave)
    _amin, amax = top_xs(acute)
    _gx0, _gy0, _gx1, gy1 = bounds_of(grave)
    _ax0, _ay0, _ax1, ay1 = bounds_of(acute)
    peak_y = max(gy1, ay1)
    sx, sy, lift = (1.5, 1.22, 24) if cap else (1.0, 1.0, 0)

    def place(contour, origin_x: float) -> None:
        for op, pts in contour:
            if op == "closePath":
                rec.closePath()
            elif op == "endPath":
                rec.endPath()
            else:
                rec_pts = [
                    (
                        target_cx + (p[0] - origin_x) * sx,
                        peak_y + lift + (p[1] - peak_y) * sy,
                    )
                    for p in pts
                ]
                getattr(rec, op)(*rec_pts)

    # Acute on the left, grave on the right, meeting at the apex.
    place(acute, amax)
    place(grave, gmin)


def add_diaeresis(rec: RecordingPen, gs, target_cx: float, cap=False):
    dot = dot_contour(gs)
    x0, y0, x1, y1 = bounds_of(dot)
    dcx = (x0 + x1) / 2
    gap = 38 if cap else 30
    lift = (720 + 26) - y0 if cap else 0
    replay(rec, dot, dx=target_cx - gap - dcx, dy=lift)
    replay(rec, dot, dx=target_cx + gap - dcx, dy=lift)


def add_cedilla(rec: RecordingPen, gs, target_cx: float):
    # Geometric hook matching Audrey's filled wedges.
    rec.moveTo((target_cx - 8, -8))
    rec.lineTo((target_cx + 10, -8))
    rec.lineTo((target_cx + 18, -78))
    rec.curveTo((target_cx + 22, -118), (target_cx - 6, -138), (target_cx - 42, -118))
    rec.lineTo((target_cx - 28, -96))
    rec.curveTo((target_cx - 8, -108), (target_cx + 4, -96), (target_cx + 2, -72))
    rec.closePath()


def draw_base(rec: RecordingPen, gs, name: str):
    for c in body_contours(gs, name):
        replay(rec, c)


def main():
    font = TTFont(str(SRC))
    gs = font.getGlyphSet()
    top = font["CFF "].cff.topDictIndex[0]
    cs = top.CharStrings
    private = top.Private
    global_subrs = font["CFF "].cff.GlobalSubrs

    pairs = [
        ("ocircumflex", "o", "circumflex"),
        ("Ocircumflex", "O", "circumflex"),
        ("acircumflex", "a", "circumflex"),
        ("Acircumflex", "A", "circumflex"),
        ("ecircumflex", "e", "circumflex"),
        ("Ecircumflex", "E", "circumflex"),
        ("icircumflex", "i", "circumflex"),
        ("Icircumflex", "I", "circumflex"),
        ("ucircumflex", "u", "circumflex"),
        ("Ucircumflex", "U", "circumflex"),
        ("idieresis", "i", "diaeresis"),
        ("Idieresis", "I", "diaeresis"),
        ("edieresis", "e", "diaeresis"),
        ("Edieresis", "E", "diaeresis"),
        ("udieresis", "u", "diaeresis"),
        ("Udieresis", "U", "diaeresis"),
        ("ccedilla", "c", "cedilla"),
        ("Ccedilla", "C", "cedilla"),
        ("Igrave", "I", "grave"),
        ("Iacute", "I", "acute"),
    ]

    grave_mark = accent_contours(gs, "ograve")[0]
    acute_mark = accent_contours(gs, "oacute")[0]
    g_top_min, g_top_max = top_xs(grave_mark)
    a_top_min, a_top_max = top_xs(acute_mark)
    grave_anchor = (g_top_min + g_top_max) / 2
    acute_anchor = (a_top_min + a_top_max) / 2

    for dest, base, kind in pairs:
        width = int(gs[base].width)
        rec = RecordingPen()
        draw_base(rec, gs, base)
        cx = center_x(gs, base)
        if kind == "circumflex":
            grave_src = "Ograve" if base.isupper() else "ograve"
            acute_src = "Oacute" if base.isupper() else "oacute"
            add_circumflex(rec, gs, cx, grave_src, acute_src, cap=base.isupper())
        elif kind == "diaeresis":
            add_diaeresis(rec, gs, cx, cap=base.isupper())
        elif kind == "cedilla":
            add_cedilla(rec, gs, cx)
        elif kind == "grave":
            src = accent_contours(gs, "Ograve" if base.isupper() else "ograve")[0]
            gmin, gmax = top_xs(src)
            replay(rec, src, dx=cx - (gmin + gmax) / 2)
        elif kind == "acute":
            src = accent_contours(gs, "Oacute" if base.isupper() else "oacute")[0]
            amin, amax = top_xs(src)
            replay(rec, src, dx=cx - (amin + amax) / 2)
        commit(font, cs, private, global_subrs, dest, width, rec)

    font.save(str(SRC))
    if ROOT_COPY.parent.exists():
        font.save(str(ROOT_COPY))

    # unicode-range of drawn glyphs
    gs2 = TTFont(str(SRC)).getGlyphSet()
    cmap = TTFont(str(SRC)).getBestCmap()
    drawn = []
    for cp, name in sorted(cmap.items()):
        rec = RecordingPen()
        gs2[name].draw(rec)
        if rec.value:
            drawn.append(cp)
    ranges = []
    start = prev = drawn[0]
    for cp in drawn[1:]:
        if cp == prev + 1:
            prev = cp
            continue
        ranges.append((start, prev))
        start = prev = cp
    ranges.append((start, prev))
    parts = []
    for a, b in ranges:
        parts.append(f"U+{a:04X}" if a == b else f"U+{a:04X}-{b:04X}")
    print("unicode-range:" + ",".join(parts))
    print("patched", SRC)


if __name__ == "__main__":
    main()
