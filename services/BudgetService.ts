import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserBudget {
  id: string;
  user_email: string;
  category: string;
  totalBudget: number;
  remainingBudget: number;
  spent: number;
}

export const getUserBudgets = async (
  user_email: string
): Promise<UserBudget[]> => {
  const userBudgets = await AsyncStorage.getItem(`@userBudgets:${user_email}`);
  return userBudgets ? JSON.parse(userBudgets) : [];
};

export const setUserBudgets = async (
  user_email: string,
  userBudgets: UserBudget[]
) => {
  await AsyncStorage.setItem(
    `@userBudgets:${user_email}`,
    JSON.stringify(userBudgets)
  );
};
