import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

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
      const resp = await axios.post("http://localhost:3002/recipes", newRecipe);
      recettes.value.push(resp.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la recette :", error);
    }
  };

  const deleteRecipeFromAPI = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3002/recipes/${recipeId}`);
      recettes.value = recettes.value.filter((recette) => recette.id !== recipeId);
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette :", error);
    }
  };

  return {
    recettes,
    loadDataFromApi,
    addRecipeToAPI,
    deleteRecipeFromAPI, // Exporter la méthode
  };
});
