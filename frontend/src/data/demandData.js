// DEMO DATA — ML Demand Predictions
export const DEMAND_PREDICTIONS = [
  { item: 'Masala Dosa',   predicted: 72, confidence: 87, trend: 'up',     emoji: '🫓' },
  { item: 'Veg Rice',      predicted: 64, confidence: 82, trend: 'stable', emoji: '🍚' },
  { item: 'Veg Noodles',   predicted: 50, confidence: 79, trend: 'up',     emoji: '🍜' },
  { item: 'Idli',          predicted: 48, confidence: 85, trend: 'down',   emoji: '⚪' },
  { item: 'Filter Coffee', predicted: 95, confidence: 91, trend: 'up',     emoji: '☕' },
  { item: 'Veg Pulao',     predicted: 42, confidence: 80, trend: 'up',     emoji: '🍛' },
  { item: 'Vada',          predicted: 35, confidence: 76, trend: 'stable', emoji: '🍩' },
  { item: 'Curd Rice',     predicted: 28, confidence: 74, trend: 'down',   emoji: '🥛' },
  { item: 'Sambar',        predicted: 80, confidence: 88, trend: 'stable', emoji: '🥣' },
];
export const PREDICTION_METADATA = {
  generatedAt: '2026-09-02T06:00:00', targetDate: '2026-09-02',
  modelVersion: 'v1.2', algorithm: 'XGBoost Regressor',
  features: ['day_of_week', 'meal_period', 'weather', 'events', 'historical_7d'],
  totalPredicted: 514,
};
