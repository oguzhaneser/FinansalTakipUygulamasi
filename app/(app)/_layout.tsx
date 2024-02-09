import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { TouchableOpacity } from "react-native";
import { logout } from "@/services/AuthService";
import { useRouter } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleLogout = () => {
    logout().then(() => {
      console.log("Çıkış yapıldı.");
      router.replace("/");
    });
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 8 }}>
            <TabBarIcon name="user-times" color="#000000" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Hesap Hareketleri",
          tabBarIcon: ({ color }) => <TabBarIcon name="random" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Bütçe Yönetimi",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="turkish-lira" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "Raporlama",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
