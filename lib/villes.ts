export type Ville = {
  slug: string;
  nom: string;
  metaDescription: string;
  accroche: string;
  paragraphes: string[];
  atouts: { titre: string; texte: string }[];
  voisins: string[];
};

export const villes: Ville[] = [
  {
    slug: "conciergerie-airbnb-soisy-sous-montmorency",
    nom: "Soisy-sous-Montmorency",
    metaDescription:
      "Conciergerie Airbnb à Soisy-sous-Montmorency : gestion complète de votre location courte durée par une équipe basée sur place. Audit gratuit de votre bien.",
    accroche:
      "Notre ville d'attache. Une gestion de proximité, au sens littéral du terme.",
    paragraphes: [
      "AJ Prestige est née à Soisy-sous-Montmorency, et c'est ici que bat le cœur de notre conciergerie. Nichée dans la vallée de Montmorency, entre le lac d'Enghien et les premiers contreforts de la forêt de Montmorency, la commune offre un cadre résidentiel recherché à moins de vingt kilomètres de Paris. Pour un propriétaire en location courte durée, cette position est un vrai atout : les voyageurs y trouvent le calme d'une ville à taille humaine tout en restant à portée directe de la capitale.",
      "La gare de Champ-de-Courses-d'Enghien, sur la ligne H du Transilien, relie Soisy à la gare du Nord en une vingtaine de minutes — un argument décisif pour les voyageurs d'affaires comme pour les touristes qui veulent visiter Paris sans en payer les prix d'hébergement. L'hippodrome d'Enghien-Soisy attire par ailleurs un public régulier lors des réunions de trot et d'obstacle, et la proximité immédiate d'Enghien-les-Bains, de son casino et de ses thermes crée une demande de séjours courts toute l'année.",
      "Le parc immobilier soiséen se prête particulièrement bien à la location saisonnière : pavillons familiaux avec jardin, maisons meulières de caractère et appartements récents proches de la gare. Les familles en visite chez des proches, les curistes et les professionnels en mission y cherchent des logements entiers, bien équipés, avec un vrai confort résidentiel — exactement le type de bien que nous savons valoriser.",
      "Être basés sur place change tout : réactivité maximale en cas d'imprévu, connaissance fine des rues, des commerces et des attentes des voyageurs, présence physique possible en quelques minutes. Si votre bien se trouve à Soisy-sous-Montmorency, vous bénéficiez de notre gestion la plus directe : ménage professionnel, accueil des voyageurs, optimisation de l'annonce et tarification ajustée au marché local de la vallée de Montmorency.",
    ],
    atouts: [
      {
        titre: "Ligne H — gare du Nord ≈ 20 min",
        texte:
          "La gare de Champ-de-Courses-d'Enghien met Paris à portée directe des voyageurs.",
      },
      {
        titre: "Hippodrome & lac d'Enghien",
        texte:
          "Une demande régulière liée aux courses hippiques, au casino et aux thermes voisins.",
      },
      {
        titre: "Notre équipe sur place",
        texte:
          "Conciergerie basée à Soisy : intervention possible en quelques minutes, 7j/7.",
      },
    ],
    voisins: [
      "conciergerie-airbnb-enghien-les-bains",
      "conciergerie-airbnb-montmorency",
      "conciergerie-airbnb-eaubonne",
    ],
  },
  {
    slug: "conciergerie-airbnb-enghien-les-bains",
    nom: "Enghien-les-Bains",
    metaDescription:
      "Conciergerie Airbnb à Enghien-les-Bains : valorisez votre bien dans la seule ville thermale d'Île-de-France. Gestion premium, voyageurs haut de gamme, audit gratuit.",
    accroche:
      "Le marché le plus touristique de la vallée mérite une gestion à la hauteur.",
    paragraphes: [
      "Unique ville thermale d'Île-de-France, Enghien-les-Bains est un cas à part dans le Val-d'Oise : son lac, son casino Barrière, son théâtre et ses thermes en font une destination à part entière, et pas seulement une étape vers Paris. Pour un propriétaire, cela se traduit par une demande locative courte durée dense et régulière, portée par une clientèle loisirs et bien-être qui séjourne sur place — chose rare en banlieue parisienne.",
      "Les curistes réservent des séjours de plusieurs nuits, les visiteurs du casino et des spectacles prolongent volontiers leur soirée par une nuit sur place, et les événements d'affaires organisés autour du lac alimentent la semaine. Ajoutez la ligne H du Transilien, qui place la gare du Nord à environ un quart d'heure, et vous obtenez l'un des marchés les plus porteurs du nord parisien, avec des paniers moyens supérieurs à ceux des communes voisines.",
      "Le bâti enghiennois est à l'avenant : appartements de standing en bord de lac, immeubles anciens de caractère en centre-ville, résidences récentes proches de la gare. Cette clientèle exigeante attend un niveau de prestation hôtelier — linge impeccable, décoration soignée, accueil irréprochable. C'est précisément le positionnement d'AJ Prestige : nous préparons votre bien aux standards d'un établissement premium et nous ajustons vos tarifs aux pics de demande, week-ends, vacances et événements du casino ou du théâtre.",
      "Notre conciergerie est implantée à Soisy-sous-Montmorency, en limite immédiate d'Enghien : nos équipes connaissent la ville rue par rue et interviennent dans des délais très courts. De l'audit initial à la gestion quotidienne des voyageurs, nous vous permettons de capter tout le potentiel d'un marché touristique unique en Île-de-France, sans y consacrer une minute.",
    ],
    atouts: [
      {
        titre: "Destination à part entière",
        texte:
          "Casino, thermes, lac, théâtre : les voyageurs viennent pour Enghien, pas seulement pour Paris.",
      },
      {
        titre: "Paniers moyens élevés",
        texte:
          "Une clientèle loisirs et bien-être prête à payer pour des prestations haut de gamme.",
      },
      {
        titre: "Gare du Nord ≈ 15 min",
        texte:
          "La ligne H attire aussi les touristes qui visitent Paris en logeant au bord du lac.",
      },
    ],
    voisins: [
      "conciergerie-airbnb-soisy-sous-montmorency",
      "conciergerie-airbnb-saint-gratien",
      "conciergerie-airbnb-deuil-la-barre",
    ],
  },
  {
    slug: "conciergerie-airbnb-montmorency",
    nom: "Montmorency",
    metaDescription:
      "Conciergerie Airbnb à Montmorency : gestion complète de votre maison ou appartement dans la ville de Rousseau, aux portes de la forêt. Audit gratuit et sans engagement.",
    accroche:
      "Maisons de caractère, patrimoine et forêt : un charme qui se loue très bien.",
    paragraphes: [
      "Perchée sur sa colline face à Paris, Montmorency cultive une identité que peu de communes de la région peuvent revendiquer : ville de Jean-Jacques Rousseau, dont la maison est aujourd'hui un musée, dominée par la collégiale Saint-Martin et bordée par les 2 000 hectares de la forêt de Montmorency. Ce cachet historique et ce cadre vert donnent aux locations courte durée montmorencéennes une personnalité immédiatement perceptible dans les annonces — et les voyageurs y sont sensibles.",
      "Le marché local attire des profils variés : familles venues rendre visite à des proches dans la vallée, promeneurs et cyclistes attirés par la forêt, visiteurs culturels, mais aussi voyageurs professionnels qui préfèrent le calme d'une ville bourgeoise aux hôtels standardisés. Sans gare sur son territoire, Montmorency s'appuie sur les gares voisines d'Enghien-les-Bains et de Champ-de-Courses, reliées par un réseau de bus dense — un point que nous savons présenter clairement aux voyageurs pour transformer cette particularité en simple formalité.",
      "Côté biens, Montmorency est le territoire des belles surfaces : demeures bourgeoises, maisons anciennes avec jardin, appartements spacieux dans le centre historique. Ces logements se prêtent magnifiquement aux séjours en famille ou entre amis et aux locations de plusieurs nuits, avec des revenus par séjour supérieurs à la moyenne de la vallée quand la présentation et la tarification sont bien travaillées.",
      "AJ Prestige gère votre bien montmorencéen depuis Soisy-sous-Montmorency, à quelques minutes de route : photos professionnelles qui mettent en valeur le cachet de l'ancien, annonce optimisée, ménage aux standards hôteliers, accueil personnalisé des voyageurs et suivi de la réglementation applicable aux meublés de tourisme. Vous profitez du charme de votre maison ; nous nous occupons de tout le reste.",
    ],
    atouts: [
      {
        titre: "Cachet patrimonial fort",
        texte:
          "Musée Rousseau, collégiale, centre ancien : des annonces qui se démarquent naturellement.",
      },
      {
        titre: "Forêt de Montmorency",
        texte:
          "Un argument nature rare aux portes de Paris, très apprécié des familles.",
      },
      {
        titre: "Belles surfaces",
        texte:
          "Maisons et grands appartements : des séjours longs et des paniers élevés.",
      },
    ],
    voisins: [
      "conciergerie-airbnb-soisy-sous-montmorency",
      "conciergerie-airbnb-enghien-les-bains",
      "conciergerie-airbnb-deuil-la-barre",
    ],
  },
  {
    slug: "conciergerie-airbnb-ermont",
    nom: "Ermont",
    metaDescription:
      "Conciergerie Airbnb à Ermont : profitez du pôle Ermont-Eaubonne (lignes H, J, RER C) pour louer en courte durée. Gestion complète et audit gratuit par AJ Prestige.",
    accroche:
      "Le meilleur nœud ferroviaire du Val-d'Oise, un aimant à voyageurs.",
    paragraphes: [
      "S'il fallait résumer l'attrait locatif d'Ermont en un mot, ce serait sa gare. Le pôle d'Ermont-Eaubonne est l'un des mieux desservis du Val-d'Oise : ligne H vers la gare du Nord, ligne J vers Paris Saint-Lazare et RER C qui traverse Paris rive gauche. Trois accès directs à la capitale depuis une même station — pour un voyageur, c'est la garantie de rejoindre n'importe quel quartier de Paris sans correspondance compliquée, et pour un propriétaire, c'est un argument d'annonce en or.",
      "Cette accessibilité attire une clientèle de semaine particulièrement stable : professionnels en déplacement, salariés en mission de plusieurs semaines, personnels de santé — la clinique Claude-Bernard est un employeur important de la ville — auxquels s'ajoutent le week-end des visiteurs de Paris à la recherche d'un meilleur rapport qualité-prix que l'hôtellerie intra-muros. Résultat : des taux d'occupation réguliers toute l'année, sans dépendre d'une seule saison touristique.",
      "Les studios et deux-pièces proches des gares sont les stars du marché ermontois : faciles à équiper, rapides à entretenir, ils tournent vite et bien. Les maisons familiales des quartiers résidentiels trouvent quant à elles leur public auprès des familles en visite et des groupes. Dans les deux cas, la clé est la même : une annonce irréprochable, un calendrier optimisé et une logistique sans faille entre deux séjours.",
      "C'est exactement ce qu'apporte AJ Prestige, depuis notre base de Soisy-sous-Montmorency toute proche : gestion des réservations et des voyageurs, ménage professionnel avec linge hôtelier, tarification dynamique calée sur la demande réelle du secteur, maintenance et petites réparations coordonnées. Demandez votre audit gratuit : nous évaluons le potentiel exact de votre bien ermontois et la formule la plus rentable pour vous.",
    ],
    atouts: [
      {
        titre: "Triple desserte ferroviaire",
        texte:
          "Lignes H, J et RER C au départ d'Ermont-Eaubonne : Paris sans détour.",
      },
      {
        titre: "Demande de semaine solide",
        texte:
          "Professionnels en mission et personnel de santé assurent un remplissage régulier.",
      },
      {
        titre: "Petites surfaces rentables",
        texte:
          "Studios et T2 proches des gares : rotation rapide et rentabilité élevée.",
      },
    ],
    voisins: [
      "conciergerie-airbnb-eaubonne",
      "conciergerie-airbnb-sannois",
      "conciergerie-airbnb-saint-gratien",
    ],
  },
  {
    slug: "conciergerie-airbnb-eaubonne",
    nom: "Eaubonne",
    metaDescription:
      "Conciergerie Airbnb à Eaubonne : gestion clé en main de votre location courte durée, entre pôle gare Ermont-Eaubonne et hôpital Simone-Veil. Audit gratuit.",
    accroche:
      "Une ville-jardin connectée à Paris, idéale pour les séjours moyenne durée.",
    paragraphes: [
      "Eaubonne incarne l'équilibre que recherchent beaucoup de voyageurs en Île-de-France : une ville verte et paisible, des rues bordées de pavillons et de belles demeures du début du XXe siècle, et pourtant Paris à portée immédiate grâce au pôle ferroviaire d'Ermont-Eaubonne qu'elle partage avec sa voisine — RER C, ligne H vers gare du Nord et ligne J vers Saint-Lazare. Ce double visage, résidentiel et connecté, façonne un marché de la location courte durée discret mais étonnamment solide.",
      "La présence de l'hôpital Simone-Veil génère une demande spécifique que peu de propriétaires exploitent : familles de patients cherchant à loger à proximité, professionnels de santé en renfort, consultants en mission. Ces séjours, souvent d'une à plusieurs semaines, remplissent le calendrier en dehors des pics touristiques et apportent une stabilité précieuse aux revenus. Le week-end, la clientèle bascule vers les visiteurs de Paris et les familles de passage dans la vallée de Montmorency.",
      "Les biens qui performent le mieux à Eaubonne sont les logements entiers et confortables : maisons avec jardin pour les familles, appartements lumineux à distance de marche de la gare pour les actifs. Un équipement complet — vraie literie, cuisine fonctionnelle, wifi fiable, stationnement — fait ici toute la différence, et notre audit initial identifie précisément les améliorations qui augmenteront vos revenus.",
      "Basée à Soisy-sous-Montmorency, à quelques minutes d'Eaubonne, l'équipe AJ Prestige assure une gestion réellement locale : accueil des voyageurs, ménage professionnel, linge, tarification ajustée à la demande hospitalière et touristique, coordination des artisans si besoin. Vous déléguez l'intégralité de l'exploitation ; nous vous reversons des revenus optimisés, avec un reporting limpide.",
    ],
    atouts: [
      {
        titre: "Pôle Ermont-Eaubonne",
        texte:
          "RER C, ligne H et ligne J : trois liaisons directes vers Paris au choix.",
      },
      {
        titre: "Demande hospitalière",
        texte:
          "L'hôpital Simone-Veil alimente des séjours moyenne durée toute l'année.",
      },
      {
        titre: "Cadre résidentiel verdoyant",
        texte:
          "Maisons avec jardin et rues calmes : le confort que les familles recherchent.",
      },
    ],
    voisins: [
      "conciergerie-airbnb-ermont",
      "conciergerie-airbnb-soisy-sous-montmorency",
      "conciergerie-airbnb-saint-gratien",
    ],
  },
  {
    slug: "conciergerie-airbnb-saint-gratien",
    nom: "Saint-Gratien",
    metaDescription:
      "Conciergerie Airbnb à Saint-Gratien : location courte durée aux portes d'Enghien-les-Bains, RER C direct vers Paris. Gestion complète, audit gratuit AJ Prestige.",
    accroche:
      "Aux portes du lac d'Enghien, avec le RER C pour Paris : le bon plan des voyageurs avisés.",
    paragraphes: [
      "Saint-Gratien occupe une position maligne sur la carte du Val-d'Oise : mitoyenne d'Enghien-les-Bains et de son lac, desservie par sa propre gare du RER C qui rejoint directement Paris, la ville offre aux voyageurs l'accès à toutes les attractions enghiennoises — casino, thermes, berges du lac — pour un coût d'hébergement sensiblement inférieur. Ce positionnement de « voisine futée » est une opportunité réelle pour les propriétaires en location courte durée.",
      "Concrètement, votre annonce gratiennoise capte deux publics : le débordement du marché touristique d'Enghien, où la demande dépasse régulièrement l'offre lors des week-ends, des vacances et des grands événements du casino ou de l'hippodrome, et les voyageurs orientés Paris qui privilégient le RER C pour rejoindre les Invalides, le Musée d'Orsay ou la tour Eiffel sans correspondance. Une double exposition qui lisse le remplissage sur l'année.",
      "Le parc immobilier s'y prête bien : appartements de résidences récentes faciles à exploiter, maisons de ville avec extérieur pour les familles, petites surfaces proches de la gare idéales pour les couples et voyageurs solo. La ville, dont le patrimoine garde le souvenir de la princesse Mathilde qui y tint salon, offre commerces, marché et parcs qui rendent le séjour agréable au quotidien.",
      "AJ Prestige intervient à Saint-Gratien depuis Soisy-sous-Montmorency, à quelques minutes de là : nous créons ou reprenons votre annonce, fixons une tarification qui capitalise sur les pics enghiennois, assurons ménage professionnel, linge hôtelier et accueil des voyageurs, et gérons les imprévus. Commencez par un audit gratuit : vous saurez précisément ce que votre bien peut rapporter.",
    ],
    atouts: [
      {
        titre: "RER C direct Paris",
        texte:
          "Une gare sur place, et les grands sites parisiens accessibles sans correspondance.",
      },
      {
        titre: "Effet Enghien",
        texte:
          "La demande touristique du lac et du casino déborde naturellement sur Saint-Gratien.",
      },
      {
        titre: "Tarifs attractifs",
        texte:
          "Un rapport qualité-prix qui séduit les voyageurs et remplit votre calendrier.",
      },
    ],
    voisins: [
      "conciergerie-airbnb-enghien-les-bains",
      "conciergerie-airbnb-eaubonne",
      "conciergerie-airbnb-sannois",
    ],
  },
  {
    slug: "conciergerie-airbnb-deuil-la-barre",
    nom: "Deuil-la-Barre",
    metaDescription:
      "Conciergerie Airbnb à Deuil-la-Barre : deux gares ligne H, Enghien et Montmorency à deux pas. Gestion complète de votre location courte durée, audit gratuit.",
    accroche:
      "Deux gares, un cadre familial et le lac d'Enghien à deux pas.",
    paragraphes: [
      "Rares sont les communes de cette taille à disposer de deux gares : Deuil-Montmagny et La Barre-Ormesson placent Deuil-la-Barre sur la ligne H du Transilien, avec la gare du Nord à environ un quart d'heure de la première. Cette desserte, ajoutée à la proximité immédiate d'Enghien-les-Bains et de Montmorency, fait de cette ville résidentielle un point de chute très pratique pour visiter Paris comme pour rayonner dans la vallée de Montmorency.",
      "La demande locative courte durée y est portée par des profils complémentaires : touristes cherchant une alternative économique aux nuitées parisiennes, familles de passage chez des proches, professionnels en mission dans le nord de l'Île-de-France, et visiteurs des événements enghiennois quand l'hôtellerie du bord du lac affiche complet. Cette diversité protège vos revenus : aucun public ne fait la pluie et le beau temps à lui seul.",
      "Deuil-la-Barre est avant tout une ville de pavillons : meulières typiques de la vallée, maisons familiales avec jardin, complétées par des appartements dans des résidences récentes autour des gares. Les logements entiers y surperforment nettement — les voyageurs viennent chercher l'espace et le calme qu'ils ne trouvent pas à Paris, et un extérieur bien aménagé devient un argument décisif à la belle saison.",
      "Notre équipe, installée à Soisy-sous-Montmorency voisine, gère votre bien deuillois de bout en bout : annonce optimisée avec photos professionnelles, tarification dynamique, ménage et linge aux standards hôteliers, accueil des voyageurs et assistance 7j/7. L'audit initial est gratuit et sans engagement : nous chiffrons le potentiel de votre maison ou appartement et vous recommandons la formule adaptée.",
    ],
    atouts: [
      {
        titre: "Deux gares ligne H",
        texte:
          "Deuil-Montmagny et La Barre-Ormesson : Paris gare du Nord en un quart d'heure environ.",
      },
      {
        titre: "Entre Enghien et Montmorency",
        texte:
          "Le lac, le casino et la forêt à quelques minutes : des arguments d'annonce concrets.",
      },
      {
        titre: "Pavillons familiaux",
        texte:
          "Maisons avec jardin très recherchées pour les séjours en famille ou entre amis.",
      },
    ],
    voisins: [
      "conciergerie-airbnb-enghien-les-bains",
      "conciergerie-airbnb-montmorency",
      "conciergerie-airbnb-soisy-sous-montmorency",
    ],
  },
  {
    slug: "conciergerie-airbnb-sannois",
    nom: "Sannois",
    metaDescription:
      "Conciergerie Airbnb à Sannois : ligne J vers Saint-Lazare, moulin historique et vue sur Paris. AJ Prestige gère votre location courte durée. Audit gratuit.",
    accroche:
      "Depuis les hauteurs de Sannois, Paris est en vue — et en ligne directe.",
    paragraphes: [
      "Adossée à sa butte coiffée d'un authentique moulin à vent restauré, Sannois regarde Paris depuis ses hauteurs — par temps clair, la vue porte jusqu'à la tour Eiffel. La ligne J du Transilien relie sa gare à Paris Saint-Lazare en une vingtaine de minutes, plaçant les Grands Magasins, l'Opéra et les quartiers d'affaires de l'ouest parisien à portée directe. Pour la location courte durée, c'est un profil singulier dans la vallée : une orientation Saint-Lazare qui complète l'axe gare du Nord des communes voisines.",
      "Cette desserte attire des voyageurs d'affaires travaillant dans l'ouest parisien et vers La Défense, des touristes qui logent malin pour visiter la capitale, et une clientèle locale de familles et d'amis de passage. Le marché sannoisien reste moins concurrentiel que celui d'Enghien ou d'Ermont : une annonce vraiment professionnelle — photos soignées, description travaillée, tarification fine — s'y démarque d'autant plus vite.",
      "Maisons de ville avec jardinet sur les pentes de la butte, pavillons familiaux dans les quartiers calmes, appartements pratiques autour de la gare et du centre commerçant : le parc immobilier offre des opportunités variées. Les biens avec extérieur ou vue dégagée possèdent un vrai supplément d'âme que nous mettons systématiquement en scène dans les annonces.",
      "Depuis notre base de Soisy-sous-Montmorency, AJ Prestige couvre Sannois en quelques minutes : audit gratuit de votre bien, mise en ligne ou reprise de l'annonce, gestion complète des réservations et des voyageurs, ménage professionnel avec linge hôtelier, suivi réglementaire du meublé de tourisme. Vous gardez la main sur votre calendrier ; nous transformons votre bien en source de revenus sereine.",
    ],
    atouts: [
      {
        titre: "Ligne J — Saint-Lazare ≈ 20 min",
        texte:
          "L'accès direct à l'ouest parisien, complémentaire de l'axe gare du Nord.",
      },
      {
        titre: "Marché peu saturé",
        texte:
          "Moins d'annonces concurrentes : une gestion pro se démarque rapidement.",
      },
      {
        titre: "Charme de la butte",
        texte:
          "Moulin, vues sur Paris et maisons avec extérieur : de vrais atouts d'annonce.",
      },
    ],
    voisins: [
      "conciergerie-airbnb-ermont",
      "conciergerie-airbnb-saint-gratien",
      "conciergerie-airbnb-eaubonne",
    ],
  },
];

export function getVille(slug: string): Ville | undefined {
  return villes.find((v) => v.slug === slug);
}
