import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRecipeStore = defineStore("RecipeStore", () => {
  const recettes = ref([]);

  const loadDataFromApi = async () => {
    try {
      const resp = await axios.get("http://localhost:3002/recipes");
      recettes.value = resp.data;
    } catch (error) {
      recettes.value = [];
      console.error("Erreur lors du chargement des recettes :", error);
    }
  };

  const addRecipeToAPI = async (newRecipe) => {
    try {
      const response = await axios.post("http://localhost:3002/recipes", newRecipe);
      recettes.value.push(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la recette :", error);
    }
  };

  return {
    recettes,
    loadDataFromApi,
    addRecipeToAPI,
  };
});
