<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRecipeStore } from "@store/recipeStore";
import { useI18n } from "vue-i18n";

const route = useRouter();
const store = useRecipeStore();
const { t } = useI18n(); // Utilisation de vue-i18n pour la traduction

const newRecipe = ref({
  title: "",
  type: "",
  ingredients: [],
});
</script>

<template>
  <div class="container mt-5">
    <!-- Titre de la page avec traduction -->
    <h1 class="mb-4 text-center fw-bold text-warning">{{ t('recipes.addForm.title') }}</h1>

    <div class="p-4 bg-light rounded shadow-sm">
      <!-- Titre de la recette avec traduction -->
      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-pen"></i>&nbsp;{{ t('recipes.addForm.recipeTitle') }}
        </span>
        <input type="text" class="form-control" :placeholder="t('recipes.addForm.recipeTitlePlaceholder')"
          v-model="newRecipe.title" />
      </div>

      <!-- Type de la recette avec traduction -->
      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-utensils"></i>&nbsp;{{ t('recipes.addForm.recipeType') }}
        </span>
        <select class="form-select" v-model="newRecipe.type">
          <option value="Entrée">{{ t('recipes.table.starter') }}</option>
          <option value="Plat">{{ t('recipes.table.mainCourse') }}</option>
          <option value="Dessert">{{ t('recipes.table.dessert') }}</option>
        </select>
      </div>

      <!-- Ingrédients de la recette avec traduction -->
      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-carrot"></i>&nbsp;{{ t('recipes.addForm.ingredients') }}
        </span>
        <input type="text" class="form-control" :placeholder="t('recipes.addForm.ingredientsPlaceholder')"
          v-model="newRecipe.ingredients" />
      </div>

      <!-- Bouton d'enregistrement avec traduction -->
      <button class="btn btn-warning w-100 fw-bold" @click="store.add(newRecipe); route.push({ name: 'recette' })">
        <i class="fas fa-save"></i> {{ t('recipes.addForm.save') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
