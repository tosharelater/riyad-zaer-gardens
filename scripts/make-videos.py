#!/usr/bin/env python3
"""Rebuild cinematic Ken Burns / crossfade clips from parcours viz stills."""
from __future__ import annotations

import os
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(ROOT, "public", "parcours")
OUT = os.path.join(SRC, "video")
WORK = "/tmp/rzg-video"

os.makedirs(WORK, exist_ok=True)
os.makedirs(OUT, exist_ok=True)

MODES = {
    "zin": (
        "min(1.14,1.0+0.0023*on)",
        "iw/2-(iw/zoom/2)",
        "ih/2-(ih/zoom/2)",
    ),
    "zin-up": (
        "min(1.12,1.02+0.0017*on)",
        "iw/2-(iw/zoom/2)",
        "(ih-ih/zoom)*0.28",
    ),
    "zout": (
        "if(eq(on,0),1.16,max(1.02,1.16-0.0022*on))",
        "iw/2-(iw/zoom/2)",
        "ih/2-(ih/zoom/2)",
    ),
    "pright": (
        "min(1.12,1.05+0.0011*on)",
        "(iw-iw/zoom)*(on/FRAMES)",
        "ih/2-(ih/zoom/2)",
    ),
    "pleft": (
        "min(1.12,1.05+0.0011*on)",
        "(iw-iw/zoom)*(1-on/FRAMES)",
        "ih*0.45-(ih/zoom/2)",
    ),
    "pdown": (
        "min(1.12,1.03+0.0012*on)",
        "iw/2-(iw/zoom/2)",
        "(ih-ih/zoom)*(0.82-0.55*on/FRAMES)",
    ),
}

CROP_TOP = "crop=iw:ih*0.56:0:0"


def run(cmd: list[str]) -> None:
    print(">", " ".join(cmd[:6]), "…", os.path.basename(cmd[-1]), flush=True)
    subprocess.check_call(cmd)


def kb(img: str, dest: str, frames: int, mode: str, prep: str | None = None) -> None:
    z, x, y = MODES[mode]
    x = x.replace("FRAMES", str(max(frames - 1, 1)))
    y = y.replace("FRAMES", str(max(frames - 1, 1)))
    parts = []
    if prep:
        parts.append(prep)
    parts.append("scale=3600:-1")
    parts.append(f"zoompan=z='{z}':x='{x}':y='{y}':d={frames}:s=1280x720:fps=25")
    vf = ",".join(parts)
    secs = frames / 25
    run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
        "-i", img, "-vf", vf, "-t", f"{secs:.3f}", "-an", "-r", "25",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
        "-pix_fmt", "yuv420p", dest,
    ])


def xfade(clips: list[str], dest: str, fade: float) -> None:
    n = len(clips)
    durs = []
    for c in clips:
        out = subprocess.check_output([
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "csv=p=0", c,
        ], text=True).strip()
        durs.append(float(out))

    args: list[str] = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error"]
    for c in clips:
        args += ["-i", c]

    fc = []
    for i in range(n):
        fc.append(f"[{i}:v]settb=AVTB,fps=25,format=yuv420p,setsar=1[v{i}]")

    if n == 1:
        fc.append("[v0]copy[v]")
    else:
        acc = "v0"
        acc_dur = durs[0]
        for i in range(1, n):
            offset = acc_dur - fade
            out = "v" if i == n - 1 else f"x{i}"
            fc.append(
                f"[{acc}][v{i}]xfade=transition=fade:duration={fade:.3f}:offset={offset:.3f}[{out}]"
            )
            acc = out
            acc_dur = acc_dur + durs[i] - fade

    args += [
        "-filter_complex", ";".join(fc), "-map", "[v]", "-an",
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-pix_fmt", "yuv420p", dest,
    ]
    run(args)


def encode_pair(src: str, dest_base: str, crf_h264: int, crf_vp9: int) -> None:
    mp4 = dest_base + ".mp4"
    webm = dest_base + ".webm"
    run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", src,
        "-an", "-c:v", "libx264", "-preset", "medium", "-crf", str(crf_h264),
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4,
    ])
    run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", src,
        "-an", "-c:v", "libvpx-vp9", "-crf", str(crf_vp9), "-b:v", "0",
        "-row-mt", "1", "-deadline", "good", "-cpu-used", "5",
        "-pix_fmt", "yuv420p", webm,
    ])
    for p in (mp4, webm):
        size = os.path.getsize(p)
        dur = subprocess.check_output([
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "csv=p=0", p,
        ], text=True).strip()
        print(f"  {os.path.basename(p)}  {size/1024/1024:.2f}MB  {dur}s", flush=True)


def main() -> int:
    def V(n: int) -> str:
        return os.path.join(SRC, f"viz-{n:02d}.jpg")

    arrive_spec = [
        (V(8), 60, "zin", None),
        (V(12), 60, "pright", None),
        (V(11), 60, "zin-up", None),
        (V(1), 60, "pleft", None),
        (V(6), 60, "zout", None),
    ]
    arrive_clips = []
    for i, (img, frames, mode, prep) in enumerate(arrive_spec, 1):
        dest = os.path.join(WORK, f"arrive_{i}.mp4")
        kb(img, dest, frames, mode, prep)
        arrive_clips.append(dest)
    arrive_master = os.path.join(WORK, "arrive_master.mp4")
    xfade(arrive_clips, arrive_master, 0.6)
    encode_pair(arrive_master, os.path.join(OUT, "arrive"), 26, 37)

    live_modes = [
        ("zin", None),
        ("pright", None),
        ("pleft", None),
        ("zin-up", None),
        ("zout", None),
        ("pright", None),
        ("zin", CROP_TOP),
        ("pdown", None),
        ("zin-up", None),
        ("pleft", CROP_TOP),
        ("pright", None),
        ("zout", None),
    ]
    live_clips = []
    for i, (mode, prep) in enumerate(live_modes, 1):
        dest = os.path.join(WORK, f"live_{i:02d}.mp4")
        kb(V(i), dest, 45, mode, prep)
        live_clips.append(dest)
    live_master = os.path.join(WORK, "live_master.mp4")
    xfade(live_clips, live_master, 0.45)
    encode_pair(live_master, os.path.join(OUT, "live"), 28, 38)

    kb(V(4), os.path.join(WORK, "explore_1.mp4"), 80, "zin-up", None)
    kb(V(8), os.path.join(WORK, "explore_2.mp4"), 70, "pright", None)
    explore_master = os.path.join(WORK, "explore_master.mp4")
    xfade(
        [os.path.join(WORK, "explore_1.mp4"), os.path.join(WORK, "explore_2.mp4")],
        explore_master,
        0.7,
    )
    encode_pair(explore_master, os.path.join(OUT, "explore"), 26, 37)
    print("DONE", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
