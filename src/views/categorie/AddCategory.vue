<template>
  <div>
    <div v-if="isAdding">
      <h3>Ajouter une nouvelle catégorie</h3>
      <form @submit.prevent="submitAddForm">
        <div class="mb-3">
          <input v-model="newCategoryName" class="form-control" type="text" placeholder="Nom de la catégorie" />
        </div>
        <button class="btn btn-primary" type="submit">Ajouter</button>
        <button class="btn btn-secondary" @click="cancelAdd">Annuler</button>
      </form>
    </div>

    <div v-if="!isAdding">
      <button @click="showAddForm" class="btn btn-success">
        Ajouter une nouvelle catégorie
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCategoryStore } from "../../store/categoryStore";

const categoryStore = useCategoryStore();

const isAdding = ref(false);
const newCategoryName = ref("");

const showAddForm = () => {
  isAdding.value = true;
  newCategoryName.value = "";
};

const cancelAdd = () => {
  isAdding.value = false;
};

const submitAddForm = async () => {
  if (newCategoryName.value.trim()) {
    await categoryStore.addCategory({ name: newCategoryName.value });
    isAdding.value = false;
    newCategoryName.value = ""; 
  }
};
</script>

<style scoped>
button {
  margin-inline-end: 0.5rem;
}
</style>
