import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getIngredients } from "../utils/getIngredients";
import type { Drink } from "../types/coctailTypes";

type Props = {
  item: Drink;
};

export default function Row({ item }: Props) {
  const ingredients = getIngredients(item);

  return (
    <View style={styles.card}>
      {item.strDrinkThumb ? (
        <Image source={{ uri: item.strDrinkThumb }} style={styles.thumb} />
      ) : null}

      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.strDrink}</Text>

        <Text style={styles.meta}>
          {item.strCategory ?? "Unknown"} • {item.strAlcoholic ?? "Unknown"}
        </Text>

        {ingredients.length > 0 ? (
          <Text style={styles.ingredients} numberOfLines={3}>
            {ingredients.join(", ")}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  meta: {
    color: "#444",
    marginTop: 4,
    marginBottom: 6,
  },
  ingredients: {
    color: "#333",
  },
});
