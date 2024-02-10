import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "@/redux/hooks";

export default function Page() {
  const categories = useAppSelector((state) => state.categories);
  return (
    <View style={styles.container}>
      <Text>Hesap Hareketleri...</Text>
      <View style={[styles.cardContainer, styles.incomeCard]}>
        <Text>Gelir 100TL - 09.02.2024 - Gıda</Text>
      </View>
      <View style={[styles.cardContainer, styles.expenseCard]}>
        <Text>Gider 150TL - 09.02.2024 - Fatura</Text>
      </View>

      
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
    backgroundColor: "red",
  },
});
