import { Stack } from "expo-router";
import { StyleSheet, useColorScheme, View } from "react-native";
import Header from "../app/components/Header";
import { OrdersProvider } from "../app/context/OrdersContext";

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <OrdersProvider>
      <View
        style={[
          styles.container,
          { backgroundColor: scheme === "dark" ? "#1F2937" : "#fff" },
        ]}
      >
        {/* Persistent Header */}
        <Header title="Fourat Palace" />

        {/* Stack renders the screens below the header */}
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </OrdersProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
