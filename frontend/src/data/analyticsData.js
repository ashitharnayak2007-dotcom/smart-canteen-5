// DEMO DATA — Analytics
export const DAILY_ORDERS = [
  { day: 'Mon', orders: 98,  revenue: 4850 },
  { day: 'Tue', orders: 112, revenue: 5540 },
  { day: 'Wed', orders: 127, revenue: 6230 },
  { day: 'Thu', orders: 105, revenue: 5120 },
  { day: 'Fri', orders: 134, revenue: 6640 },
  { day: 'Sat', orders: 88,  revenue: 4320 },
  { day: 'Sun', orders: 62,  revenue: 3060 },
];
export const POPULAR_ITEMS = [
  { name: 'Masala Dosa',   sold: 312, revenue: 10920 },
  { name: 'Filter Coffee', sold: 298, revenue: 4470  },
  { name: 'Veg Rice',      sold: 254, revenue: 12700 },
  { name: 'Idli',          sold: 230, revenue: 5750  },
  { name: 'Veg Noodles',   sold: 187, revenue: 10285 },
  { name: 'Veg Pulao',     sold: 155, revenue: 9300  },
  { name: 'Vada',          sold: 145, revenue: 2900  },
  { name: 'Curd Rice',     sold: 120, revenue: 4800  },
];
export const PEAK_HOURS = [
  { hour: '7AM', orders: 12 }, { hour: '8AM', orders: 45 },
  { hour: '9AM', orders: 38 }, { hour: '10AM', orders: 14 },
  { hour: '11AM', orders: 8  }, { hour: '12PM', orders: 52 },
  { hour: '1PM', orders: 48  }, { hour: '2PM', orders: 22  },
  { hour: '3PM', orders: 9   }, { hour: '4PM', orders: 28  },
  { hour: '5PM', orders: 18  },
];
export const WASTAGE_TREND = [
  { day: 'Mon', kg: 5.2 }, { day: 'Tue', kg: 3.8 }, { day: 'Wed', kg: 6.1 },
  { day: 'Thu', kg: 4.5 }, { day: 'Fri', kg: 2.9 }, { day: 'Sat', kg: 7.2 }, { day: 'Sun', kg: 8.4 },
];
export const PAYMENT_METHODS = [
  { method: 'UPI',  count: 380, pct: 52 },
  { method: 'Card', count: 215, pct: 30 },
  { method: 'Cash', count: 131, pct: 18 },
];
export const KPI = {
  todayOrders: 128, weeklyOrders: 726, monthlyRevenue: 143600,
  totalWasteKg: 8.4, avgWaitMin: 7, satisfactionPct: 91,
  totalStudents: 342, activeMenuItems: 12,
};
