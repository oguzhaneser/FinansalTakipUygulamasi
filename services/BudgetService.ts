import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserBudget {
  id: string;
  user_email: string;
  totalBudget: number;
  remainingBudget: number;
  debt: number;
}

export const getUserBudget = async (email: string): Promise<UserBudget> => {
  const budget = await AsyncStorage.getItem(`@budget:${email}`);
  return budget ? JSON.parse(budget) : null;
};

export const setUserBudget = async (email: string, budget: UserBudget) => {
  return AsyncStorage.setItem(`@budget:${email}`, JSON.stringify(budget));
};
