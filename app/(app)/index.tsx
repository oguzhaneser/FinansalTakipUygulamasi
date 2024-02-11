import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { logout } from "@/services/AuthService";
import { useRouter } from "expo-router";
import Background from "@/components/Background";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCurrencies } from "@/api/currencies-slice";
import { fetchCategories } from "@/api/categories-slice";

import { getUserExpenses } from "@/services/ExpenseService";
import { getUserBudgets } from "@/services/BudgetService";
import { Expense } from "@/services/ExpenseService";
import { UserBudget } from "@/services/BudgetService";
import { getUser } from "@/services/AuthService";

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [budgets, setBudgets] = useState<UserBudget[] | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currencies = useAppSelector((state) => state.currencies);
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCurrencies());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const user = await getUser();

      if (user) {
        const userExpenses = await getUserExpenses(user.email);
        if (userExpenses) {
          setExpenses(userExpenses);
        }
      }
    };

    const fetchBudgets = async () => {
      const user = await getUser();

      if (user) {
        const userBudgets = await getUserBudgets(user.email);
        if (userBudgets) {
          setBudgets(userBudgets);
        }
      }
    };

    fetchExpenses();
    fetchBudgets();
  }, []);

  const findTotalIncome = () => {
    return expenses
      ?.filter((e) => e.isIncome)
      .reduce((a, b) => a + b.amount, 0);
  };

  const findTotalExpense = () => {
    return expenses
      ?.filter((e) => !e.isIncome)
      .reduce((a, b) => a + b.amount, 0);
  };

  const findTotalBudget = () => {
    return budgets?.reduce((a, b) => a + b.totalBudget, 0);
  };

  return (
    <View style={styles.container}>
      <Background />
      <Text style={styles.title}>{`Toplam Varlık: ${findTotalIncome()}`}</Text>
      <Text style={styles.title}>{`Toplam Borç: ${findTotalExpense()}`}</Text>
      <Text style={styles.title}>{`Toplam Bütçe: ${findTotalBudget()}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
  },
});
