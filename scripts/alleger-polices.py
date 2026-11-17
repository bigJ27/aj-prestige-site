"""
Allège les polices du site AJ Prestige.

Fraunces est une police « variable » très riche (4 axes) : le fichier complet
pèse 120 à 150 Ko par style. Le site n'utilise qu'un seul réglage (taille
optique 80, douceur maximale, graisse 370, pas de formes « wonky ») : on fige
donc ces axes et on ne garde que les caractères utiles au français.
Résultat : des fichiers 7 à 9 fois plus légers, sans différence visible.

Figtree garde son axe de graisse (400 à 700) pour le texte courant.

Usage :
    npm install --no-save @fontsource-variable/fraunces @fontsource-variable/figtree
    pip install fonttools brotli
    python3 scripts/alleger-polices.py node_modules/@fontsource-variable app/fonts
"""
import io
import os
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

SRC, OUT = sys.argv[1], sys.argv[2]

# Latin de base + accents français + ponctuation typographique + € et −
UNICODES = (
    list(range(0x20, 0x7F))
    + list(range(0xA0, 0x100))
    + [0x152, 0x153, 0x178]
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E]
    + [0x2022, 0x2026, 0x2039, 0x203A, 0x20AC, 0x2212]
)

JOBS = [
    # (fichier source, fichier produit, axes à figer ou restreindre)
    (
        "fraunces/files/fraunces-latin-full-normal.woff2",
        "Fraunces-Roman.woff2",
        {"opsz": 80, "SOFT": 100, "WONK": 0, "wght": 370},
    ),
    (
        "fraunces/files/fraunces-latin-full-italic.woff2",
        "Fraunces-Italic.woff2",
        {"opsz": 80, "SOFT": 100, "WONK": 0, "wght": 370},
    ),
    (
        "figtree/files/figtree-latin-wght-normal.woff2",
        "Figtree.woff2",
        {"wght": (400, 400, 700)},
    ),
]

for source, target, limits in JOBS:
    font = TTFont(os.path.join(SRC, source))
    font = instancer.instantiateVariableFont(font, limits)
    # Enregistre puis recharge : remet les tables au propre avant le sous-ensemble
    buffer = io.BytesIO()
    font.flavor = None
    font.save(buffer)
    buffer.seek(0)
    font = TTFont(buffer)

    options = subset.Options()
    options.layout_features = ["*"]
    options.name_IDs = [1, 2, 3, 4, 6]
    options.notdef_outline = True
    options.hinting = False
    options.flavor = "woff2"
    sub = subset.Subsetter(options)
    sub.populate(unicodes=UNICODES)
    sub.subset(font)

    font.flavor = "woff2"
    path = os.path.join(OUT, target)
    font.save(path)
    axes = ", ".join(f"{a.axisTag} {a.minValue:g}–{a.maxValue:g}" for a in font["fvar"].axes) if "fvar" in font else "statique"
    print(f"{target:24s} {os.path.getsize(path) / 1024:5.1f} Ko  ({len(font.getGlyphOrder())} glyphes, {axes})")
