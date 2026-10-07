export const RESTAURANT_INFO = {
  name: "Ember & Spice",
  tagline: "Crafted Fire. Authentic Flavor.",
  rating: 4.9,
  reviewsCount: 1420,
  phone: "+91 80 4968 2000",
  email: "concierge@emberandspice.com",
  address: "108 Charcoal Boulevard, Indiranagar 100ft Road, Bengaluru, Karnataka 560038",
  coordinates: { lat: 12.9716, lng: 77.5946 },
  hours: "12:00 PM – 11:30 PM (All Days)",
  dineInOpen: true,
  deliveryOpen: true,
  averagePrepTime: "25-30 mins",
  minimumOrder: 250,
  deliveryFee: 40,
  packagingFee: 30,
  taxRate: 0.05 // 5% GST
};

export const CATEGORIES = [
  { id: 'all', name: 'All Cravings', icon: 'Sparkles', count: 18 },
  { id: 'starters', name: 'Smoky Starters & Kebabs', icon: 'Flame', count: 4 },
  { id: 'main-course', name: 'Curries & Main Course', icon: 'Soup', count: 5 },
  { id: 'biryani-rice', name: 'Dum Biryanis & Rice', icon: 'Wheat', count: 3 },
  { id: 'breads', name: 'Tandoori Breads', icon: 'CircleDot', count: 3 },
  { id: 'desserts', name: 'Decadent Desserts', icon: 'Cake', count: 3 },
  { id: 'beverages', name: 'Artisan Beverages', icon: 'Coffee', count: 3 }
];

export const INITIAL_FOODS = [
  {
    id: "food_01",
    name: "Bhatti Da Murgh Tikka",
    category: "starters",
    price: 495,
    discountPrice: 445,
    isVeg: false,
    spiceLevel: "hot",
    rating: 4.9,
    reviewsCount: 312,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    prepTime: "20-25 mins",
    calories: "520 kcal",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    description: "Tender boneless chicken morsels steeped overnight in roasted mustard oil, pounded coriander seeds, and Kashmiri deghi chili, chargrilled over burning tandoor embers.",
    ingredients: ["Farm Fresh Chicken", "Mustard Oil", "Kashmiri Chili", "Hung Curd", "Kasturi Methi", "Charcoal Smoke"],
    allergens: ["Dairy"],
    nutritionalInfo: { protein: "42g", carbs: "8g", fat: "16g", fiber: "2g" },
    customizations: {
      portions: [
        { name: "Regular (6 Pcs)", priceDelta: 0 },
        { name: "Platter (10 Pcs)", priceDelta: 220 }
      ],
      addOns: [
        { name: "Mint & Raw Mango Chutney Dip", price: 40 },
        { name: "Pickled Sirka Onions", price: 30 },
        { name: "Extra Garlic Butter Glaze", price: 50 }
      ]
    }
  },
  {
    id: "food_02",
    name: "Paneer Angara Tikka",
    category: "starters",
    price: 425,
    discountPrice: 385,
    isVeg: true,
    spiceLevel: "medium",
    rating: 4.8,
    reviewsCount: 245,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    prepTime: "18-22 mins",
    calories: "460 kcal",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    description: "Malai paneer cubes marinated in smoked cloves, crushed peppercorn, and saffron yogurt, skewered with bell peppers and roasted on open fire.",
    ingredients: ["Fresh Cottage Cheese", "Smoked Cloves", "Greek Yogurt", "Bell Peppers", "Black Salt"],
    allergens: ["Dairy"],
    nutritionalInfo: { protein: "24g", carbs: "12g", fat: "22g", fiber: "4g" },
    customizations: {
      portions: [
        { name: "Regular (6 Pcs)", priceDelta: 0 },
        { name: "Sharing (10 Pcs)", priceDelta: 190 }
      ],
      addOns: [
        { name: "Extra Spiced Mint Dip", price: 40 },
        { name: "Grated Smoked Cheese", price: 60 }
      ]
    }
  },
  {
    id: "food_03",
    name: "Kurkuri Spiced Lotus Stem",
    category: "starters",
    price: 360,
    discountPrice: 320,
    isVeg: true,
    spiceLevel: "medium",
    rating: 4.7,
    reviewsCount: 160,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    prepTime: "15 mins",
    calories: "310 kcal",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
    description: "Crispy crisp-fried Himalayan lotus roots tossed with organic wildflower honey, crushed roasted cumin, and dried red chili flakes.",
    ingredients: ["Lotus Root", "Honey", "Crushed Cumin", "Dry Chili Flakes", "Sesame Seeds"],
    allergens: ["Sesame"],
    nutritionalInfo: { protein: "6g", carbs: "38g", fat: "9g", fiber: "6g" },
    customizations: {
      portions: [{ name: "Standard Bowl", priceDelta: 0 }],
      addOns: [{ name: "Roasted Sesame Dip", price: 45 }]
    }
  },
  {
    id: "food_04",
    name: "Galouti Kebab with Ulta Tawa Paratha",
    category: "starters",
    price: 580,
    discountPrice: 520,
    isVeg: false,
    spiceLevel: "mild",
    rating: 5.0,
    reviewsCount: 420,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    prepTime: "25 mins",
    calories: "620 kcal",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description: "Legendary Awadhi melt-in-mouth minced lamb patties infused with 32 secret royal spices and raw papaya, served atop buttery saffron inverted-griddle parathas.",
    ingredients: ["Minced Lamb", "Potli Masala", "Raw Papaya", "Ghee", "Rose Water", "Saffron Paratha"],
    allergens: ["Gluten", "Dairy", "Nuts"],
    nutritionalInfo: { protein: "38g", carbs: "28g", fat: "28g", fiber: "3g" },
    customizations: {
      portions: [
        { name: "2 Kebabs + 2 Parathas", priceDelta: 0 },
        { name: "4 Kebabs + 4 Parathas", priceDelta: 450 }
      ],
      addOns: [
        { name: "Extra Ulta Tawa Paratha", price: 65 },
        { name: "Walnut Mint Chutney", price: 45 }
      ]
    }
  },
  {
    id: "food_05",
    name: "Dal Bukhara Slow-Smoked 24H",
    category: "main-course",
    price: 440,
    discountPrice: 395,
    isVeg: true,
    spiceLevel: "mild",
    rating: 4.9,
    reviewsCount: 512,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    prepTime: "15 mins",
    calories: "480 kcal",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    description: "Whole black lentils and kidney beans simmered continuously over dying tandoor coals for 24 hours with vine-ripened tomatoes, fresh churned white butter, and gentle cream.",
    ingredients: ["Black Urad Dal", "White Farm Butter", "Organic Cream", "San Marzano Plum Tomatoes", "Fenugreek"],
    allergens: ["Dairy"],
    nutritionalInfo: { protein: "18g", carbs: "32g", fat: "22g", fiber: "9g" },
    customizations: {
      portions: [
        { name: "Handi (Serves 2)", priceDelta: 0 },
        { name: "Royal Pot (Serves 4)", priceDelta: 320 }
      ],
      addOns: [
        { name: "Dollop of White Cultured Butter", price: 35 },
        { name: "Side of Garlic Crisp Naan", price: 80 }
      ]
    }
  },
  {
    id: "food_06",
    name: "Murgh Makhani Royale (Butter Chicken)",
    category: "main-course",
    price: 540,
    discountPrice: 490,
    isVeg: false,
    spiceLevel: "medium",
    rating: 4.9,
    reviewsCount: 680,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    prepTime: "20 mins",
    calories: "680 kcal",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    description: "Smoky shredded tandoori chicken immersed in a velvety satin gravy of slow-stewed tomatoes, golden cashews, honey, and sun-dried organic fenugreek leaves.",
    ingredients: ["Tandoori Chicken", "Cashew Paste", "Tomato Puree", "Butter", "Honey", "Kasturi Methi"],
    allergens: ["Dairy", "Nuts"],
    nutritionalInfo: { protein: "46g", carbs: "19g", fat: "32g", fiber: "3g" },
    customizations: {
      portions: [
        { name: "Regular (Serves 2)", priceDelta: 0 },
        { name: "Large (Serves 3-4)", priceDelta: 380 }
      ],
      addOns: [
        { name: "Boneless Extra Chicken Pieces", price: 120 },
        { name: "Chili Honey Swirl", price: 30 }
      ]
    }
  },
  {
    id: "food_07",
    name: "Nalli Rogan Josh Awadhi Style",
    category: "main-course",
    price: 680,
    discountPrice: 620,
    isVeg: false,
    spiceLevel: "hot",
    rating: 4.9,
    reviewsCount: 290,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    prepTime: "25 mins",
    calories: "720 kcal",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    description: "Tender lamb shanks slow-braised with ratan jot (cockscomb flower), mace, dried ginger, and mountain saffron. Rich marrow essence that falls right off the bone.",
    ingredients: ["Slow Braised Lamb Shanks", "Ratan Jot Herb", "Kashmiri Mirch", "Fennel Powder", "Asafoetida", "Ghee"],
    allergens: ["Dairy"],
    nutritionalInfo: { protein: "52g", carbs: "10g", fat: "38g", fiber: "2g" },
    customizations: {
      portions: [{ name: "2 Large Shanks (Serves 2)", priceDelta: 0 }],
      addOns: [{ name: "Extra Bone Marrow Reduction", price: 90 }]
    }
  },
  {
    id: "food_08",
    name: "Paneer Khurchan Handi",
    category: "main-course",
    price: 450,
    discountPrice: 410,
    isVeg: true,
    spiceLevel: "medium",
    rating: 4.7,
    reviewsCount: 198,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    prepTime: "20 mins",
    calories: "490 kcal",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    description: "Cottage cheese strips wok-charred with tri-color sweet peppers, vine tomatoes, and toasted cumin seeds in a semi-dry tawa style gravy.",
    ingredients: ["Paneer Strips", "Bell Peppers", "Tomatoes", "Onions", "Coriander Seeds"],
    allergens: ["Dairy"],
    nutritionalInfo: { protein: "22g", carbs: "16g", fat: "24g", fiber: "5g" },
    customizations: {
      portions: [{ name: "Regular Bowl", priceDelta: 0 }],
      addOns: [{ name: "Extra Butter Roti (2 Pcs)", price: 60 }]
    }
  },
  {
    id: "food_09",
    name: "Dum Pukht Murgh Biryani",
    category: "biryani-rice",
    price: 520,
    discountPrice: 470,
    isVeg: false,
    spiceLevel: "medium",
    rating: 4.9,
    reviewsCount: 890,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    prepTime: "25 mins",
    calories: "710 kcal",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    description: "Aged long-grain Dehradun basmati rice and marinated spring chicken sealed in clay handis with whole spices, rose essence, saffron milk, and pure desi ghee.",
    ingredients: ["Aged Basmati", "Marinated Chicken", "Pure Cow Ghee", "Kashmiri Saffron", "Crispy Birista Onions", "Cardamom"],
    allergens: ["Dairy"],
    nutritionalInfo: { protein: "38g", carbs: "78g", fat: "22g", fiber: "4g" },
    customizations: {
      portions: [
        { name: "Single Handi (Serves 1-2)", priceDelta: 0 },
        { name: "Family Handi (Serves 3-4)", priceDelta: 440 }
      ],
      addOns: [
        { name: "Smoked Burani Garlic Raita", price: 45 },
        { name: "Salan Gravy Bowl", price: 40 },
        { name: "Tandoori Boiled Egg (2)", price: 40 }
      ]
    }
  },
  {
    id: "food_10",
    name: "Nizami Subz Tarkari Biryani",
    category: "biryani-rice",
    price: 430,
    discountPrice: 390,
    isVeg: true,
    spiceLevel: "medium",
    rating: 4.8,
    reviewsCount: 310,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    prepTime: "20 mins",
    calories: "540 kcal",
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=800&q=80",
    description: "Layered basmati rice with French beans, florets of cauliflower, baby carrots, and mint leaves slow cooked under dough seal on glowing coals.",
    ingredients: ["Basmati Rice", "Garden Vegetables", "Saffron Milk", "Mint Leaves", "Brown Onions"],
    allergens: ["Dairy"],
    nutritionalInfo: { protein: "14g", carbs: "76g", fat: "14g", fiber: "7g" },
    customizations: {
      portions: [{ name: "Handi (Serves 1-2)", priceDelta: 0 }],
      addOns: [{ name: "Cucumber Pomegranate Raita", price: 45 }]
    }
  },
  {
    id: "food_11",
    name: "Truffle Butter Garlic Naan",
    category: "breads",
    price: 160,
    discountPrice: 140,
    isVeg: true,
    spiceLevel: "mild",
    rating: 4.9,
    reviewsCount: 420,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    prepTime: "10 mins",
    calories: "280 kcal",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
    description: "Hand-stretched leavened tandoor bread blistered on volcanic stones, generously coated with white truffle-infused churned butter and crispy golden garlic flakes.",
    ingredients: ["Refined Wheat Flour", "White Truffle Butter", "Crushed Garlic", "Coriander Sprigs"],
    allergens: ["Gluten", "Dairy"],
    nutritionalInfo: { protein: "7g", carbs: "38g", fat: "11g", fiber: "2g" },
    customizations: {
      portions: [{ name: "1 Full Naan", priceDelta: 0 }],
      addOns: [{ name: "Extra Truffle Glaze", price: 40 }]
    }
  },
  {
    id: "food_12",
    name: "Amritsari Chur-Chur Naan Basket",
    category: "breads",
    price: 210,
    discountPrice: 190,
    isVeg: true,
    spiceLevel: "medium",
    rating: 4.8,
    reviewsCount: 230,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    prepTime: "12 mins",
    calories: "340 kcal",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    description: "Flaky multilayered tandoori flatbread crushed by hand with spiced potato, paneer, and ajwain, served with spicy green chili chutney.",
    ingredients: ["Spiced Mash", "Flaky Dough", "Desi Ghee", "Ajwain Seeds"],
    allergens: ["Gluten", "Dairy"],
    nutritionalInfo: { protein: "9g", carbs: "44g", fat: "14g", fiber: "3g" },
    customizations: {
      portions: [{ name: "Basket of 2 Naans", priceDelta: 0 }],
      addOns: [{ name: "Bowl of Pindi Chole", price: 75 }]
    }
  },
  {
    id: "food_13",
    name: "Baked Saffron Gulab Jamun Tart",
    category: "desserts",
    price: 320,
    discountPrice: 280,
    isVeg: true,
    spiceLevel: "mild",
    rating: 5.0,
    reviewsCount: 380,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    prepTime: "15 mins",
    calories: "420 kcal",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    description: "Warm cardamom-infused gulab jamuns baked inside a crisp almond-flour pastry shell, crowned with pistachio rabdi cream and 24K edible gold leaf.",
    ingredients: ["Khoya Gulab Jamun", "Almond Tart Crust", "Saffron Rabdi", "Pistachio Slivers", "Edible Gold"],
    allergens: ["Dairy", "Nuts", "Gluten"],
    nutritionalInfo: { protein: "8g", carbs: "46g", fat: "18g", fiber: "2g" },
    customizations: {
      portions: [{ name: "Individual Tart (2 Pcs)", priceDelta: 0 }],
      addOns: [{ name: "Scoop of Tahitian Vanilla Gelato", price: 75 }]
    }
  },
  {
    id: "food_14",
    name: "Kesari Rasmalai Tres Leches",
    category: "desserts",
    price: 340,
    discountPrice: 295,
    isVeg: true,
    spiceLevel: "mild",
    rating: 4.9,
    reviewsCount: 290,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    prepTime: "10 mins",
    calories: "390 kcal",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    description: "Light chiffon cake soaked in a trio of saffron evaporated milk, sweetened condensed milk, and fresh cream, layered with soft cottage cheese dumplings.",
    ingredients: ["Spongy Chenna Dumplings", "Saffron Milk Trio", "Cardamom Cream", "Toasted Almonds"],
    allergens: ["Dairy", "Nuts", "Gluten"],
    nutritionalInfo: { protein: "10g", carbs: "48g", fat: "16g", fiber: "1g" },
    customizations: {
      portions: [{ name: "Signature Glass Jar", priceDelta: 0 }],
      addOns: [{ name: "Extra Saffron Milk Drizzle", price: 40 }]
    }
  },
  {
    id: "food_15",
    name: "Smoked Rooh Afza Botanical Mojito",
    category: "beverages",
    price: 240,
    discountPrice: 210,
    isVeg: true,
    spiceLevel: "mild",
    rating: 4.8,
    reviewsCount: 195,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    prepTime: "8 mins",
    calories: "140 kcal",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    description: "Reimagined heritage rose cordial muddled with fresh garden mint, Persian lime juice, club soda, and finished with a fragrant smoking cinnamon quill.",
    ingredients: ["Rose Cordial", "Fresh Spearmint", "Lime Juice", "Soda", "Smoked Cinnamon"],
    allergens: [],
    nutritionalInfo: { protein: "0g", carbs: "32g", fat: "0g", fiber: "1g" },
    customizations: {
      portions: [{ name: "Tall Highball Glass", priceDelta: 0 }],
      addOns: [{ name: "Chia Seeds Infusion", price: 25 }]
    }
  },
  {
    id: "food_16",
    name: "Royal Kesar Pista Matka Lassi",
    category: "beverages",
    price: 220,
    discountPrice: 190,
    isVeg: true,
    spiceLevel: "mild",
    rating: 4.9,
    reviewsCount: 310,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    prepTime: "8 mins",
    calories: "290 kcal",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    description: "Hand-churned whole buffalo milk yogurt infused with Kashmiri saffron threads, cardamom powder, and crushed Iranian pistachios served in an unglazed terracotta pot.",
    ingredients: ["Whole Milk Curd", "Kashmiri Saffron", "Cardamom", "Iranian Pistachios", "Thick Clotted Cream"],
    allergens: ["Dairy", "Nuts"],
    nutritionalInfo: { protein: "11g", carbs: "34g", fat: "12g", fiber: "1g" },
    customizations: {
      portions: [{ name: "Terracotta Pot (350ml)", priceDelta: 0 }],
      addOns: [{ name: "Extra Malai Clot", price: 30 }]
    }
  }
];

export const INITIAL_TABLES = [
  { id: 'T-01', name: 'Window Garden 1', capacity: 2, section: 'Window Corner', status: 'available', coords: { x: 15, y: 20 } },
  { id: 'T-02', name: 'Window Garden 2', capacity: 4, section: 'Window Corner', status: 'reserved', coords: { x: 45, y: 20 } },
  { id: 'T-03', name: 'Center Grand 3', capacity: 6, section: 'Main Dining Hall', status: 'occupied', coords: { x: 75, y: 20 } },
  { id: 'T-04', name: 'Royal Booth 4', capacity: 4, section: 'Main Dining Hall', status: 'available', coords: { x: 15, y: 55 } },
  { id: 'T-05', name: 'Bar Lounge 5', capacity: 2, section: 'Cocktail & Tandoor Bar', status: 'available', coords: { x: 45, y: 55 } },
  { id: 'T-06', name: 'Bar Lounge 6', capacity: 2, section: 'Cocktail & Tandoor Bar', status: 'occupied', coords: { x: 75, y: 55 } },
  { id: 'T-07', name: 'Patio Firepit 7', capacity: 8, section: 'Outdoor Terrace', status: 'available', coords: { x: 45, y: 85 } }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-9421",
    orderNumber: "ORD-9421",
    customer: {
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      phone: "+91 98765 43210"
    },
    orderType: "delivery",
    status: "preparing", // placed, confirmed, preparing, ready, out_for_delivery, delivered
    items: [
      {
        foodId: "food_09",
        name: "Dum Pukht Murgh Biryani",
        quantity: 2,
        portion: "Single Handi (Serves 1-2)",
        spiceLevel: "medium",
        addOns: ["Smoked Burani Garlic Raita"],
        unitPrice: 470,
        totalPrice: 940
      },
      {
        foodId: "food_05",
        name: "Dal Bukhara Slow-Smoked 24H",
        quantity: 1,
        portion: "Handi (Serves 2)",
        spiceLevel: "mild",
        addOns: ["Dollop of White Cultured Butter"],
        unitPrice: 395,
        totalPrice: 395
      },
      {
        foodId: "food_11",
        name: "Truffle Butter Garlic Naan",
        quantity: 3,
        portion: "1 Full Naan",
        spiceLevel: "mild",
        addOns: [],
        unitPrice: 140,
        totalPrice: 420
      }
    ],
    pricing: {
      subtotal: 1755,
      discount: 200,
      couponCode: "EMBERROYAL",
      tax: 77.75,
      packagingFee: 30,
      deliveryFee: 40,
      total: 1702.75
    },
    deliveryAddress: {
      label: "Home",
      street: "Flat 402, Embassy Habitat, 80ft Road",
      city: "Indiranagar, Bengaluru",
      pincode: "560038"
    },
    paymentMethod: "UPI",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 mins ago
    estimatedDeliveryTime: "15-20 mins"
  },
  {
    id: "ORD-8812",
    orderNumber: "ORD-8812",
    customer: {
      name: "Meera Krishnan",
      email: "meera.k@outlook.com",
      phone: "+91 91234 56789"
    },
    orderType: "dine-in",
    tableId: "T-03",
    status: "ready",
    items: [
      {
        foodId: "food_01",
        name: "Bhatti Da Murgh Tikka",
        quantity: 1,
        portion: "Regular (6 Pcs)",
        spiceLevel: "hot",
        addOns: ["Mint & Raw Mango Chutney Dip"],
        unitPrice: 445,
        totalPrice: 445
      },
      {
        foodId: "food_15",
        name: "Smoked Rooh Afza Botanical Mojito",
        quantity: 2,
        portion: "Tall Highball Glass",
        spiceLevel: "mild",
        addOns: [],
        unitPrice: 210,
        totalPrice: 420
      }
    ],
    pricing: {
      subtotal: 865,
      discount: 0,
      couponCode: "",
      tax: 43.25,
      packagingFee: 0,
      deliveryFee: 0,
      total: 908.25
    },
    paymentMethod: "CARD",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: "Ready to serve at Table T-03"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "BKG-301",
    bookingNumber: "BKG-301",
    customerName: "Siddharth Rao",
    customerEmail: "siddharth@gmail.com",
    customerPhone: "+91 99001 22334",
    tableId: "T-02",
    tableName: "Window Garden 2",
    guests: 4,
    date: "2026-10-02",
    time: "20:00",
    occasion: "Anniversary Celebration",
    specialRequest: "Quiet table with candlelight and flower arrangement if possible.",
    status: "confirmed",
    createdAt: "2026-09-29T10:00:00.000Z"
  },
  {
    id: "BKG-302",
    bookingNumber: "BKG-302",
    customerName: "Dr. Ananya Sen",
    customerEmail: "ananya.sen@hospital.org",
    customerPhone: "+91 98450 11223",
    tableId: "T-07",
    tableName: "Patio Firepit 7",
    guests: 8,
    date: "2026-10-03",
    time: "19:30",
    occasion: "Team Dinner",
    specialRequest: "Need space for birthday cake presentation.",
    status: "confirmed",
    createdAt: "2026-09-29T14:30:00.000Z"
  }
];

export const INITIAL_OFFERS = [
  {
    code: "EMBERFIRST",
    title: "Welcome Feast Special",
    discount: "20% OFF",
    percentage: 20,
    minOrder: 400,
    maxDiscount: 150,
    validUntil: "2026-12-31",
    description: "Get 20% off up to ₹150 on your first culinary order."
  },
  {
    code: "EMBERROYAL",
    title: "Royal Grand Treat",
    discount: "₹200 FLAT",
    percentage: 0,
    flatDiscount: 200,
    minOrder: 1200,
    maxDiscount: 200,
    validUntil: "2026-11-30",
    description: "Flat ₹200 off on gourmet orders above ₹1,200."
  },
  {
    code: "TASTEFEST",
    title: "Midweek Charcoal Craving",
    discount: "15% OFF",
    percentage: 15,
    minOrder: 600,
    maxDiscount: 120,
    validUntil: "2026-10-15",
    description: "Special 15% discount on all starters & biryanis."
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: "cust_1",
    name: "Aarav Sharma",
    email: "customer@demo.com",
    phone: "+91 98765 43210",
    ordersCount: 14,
    totalSpent: 18450,
    lastOrderDate: "Today",
    status: "active"
  },
  {
    id: "cust_2",
    name: "Meera Krishnan",
    email: "meera.k@outlook.com",
    phone: "+91 91234 56789",
    ordersCount: 8,
    totalSpent: 9240,
    lastOrderDate: "Yesterday",
    status: "active"
  },
  {
    id: "cust_3",
    name: "Vikramaditya Roy",
    email: "vikram.roy@fintech.io",
    phone: "+91 98110 54321",
    ordersCount: 22,
    totalSpent: 34100,
    lastOrderDate: "3 days ago",
    status: "vip"
  }
];

export const INITIAL_STAFF = [
  { id: "stf_1", name: "Chef Harpal Soni", role: "Head Chef", station: "Tandoor & Dum Pukht", phone: "+91 98200 11001", status: "on-duty" },
  { id: "stf_2", name: "Rajesh Varma", role: "Restaurant Captain", station: "Dining Hall & Tables", phone: "+91 98200 11002", status: "on-duty" },
  { id: "stf_3", name: "Simran Kaur", role: "Cashier & Hostess", station: "Front Reception", phone: "+91 98200 11003", status: "on-duty" },
  { id: "stf_4", name: "Ramesh Yadav", role: "Senior Kitchen Steward", station: "Prep & Plating", phone: "+91 98200 11004", status: "break" }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev_1",
    foodId: "food_09",
    userName: "Rohan Kapoor",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "2 days ago",
    comment: "The Dum Pukht Biryani has real artisanal saffron aroma. Meat was succulent and perfectly layered. Absolutely world-class!",
    likes: 24
  },
  {
    id: "rev_2",
    foodId: "food_05",
    userName: "Divya Balan",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "1 week ago",
    comment: "Hands down the best Dal Bukhara in Bangalore. Creamy without being overwhelmingly oily, paired heavenly with the Truffle Butter Naan.",
    likes: 41
  },
  {
    id: "rev_3",
    foodId: "food_04",
    userName: "Farhan Zaidi",
    userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: "3 weeks ago",
    comment: "The Galouti kebabs melt on the tongue like silk. Authentic Lucknow taste preserved so nicely!",
    likes: 19
  }
];

export const INITIAL_INVENTORY = [
  { id: "inv_1", name: "Dehradun Aged Basmati", stock: "140 kg", status: "in-stock", unit: "kg", minThreshold: 30 },
  { id: "inv_2", name: "Kashmiri Mongra Saffron", stock: "450 g", status: "in-stock", unit: "g", minThreshold: 100 },
  { id: "inv_3", name: "Organic Malai Paneer", stock: "18 kg", status: "low-stock", unit: "kg", minThreshold: 20 },
  { id: "inv_4", name: "Spring Farm Chicken", stock: "65 kg", status: "in-stock", unit: "kg", minThreshold: 25 },
  { id: "inv_5", name: "White Truffle Butter", stock: "4 kg", status: "low-stock", unit: "kg", minThreshold: 5 },
  { id: "inv_6", name: "Black Urad Lentils", stock: "90 kg", status: "in-stock", unit: "kg", minThreshold: 20 }
];
