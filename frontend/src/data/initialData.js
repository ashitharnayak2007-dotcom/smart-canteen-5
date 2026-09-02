// Complete initial seed data for Smart Canteen (Team AURIX NEXUS)

export const INITIAL_MENU = [
  {
    id: 'food_1',
    name: 'Masala Dosa',
    category: 'South Indian',
    price: 45,
    prepTime: '6 mins',
    available: true,
    rating: 4.8,
    calories: '280 kcal',
    image: '🥞',
    isVeg: true,
    description: 'Crispy golden crepe filled with aromatic spiced potato masala, served with freshly grated coconut chutney and piping hot lentil sambar.',
    tag: 'Bestseller'
  },
  {
    id: 'food_2',
    name: 'Veg Rice Combo',
    category: 'Meals',
    price: 70,
    prepTime: '4 mins',
    available: true,
    rating: 4.6,
    calories: '420 kcal',
    image: '🍛',
    isVeg: true,
    description: 'Steamed basmati rice accompanied by flavorful dal tadka, homestyle mixed vegetable curry, crunchy papad, and fresh curd.',
    tag: 'Popular Lunch'
  },
  {
    id: 'food_3',
    name: 'Veg Hakka Noodles',
    category: 'Chinese',
    price: 60,
    prepTime: '8 mins',
    available: true,
    rating: 4.7,
    calories: '350 kcal',
    image: '🍜',
    isVeg: true,
    description: 'Wok-tossed noodles loaded with crisp shredded cabbage, colorful bell peppers, tender carrots, and authentic soy-garlic seasoning.',
    tag: 'Student Favorite'
  },
  {
    id: 'food_4',
    name: 'Idli (2 Pcs) with Sambar',
    category: 'South Indian',
    price: 30,
    prepTime: '2 mins',
    available: true,
    rating: 4.9,
    calories: '160 kcal',
    image: '⚪',
    isVeg: true,
    description: 'Ultra-soft, melt-in-mouth steamed fermented rice cakes served with aromatic vegetable sambar and mint chutney.',
    tag: 'Quick Pickup'
  },
  {
    id: 'food_5',
    name: 'Crispy Medu Vada (1 Pc)',
    category: 'Snacks',
    price: 25,
    prepTime: '3 mins',
    available: true,
    rating: 4.5,
    calories: '190 kcal',
    image: '🍩',
    isVeg: true,
    description: 'Golden-fried lentil doughnut with a crunchy exterior and fluffy interior, seasoned with black pepper, curry leaves, and green chillies.',
    tag: 'Snack'
  },
  {
    id: 'food_6',
    name: 'Tangy Lemon Rice',
    category: 'Rice Items',
    price: 50,
    prepTime: '4 mins',
    available: true,
    rating: 4.6,
    calories: '310 kcal',
    image: '🍋',
    isVeg: true,
    description: 'Tempered rice infused with fresh lemon juice, crunchy roasted peanuts, mustard seeds, curry leaves, and turmeric.',
    tag: 'Light Meal'
  },
  {
    id: 'food_7',
    name: 'Paneer Butter Masala Roll',
    category: 'Snacks',
    price: 65,
    prepTime: '7 mins',
    available: true,
    rating: 4.8,
    calories: '390 kcal',
    image: '🌯',
    isVeg: true,
    description: 'Flaky whole-wheat paratha rolled around rich paneer butter masala, sliced red onions, and tangy mint mayo.',
    tag: 'Special'
  },
  {
    id: 'food_8',
    name: 'Cold Filter Coffee',
    category: 'Beverages',
    price: 30,
    prepTime: '2 mins',
    available: true,
    rating: 4.9,
    calories: '140 kcal',
    image: '☕',
    isVeg: true,
    description: 'Classic South Indian chicory-infused filter coffee decoction, blended with chilled milk and served frothy over ice.',
    tag: 'Beverage'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'SC-1024',
    studentName: 'Ashitha R',
    studentId: 'CS402',
    items: [
      { id: 'food_1', name: 'Masala Dosa', price: 45, qty: 1 },
      { id: 'food_3', name: 'Veg Hakka Noodles', price: 60, qty: 1 }
    ],
    totalAmount: 105,
    pickupSlot: '12:45 PM - 01:00 PM',
    status: 'READY',
    orderTime: '12:32 PM',
    estimatedWait: '0 mins (Ready)',
    tokenNumber: 24,
    counter: 'Counter 2',
    instructions: 'Extra coconut chutney please'
  },
  {
    id: 'SC-1025',
    studentName: 'Harshit Reddy',
    studentId: 'EC201',
    items: [
      { id: 'food_2', name: 'Veg Rice Combo', price: 70, qty: 2 }
    ],
    totalAmount: 140,
    pickupSlot: '12:45 PM - 01:00 PM',
    status: 'COOKING',
    orderTime: '12:36 PM',
    estimatedWait: '4 mins',
    tokenNumber: 25,
    counter: 'Counter 1',
    instructions: ''
  },
  {
    id: 'SC-1026',
    studentName: 'Punya K M',
    studentId: 'IS304',
    items: [
      { id: 'food_4', name: 'Idli (2 Pcs) with Sambar', price: 30, qty: 2 },
      { id: 'food_5', name: 'Crispy Medu Vada (1 Pc)', price: 25, qty: 1 }
    ],
    totalAmount: 85,
    pickupSlot: '01:00 PM - 01:15 PM',
    status: 'PLACED',
    orderTime: '12:40 PM',
    estimatedWait: '12 mins',
    tokenNumber: 26,
    counter: 'Counter 2',
    instructions: 'Hot sambar in separate cup'
  },
  {
    id: 'SC-1027',
    studentName: 'Harini R',
    studentId: 'AI105',
    items: [
      { id: 'food_6', name: 'Tangy Lemon Rice', price: 50, qty: 1 },
      { id: 'food_8', name: 'Cold Filter Coffee', price: 30, qty: 1 }
    ],
    totalAmount: 80,
    pickupSlot: '01:00 PM - 01:15 PM',
    status: 'PLACED',
    orderTime: '12:42 PM',
    estimatedWait: '14 mins',
    tokenNumber: 27,
    counter: 'Counter 1',
    instructions: 'No ice in coffee'
  }
];

export const INITIAL_INVENTORY = [
  { id: 'inv_1', name: 'Dosa Batter', stock: 4.2, unit: 'kg', minThreshold: 5.0, status: 'LOW' },
  { id: 'inv_2', name: 'Basmati Rice', stock: 24.0, unit: 'kg', minThreshold: 10.0, status: 'OK' },
  { id: 'inv_3', name: 'Cooking Oil', stock: 2.5, unit: 'L', minThreshold: 5.0, status: 'LOW' },
  { id: 'inv_4', name: 'Potatoes & Onions', stock: 18.5, unit: 'kg', minThreshold: 8.0, status: 'OK' },
  { id: 'inv_5', name: 'Hakka Noodles Packets', stock: 32.0, unit: 'packs', minThreshold: 15.0, status: 'OK' },
  { id: 'inv_6', name: 'Fresh Vegetables', stock: 14.0, unit: 'kg', minThreshold: 6.0, status: 'OK' },
  { id: 'inv_7', name: 'Paneer Cubes', stock: 6.5, unit: 'kg', minThreshold: 3.0, status: 'OK' },
  { id: 'inv_8', name: 'Filter Coffee Powder', stock: 3.8, unit: 'kg', minThreshold: 2.0, status: 'OK' }
];

export const INITIAL_WASTAGE = [
  { id: 'w_1', item: 'Veg Rice Combo', quantity: 2.4, unit: 'kg', reason: 'Post-lunch overproduction', date: '2026-08-31', costLost: 240 },
  { id: 'w_2', item: 'Sambar & Chutney', quantity: 1.8, unit: 'kg', reason: 'Exceeded safe holding time', date: '2026-08-31', costLost: 120 },
  { id: 'w_3', item: 'Veg Hakka Noodles', quantity: 0.9, unit: 'kg', reason: 'Batch overcooked', date: '2026-08-30', costLost: 110 },
  { id: 'w_4', item: 'Medu Vada Batter', quantity: 0.6, unit: 'kg', reason: 'Surplus batter souring', date: '2026-08-30', costLost: 65 }
];

export const ML_FORECAST_DATA = {
  Monday: {
    total: 352,
    predictions: [
      { item: 'Masala Dosa', target: 83, baseline: 72, factor: '+15% (Mon Peak)' },
      { item: 'Veg Rice Combo', target: 74, baseline: 64, factor: '+15% (Lunch Surge)' },
      { item: 'Veg Hakka Noodles', target: 57, baseline: 50, factor: '+14% (Evening Rush)' },
      { item: 'Idli (2 Pcs)', target: 52, baseline: 45, factor: '+15% (Morning Batch)' },
      { item: 'Crispy Medu Vada', target: 46, baseline: 40, factor: '+15% (Break Snacks)' },
      { item: 'Tangy Lemon Rice', target: 40, baseline: 35, factor: '+14% (Light Option)' }
    ],
    confidence: '94.2%',
    insight: 'Highest student attendance on Mondays. Recommend 2 cooking split shifts (11:30 AM & 12:45 PM).'
  },
  Tuesday: {
    total: 306,
    predictions: [
      { item: 'Masala Dosa', target: 72, baseline: 72, factor: 'Standard' },
      { item: 'Veg Rice Combo', target: 64, baseline: 64, factor: 'Standard' },
      { item: 'Veg Hakka Noodles', target: 50, baseline: 50, factor: 'Standard' },
      { item: 'Idli (2 Pcs)', target: 45, baseline: 45, factor: 'Standard' },
      { item: 'Crispy Medu Vada', target: 40, baseline: 40, factor: 'Standard' },
      { item: 'Tangy Lemon Rice', target: 35, baseline: 35, factor: 'Standard' }
    ],
    confidence: '92.8%',
    insight: 'Steady mid-week demand expected across all 6 campus food counters.'
  },
  Friday: {
    total: 375,
    predictions: [
      { item: 'Masala Dosa', target: 90, baseline: 72, factor: '+25% (Weekend Eve)' },
      { item: 'Veg Rice Combo', target: 78, baseline: 64, factor: '+22% (Heavy Lunch)' },
      { item: 'Veg Hakka Noodles', target: 65, baseline: 50, factor: '+30% (Snacks Peak)' },
      { item: 'Idli (2 Pcs)', target: 50, baseline: 45, factor: '+11% (Morning)' },
      { item: 'Crispy Medu Vada', target: 48, baseline: 40, factor: '+20% (Evening)' },
      { item: 'Tangy Lemon Rice', target: 44, baseline: 35, factor: '+25% (Quick Grab)' }
    ],
    confidence: '95.1%',
    insight: 'High demand for Chinese and fast snacks ahead of weekend events.'
  }
};

export const PICKUP_SLOTS = [
  '12:15 PM - 12:30 PM',
  '12:30 PM - 12:45 PM',
  '12:45 PM - 01:00 PM',
  '01:00 PM - 01:15 PM',
  '01:15 PM - 01:30 PM',
  '01:30 PM - 01:45 PM',
  '01:45 PM - 02:00 PM'
];

export const COUPONS = {
  'CAMPUSFRESH': { discount: 15, type: 'flat', minOrder: 60, desc: '₹15 off on orders above ₹60' },
  'FIRSTBITE': { discount: 10, type: 'percentage', minOrder: 50, desc: '10% off for new campus orders' },
  'AURIX100': { discount: 25, type: 'flat', minOrder: 100, desc: '₹25 off for Team AURIX celebration' }
};

export const GENIE_KNOWLEDGE_BASE = [
  {
    keywords: ['masala dosa', 'dosa', 'prepare tomorrow', 'how many dosa'],
    answer: "Based on Databricks Lakehouse temporal forecasting, you should prepare **78 to 83 Masala Dosas** tomorrow. Peak demand occurs in the 12:45 PM – 1:15 PM slot."
  },
  {
    keywords: ['wastage', 'waste', 'highest waste', 'food waste'],
    answer: "Databricks SQL analysis shows **Veg Rice Combo** had the highest historical food waste (3.2 kg last week) due to single-batch overproduction. Splitting preparation into two batches (12:00 PM & 1:00 PM) is recommended."
  },
  {
    keywords: ['busiest', 'peak', 'lunch hour', 'rush'],
    answer: "The busiest campus window is **01:00 PM – 01:30 PM** with 114 pre-orders (36% of daily lunch traffic). Preparing batch items 15 minutes prior to 1:00 PM is strongly recommended."
  },
  {
    keywords: ['friday', 'fridays', 'popular on friday'],
    answer: "On Fridays, **Veg Hakka Noodles** (+30% demand) and **Crispy Medu Vada** are the most popular items. Fast snacks demand peaks between 3:30 PM and 5:00 PM."
  },
  {
    keywords: ['rice', 'stock', 'how much rice', 'inventory'],
    answer: "You currently have 24.0 kg of Basmati Rice in stock. Tomorrow's projected usage is **14.2 kg**, meaning current inventory is safe with no immediate restock required."
  }
];
