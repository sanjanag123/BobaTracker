import { BobaEntry } from '@/types';
import { format, getYear, parseISO, startOfMonth, isSameMonth, isSameYear } from 'date-fns';

export interface Analytics {
  totalPurchases: number;
  totalSpent: number;
  topShops: { shop: string; count: number }[];
  averageSweetness: number;
  monthlySpending: { month: string; amount: number }[];
  monthlyPurchases: { month: string; count: number }[];
  toppingDistribution: { topping: string; count: number }[];
  thisWeekCount: number;
  thisMonthSpent: number;
  mostExpensiveDay: { date: string; amount: number } | null;
}

export const calculateAnalytics = (entries: BobaEntry[]): Analytics => {
  const currentYear = getYear(new Date());
  const currentYearEntries = entries.filter(entry => {
    const entryYear = getYear(parseISO(entry.date));
    return entryYear === currentYear;
  });

  // Total purchases this year
  const totalPurchases = currentYearEntries.length;

  // Total spent this year
  const totalSpent = currentYearEntries.reduce((sum, entry) => sum + entry.price, 0);

  // Top shops
  const shopCounts: Record<string, number> = {};
  currentYearEntries.forEach(entry => {
    shopCounts[entry.shop] = (shopCounts[entry.shop] || 0) + 1;
  });
  const topShops = Object.entries(shopCounts)
    .map(([shop, count]) => ({ shop, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Average sweetness
  const averageSweetness = currentYearEntries.length > 0
    ? currentYearEntries.reduce((sum, entry) => sum + entry.sweetnessLevel, 0) / currentYearEntries.length
    : 0;

  // Monthly spending
  const monthlySpendingMap: Record<string, number> = {};
  const monthlyPurchasesMap: Record<string, number> = {};
  
  currentYearEntries.forEach(entry => {
    const monthKey = format(parseISO(entry.date), 'MMM yyyy');
    monthlySpendingMap[monthKey] = (monthlySpendingMap[monthKey] || 0) + entry.price;
    monthlyPurchasesMap[monthKey] = (monthlyPurchasesMap[monthKey] || 0) + 1;
  });

  const monthlySpending = Object.entries(monthlySpendingMap)
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => parseISO(a.month + ' 01').getTime() - parseISO(b.month + ' 01').getTime());

  const monthlyPurchases = Object.entries(monthlyPurchasesMap)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => parseISO(a.month + ' 01').getTime() - parseISO(b.month + ' 01').getTime());

  // Topping distribution
  const toppingCounts: Record<string, number> = {};
  currentYearEntries.forEach(entry => {
    entry.toppings.forEach(topping => {
      toppingCounts[topping] = (toppingCounts[topping] || 0) + 1;
    });
  });
  const toppingDistribution = Object.entries(toppingCounts)
    .map(([topping, count]) => ({ topping, count }))
    .sort((a, b) => b.count - a.count);

  // This week count (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const thisWeekCount = entries.filter(entry => {
    const entryDate = parseISO(entry.date);
    return entryDate >= weekAgo;
  }).length;

  // This month spent
  const now = new Date();
  const thisMonthSpent = entries
    .filter(entry => {
      const entryDate = parseISO(entry.date);
      return isSameMonth(entryDate, now) && isSameYear(entryDate, now);
    })
    .reduce((sum, entry) => sum + entry.price, 0);

  // Most expensive day
  const dailySpending: Record<string, number> = {};
  entries.forEach(entry => {
    const dayKey = format(parseISO(entry.date), 'yyyy-MM-dd');
    dailySpending[dayKey] = (dailySpending[dayKey] || 0) + entry.price;
  });
  
  const mostExpensiveDayEntry = Object.entries(dailySpending)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => b.amount - a.amount)[0] || null;

  return {
    totalPurchases,
    totalSpent,
    topShops,
    averageSweetness,
    monthlySpending,
    monthlyPurchases,
    toppingDistribution,
    thisWeekCount,
    thisMonthSpent,
    mostExpensiveDay: mostExpensiveDayEntry,
  };
};

