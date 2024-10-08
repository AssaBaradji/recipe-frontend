<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center fw-bold text-warning">{{ t("category.table.titre_list") }}</h1>

    <div class="text-end mb-4">
      <button class="btn btn-warning fw-bold" @click="goToAddCategoryPage">
        <i class="fas fa-plus"></i> {{ t("category.table.Add_category") }}
      </button>
    </div>

    <div v-if="store.categories.length === 0" class="text-center">
      <p>{{ t("category.table.message_found") }}</p>
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{ t("category.table.name") }}</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in store.categories" :key="category.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ category.name }}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-danger" @click="openConfirmationModal(category.id)">
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
            <h5 class="modal-title">{{ t("category.table.destroyconfirm") }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>{{ t("recipes.table.destroyconfirm2") }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">{{ t("category.table.annuler") }}</button>
            <button type="button" class="btn btn-danger" @click="confirmDeleteCategory">{{ t("category.table.delete") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoryStore } from "@store/categoryStore";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";


const { t } = useI18n();
const store = useCategoryStore();
const router = useRouter();
const showModal = ref(false);
const selectedCategoryId = ref(null);

onMounted(() => {
  store.loadCategoriesFromAPI();
});

const goToAddCategoryPage = () => {
  router.push({ name: 'category-add' });
};

// Ouvrir le modal de confirmation
const openConfirmationModal = (categoryId) => {
  selectedCategoryId.value = categoryId;
  showModal.value = true;
};

// Confirmer la suppression
const confirmDeleteCategory = async () => {
  if (selectedCategoryId.value) {
    console.log("ID de la catégorie à supprimer:", selectedCategoryId.value); // Log de l'ID
    await store.deleteCategory(selectedCategoryId.value);
    showModal.value = false;
    selectedCategoryId.value = null;
    // Recharge les catégories après la suppression
    await store.loadCategoriesFromAPI();
  }
};

// Fermer le modal
const closeModal = () => {
  showModal.value = false;
  selectedCategoryId.value = null;
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
