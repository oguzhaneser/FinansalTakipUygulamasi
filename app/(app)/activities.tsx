import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useAppSelector } from "@/redux/hooks";

import { Expense } from "@/services/ExpenseService";
import { setUserExpenses, getUserExpenses } from "@/services/ExpenseService";
import CustomTextInput from "@/components/CustomTextInput";
import { FontAwesome5 } from "@expo/vector-icons";
import { getUser } from "@/services/AuthService";

const expenseTypes = [
  {
    id: "1",
    name: "Gelir",
  },
  {
    id: "2",
    name: "Gider",
  },
];

export default function Page() {
  const categories = useAppSelector((state) => state.categories);

  const [selectedExpenseType, setSelectedExpenseType] =
    useState<string>("Gelir");
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[] | null>(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const addExpense = async () => {
    const user = await getUser();
    if (user) {
      const newExpense: Expense = {
        id:
          expenses && expenses.length > 0
            ? expenses[expenses.length - 1].id + 1
            : "1",
        user_email: user.email,
        category: selectedCategory,
        amount: parseInt(selectedAmount),
        date: new Date().toISOString(),
        isIncome: selectedExpenseType === "Gelir",
      };

      if (expenses && expenses.length > 0) {
        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);
        setUserExpenses(user.email, updatedExpenses);
      } else {
        const updatedExpenses = [newExpense];
        setExpenses(updatedExpenses);
        setUserExpenses(user.email, updatedExpenses);
      }
    }
  };

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

    fetchExpenses();
  }, []);

  useEffect(() => {
    setSelectedCategory(categories.categories[0].name);
  }, [categories]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.newExpenseTitle}>Yeni Hareket Ekle</Text>

        <View>
          <Text>Tür</Text>

          {expenseTypes.map((expenseType) => (
            <TouchableOpacity
              onPress={() => setSelectedExpenseType(expenseType.name)}
              style={styles.radioContainer}
              key={expenseType.id}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedExpenseType === expenseType.name &&
                    styles.radioChecked,
                ]}
              />
              <Text>{expenseType.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => setShowCategories(!showCategories)}
            style={styles.categoriesTitle}
          >
            <Text>{`Kategori: ${selectedCategory}`}</Text>

            <FontAwesome5
              name={showCategories ? "caret-up" : "caret-down"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View>
            {showCategories && (
              <View style={styles.categoriesDropdown}>
                {categories.categories &&
                  categories.categories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      onPress={() => handleSelectCategory(category.name)}
                    >
                      <Text>{category.name}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
        </View>

        <View>
          <CustomTextInput
            value={selectedAmount}
            onChangeText={(text) => setSelectedAmount(text)}
            placeholder="Tutar"
            keyboardType="numeric"
          />
        </View>

        <Button title={`${selectedExpenseType} Ekle`} onPress={addExpense} />
      </View>

      {expenses && expenses.length > 0 && (
        <>
          <Text style={styles.newExpenseTitle}>Hesap Hareketleri...</Text>
          <View>
            {expenses.map((expense) => (
              <View
                key={expense.id}
                style={[
                  styles.cardContainer,
                  expense.isIncome ? styles.incomeCard : styles.expenseCard,
                ]}
              >
                <Text>
                  {expense.isIncome ? "Gelir" : "Gider"} {expense.amount}TL -{" "}
                  {new Date(expense.date).toLocaleDateString()} -{" "}
                  {expense.category}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    width: "100%",
    borderRadius: 8,
    padding: 8,
  },
  incomeCard: {
    backgroundColor: "green",
  },
  expenseCard: {
    backgroundColor: "darkred",
  },
  categoriesDropdown: {
    backgroundColor: "lightgray",
    padding: 8,
    borderRadius: 8,
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  newExpenseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: "row",
    marginVertical: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 8,
  },
  radioChecked: {
    backgroundColor: "black",
  },
  categoriesTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
