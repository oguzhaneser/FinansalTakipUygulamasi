import { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { logout } from "@/services/AuthService";
import { useRouter } from "expo-router";
import Background from "@/components/Background";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCurrencies } from "@/api/currencies-slice";
import { fetchCategories } from "@/api/categories-slice";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currencies = useAppSelector((state) => state.currencies);
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCurrencies());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Background />
      <Text>Toplam Varlık : 15000</Text>
      <Text>Borçlar : 5000</Text>
      <Text>Genel Bütçe : 10000</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
