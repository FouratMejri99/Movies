import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useOrders } from "../app/context/OrdersContext";
export default function OrderScreen() {
  const scheme = useColorScheme();
  const router = useRouter();
  const { dish } = useLocalSearchParams();
  const dishObj = JSON.parse(dish);
  const { addOrder } = useOrders();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: scheme === "dark" ? "#121212" : "#F3F4F6" },
      ]}
      contentContainerStyle={{ alignItems: "center", paddingVertical: 30 }}
    >
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={{ color: "#FBBF24", fontWeight: "bold" }}>← Back</Text>
      </TouchableOpacity>

      {/* Dish Image */}
      <Image source={{ uri: dishObj.image }} style={styles.image} />

      {/* Dish Name & Price */}
      <Text
        style={[styles.name, { color: scheme === "dark" ? "#fff" : "#111827" }]}
      >
        {dishObj.name}
      </Text>
      <Text
        style={[
          styles.price,
          { color: scheme === "dark" ? "#D1D5DB" : "#F59E0B" },
        ]}
      >
        {dishObj.price}
      </Text>

      {/* Quantity Selector */}
      <View style={styles.quantityRow}>
        <TouchableOpacity
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
          style={styles.qtyButton}
        >
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.qtyNumber,
            { color: scheme === "dark" ? "#fff" : "#111827" },
          ]}
        >
          {quantity}
        </Text>

        <TouchableOpacity
          onPress={() => setQuantity(quantity + 1)}
          style={styles.qtyButton}
        >
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Size Selector */}
      <Text
        style={[
          styles.sectionTitle,
          { color: scheme === "dark" ? "#fff" : "#111827" },
        ]}
      >
        Select Size
      </Text>
      <View style={styles.sizeRow}>
        {["Small", "Medium", "Large"].map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.sizeButton,
              {
                backgroundColor:
                  selectedSize === size
                    ? "#FBBF24"
                    : scheme === "dark"
                      ? "#1F2937"
                      : "#E5E7EB",
              },
            ]}
          >
            <Text
              style={{
                color:
                  selectedSize === size
                    ? "#fff"
                    : scheme === "dark"
                      ? "#fff"
                      : "#111827",
                fontWeight: "bold",
              }}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Confirm Order Button */}
      <TouchableOpacity
        style={[styles.orderButton, { backgroundColor: "#FBBF24" }]}
        onPress={() => {
          addOrder({ ...dishObj, quantity, size: selectedSize });
          router.push("/confirmedorders");
        }}
      >
        <Text style={styles.orderButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: { alignSelf: "flex-start", marginLeft: 20, marginBottom: 15 },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  name: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  price: { fontSize: 20, marginBottom: 20 },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  qtyButton: {
    padding: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  qtyText: { fontSize: 20, fontWeight: "bold" },
  qtyNumber: { fontSize: 18 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  sizeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 40,
  },
  sizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  orderButton: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  orderButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
