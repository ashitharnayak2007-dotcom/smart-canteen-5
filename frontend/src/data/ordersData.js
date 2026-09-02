// DEMO DATA — Orders
export const DEMO_ORDERS = [
  { id: 'SC1001', studentId: 'STU001', studentName: 'Rahul Kumar', rollNo: '21CS045',
    items: [
      { itemId: 'M001', name: 'Masala Dosa', emoji: '🫓', quantity: 2, price: 35, customization: '' },
      { itemId: 'M008', name: 'Filter Coffee', emoji: '☕', quantity: 1, price: 15, customization: 'Less sugar' },
    ],
    total: 85, pickupSlot: '8:30 AM – 9:00 AM', pickupSlotId: 'S2',
    status: 'READY', orderTime: '2026-09-02T07:15:00', estimatedWait: 5,
    paymentMethod: 'UPI', paymentStatus: 'PAID' },
  { id: 'SC1002', studentId: 'STU002', studentName: 'Priya Nair', rollNo: '21EC032',
    items: [
      { itemId: 'M011', name: 'Veg Pulao', emoji: '🍛', quantity: 1, price: 60, customization: 'No veggies, plain rice only' },
      { itemId: 'M007', name: 'Sambar', emoji: '🥣', quantity: 1, price: 15, customization: '' },
    ],
    total: 75, pickupSlot: '12:30 PM – 1:00 PM', pickupSlotId: 'S5',
    status: 'COOKING', orderTime: '2026-09-02T11:45:00', estimatedWait: 12,
    paymentMethod: 'Card', paymentStatus: 'PAID' },
  { id: 'SC1003', studentId: 'STU003', studentName: 'Arjun Menon', rollNo: '22ME018',
    items: [
      { itemId: 'M003', name: 'Veg Noodles', emoji: '🍜', quantity: 2, price: 55, customization: 'Extra spicy' },
    ],
    total: 110, pickupSlot: '1:00 PM – 1:30 PM', pickupSlotId: 'S6',
    status: 'PLACED', orderTime: '2026-09-02T12:10:00', estimatedWait: 20,
    paymentMethod: 'Cash', paymentStatus: 'PENDING' },
  { id: 'SC1004', studentId: 'STU004', studentName: 'Sneha Pillai', rollNo: '21CS091',
    items: [
      { itemId: 'M004', name: 'Idli', emoji: '⚪', quantity: 2, price: 25, customization: '' },
      { itemId: 'M008', name: 'Filter Coffee', emoji: '☕', quantity: 1, price: 15, customization: 'No sugar' },
    ],
    total: 65, pickupSlot: '8:00 AM – 8:30 AM', pickupSlotId: 'S1',
    status: 'PICKED_UP', orderTime: '2026-09-02T07:00:00', estimatedWait: 0,
    paymentMethod: 'UPI', paymentStatus: 'PAID' },
  { id: 'SC1005', studentId: 'STU005', studentName: 'Kiran Reddy', rollNo: '22CS007',
    items: [
      { itemId: 'M002', name: 'Veg Rice', emoji: '🍚', quantity: 1, price: 50, customization: 'No onion, no garlic' },
      { itemId: 'M007', name: 'Sambar', emoji: '🥣', quantity: 2, price: 15, customization: '' },
    ],
    total: 80, pickupSlot: '12:00 PM – 12:30 PM', pickupSlotId: 'S4',
    status: 'PLACED', orderTime: '2026-09-02T11:30:00', estimatedWait: 18,
    paymentMethod: 'UPI', paymentStatus: 'PAID' },
];

export const ORDER_STATUSES = ['PLACED', 'COOKING', 'READY', 'PICKED_UP'];
export function getNextStatus(current) {
  const idx = ORDER_STATUSES.indexOf(current);
  return idx < ORDER_STATUSES.length - 1 ? ORDER_STATUSES[idx + 1] : current;
}
