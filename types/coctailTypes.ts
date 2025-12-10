export type Drink = {
  idDrink: string;
  strDrink: string;
  strCategory?: string | null;
  strAlcoholic?: string | null;
  strDrinkThumb?: string | null;
  strInstructions?: string | null;
  [key: string]: any;
};

export type CocktailResponse = {
  drinks: Drink[] | null;
};
