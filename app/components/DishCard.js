import { Image, StyleSheet, Text, View } from "react-native";

export default function DishCard({ name, price, image, scheme }) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: scheme === "dark" ? "#374151" : "#F3F4F6" },
      ]}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text
          style={{
            fontWeight: "bold",
            color: scheme === "dark" ? "#fff" : "#111827",
          }}
        >
          {name}
        </Text>
        <Text style={{ color: scheme === "dark" ? "#D1D5DB" : "#6B7280" }}>
          {price}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: { width: 80, height: 80 },
  info: { padding: 10, justifyContent: "center" },
});
