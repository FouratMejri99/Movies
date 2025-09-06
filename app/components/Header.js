// app/components/Header.js
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function Header({ title }) {
  const scheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: scheme === "dark" ? "#111827" : "#FBBF24" },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: scheme === "dark" ? "#fff" : "#111827" },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: { fontSize: 20, fontWeight: "bold" },
});
