import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import BottomNav from "../app/components/BottomNav";
import DishCard from "../app/components/DishCard";
import Header from "../app/components/Header";
import cake from "../assets/images/cake.webp";

// Sample food data
const FOOD_DATA = {
  Pizza: [
    {
      name: "Margherita",
      price: "$12",
      image: "https://i.imgur.com/1Q8Z1Zf.jpg",
    },
    {
      name: "Pepperoni",
      price: "$15",
      image: "https://i.imgur.com/NM1uZ7V.jpg",
    },
  ],
  Sushi: [
    {
      name: "Salmon Sushi",
      price: "$15",
      image: "https://i.imgur.com/OKlZ0K9.jpg",
    },
    {
      name: "Tuna Sushi",
      price: "$16",
      image: "https://i.imgur.com/0g9FjYh.jpg",
    },
  ],
  Desserts: [
    {
      name: "Chocolate Cake",
      price: "$8",
      Href: { cake },
    },
    {
      name: "Ice Cream",
      price: "$6",
      image: "https://i.imgur.com/Br6C4rX.jpg",
    },
  ],
};

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Pizza");
  const scheme = useColorScheme();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: scheme === "dark" ? "#1F2937" : "#fff",
      }}
    >
      <Animated.ScrollView
        contentContainerStyle={{ padding: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Animated Header */}
        <Animated.View
          style={{
            opacity: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0],
            }),
          }}
        >
          <Header restaurantName="Fourat Palace" scheme={scheme} />
        </Animated.View>

        {/* Category Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          {Object.keys(FOOD_DATA).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && {
                  borderBottomWidth: 3,
                  borderBottomColor: "#FBBF24",
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={{
                  color: selectedCategory === cat ? "#FBBF24" : "#6B7280",
                  fontWeight: "bold",
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Food Cards */}
        <View style={{ marginTop: 20 }}>
          {FOOD_DATA[selectedCategory].map((dish, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push({
                  pathname: "order",
                  params: { dish: JSON.stringify(dish) },
                })
              }
            >
              <DishCard
                name={dish.name}
                price={dish.price}
                image={dish.image}
                scheme={scheme}
              />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>

      <BottomNav scheme={scheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 10,
  },
});
