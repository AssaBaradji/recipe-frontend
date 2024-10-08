<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import { useI18n } from "vue-i18n";
import { useRecipeStore } from "@store/recipeStore";

const store = useRecipeStore();
const recettetModal = ref(null);
const route = useRouter();
const { t } = useI18n();

// Assurez-vous que les données sont chargées lorsque le composant est monté
onMounted(async () => {
  await store.loadDataFromApi(); // Appelle la fonction pour charger les données
  const modalElement = recettetModal.value;
  const bootstrapModal = new Modal(modalElement);
  bootstrapModal.show();
});

// Accédez aux recettes directement
const selectedRecipeIndex = store.val; // Supposons que store.val est défini correctement
const recipes = store.recettes.value; // Accès à la valeur de la ref
</script>

<template>
  <div class="container-fluid">
    <div
      class="modal fade"
      id="modalId"
      ref="recettetModal"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="false"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="text-center fw-bold" id="modalTitleId">
              {{ t("recipes.view_form.champ_detail") }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="route.push({ name: 'recette' })"
            ></button>
          </div>

          <div class="modal-body">
            <p v-if="recipes[selectedRecipeIndex].title">
              <span class="fw-bold">{{ t("recipes.view_form.champ_titre") }} :</span>
              {{ recipes[selectedRecipeIndex].title }}
            </p>

            <p v-if="recipes[selectedRecipeIndex].type">
              <span class="fw-bold">{{ t("recipes.view_form.champ_type") }} :</span>
              {{ recipes[selectedRecipeIndex].type }}
            </p>

            <table class="table">
              <thead>
                <tr>
                  <th>{{ t("recipes.view_form.champ_categorie") }}</th>
                  <th>{{ t("recipes.view_form.champ_ingredient") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="2">
                    {{ recipes[selectedRecipeIndex].category || "-" }}
                  </td>
                </tr>

                <tr>
                  <td>{{ recipes[selectedRecipeIndex].ingredient }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="modal-footer d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="route.push({ name: 'recette' })"
            >
              {{ t("recipes.view_form.button_close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
