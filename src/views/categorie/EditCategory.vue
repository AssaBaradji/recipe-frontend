<template>
  <div>
    <div v-if="isEditing">
      <h3>{{ t("category.table.editTitle") }}</h3>
      <form @submit.prevent="submitEditForm">
        <div class="mb-3">
          <input
            v-model="editedCategoryName"
            class="form-control"
            type="text"
            placeholder="t('category.addForm_category.formName')"
          />
        </div>
        <button class="btn btn-primary" type="submit">{{ t('category.addForm_category.formbutton') }}</button>
        <button class="btn btn-secondary" @click="cancelEdit">{{ t('category.addForm_category.buttonCancel') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useCategoryStore } from "../../store/categoryStore";


const categoryStore = useCategoryStore();
const { t } = useI18n();

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
