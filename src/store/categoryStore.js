import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);

  const loadCategoriesFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3002/categories");
      categories.value = response.data;
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

  return {
    categories,
    loadCategoriesFromAPI,
    addCategory,
  };
});



