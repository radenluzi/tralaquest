export type User = {
  id: string;
  name: string;
  fid: number;
  totalPoints: number;
  streak: number;
  lastCheckinDate: string | null;
  rank: number;
};

export type CheckinResult = {
  ok: boolean;
  message: string;
  user: User;
  feeEth: number;
  pointsEarned: number;
};

export const DAILY_FEE_ETH = 0.01;
export const DAILY_REWARD_POINTS = 10;

export const mockUser: User = {
  id: "user-dek",
  name: "dek",
  fid: 2125562913,
  totalPoints: 180,
  streak: 2,
  lastCheckinDate: null,
  rank: 12,
};

export const mockQuestStats = {
  completed: 2,
  active: 3,
};

export const mockTopUsers = [
  { rank: 1, name: "dekfar", points: 1250 },
  { rank: 2, name: "questguy", points: 1100 },
  { rank: 3, name: "dailycast", points: 980 },
  { rank: 12, name: "dek", points: 180 },
];

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getUserState(today = new Date()): User {
  const todayKey = formatDate(today);
  if (mockUser.lastCheckinDate === todayKey) return mockUser;
  return mockUser;
}

export function runDailyCheckin(today = new Date()): CheckinResult {
  const todayKey = formatDate(today);

  if (mockUser.lastCheckinDate === todayKey) {
    return {
      ok: false,
      message: "Geus check-in poe ieu.",
      user: mockUser,
      feeEth: DAILY_FEE_ETH,
      pointsEarned: 0,
    };
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = formatDate(yesterday);

  const nextStreak = mockUser.lastCheckinDate === yesterdayKey ? mockUser.streak + 1 : 1;

  mockUser.lastCheckinDate = todayKey;
  mockUser.streak = nextStreak;
  mockUser.totalPoints += DAILY_REWARD_POINTS;

  return {
    ok: true,
    message: "Check-in hasil. Fee kabayar, point asup.",
    user: { ...mockUser },
    feeEth: DAILY_FEE_ETH,
    pointsEarned: DAILY_REWARD_POINTS,
  };
}
