from pathlib import Path

root = Path(__file__).resolve().parents[1] / "src" / "components"


def patch_cour():
    p = root / "CourGithub.astro"
    t = p.read_text(encoding="utf-8")
    t = t.replace('class="reasons"', 'class="reasons-gh" data-compare="github"', 1)
    t = t.replace(
        'aria-labelledby="reasons-title"',
        'aria-labelledby="reasons-title-a" id="pourquoi-a"',
        1,
    )
    t = t.replace('id="reasons-title"', 'id="reasons-title-a"', 1)
    t = t.replace('class="reasons-grid"', 'class="reasons-gh-grid"')
    t = t.replace('class="reasons-media"', 'class="reasons-gh-media"')
    replacements = [
        (".reasons {", ".reasons-gh {"),
        (".reasons .kick", ".reasons-gh .kick"),
        (".reasons .lead", ".reasons-gh .lead"),
        (".reasons-grid", ".reasons-gh-grid"),
        (".reasons-media", ".reasons-gh-media"),
    ]
    for a, b in replacements:
        t = t.replace(a, b)
    p.write_text(t, encoding="utf-8")
    print("CourGithub ok")


def patch_projet():
    p = root / "ProjetGithub.astro"
    t = p.read_text(encoding="utf-8")
    t = t.replace('class="projet"', 'class="projet-gh"', 1)
    t = t.replace('id="projet"', 'id="projet-a" data-compare="github"', 1)
    pairs = [
        ('class="projet-grid"', 'class="projet-gh-grid"'),
        ('class="projet-copy"', 'class="projet-gh-copy"'),
        ('class="projet-photo"', 'class="projet-gh-photo"'),
        ('class="projet-amenities"', 'class="projet-gh-amenities"'),
        ('class="projet-link"', 'class="projet-gh-link"'),
        (".projet {", ".projet-gh {"),
        (".projet-grid", ".projet-gh-grid"),
        (".projet-copy", ".projet-gh-copy"),
        (".projet-photo", ".projet-gh-photo"),
        (".projet-amenities", ".projet-gh-amenities"),
        (".projet-link", ".projet-gh-link"),
        (".projet:hover", ".projet-gh:hover"),
    ]
    for a, b in pairs:
        t = t.replace(a, b)
    p.write_text(t, encoding="utf-8")
    print("ProjetGithub ok")


def patch_logements():
    p = root / "LogementsGithub.astro"
    t = p.read_text(encoding="utf-8")
    t = t.replace('class="homes"', 'class="homes-gh"', 1)
    t = t.replace('id="appartements"', 'id="appartements-a" data-compare="github"', 1)
    pairs = [
        ('class="homes-grid"', 'class="homes-gh-grid"'),
        ('class="homes-block"', 'class="homes-gh-block"'),
        ('class="homes-media"', 'class="homes-gh-media"'),
        ('class="homes-types"', 'class="homes-gh-types"'),
        ('class="homes-note"', 'class="homes-gh-note"'),
        ('class="homes-price"', 'class="homes-gh-price"'),
        (".homes {", ".homes-gh {"),
        (".homes-grid", ".homes-gh-grid"),
        (".homes-block", ".homes-gh-block"),
        (".homes-media", ".homes-gh-media"),
        (".homes-types", ".homes-gh-types"),
        (".homes-note", ".homes-gh-note"),
        (".homes-price", ".homes-gh-price"),
    ]
    for a, b in pairs:
        t = t.replace(a, b)
    p.write_text(t, encoding="utf-8")
    print("LogementsGithub ok")


if __name__ == "__main__":
    patch_cour()
    patch_projet()
    patch_logements()
