/* ============================================================
   STARS SMP — DONNÉES DU SITE
   ============================================================
   Toutes les informations du site sont centralisées ici.
   Modifie ces valeurs pour mettre à jour le contenu du site
   sans toucher au HTML/CSS.

   IMPORTANT :
   - Les recettes de craft ne sont PAS inventées : remplace les
     placeholders [CRAFT_XXX] par de vraies captures Minecraft.
   - Les textures des runes ne sont PAS inventées : ce sont des
     objets custom déjà présents sur le serveur.
   ============================================================ */

const SERVER_INFO = {
  ip: "[IP À AJOUTER]",
  version: "[VERSION À AJOUTER]",
  discord: "#", // lien vers le serveur Discord
};

/* Les 8 éléments. "craft" = image placeholder pour la recette
   publique. Remplace craftImage par le vrai chemin d'image
   quand disponible (ex: "assets/crafts/earth.png"). */
const ELEMENTS = [
  {
    id: "earth",
    symbol: "🌍",
    name: "EARTH",
    dimension: "TERRALIA",
    color: "#8a6d4b",
    colorAlt: "#5f7a4a",
    theme: "Terre, montagnes, cavernes, cristaux",
    description:
      "L'élément le plus ancien. Earth façonne la roche, dresse des murs et fait trembler le sol sous les pas de ses ennemis.",
    capacities: [
      "Manipulation de la terre",
      "Rochers et projectiles minéraux",
      "Murs défensifs",
      "Attaques sismiques",
      "Protection renforcée",
    ],
    craftImage: null, // remplace par le chemin de l'image de craft
    craftPlaceholder: "[CRAFT_EARTH]",
    difficulty: "Modérée",
    boss: {
      name: "Gardien de la Terre",
      title: "Le Gardien de la Terre",
      story:
        "Né des premières failles de TERRALIA, il veille sur le cœur minéral de la dimension depuis un temps que nul ne sait mesurer.",
      abilities: [
        "Charge sismique",
        "Invocation de golems de pierre",
        "Bouclier de roche",
        "Onde de choc au sol",
      ],
      phases: 3,
      difficulty: "★★★☆☆",
      arena: "Une caverne de cristal effondrée au centre de TERRALIA",
    },
  },
  {
    id: "water",
    symbol: "💧",
    name: "WATER",
    dimension: "AQUARIA",
    color: "#2f7fb8",
    colorAlt: "#5bc0de",
    theme: "Océans, abysses, temples sous-marins",
    description:
      "Fluide et implacable, Water épouse chaque forme de combat : vague déferlante ou lame silencieuse selon la volonté de celui qui le maîtrise.",
    capacities: [
      "Manipulation de l'eau",
      "Vagues offensives",
      "Projectiles d'eau",
      "Mobilité aquatique accrue",
      "Capacités de soin liées à l'eau",
    ],
    craftImage: null,
    craftPlaceholder: "[CRAFT_WATER]",
    difficulty: "Modérée",
    boss: {
      name: "Gardien des Abysses",
      title: "Le Gardien des Abysses",
      story:
        "Dans les fosses les plus profondes d'AQUARIA, cette entité protège un temple englouti dont personne n'a revu la lumière.",
      abilities: [
        "Raz-de-marée",
        "Invocation de courants abyssaux",
        "Voile de bulles aveuglantes",
        "Charge aquatique",
      ],
      phases: 3,
      difficulty: "★★★☆☆",
      arena: "Un temple englouti dans les abysses d'AQUARIA",
    },
  },
  {
    id: "fire",
    symbol: "🔥",
    name: "FIRE",
    dimension: "IGNISIA",
    color: "#c8452c",
    colorAlt: "#f2994a",
    theme: "Volcans, lave, flammes",
    description:
      "Fire ne négocie pas. Chaque capacité est une déclaration : brûler, consumer, faire place nette.",
    capacities: [
      "Manipulation des flammes",
      "Attaques de feu",
      "Explosions élémentaires",
      "Manipulation de la lave",
      "Combustion prolongée",
    ],
    craftImage: null,
    craftPlaceholder: "[CRAFT_FIRE]",
    difficulty: "Élevée",
    boss: {
      name: "Seigneur des Flammes",
      title: "Le Seigneur des Flammes",
      story:
        "Forgé dans le cratère central d'IGNISIA, il règne sur une forteresse de lave où rien de vivant ne dure longtemps.",
      abilities: [
        "Pluie de braises",
        "Mur de flammes",
        "Charge incandescente",
        "Explosion volcanique",
      ],
      phases: 4,
      difficulty: "★★★★☆",
      arena: "Une forteresse de lave au sommet du cratère d'IGNISIA",
    },
  },
  {
    id: "nature",
    symbol: "🌿",
    name: "NATURE",
    dimension: "SYLVARIA",
    color: "#2e8b57",
    colorAlt: "#8fd19e",
    theme: "Forêt magique, plantes, arbres gigantesques",
    description:
      "Nature ne détruit pas : elle envahit, elle enracine, elle régénère. Un pouvoir patient, mais impossible à arracher.",
    capacities: [
      "Manipulation des plantes",
      "Racines entravantes",
      "Contrôle de la végétation",
      "Régénération",
      "Zones de croissance rapide",
    ],
    craftImage: null,
    craftPlaceholder: "[CRAFT_NATURE]",
    difficulty: "Modérée",
    boss: {
      name: "Gardien Sylvestre",
      title: "Le Gardien Sylvestre",
      story:
        "Un humanoïde d'écorce et de racines, vieux comme le plus grand arbre de SYLVARIA, gardien du temple végétal.",
      abilities: [
        "Racines entravantes",
        "Invocation de ronces",
        "Régénération de zone",
        "Charge d'écorce",
      ],
      phases: 3,
      difficulty: "★★★☆☆",
      arena: "Le temple englouti sous les racines au cœur de SYLVARIA",
    },
  },
  {
    id: "electricity",
    symbol: "⚡",
    name: "ELECTRICITY",
    dimension: "FULGURIA",
    color: "#6c4fd6",
    colorAlt: "#3fa9f5",
    theme: "Tempêtes, éclairs, énergie",
    description:
      "Rien n'est plus rapide qu'Electricity. Un pouvoir d'instants : frapper avant que l'adversaire ait fini de réagir.",
    capacities: [
      "Éclairs offensifs",
      "Décharges de zone",
      "Attaques rapides enchaînées",
      "Mobilité électrique",
      "Surcharge temporaire",
    ],
    craftImage: null,
    craftPlaceholder: "[CRAFT_ELECTRICITY]",
    difficulty: "Élevée",
    boss: {
      name: "Seigneur de la Tempête",
      title: "Le Seigneur de la Tempête",
      story:
        "Au centre d'un orage qui ne cesse jamais, cette entité charge chaque éclair de FULGURIA d'une volonté propre.",
      abilities: [
        "Frappe de foudre",
        "Zone électrifiée",
        "Téléportation éclair",
        "Tempête de zone",
      ],
      phases: 4,
      difficulty: "★★★★☆",
      arena: "L'œil de la tempête permanente de FULGURIA",
    },
  },
  {
    id: "air",
    symbol: "🌪️",
    name: "AIR",
    dimension: "AERIA",
    color: "#7fd1d1",
    colorAlt: "#eaf6f6",
    theme: "Ciel, nuages, îles flottantes, vents",
    description:
      "Air est un pouvoir de mouvement pur : rafales, propulsion, contrôle du champ de bataille depuis les hauteurs.",
    capacities: [
      "Rafales offensives",
      "Tornades localisées",
      "Propulsion aérienne",
      "Mobilité verticale",
      "Déviation de projectiles",
    ],
    craftImage: null,
    craftPlaceholder: "[CRAFT_AIR]",
    difficulty: "Modérée",
    boss: {
      name: "Gardien Céleste",
      title: "Le Gardien Céleste",
      story:
        "Il plane depuis toujours au-dessus des îles flottantes d'AERIA, invisible jusqu'à ce qu'il choisisse de ne plus l'être.",
      abilities: [
        "Tornade convergente",
        "Rafale de recul",
        "Vol en piqué",
        "Bouclier de vent",
      ],
      phases: 3,
      difficulty: "★★★☆☆",
      arena: "Un archipel d'îles flottantes au centre d'AERIA",
    },
  },
  {
    id: "light",
    symbol: "✨",
    name: "LIGHT",
    dimension: "LUMINARA",
    color: "#e8c468",
    colorAlt: "#fff6df",
    theme: "Lumière, étoiles, temples célestes",
    description:
      "Light protège autant qu'il frappe. Un pouvoir de clarté, capable d'éblouir, de soigner, de repousser les ténèbres.",
    capacities: [
      "Rayons lumineux",
      "Boucliers de lumière",
      "Zone de protection",
      "Énergie astrale",
      "Purification de zone",
    ],
    craftImage: null,
    craftPlaceholder: "[CRAFT_LIGHT]",
    difficulty: "Élevée",
    boss: {
      name: "Gardien Astral",
      title: "Le Gardien Astral",
      story:
        "Sculpté dans la lumière la plus pure de LUMINARA, il garde le temple céleste depuis la naissance de la dimension.",
      abilities: [
        "Rayon céleste",
        "Bouclier aveuglant",
        "Invocation d'éclats astraux",
        "Zone de purification",
      ],
      phases: 4,
      difficulty: "★★★★☆",
      arena: "Le temple céleste au sommet de LUMINARA",
    },
  },
  {
    id: "shadow",
    symbol: "🌑",
    name: "SHADOW",
    dimension: "UMBRALIA",
    color: "#6a4a8c",
    colorAlt: "#2a1f3d",
    theme: "Ténèbres, brume, ruines, ombres",
    description:
      "Shadow ne se bat pas de face. Camouflage, illusions, déplacements furtifs : un pouvoir qui existe dans les angles morts.",
    capacities: [
      "Manipulation des ombres",
      "Camouflage",
      "Téléportation courte",
      "Illusions",
      "Attaques depuis l'obscurité",
    ],
    craftImage: null,
    craftPlaceholder: "[CRAFT_SHADOW]",
    difficulty: "Élevée",
    boss: {
      name: "Entité des Ombres",
      title: "L'Entité des Ombres",
      story:
        "Personne n'a vu son visage. UMBRALIA elle-même semble s'écarter sur son passage, comme si la dimension la craignait aussi.",
      abilities: [
        "Multiplication d'ombres",
        "Téléportation offensive",
        "Voile de ténèbres",
        "Illusion de clone",
      ],
      phases: 4,
      difficulty: "★★★★☆",
      arena: "Des ruines corrompues au plus profond d'UMBRALIA",
    },
  },
];

/* Description longue des 8 dimensions (pour la page Dimensions) */
const DIMENSIONS_INTRO = {
  title: "LES 8 DIMENSIONS",
  subtitle:
    "Huit mondes, huit éléments, huit gardiens. Chaque dimension abrite le pouvoir que seul un vainqueur peut emporter.",
};

/* Runes — version privée. Les textures officielles existent déjà
   en jeu : ne pas en générer de fausses ici. */
const RUNES_NOTE =
  "Les runes sont des objets custom déjà présents sur le serveur Minecraft. Leurs textures et recettes officielles seront ajoutées ici — aucune texture ni recette n'est inventée sur ce site.";

/* Étapes de progression PUBLIC */
const PUBLIC_STEPS = [
  { label: "Ressources", desc: "Rassemble les ressources nécessaires au craft." },
  { label: "Craft du pouvoir", desc: "Réalise la recette pour fabriquer ton élément." },
  { label: "Obtention du pouvoir", desc: "Le pouvoir élémentaire t'appartient." },
  { label: "Utilisation des capacités", desc: "Maîtrise les capacités liées à ton élément." },
];

/* Étapes de progression PRIVATE */
const PRIVATE_STEPS = [
  { label: "Découverte", desc: "Le cercle des élus repère son territoire." },
  { label: "Ressources", desc: "Rassemble ce qu'exige la rune." },
  { label: "Craft de la rune", desc: "Fabrique la rune de la dimension visée." },
  { label: "Ouverture du portail", desc: "La rune ouvre le passage vers la dimension." },
  { label: "Accès à la dimension", desc: "Le monde élémentaire s'ouvre à toi." },
  { label: "Exploration", desc: "Parcours un monde hostile et inconnu." },
  { label: "Découverte du boss", desc: "Le gardien de la dimension se révèle." },
  { label: "Combat", desc: "Affronte le gardien dans son propre territoire." },
  { label: "Victoire", desc: "Le gardien tombe." },
  { label: "Drop du pouvoir", desc: "Le pouvoir élémentaire est libéré." },
  { label: "Maîtrise de l'élément", desc: "L'élément t'appartient enfin." },
];

const LORE_INTRO = {
  title: "L'HISTOIRE DES ÉTOILES",
  paragraphs: [
    "Avant STARS SMP, il n'y avait ni terre, ni eau, ni feu — seulement huit fragments de lumière dérivant dans le vide, chacun porteur d'un élément que le monde n'avait pas encore de nom pour décrire.",
    "Quand ces fragments ont touché le sol, huit dimensions sont nées. Chacune a formé un gardien pour veiller sur son pouvoir : un être capable de le contenir sans jamais le laisser s'échapper.",
    "Certains joueurs se contentent d'apprendre à reproduire une fraction infime de ces pouvoirs par le craft. D'autres, choisis par les étoiles elles-mêmes, sont invités à affronter les gardiens en personne — et à hériter directement de ce qu'ils protègent.",
    "Ce que racontent les runes, ce que cachent les dimensions, ce que gardent réellement les huit entités : l'histoire ne fait que commencer à être écrite. De nouveaux chapitres, de nouvelles saisons et de nouvelles révélations viendront s'ajouter à mesure que le cercle des élus avance.",
  ],
};

const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#serveur", label: "Le serveur" },
  { href: "#pouvoirs", label: "Pouvoirs" },
  { href: "#dimensions", label: "Dimensions" },
  { href: "#boss", label: "Boss" },
  { href: "#lore", label: "Lore" },
  { href: "#rejoindre", label: "Rejoindre" },
];
