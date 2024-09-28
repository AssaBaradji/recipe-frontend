<script setup>
import { onMounted } from "vue";
import { useRecipeStore } from "@store/recipeStore";
import { useRouter } from "vue-router";

const store = useRecipeStore();
const router = useRouter();

onMounted(() => {
  store.loadDataFromApi();
});                

const goToAddRecipePage = () => {
  router.push({ name: 'recette-add' });
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center fw-bold text-warning">Liste des Recettes</h1>

    <div class="text-end mb-4">
      <button class="btn btn-warning fw-bold" @click="goToAddRecipePage">
        <i class="fas fa-plus"></i> Ajouter une recette
      </button>
    </div>

    <div v-if="store.recettes.length === 0" class="text-center">
      <p>Aucune recette trouvée.</p>
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titre</th>
          <th scope="col">Type</th>
          <th scope="col">Ingrédient</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(recette, index) in store.recettes" :key="recette.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ recette.title }}</td>
          <td>{{ recette.type }}</td>
          <td>{{ recette.ingredient }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
