export type PlantCategory =
  | 'Microgreens'
  | 'Fresh Air'
  | 'Fruit Plants'
  | 'Flowering'
  | 'Decorative'
  | 'Fresh Feel';

export type SpaceType = 'Home' | 'Office' | 'Garden';
export type LightLevel = 'Low' | 'Medium' | 'Bright';

export interface Plant {
  id: string;
  name: string;
  latin: string;
  category: PlantCategory;
  price: number;
  light: string;
  water: string;
  image: string;
  popular: boolean;
  description: string;
  idealSpace: SpaceType[];
  lightLevel: LightLevel[];
}

export const CATEGORIES: PlantCategory[] = [
  'Microgreens',
  'Fresh Air',
  'Fruit Plants',
  'Flowering',
  'Decorative',
  'Fresh Feel',
];

export const PLANTS: Plant[] = [
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    latin: 'Dracaena trifasciata',
    category: 'Fresh Air',
    price: 399,
    light: 'Low to bright, any corner',
    water: 'Every 2–3 weeks',
    image: '/images/plants/snake-plant.jpg',
    popular: true,
    description:
      'Indestructible and architectural. Purifies indoor air day and night while tolerating neglect with ease. Perfect for living room corners and bedroom nightstands.',
    idealSpace: ['Home', 'Office'],
    lightLevel: ['Low', 'Medium', 'Bright'],
  },
  {
    id: 'areca-palm',
    name: 'Areca Palm',
    latin: 'Dypsis lutescens',
    category: 'Fresh Air',
    price: 549,
    light: 'Bright indirect light',
    water: 'When top soil feels dry',
    image: '/images/plants/areca-palm.jpg',
    popular: true,
    description:
      'Feathery, tropical frills that transform any room into an oasis. Acts as a natural air humidifier and effective indoor pollutant sponge.',
    idealSpace: ['Home', 'Office'],
    lightLevel: ['Medium', 'Bright'],
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    latin: 'Spathiphyllum wallisii',
    category: 'Flowering',
    price: 449,
    light: 'Shade tolerant',
    water: 'Once a week',
    image: '/images/plants/peace-lily.jpg',
    popular: true,
    description:
      'Glossy dark leaves topped with serene ivory-white blooms. Communicates clearly by drooping gently when thirsty and reviving within hours of a drink.',
    idealSpace: ['Home', 'Office'],
    lightLevel: ['Low', 'Medium'],
  },
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    latin: 'Monstera deliciosa',
    category: 'Decorative',
    price: 649,
    light: 'Bright, indirect light',
    water: 'Weekly',
    image: '/images/plants/monstera.jpg',
    popular: true,
    description:
      'The Swiss cheese icon with magnificent fenestrated leaves. Grows vigorously with gentle support and brings vibrant jungle energy into modern interiors.',
    idealSpace: ['Home', 'Office', 'Garden'],
    lightLevel: ['Medium', 'Bright'],
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    latin: 'Zamioculcas zamiifolia',
    category: 'Decorative',
    price: 499,
    light: 'Any light level',
    water: 'Every 2–3 weeks',
    image: '/images/plants/zz-plant.jpg',
    popular: true,
    description:
      'Ultra glossy, waxy foliage that thrives even in low-lit office cubicles. Water-storing rhizomes make it one of the toughest houseplants on earth.',
    idealSpace: ['Home', 'Office'],
    lightLevel: ['Low', 'Medium', 'Bright'],
  },
  {
    id: 'golden-pothos',
    name: 'Golden Pothos',
    latin: 'Epipremnum aureum',
    category: 'Fresh Feel',
    price: 249,
    light: 'Low light friendly',
    water: 'Once a week',
    image: '/images/plants/golden-pothos.jpg',
    popular: true,
    description:
      'Cascading heart-shaped leaves flecked with gold. Highly adaptable, fast growing in soil or water, and looks gorgeous draping from bookshelves.',
    idealSpace: ['Home', 'Office', 'Garden'],
    lightLevel: ['Low', 'Medium'],
  },
  {
    id: 'meyer-lemon',
    name: 'Meyer Lemon',
    latin: "Citrus limon 'Meyer'",
    category: 'Fruit Plants',
    price: 899,
    light: 'Full sun, 5–6 hrs',
    water: 'Keep soil evenly moist',
    image: '/images/plants/meyer-lemon.jpg',
    popular: true,
    description:
      'Fragrant white blossoms followed by thin-skinned, sweet lemons. Ideal for sun-drenched balconies and terrace gardens.',
    idealSpace: ['Garden', 'Home'],
    lightLevel: ['Bright'],
  },
  {
    id: 'sunflower-microgreens',
    name: 'Sunflower Microgreens',
    latin: 'Helianthus annuus',
    category: 'Microgreens',
    price: 199,
    light: 'Bright windowsill, 4–5 hrs',
    water: 'Light misting once a day',
    image: '/images/plants/sunflower-microgreens.jpg',
    popular: true,
    description:
      'Crunchy, nutty, and packed with vitamins A, B complex, and D. Harvest fresh shoots right from your kitchen counter in just 8–10 days.',
    idealSpace: ['Home', 'Office'],
    lightLevel: ['Bright', 'Medium'],
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    latin: 'Ficus lyrata',
    category: 'Decorative',
    price: 799,
    light: 'Bright indirect light',
    water: 'When top 2 inches dry',
    image: '/images/plants/fiddle-leaf.jpg',
    popular: false,
    description:
      'Sculptural, violin-shaped leaves that make an impressive design statement in living rooms and reception lounges.',
    idealSpace: ['Home', 'Office'],
    lightLevel: ['Bright'],
  },
  {
    id: 'radish-microgreens',
    name: 'Radish Microgreens',
    latin: 'Raphanus sativus',
    category: 'Microgreens',
    price: 179,
    light: 'Sunny windowsill',
    water: 'Light misting daily',
    image: '/images/plants/radish-microgreens.jpg',
    popular: false,
    description:
      'Zesty, peppery kick with vibrant crimson stems. Adds gourmet crunch and intense flavor to salads, sandwiches, and grain bowls.',
    idealSpace: ['Home'],
    lightLevel: ['Bright', 'Medium'],
  },
  {
    id: 'basil-microgreens',
    name: 'Basil Microgreens',
    latin: 'Ocimum basilicum',
    category: 'Microgreens',
    price: 189,
    light: 'Bright windowsill',
    water: 'Moist soil daily',
    image: '/images/plants/basil-microgreens.jpg',
    popular: false,
    description:
      'Intensely aromatic micro-shoots bursting with classic Italian sweet basil flavor. Perfect garnish for homemade pasta, pizza, and avocado toast.',
    idealSpace: ['Home'],
    lightLevel: ['Bright'],
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    latin: 'Chlorophytum comosum',
    category: 'Fresh Air',
    price: 299,
    light: 'Medium to bright filtered',
    water: 'Once a week',
    image: '/images/plants/spider-plant.jpg',
    popular: false,
    description:
      'Arching ribbon-like leaves with white central stripes. Continuously shoots out charming baby "spiderettes" that you can share with friends.',
    idealSpace: ['Home', 'Office'],
    lightLevel: ['Medium', 'Low'],
  },
  {
    id: 'jasmine-mogra',
    name: 'Jasmine / Mogra',
    latin: 'Jasminum sambac',
    category: 'Flowering',
    price: 349,
    light: 'Full morning sun',
    water: 'Keep moist',
    image: '/images/plants/jasmine.jpg',
    popular: false,
    description:
      'Incomparable, heavenly fragrance with pure white starry blooms. Loved across Indian homes for balcony planters and morning flower harvests.',
    idealSpace: ['Garden', 'Home'],
    lightLevel: ['Bright'],
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus',
    latin: 'Hibiscus rosa-sinensis',
    category: 'Flowering',
    price: 379,
    light: 'Direct sunlight 5+ hrs',
    water: 'Regular watering',
    image: '/images/plants/hibiscus.jpg',
    popular: false,
    description:
      'Prolific, vibrant red trumpet blossoms that attract butterflies. A timeless, joyful centerpiece for sunny balconies and terrace beds.',
    idealSpace: ['Garden', 'Home'],
    lightLevel: ['Bright'],
  },
  {
    id: 'dwarf-pomegranate',
    name: 'Dwarf Pomegranate',
    latin: "Punica granatum 'Nana'",
    category: 'Fruit Plants',
    price: 699,
    light: '4–6 hrs sunlight',
    water: 'Soak and dry',
    image: '/images/plants/pomegranate.jpg',
    popular: false,
    description:
      'Compact bush with fiery orange-red blossoms followed by miniature ruby pomegranates. Exceptional ornamental and fruiting specimen.',
    idealSpace: ['Garden', 'Home'],
    lightLevel: ['Bright'],
  },
  {
    id: 'calathea-peacock',
    name: 'Calathea Peacock',
    latin: 'Calathea makoyana',
    category: 'Fresh Feel',
    price: 599,
    light: 'Medium indirect shade',
    water: 'Twice a week',
    image: '/images/plants/calathea.jpg',
    popular: false,
    description:
      'Intricately patterned leaves resembling peacock feathers with deep purple undersides. Folds its leaves up at night in a quiet prayer motion.',
    idealSpace: ['Home', 'Office'],
    lightLevel: ['Low', 'Medium'],
  },
];

