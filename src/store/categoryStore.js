import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([
    { id: 1, name: "Américain" },
    { id: 2, name: "Français" },
    { id: 3, name: "Italien" },
    { id: 4, name: "Mexicain" },
    { id: 5, name: "Végétarien" },
  ]);

  const addCategory = (newCategory) => {
    const newId =
      categories.value.length > 0
        ? categories.value[categories.value.length - 1].id + 1
        : 1;
    categories.value.push({ id: newId, name: newCategory.name });
  };

  const updateCategory = (updatedCategory) => {
    const index = categories.value.findIndex(
      (cat) => cat.id === updatedCategory.id
    );
    if (index !== -1) {
      categories.value[index].name = updatedCategory.name;
    }
  };

  const deleteCategory = (categoryId) => {
    categories.value = categories.value.filter((cat) => cat.id !== categoryId);
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
});
