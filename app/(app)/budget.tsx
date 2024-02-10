import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getUserBudget, setUserBudget } from "@/services/BudgetService";
import { getUser } from "@/services/AuthService";

import { UserBudget } from "@/services/BudgetService";
import { useAppSelector } from "@/redux/hooks";

export default function Page() {
  const [budget, setBudget] = useState<UserBudget | null>(null);
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    const fetchBudget = async () => {
      const user = await getUser();
      if (user) {
        console.log(user);

        const userBudget = await getUserBudget(user.email);
        if (userBudget) {
          setBudget(userBudget);
        } else {
          const newUserBudget: UserBudget = {
            id: user.email,
            user_email: user.email,
            totalBudget: 0,
            remainingBudget: 0,
            debt: 0,
          };
          await setUserBudget(user.email, newUserBudget);
          setBudget(newUserBudget);
        }
      }
    };

    fetchBudget();
  }, []);

  const addBudget = async () => {
    if (budget) {
      const newBudget = {
        ...budget,
        totalBudget: budget.totalBudget + 1000,
        remainingBudget: budget.remainingBudget + 1000,
      };
      await setUserBudget(budget.user_email, newBudget);
      setBudget(newBudget);
    }
  };

  return (
    <View style={styles.container}>
      {budget && (
        <View>
          <Text>Bütçe: {budget.totalBudget}</Text>
          <Text>Kalan Bütçe: {budget.remainingBudget}</Text>
          <Text>Borç: {budget.debt}</Text>
        </View>
      )}

      <View style={styles.budgetCard}>
        <Text>Kategori: Gıda</Text>
        <Text>Bütçe: 2000</Text>
        <Text>Harcanan: 750</Text>
        <Text>Kalan: 1250</Text>
      </View>

      <Button title="Bütçe Ekle" onPress={addBudget} />

      {categories.categories.map((category) => (
        <View key={category.id}>
          <Text>Kategori: {category.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  budgetCard: {
    backgroundColor: "lightgray",
    padding: 8,
    borderRadius: 8,
    margin: 8,
    width: "100%",
  },
});
