<script setup>
import { onMounted } from "vue";
import { useCategoryStore } from "@store/categoryStore";
import { useRouter } from "vue-router";

const store = useCategoryStore();
const router = useRouter();

onMounted(() => {
  store.loadCategoriesFromAPI();
});

const goToAddCategoryPage = () => {
  router.push({ name: 'category-add' });
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center fw-bold text-warning">Liste des Catégories</h1>

    <div class="text-end mb-4">
      <button class="btn btn-warning fw-bold" @click="goToAddCategoryPage">
        <i class="fas fa-plus"></i> Ajouter une catégorie
      </button>
    </div>

    <div v-if="store.categories.length === 0" class="text-center">
      <p>Aucune catégorie trouvée.</p>
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in store.categories" :key="category.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ category.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
