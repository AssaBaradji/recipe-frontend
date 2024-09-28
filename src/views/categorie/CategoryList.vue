<template>
  <div class="container">
    <h1 class="mt-3 mb-4 text-center fw-bold">{{ t("category.title") }}</h1>

    <div class="d-flex justify-content-center align-items-center mb-4">
      <button class="btn btn-warning btn-lg mt-4 mb-2" @click="toggleAddForm">
        <i class="fas fa-plus me-2"></i> {{ t("category.Added") }}
      </button>
    </div>

    <div v-if="showForm" class="mb-4">
      <h3 v-if="editingCategory" class="mb-3">
        {{ t("category.editCategory") }}
      </h3>
      <h3 v-else class="mb-3">{{ t("category.addCategory") }}</h3>

      <form @submit.prevent="submitForm" class="p-4 rounded shadow bg-light">
        <div class="mb-3">
          <label for="categoryName" class="form-label text-primary fs-5">{{
            t("category.nameLabel")
          }}</label>
          <input
            type="text"
            id="categoryName"
            v-model="categoryForm.name"
            class="form-control form-control-lg border-info shadow-sm"
            :placeholder="t('category.namePlaceholder')"
            required
          />
        </div>

        <div class="mt-4 d-flex justify-content-end">
          <button type="submit" class="btn btn-lg btn-warning me-2">
            {{
              editingCategory ? t("category.saveChanges") : t("category.add")
            }}
          </button>
          <button
            type="button"
            class="btn btn-lg btn-danger"
            @click="cancelForm"
          >
            {{ t("category.cancel") }}
          </button>
        </div>
      </form>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-striped table-bordered shadow-sm">
        <thead class="bg-warning text-dark">
          <tr>
            <th scope="col" class="text-center">#</th>
            <th scope="col" class="text-center">{{ t("category.name") }}</th>
            <th scope="col" class="text-center">{{ t("category.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="categories.length === 0">
            <td colspan="4" class="text-danger text-center fw-bold py-3">
              {{ t("category.message") }}
            </td>
          </tr>

          <tr v-else v-for="category in categories" :key="category.id">
            <td class="text-center">{{ category.id }}</td>
            <td class="text-center">
              {{ category.name }}
            </td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-outline-secondary me-2"
                @click="editCategory(category)"
              >
                <i class="fas fa-edit"></i> {{ t("category.edit") }}
              </button>
              <button
                @click="deleteCategory(category.id)"
                class="btn btn-sm btn-outline-danger"
              >
                <i class="fas fa-trash"></i> {{ t("category.delete") }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const categories = ref([
  { id: 1, name: "Américain" },
  { id: 2, name: "Français" },
  { id: 3, name: "Italien" },
  { id: 4, name: "Mexicain" },
  { id: 5, name: "Végétarien" },
]);

const showForm = ref(false);
const editingCategory = ref(null);
const categoryForm = ref({
  id: null,
  name: "",
});

// Afficher le formulaire d'ajout/modification
const toggleAddForm = () => {
  showForm.value = !showForm.value;
  categoryForm.value = { id: null, name: "" }; // Réinitialiser le formulaire
};

// Soumettre le formulaire (ajouter ou modifier)
const submitForm = () => {
  if (editingCategory.value) {
    // Modifier une catégorie existante
    const categoryIndex = categories.value.findIndex(
      (c) => c.id === editingCategory.value.id
    );
    if (categoryIndex !== -1) {
      categories.value[categoryIndex].name = categoryForm.value.name;
    }
    editingCategory.value = null;
  } else {
    // Ajouter une nouvelle catégorie
    const newCategory = {
      id: categories.value.length + 1,
      name: categoryForm.value.name,
    };
    categories.value.push(newCategory);
  }

  toggleAddForm(); // Fermer le formulaire après soumission
};

// Annuler l'ajout ou la modification
const cancelForm = () => {
  editingCategory.value = null;
  toggleAddForm();
};

// Modifier une catégorie (remplir le formulaire avec les données de la catégorie sélectionnée)
const editCategory = (category) => {
  editingCategory.value = category;
  categoryForm.value = { ...category };
  showForm.value = true;
};

// Supprimer une catégorie
const deleteCategory = (categoryId) => {
  categories.value = categories.value.filter((c) => c.id !== categoryId);
};
</script>

<style scoped>
.table {
  inline-size: 100%;
  margin-block-start: 20px;
}

.table th,
.table td {
  text-align: center;
}

.table th {
  background-color: #f8f9fa;
}

.btn {
  margin-inline-start: 5px;
}
form {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 10px;
  padding: 20px;
}

form .form-control {
  border-width: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form .btn {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
