<script setup>
import { ref, onMounted } from "vue";
import { useRecipeStore } from "@store/recipeStore";
import { useCategoryStore } from "@store/categoryStore";
import { useRouter } from "vue-router";

const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore();
const router = useRouter();
const newRecipe = ref({ title: '', type: '', ingredients: '', categoryId: '' });

const recipeId = router.currentRoute.value.params.id;

onMounted(async () => {
  if (recipeId) {
    const recette = await recipeStore.getRecipeById(recipeId);
    newRecipe.value = recette;
  }

  await categoryStore.loadCategoriesFromAPI();
});


const saveRecipe = async () => {
  await recipeStore.editRecipe(newRecipe.value);
  router.push({ name: 'recette' });
};
</script>

<template>
  <div class="container mt-5">
    <div class="p-4 bg-light rounded shadow-sm">
      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-pen"></i>&nbsp;Titre de la recette
        </span>
        <input type="text" class="form-control" placeholder="Titre de la recette" v-model="newRecipe.title" />
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-utensils"></i>&nbsp;Type
        </span>
        <select class="form-select" v-model="newRecipe.type">
          <option value="Entrée">Entrée</option>
          <option value="Plat">Plat Principal</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-carrot"></i>&nbsp;Ingrédients
        </span>
        <input type="text" class="form-control" placeholder="Liste des ingrédients (séparés par des virgules)"
          v-model="newRecipe.ingredients" />
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-tags"></i>&nbsp;Catégorie
        </span>
        <select class="form-select" v-model="newRecipe.categoryId">
          <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <button class="btn btn-warning w-100 fw-bold" @click="saveRecipe">
        <i class="fas fa-save"></i> Sauvegarder
      </button>
    </div>
  </div>
</template>

<style scoped></style>
