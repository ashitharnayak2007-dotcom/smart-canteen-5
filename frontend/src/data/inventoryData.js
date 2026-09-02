// DEMO DATA — Inventory
export const INVENTORY_ITEMS = [
  { id: 'INV001', ingredient: 'Rice (Raw)',    quantity: 25, unit: 'kg',  minLevel: 10, maxLevel: 50, category: 'Grains' },
  { id: 'INV002', ingredient: 'Urad Dal',      quantity: 4,  unit: 'kg',  minLevel: 5,  maxLevel: 20, category: 'Pulses' },
  { id: 'INV003', ingredient: 'Toor Dal',      quantity: 8,  unit: 'kg',  minLevel: 5,  maxLevel: 20, category: 'Pulses' },
  { id: 'INV004', ingredient: 'Potatoes',      quantity: 12, unit: 'kg',  minLevel: 5,  maxLevel: 30, category: 'Vegetables' },
  { id: 'INV005', ingredient: 'Onions',        quantity: 3,  unit: 'kg',  minLevel: 5,  maxLevel: 25, category: 'Vegetables' },
  { id: 'INV006', ingredient: 'Tomatoes',      quantity: 6,  unit: 'kg',  minLevel: 4,  maxLevel: 20, category: 'Vegetables' },
  { id: 'INV007', ingredient: 'Cooking Oil',   quantity: 5,  unit: 'L',   minLevel: 3,  maxLevel: 15, category: 'Oils' },
  { id: 'INV008', ingredient: 'Coconut',       quantity: 10, unit: 'pcs', minLevel: 5,  maxLevel: 30, category: 'Produce' },
  { id: 'INV009', ingredient: 'Milk',          quantity: 2,  unit: 'L',   minLevel: 5,  maxLevel: 20, category: 'Dairy' },
  { id: 'INV010', ingredient: 'Noodles (Pack)',quantity: 20, unit: 'pcs', minLevel: 8,  maxLevel: 40, category: 'Grains' },
  { id: 'INV011', ingredient: 'Salt',          quantity: 3,  unit: 'kg',  minLevel: 1,  maxLevel: 5,  category: 'Spices' },
  { id: 'INV012', ingredient: 'Coffee Powder', quantity: 1.2,unit: 'kg',  minLevel: 1,  maxLevel: 5,  category: 'Beverages' },
];
export function getInventoryStatus(item) {
  const pct = (item.quantity / item.maxLevel) * 100;
  if (item.quantity <= item.minLevel) return 'low';
  if (pct < 40) return 'medium';
  return 'ok';
}
