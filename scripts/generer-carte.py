"""
Génère lib/carte.ts : la carte de la zone d'intervention d'AJ Prestige.

La carte du site n'est pas une illustration approximative : elle est dessinée à
partir de données publiques officielles, simplifiées pour ne peser que
quelques kilo-octets.

Sources (Licence Ouverte Etalab 2.0) :
  - contours des communes ........ geo.api.gouv.fr (IGN, Admin Express)
  - lac, forêts, voies ferrées, gares ... IGN, BD TOPO® (data.geopf.fr)

Usage :
    python3 scripts/generer-carte.py [dossier-cache]

Le dossier cache (facultatif) évite de re-télécharger les données.
Aucune dépendance : Python 3 et la commande curl suffisent.
"""
import json
import math
import os
import subprocess
import sys

CACHE = sys.argv[1] if len(sys.argv) > 1 else ".cache-carte"
os.makedirs(CACHE, exist_ok=True)

# Les 8 communes desservies (nom officiel → adresse de la page sur le site)
COMMUNES = {
    "Soisy-sous-Montmorency": "conciergerie-airbnb-soisy-sous-montmorency",
    "Enghien-les-Bains": "conciergerie-airbnb-enghien-les-bains",
    "Montmorency": "conciergerie-airbnb-montmorency",
    "Eaubonne": "conciergerie-airbnb-eaubonne",
    "Ermont": "conciergerie-airbnb-ermont",
    "Saint-Gratien": "conciergerie-airbnb-saint-gratien",
    "Deuil-la-Barre": "conciergerie-airbnb-deuil-la-barre",
    "Sannois": "conciergerie-airbnb-sannois",
}

# Cadre de la carte (longitude ouest/est, latitude sud/nord)
LON0, LON1 = 2.2185, 2.3515
LAT0, LAT1 = 48.9535, 49.0215
LARGEUR = 1000.0
COS = math.cos(math.radians((LAT0 + LAT1) / 2))
ECHELLE = LARGEUR / ((LON1 - LON0) * COS)
HAUTEUR = round((LAT1 - LAT0) * ECHELLE)


def telecharger(nom, url, params):
    chemin = os.path.join(CACHE, nom)
    if not os.path.exists(chemin):
        commande = ["curl", "-sS", "-m", "60", "-G", url, "-o", chemin]
        for cle, valeur in params.items():
            commande += ["--data-urlencode", f"{cle}={valeur}"]
        subprocess.run(commande, check=True)
    with open(chemin, encoding="utf8") as fichier:
        return json.load(fichier)


def wfs(couche, nom):
    return telecharger(
        nom,
        "https://data.geopf.fr/wfs/ows",
        {
            "SERVICE": "WFS",
            "VERSION": "2.0.0",
            "REQUEST": "GetFeature",
            "TYPENAMES": f"BDTOPO_V3:{couche}",
            "BBOX": f"{LAT0 - 0.004},{LON0 - 0.007},{LAT1 + 0.004},{LON1 + 0.007},urn:ogc:def:crs:EPSG::4326",
            "OUTPUTFORMAT": "application/json",
            "COUNT": "2000",
        },
    )["features"]


# ---------------------------------------------------------------------------
# Géométrie
# ---------------------------------------------------------------------------
def projeter(lon, lat):
    """Longitude/latitude → coordonnées de la carte (x vers l'est, y vers le sud)."""
    return ((lon - LON0) * COS * ECHELLE, (LAT1 - lat) * ECHELLE)


def simplifier(points, tolerance):
    """Douglas-Peucker : retire les points qui ne changent pas le tracé à l'œil."""
    if len(points) < 3:
        return points
    if math.dist(points[0], points[-1]) < 1e-6 and len(points) > 4:
        # Contour fermé : on le coupe en deux au point le plus éloigné du départ,
        # sinon la « corde » de référence serait de longueur nulle.
        loin = max(range(len(points)), key=lambda i: math.dist(points[0], points[i]))
        return simplifier(points[: loin + 1], tolerance)[:-1] + simplifier(points[loin:], tolerance)
    garder = [False] * len(points)
    garder[0] = garder[-1] = True
    pile = [(0, len(points) - 1)]
    while pile:
        debut, fin = pile.pop()
        (x1, y1), (x2, y2) = points[debut], points[fin]
        dx, dy = x2 - x1, y2 - y1
        norme = math.hypot(dx, dy) or 1e-9
        pire, indice = 0.0, None
        for i in range(debut + 1, fin):
            px, py = points[i]
            distance = abs(dy * (px - x1) - dx * (py - y1)) / norme
            if distance > pire:
                pire, indice = distance, i
        if indice is not None and pire > tolerance:
            garder[indice] = True
            pile += [(debut, indice), (indice, fin)]
    return [p for p, ok in zip(points, garder) if ok]


def decouper_polygone(points):
    """Sutherland-Hodgman : ne garde que la partie du polygone située dans le cadre."""
    def couper(pts, dedans, intersection):
        sortie = []
        for i, courant in enumerate(pts):
            precedent = pts[i - 1]
            if dedans(courant):
                if not dedans(precedent):
                    sortie.append(intersection(precedent, courant))
                sortie.append(courant)
            elif dedans(precedent):
                sortie.append(intersection(precedent, courant))
        return sortie

    def a_x(x):
        return lambda a, b: (x, a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]))

    def a_y(y):
        return lambda a, b: (a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]), y)

    marge = 4
    for dedans, intersection in (
        (lambda p: p[0] >= -marge, a_x(-marge)),
        (lambda p: p[0] <= LARGEUR + marge, a_x(LARGEUR + marge)),
        (lambda p: p[1] >= -marge, a_y(-marge)),
        (lambda p: p[1] <= HAUTEUR + marge, a_y(HAUTEUR + marge)),
    ):
        if not points:
            return []
        points = couper(points, dedans, intersection)
    return points


def decouper_ligne(points):
    """Découpe une ligne en morceaux situés dans le cadre."""
    morceaux, courant = [], []
    for p in points:
        if -20 <= p[0] <= LARGEUR + 20 and -20 <= p[1] <= HAUTEUR + 20:
            courant.append(p)
        else:
            if len(courant) > 1:
                morceaux.append(courant)
            courant = []
    if len(courant) > 1:
        morceaux.append(courant)
    return morceaux


def chainer(lignes):
    """Recolle bout à bout les tronçons qui se suivent (moins de tracés, plus légers)."""
    def cle(p):
        return (round(p[0], 1), round(p[1], 1))

    lignes = [list(l) for l in lignes if len(l) > 1]
    change = True
    while change:
        change = False
        extremites = {}
        for i, l in enumerate(lignes):
            extremites.setdefault(cle(l[0]), []).append(i)
            extremites.setdefault(cle(l[-1]), []).append(i)
        for indices in extremites.values():
            if len(indices) == 2 and indices[0] != indices[1]:
                a, b = lignes[indices[0]], lignes[indices[1]]
                if cle(a[-1]) == cle(b[0]):
                    fusion = a + b[1:]
                elif cle(a[-1]) == cle(b[-1]):
                    fusion = a + b[-2::-1]
                elif cle(a[0]) == cle(b[-1]):
                    fusion = b + a[1:]
                else:
                    fusion = a[::-1] + b[1:]
                lignes = [l for i, l in enumerate(lignes) if i not in indices] + [fusion]
                change = True
                break
    return lignes


def nombre(valeur):
    return ("%.1f" % valeur).rstrip("0").rstrip(".")


def chemin(points, fermer):
    """Liste de points → attribut « d » d'un tracé SVG, en coordonnées relatives (compact)."""
    morceaux = [f"M{nombre(points[0][0])} {nombre(points[0][1])}"]
    x, y = round(points[0][0], 1), round(points[0][1], 1)
    for px, py in points[1:]:
        px, py = round(px, 1), round(py, 1)
        dx, dy = px - x, py - y
        if dx or dy:
            morceaux.append(f"l{nombre(dx)} {nombre(dy)}")
        x, y = px, py
    return "".join(morceaux).replace(" -", "-") + ("z" if fermer else "")


def anneaux(geometrie):
    """Contours extérieurs d'un Polygon ou MultiPolygon GeoJSON."""
    if geometrie["type"] == "Polygon":
        return [geometrie["coordinates"][0]]
    return [polygone[0] for polygone in geometrie["coordinates"]]


def centre(points):
    return (sum(p[0] for p in points) / len(points), sum(p[1] for p in points) / len(points))


# ---------------------------------------------------------------------------
# Données
# ---------------------------------------------------------------------------
communes = []
for nom, slug in COMMUNES.items():
    reponse = telecharger(
        f"c-{nom}.json",
        "https://geo.api.gouv.fr/communes",
        {"nom": nom, "codeDepartement": "95", "fields": "nom,code,centre,contour", "format": "json"},
    )
    commune = next(c for c in reponse if c["nom"] == nom)
    contour = [projeter(*p) for p in anneaux(commune["contour"])[0]]
    x, y = projeter(*commune["centre"]["coordinates"])
    communes.append(
        {"slug": slug, "nom": nom, "d": chemin(simplifier(contour, 0.9), True), "x": round(x), "y": round(y)}
    )

lac = []
for element in wfs("plan_d_eau", "lac.json"):
    for anneau in anneaux(element["geometry"]):
        points = simplifier([projeter(*p) for p in anneau], 0.7)
        if len(points) > 3:
            lac.append(chemin(points, True))

forets = []
for element in wfs("foret_publique", "foret.json"):
    for anneau in anneaux(element["geometry"]):
        points = decouper_polygone([projeter(*p) for p in anneau])
        points = simplifier(points, 1.4)
        if len(points) > 3:
            xs, ys = [p[0] for p in points], [p[1] for p in points]
            if (max(xs) - min(xs)) * (max(ys) - min(ys)) > 250:  # ignore les confettis
                forets.append(chemin(points, True))

troncons = []
for element in wfs("troncon_de_voie_ferree", "rail.json"):
    if element["properties"].get("nature") != "Voie ferrée principale":
        continue
    troncons.append([projeter(*p[:2]) for p in element["geometry"]["coordinates"]])
rail = []
for ligne in chainer(troncons):
    for morceau in decouper_ligne(ligne):
        morceau = simplifier(morceau, 0.8)
        longueur = sum(math.dist(a, b) for a, b in zip(morceau, morceau[1:]))
        if longueur > 12:
            rail.append(chemin(morceau, False))

gares = []
for element in wfs("equipement_de_transport", "gares.json"):
    proprietes = element["properties"]
    if proprietes.get("nature") not in ("Gare voyageurs uniquement", "Arrêt voyageurs"):
        continue
    points = [projeter(*p[:2]) for anneau in anneaux(element["geometry"]) for p in anneau]
    x, y = centre(points)
    if not (8 <= x <= LARGEUR - 8 and 8 <= y <= HAUTEUR - 8):
        continue
    nom = (proprietes.get("toponyme") or "").replace("Arrêt Voyageurs d'", "").replace("Arrêt Voyageurs de ", "")
    for prefixe in ("Gare d'", "Gare de la ", "Gare de ", "Gare du "):
        if nom.startswith(prefixe):
            nom = nom[len(prefixe):]
            break
    if not any(math.dist((x, y), (g["x"], g["y"])) < 12 for g in gares):
        gares.append({"nom": nom[0].upper() + nom[1:], "x": round(x), "y": round(y)})

# Longueur d'un kilomètre sur la carte (pour l'échelle graphique)
km = ECHELLE / 111.32

# ---------------------------------------------------------------------------
# 1. Fond de carte : un fichier SVG statique (public/carte/zone.svg)
#    Mis en cache une fois par le navigateur pour tout le site, et chargé
#    seulement quand la carte approche de l'écran. Il ne contient aucun texte :
#    les noms (qui ont besoin des polices du site) sont ajoutés par-dessus.
# ---------------------------------------------------------------------------
BASE = "conciergerie-airbnb-soisy-sous-montmorency"
morceaux = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {int(LARGEUR)} {HAUTEUR}">',
    "<style>.f{fill:#d6dfcf}.c{fill:#fbf7f1;stroke:#f1e9db;stroke-width:3;stroke-linejoin:round}"
    ".b{fill:#f5e0ce}.l{fill:#c6d6d8}.r{fill:none;stroke:#8a8174;stroke-width:1.4}"
    ".s{fill:#fbf7f1;stroke:#6b6358;stroke-width:1.4}</style>",
    f'<rect width="{int(LARGEUR)}" height="{HAUTEUR}" fill="#f1e9db"/>',
]
morceaux += [f'<path class="f" d="{d}"/>' for d in forets]
morceaux += [
    f'<path class="c{" b" if c["slug"] == BASE else ""}" d="{c["d"]}"/>' for c in communes
]
morceaux += [f'<path class="l" d="{d}"/>' for d in lac]
morceaux += [f'<path class="r" d="{d}"/>' for d in rail]
morceaux += [f'<circle class="s" cx="{g["x"]}" cy="{g["y"]}" r="4.2"/>' for g in gares]
morceaux.append("</svg>")
os.makedirs("public/carte", exist_ok=True)
svg = "\n".join(morceaux) + "\n"
with open("public/carte/zone.svg", "w", encoding="utf8") as fichier:
    fichier.write(svg)

# Longueur d'un kilomètre sur la carte (pour l'échelle graphique)
km = ECHELLE / 111.32

# ---------------------------------------------------------------------------
# 2. lib/carte.ts : seulement ce dont la page a besoin (dimensions, contours
#    des communes pour surligner la ville affichée)
# ---------------------------------------------------------------------------
sortie = f"""/**
 * Carte de la zone d'intervention — FICHIER GÉNÉRÉ, ne pas modifier à la main.
 * Pour le régénérer : python3 scripts/generer-carte.py
 * Le fond de carte lui-même est dans public/carte/zone.svg (généré aussi).
 *
 * Sources : IGN (Admin Express, BD TOPO®) via geo.api.gouv.fr et data.geopf.fr,
 * Licence Ouverte Etalab 2.0. Tracés simplifiés pour l'affichage.
 */

export const CARTE_LARGEUR = {int(LARGEUR)};
export const CARTE_HAUTEUR = {HAUTEUR};
/** Longueur d'un kilomètre, en unités de la carte */
export const CARTE_KM = {km:.1f};

export type CommuneCarte = {{ slug: string; nom: string; d: string; x: number; y: number }};

export const communesCarte: CommuneCarte[] = {json.dumps(communes, ensure_ascii=False, indent=2)};
"""
with open("lib/carte.ts", "w", encoding="utf8") as fichier:
    fichier.write(sortie)

print(f"public/carte/zone.svg écrit : {len(svg) / 1024:.1f} Ko")
print(f"lib/carte.ts écrit : {len(sortie) / 1024:.1f} Ko — carte {int(LARGEUR)}×{HAUTEUR}, 1 km = {km:.1f} unités")
print(f"  {len(communes)} communes, {len(lac)} plans d'eau, {len(forets)} massifs, {len(rail)} tracés ferrés, {len(gares)} gares")
