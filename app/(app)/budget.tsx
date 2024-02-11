import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getUserBudgets, setUserBudgets } from "@/services/BudgetService";
import { getUser } from "@/services/AuthService";

import { UserBudget } from "@/services/BudgetService";
import { useAppSelector } from "@/redux/hooks";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomTextInput from "@/components/CustomTextInput";

const durations = [
  {
    id: "1",
    name: "Haftalık",
  },
  {
    id: "2",
    name: "Aylık",
  },
];

export default function Page() {
  const [budgets, setBudgets] = useState<UserBudget[] | null>(null);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("Haftalık");
  const [selectedAmount, setSelectedAmount] = useState<string>("");

  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    const fetchBudgets = async () => {
      const user = await getUser();
      if (user) {
        const userBudgets = await getUserBudgets(user.email);
        if (userBudgets) {
          setBudgets(userBudgets);
        }
      }
    };

    fetchBudgets();
  }, []);

  useEffect(() => {
    setSelectedCategory(categories.categories[0].name);
  }, [categories]);

  const addBudget = async () => {
    const user = await getUser();
    if (user) {
      const newBudget: UserBudget = {
        id:
          budgets && budgets.length > 0
            ? budgets[budgets.length - 1].id + 1
            : "1",
        user_email: user.email,
        category: selectedCategory,
        totalBudget: parseInt(selectedAmount),
        remainingBudget: parseInt(selectedAmount),
        spent: 0,
      };

      if (budgets && budgets.length > 0) {
        const updatedBudgets = [...budgets, newBudget];
        setBudgets(updatedBudgets);
        setUserBudgets(user.email, updatedBudgets);
      } else {
        const updatedBudgets = [newBudget];
        setBudgets(updatedBudgets);
        setUserBudgets(user.email, updatedBudgets);
      }
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.newBudgetTitle}>Yeni Bütçe Ekle</Text>

        <View>
          <Text>Süre</Text>

          {durations.map((duration) => (
            <TouchableOpacity
              onPress={() => setSelectedDuration(duration.name)}
              style={styles.radioContainer}
              key={duration.id}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedDuration === duration.name && styles.radioChecked,
                ]}
              />
              <Text>{duration.name}</Text>
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

        <Button title="Bütçe Ekle" onPress={addBudget} />
      </View>

      <ScrollView>
        {budgets &&
          budgets.map((budget) => (
            <View style={styles.budgetCard} key={budget.id}>
              <Text>Kategori: {budget.category}</Text>
              <Text>Bütçe: {budget.totalBudget}</Text>
              <Text>Harcanan: {budget.spent}</Text>
              <Text>Kalan: {budget.remainingBudget}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  budgetCard: {
    backgroundColor: "lightgray",
    padding: 8,
    borderRadius: 8,
    margin: 8,
    width: "100%",
  },
  categoriesDropdown: {
    backgroundColor: "lightgray",
    padding: 8,
    borderRadius: 8,
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  newBudgetTitle: {
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
