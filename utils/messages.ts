import { Analytics } from './analytics';
import { format, parseISO } from 'date-fns';

export const getEncouragementMessage = (analytics: Analytics, mode: 'nice' | 'sassy'): string => {
  if (mode === 'nice') {
    return getNiceMessage(analytics);
  } else {
    return getSassyMessage(analytics);
  }
};

const getNiceMessage = (analytics: Analytics): string => {
  const messages: string[] = [];

  if (analytics.thisWeekCount >= 4) {
    messages.push(`You've enjoyed ${analytics.thisWeekCount} boba drinks this week! Stay hydrated, friend! 💕`);
  } else if (analytics.thisWeekCount > 0) {
    messages.push(`You've had ${analytics.thisWeekCount} boba this week. That's a nice treat! 🌟`);
  }

  if (analytics.thisMonthSpent > 0) {
    messages.push(`This month you've spent $${analytics.thisMonthSpent.toFixed(2)} on boba. You deserve it! ✨`);
  }

  if (analytics.totalPurchases > 50) {
    messages.push(`You've tracked ${analytics.totalPurchases} boba drinks this year! Wow, you really love boba! 🎉`);
  }

  if (analytics.mostExpensiveDay && analytics.mostExpensiveDay.amount >= 15) {
    const date = format(parseISO(analytics.mostExpensiveDay.date), 'MMMM d');
    messages.push(`On ${date}, you spent $${analytics.mostExpensiveDay.amount.toFixed(2)}. That must have been a special day! 💫`);
  }

  if (analytics.averageSweetness > 80) {
    messages.push(`Your average sweetness level is ${Math.round(analytics.averageSweetness)}% - you like it sweet! 🍯`);
  }

  if (messages.length === 0) {
    return "Start tracking your boba adventures! Every sip tells a story. 🌟";
  }

  return messages[Math.floor(Math.random() * messages.length)];
};

const getSassyMessage = (analytics: Analytics): string => {
  const messages: string[] = [];

  if (analytics.thisWeekCount >= 4) {
    messages.push(`You drank ${analytics.thisWeekCount} boba this week... girl... blink twice if you're okay. 👀`);
  } else if (analytics.thisWeekCount === 0) {
    messages.push(`Zero boba this week? Who are you and what have you done with the real you? 🤨`);
  }

  if (analytics.thisMonthSpent > 0) {
    const monthName = format(new Date(), 'MMMM');
    messages.push(`In ${monthName} you spent $${analytics.thisMonthSpent.toFixed(2)} on boba. Honestly? Slay. 💅`);
  }

  if (analytics.mostExpensiveDay && analytics.mostExpensiveDay.amount >= 15) {
    const date = format(parseISO(analytics.mostExpensiveDay.date), 'MMMM d');
    messages.push(`Your most expensive day was $${analytics.mostExpensiveDay.amount.toFixed(2)} on ${date}... was everything okay?? 😅`);
  }

  if (analytics.totalPurchases > 100) {
    messages.push(`${analytics.totalPurchases} boba this year? That's... a lot. But we're not judging (we're judging a little). 😏`);
  }

  if (analytics.averageSweetness > 90) {
    messages.push(`Your average sweetness is ${Math.round(analytics.averageSweetness)}%? At that point just drink syrup, bestie. 🍯`);
  }

  if (analytics.topShops.length > 0 && analytics.topShops[0].count > 20) {
    messages.push(`You went to ${analytics.topShops[0].shop} ${analytics.topShops[0].count} times. Do they know you by name yet? Probably. 😂`);
  }

  if (messages.length === 0) {
    return "No boba data yet? Time to start living your best (caffeinated) life! ☕";
  }

  return messages[Math.floor(Math.random() * messages.length)];
};

