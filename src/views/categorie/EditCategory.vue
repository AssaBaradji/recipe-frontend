<template>
  <div>
    <div v-if="isEditing">
      <h3>Modifier la catégorie</h3>
      <form @submit.prevent="submitEditForm">
        <div class="mb-3">
          <input
            v-model="editedCategoryName"
            class="form-control"
            type="text"
            placeholder="Nom de la catégorie"
          />
        </div>
        <button class="btn btn-primary" type="submit">Modifier</button>
        <button class="btn btn-secondary" @click="cancelEdit">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCategoryStore } from "../../store/categoryStore";

const categoryStore = useCategoryStore();

const isEditing = ref(true);
const editedCategoryName = ref("");
const selectedCategory = ref(null);

const showEditForm = (category) => {
  selectedCategory.value = category;
  editedCategoryName.value = category.name;
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  selectedCategory.value = null;
};

const submitEditForm = () => {
  if (editedCategoryName.value.trim()) {
    categoryStore.updateCategory({
      id: selectedCategory.value.id,
      name: editedCategoryName.value,
    });
    isEditing.value = false;
  }
};
</script>

<style scoped>
button {
  margin-inline-end: 0.5rem;
}
</style>
