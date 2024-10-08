import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useRecipeStore = defineStore("recipeStore", () => {
  const recettes = ref([]); // Bien s'assurer que "recettes" est défini

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

  const editRecipe = async (updatedRecipe) => {
    try {
      const resp = await axios.put(`http://localhost:3002/recipes/${updatedRecipe.id}`, updatedRecipe);
      const index = recettes.value.findIndex((r) => r.id === updatedRecipe.id);
      if (index !== -1) {
        recettes.value[index] = resp.data;
      }
    } catch (error) {
      console.error("Erreur lors de la modification de la recette :", error);
    }
  };
  

  return {
    recettes, // Vérifie que tu retournes bien la propriété "recettes"
    loadDataFromApi,
    addRecipeToAPI,
    deleteRecipeFromAPI,
    editRecipe
  };
});
