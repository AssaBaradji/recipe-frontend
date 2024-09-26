<script setup>
import { useRecipeStore } from "@store/recipeStore";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const store = useRecipeStore();
const recipes = store.recipes;
const route = useRouter();
const { t } = useI18n();

const destroy = (index) => {
  const confirm = window.confirm(
    t('recipes.table.confirmDelete', { recipeTitle: recipes[index].title })
  );
  if (confirm) {
    store.del(index);
  }
};
</script>

<template>
  <div class="container">
    <!-- Titre de la section -->
    <h1 class="mt-3 mb-4 text-center fw-bold">{{ t('recipes.title') }}</h1>

    <!-- Bouton pour ajouter une nouvelle recette -->
    <div class="d-flex justify-content-center align-items-center mb-4">
      <button class="btn btn-warning btn-lg mt-4 mb-2" @click="route.push({ name: 'recette-add' })">
        <i class="fas fa-plus me-2"></i> {{ t('recipes.addNew') }}
      </button>
    </div>

    <!-- Tableau des recettes -->
    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered shadow-sm">
        <thead class="bg-warning text-dark">
          <tr>
            <th scope="col" class="text-center">{{ t('recipes.table.number') }}</th>
            <th scope="col" class="text-center">{{ t('recipes.table.title') }}</th>
            <th scope="col" class="text-center">{{ t('recipes.table.type') }}</th>
            <th scope="col" class="text-center">{{ t('recipes.table.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- Message quand il n'y a aucune recette -->
          <tr v-if="recipes.length === 0">
            <td colspan="4" class="text-danger text-center fw-bold py-3">
              {{ t('recipes.noRecipes') }}
            </td>
          </tr>
          <!-- Liste des recettes -->
          <tr v-else v-for="(recipe, index) in recipes" :key="recipe.id">
            <td class="text-center">{{ recipe.id }}</td>
            <td class="text-center">{{ recipe.title }}</td>
            <td class="text-center">{{ recipe.type }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-primary me-2" @click="
                store.get(index),
                route.push({ name: 'recette-show', params: { id: recipe.id } })
                ">
                <i class="fas fa-eye"></i> {{ t('recipes.buttons.view') }}
              </button>
              <button class="btn btn-sm btn-outline-secondary me-2" @click="
                store.get(index),
                route.push({ name: 'recette-edit', params: { id: recipe.id } })
                ">
                <i class="fas fa-edit"></i> {{ t('recipes.buttons.edit') }}
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="destroy(index)">
                <i class="fas fa-trash"></i> {{ t('recipes.buttons.delete') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Vos styles ici */
</style>
