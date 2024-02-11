import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { getUser } from "@/services/AuthService";
import { getUserExpenses, Expense } from "@/services/ExpenseService";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [expenseCategories, setExpenseCategories] = useState<string[] | null>(
    null
  );
  const [expenseAmounts, setExpenseAmounts] = useState<number[] | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      const user = await getUser();

      if (user) {
        const userExpenses = await getUserExpenses(user.email);
        if (userExpenses && userExpenses.length > 0) {
          setExpenses(userExpenses);

          const categories = userExpenses
            .filter((e) => !e.isIncome)
            .map((e) => e.category);
          const uniqueCategories = Array.from(new Set(categories));
          setExpenseCategories(uniqueCategories);

          const amounts = uniqueCategories.map((c) => {
            const categoryExpenses = userExpenses.filter(
              (e) => e.category === c
            );
            return categoryExpenses.reduce((acc, curr) => acc + curr.amount, 0);
          });
          setExpenseAmounts(amounts);
        }
      }
    };

    fetchExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Raporlar</Text>

        {expenseCategories &&
        expenseCategories.length > 0 &&
        expenseAmounts &&
        expenseAmounts.length > 0 ? (
          <LineChart
            data={{
              labels: expenseCategories || [],
              datasets: [
                {
                  data: expenseAmounts || [],
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 8,
              margin: 20,
            }}
          />
        ) : (
          <Text>Henüz harcamanız bulunmamaktadır.</Text>
        )}
      </View>
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
    alignSelf: "center",
  },
});
