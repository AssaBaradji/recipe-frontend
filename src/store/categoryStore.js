// categoryStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]); // Liste des catégories

  // Charger les catégories depuis l'API
  const loadCategoriesFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3002/categories");
      categories.value = response.data; // Mise à jour de la liste des catégories
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  const addCategory = async (category) => {
    try {
      const response = await axios.post("http://localhost:3002/categories", category);
      categories.value.push(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`http://localhost:3002/categories/${categoryId}`);
      console.log('Réponse de la suppression:', response);
      categories.value = categories.value.filter((category) => category.id !== categoryId);
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error);
    }
  };

  return {
    categories,
    loadCategoriesFromAPI,
    addCategory,
    deleteCategory,
  };
});
