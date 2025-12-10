import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "./components/Header";
import Row from "./components/Row";
import Search from "./components/Search";
import { useCocktails } from "./hooks/useCocktails";
import type { Drink } from "./types/coctailTypes";

export default function App() {
  const { drinks, query, setQuery, error, loading } = useCocktails("margarita");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Search defaultValue={query} onSearch={(t) => setQuery(t)} />

      {query ? (
        <Text style={styles.resultsText}>Results for: {query}</Text>
      ) : null}

      {error ? (
        <View style={styles.centered}>
          <Text style={{ color: "red" }}>
            Error: {(error as any)?.message ?? String(error)}
          </Text>
        </View>
      ) : null}

      {query.trim() === "" ? (
        <View style={styles.centered}>
          <Text>Type to search for cocktails.</Text>
        </View>
      ) : loading ? (
        // näytetään spinneri aina, kun loading = true
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : drinks && drinks.length > 0 ? (
        <>
          <Header />
          <FlatList
            data={drinks}
            keyExtractor={(d: Drink, index) =>
              d?.idDrink ? String(d.idDrink) : String(index)
            }
            renderItem={({ item }) => <Row item={item} />}
            contentContainerStyle={styles.list}
          />
        </>
      ) : (
        <View style={styles.centered}>
          <Text>No drinks found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: 8,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  resultsText: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: "#222",
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});
