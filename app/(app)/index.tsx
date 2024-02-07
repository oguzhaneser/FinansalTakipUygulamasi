import { View, Text, StyleSheet, Button } from "react-native";
import { logout } from "@/services/AuthService";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();

  const handleLogout = () => {
    logout().then(() => {
      console.log("Çıkış yapıldı.");
      router.replace("/");
    });
  };

  return (
    <View style={styles.container}>
      <Text>Ana Sayfa...</Text>

      <Button title="Çıkış Yap" onPress={handleLogout} />
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
