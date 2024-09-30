<script setup>
import { ref, onMounted } from "vue";
import { useRecipeStore } from "@store/recipeStore";
import { useCategoryStore } from "@store/categoryStore";
import { useRouter } from "vue-router";

const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const showModal = ref(false);
const selectedRecipeId = ref(null);

onMounted(() => {
  recipeStore.loadDataFromApi();
  categoryStore.loadCategoriesFromAPI();
});

// Rediriger vers la page d'ajout de recettes
const goToAddRecipePage = () => {
  router.push({ name: 'recette-add' });
};

// Ouvrir le modal de confirmation
const openConfirmationModal = (recipeId) => {
  selectedRecipeId.value = recipeId;
  showModal.value = true;
};

// Confirmer la suppression
const confirmDeleteRecipe = async () => {
  if (selectedRecipeId.value) {
    await recipeStore.deleteRecipeFromAPI(selectedRecipeId.value);
    showModal.value = false;
    selectedRecipeId.value = null;
  }
};

// Fermer le modal
const closeModal = () => {
  showModal.value = false;
  selectedRecipeId.value = null;
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

    <div v-if="recipeStore.recettes.length === 0" class="text-center">
      <p>Aucune recette trouvée.</p>
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titre</th>
          <th scope="col">Type</th>
          <th scope="col">Ingrédients</th>
          <th scope="col">Catégorie</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(recette, index) in recipeStore.recettes" :key="recette.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ recette.title }}</td>
          <td>{{ recette.type }}</td>
          <td>{{ recette.ingredient }}</td>
          <td>{{ recette.category?.name || 'Non définie' }}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-primary me-2">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-outline-secondary me-2">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="openConfirmationModal(recette.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de confirmation -->
    <div v-if="showModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmer la suppression</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir supprimer cette recette ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
            <button type="button" class="btn btn-danger" @click="confirmDeleteRecipe">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style pour modal personnalisé */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
