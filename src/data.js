// Sample catalogue for the demo. Prices are illustrative.
export const CATEGORIES = [
  { id: 'snacks', name: 'Snacks & Namkeen', emoji: '🍿', tint: '#FFF4D6' },
  { id: 'biscuits', name: 'Biscuits', emoji: '🍪', tint: '#FDEBD8' },
  { id: 'dairy', name: 'Dairy & Breakfast', emoji: '🥛', tint: '#E7F0FB' },
  { id: 'instant', name: 'Instant Food', emoji: '🍜', tint: '#FFF0E0' },
  { id: 'beverages', name: 'Beverages', emoji: '🥤', tint: '#FCE7E7' },
  { id: 'household', name: 'Household Essentials', emoji: '🧴', tint: '#E8F4F1' },
]

// art: shape + colours used by <PackArt/> to draw a stylised pack
export const PRODUCTS = [
  // Snacks & Namkeen
  { id: 'lays', cat: 'snacks', name: "Lay's Classic Salted", unit: '52 g', price: 20, eta: 22,
    art: { shape: 'pillow', bg: '#FFD21F', bg2: '#F5B800', fg: '#D52B1E', text: "Lay's", sub: 'CLASSIC SALTED', badge: '#D52B1E' } },
  { id: 'bhujia', cat: 'snacks', name: "Haldiram's Aloo Bhujia", unit: '200 g', price: 55, mrp: 60, eta: 22,
    art: { shape: 'pillow', bg: '#C8102E', bg2: '#9E0B22', fg: '#FFD34E', text: 'Aloo', text2: 'Bhujia', sub: "HALDIRAM'S" } },
  { id: 'kurkure', cat: 'snacks', name: 'Kurkure Masala Munch', unit: '82 g', price: 20, eta: 22,
    art: { shape: 'pillow', bg: '#F57F17', bg2: '#E65100', fg: '#FFF3C4', text: 'Kurkure', sub: 'MASALA MUNCH' } },

  // Biscuits
  { id: 'parleg', cat: 'biscuits', name: 'Parle-G Original Gluco Biscuits', unit: '70 g', price: 10, eta: 20,
    art: { shape: 'wrapper', bg: '#F7D417', bg2: '#E9BF00', fg: '#D7261E', text: 'Parle-G', sub: 'ORIGINAL GLUCO', face: true } },
  { id: 'goodday', cat: 'biscuits', name: 'Britannia Good Day Cashew', unit: '100 g', price: 20, eta: 20,
    art: { shape: 'wrapper', bg: '#F59A1B', bg2: '#E07C00', fg: '#7A1F12', text: 'Good Day', sub: 'CASHEW COOKIES', dots: true } },
  { id: 'monaco', cat: 'biscuits', name: 'Parle Monaco Classic', unit: '75 g', price: 10, eta: 20,
    art: { shape: 'wrapper', bg: '#1E4FA3', bg2: '#163C80', fg: '#FFFFFF', text: 'Monaco', sub: 'SALTED CRACKERS' } },

  // Dairy & Breakfast
  { id: 'amulmilk', cat: 'dairy', name: 'Amul Taaza Toned Milk', unit: '500 ml', price: 28, eta: 18,
    art: { shape: 'pouch', bg: '#F4F8FF', bg2: '#D9E6F7', fg: '#1D56A5', text: 'Amul', text2: 'Taaza', sub: 'TONED MILK' } },
  { id: 'amulbutter', cat: 'dairy', name: 'Amul Pasteurised Butter', unit: '100 g', price: 58, eta: 18,
    art: { shape: 'box', bg: '#FFE15A', bg2: '#E9C430', fg: '#1D56A5', text: 'Amul', text2: 'Butter', sub: 'UTTERLY BUTTERLY' } },
  { id: 'bread', cat: 'dairy', name: 'Britannia Milk Bread', unit: '400 g', price: 45, eta: 18,
    art: { shape: 'loaf', bg: '#FFFFFF', bg2: '#E8D3A8', fg: '#C8102E', text: 'Milk', text2: 'Bread', sub: 'BRITANNIA' } },

  // Instant Food
  { id: 'maggi', cat: 'instant', name: 'Maggi 2-Minute Masala Noodles', unit: '70 g', price: 14, eta: 20,
    art: { shape: 'pillow', bg: '#FFD200', bg2: '#F2B705', fg: '#D7261E', text: 'MAGGI', sub: '2-MINUTE NOODLES', noodles: true } },
  { id: 'yippee', cat: 'instant', name: 'Sunfeast YiPPee! Magic Masala', unit: '65 g', price: 15, eta: 20,
    art: { shape: 'pillow', bg: '#FF8A00', bg2: '#E86F00', fg: '#3B0A6B', text: 'YiPPee!', sub: 'MAGIC MASALA', noodles: true } },
  { id: 'poha', cat: 'instant', name: 'MTR Instant Poha', unit: '160 g', price: 60, eta: 20,
    art: { shape: 'box', bg: '#F2E3B3', bg2: '#D9C68C', fg: '#B3261E', text: 'MTR', text2: 'Poha', sub: 'READY IN 3 MIN' } },

  // Beverages
  { id: 'coke', cat: 'beverages', name: 'Coca-Cola Soft Drink', unit: '750 ml', price: 40, eta: 22,
    art: { shape: 'bottle', bg: '#E41E2B', bg2: '#3B1A10', fg: '#FFFFFF', text: 'Coca-Cola' } },
  { id: 'frooti', cat: 'beverages', name: 'Frooti Mango Drink', unit: '160 ml', price: 15, eta: 22,
    art: { shape: 'tetra', bg: '#2FA84F', bg2: '#1E7F39', fg: '#FFD400', text: 'Frooti', sub: 'MANGO', mango: true } },
  { id: 'tatatea', cat: 'beverages', name: 'Tata Tea Premium', unit: '250 g', price: 155, mrp: 165, eta: 22,
    art: { shape: 'box', bg: '#B5121B', bg2: '#8A0D14', fg: '#F7D774', text: 'TATA', text2: 'TEA', sub: 'PREMIUM' } },

  // Household Essentials
  { id: 'tatasalt', cat: 'household', name: 'Tata Salt Iodised', unit: '1 kg', price: 28, eta: 20,
    art: { shape: 'tall', bg: '#FFFFFF', bg2: '#E5ECF5', fg: '#1D3F8F', text: 'TATA', text2: 'SALT', sub: 'VACUUM EVAPORATED', stripe: '#D7261E' } },
  { id: 'surf', cat: 'household', name: 'Surf Excel Easy Wash Detergent', unit: '500 g', price: 65, eta: 20,
    art: { shape: 'tall', bg: '#1F5FBF', bg2: '#174A96', fg: '#FFFFFF', text: 'Surf', text2: 'excel', sub: 'EASY WASH', stripe: '#F5C400' } },
  { id: 'vim', cat: 'household', name: 'Vim Dishwash Bar', unit: '155 g', price: 15, eta: 20,
    art: { shape: 'bar', bg: '#7CC242', bg2: '#5A9E2A', fg: '#FFFFFF', text: 'Vim', sub: 'LEMON', accent: '#FFE600' } },
  { id: 'lifebuoy', cat: 'household', name: 'Lifebuoy Total 10 Soap', unit: '100 g', price: 36, eta: 20,
    art: { shape: 'bar', bg: '#E2231A', bg2: '#B51A13', fg: '#FFFFFF', text: 'Lifebuoy', sub: 'TOTAL 10', accent: '#FFFFFF' } },
]

export const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))

export const DELIVERY_FEE = 25
export const FREE_DELIVERY_ABOVE = 199
