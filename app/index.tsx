import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import "@/firebaseConfig";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/services/AuthService";
import { User } from "@/types/User";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await AsyncStorage.getItem("@user");

      if (currentUser) {
        console.log("kullanıcı bulundu.");
        const user: User = JSON.parse(currentUser || "{}");
        login(user.email, user.password).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          router.replace("/(app)");
        });
      } else {
        console.log("kullanıcı bulunamadı.");
        router.replace("/login");
      }
    };

    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hoş Geldiniz...</Text>
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
