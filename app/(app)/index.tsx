import { View, Text, StyleSheet, Button } from "react-native";
import { logout } from "@/services/AuthService";
import { useRouter } from "expo-router";
import Background from "@/components/Background";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Background />
      <Text>Ana Sayfa...</Text>
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
