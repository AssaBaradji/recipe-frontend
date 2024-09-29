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

  return {
    categories,
    loadCategoriesFromAPI,
  };
});


