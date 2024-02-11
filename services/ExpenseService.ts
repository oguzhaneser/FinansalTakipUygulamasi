export interface Expense {
  id: string;
  user_email: string;
  category: string;
  amount: number;
  date: string;
  isIncome: boolean;
}
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserExpenses = async (
  user_email: string
): Promise<Expense[]> => {
  const userExpenses = await AsyncStorage.getItem(`@userExpenses:${user_email}`);
  return userExpenses ? JSON.parse(userExpenses) : [];
};

export const setUserExpenses = async (
  user_email: string,
  userExpenses: Expense[]
) => {
  await AsyncStorage.setItem(
    `@userExpenses:${user_email}`,
    JSON.stringify(userExpenses)
  );
};
