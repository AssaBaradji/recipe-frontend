import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/css/style.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@router';
import App from './App.vue';
import CustomButton from '@/components/CustomButton.vue';
import { createI18n } from 'vue-i18n';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { dom } from "@fortawesome/fontawesome-svg-core";

dom.watch();

// Ajouter les icônes FontAwesome
library.add(fas, fab, far);

// Messages pour les traductions (anglais et français)
const messages = {
    en: {
        recipes: {
            title: "My Recipes",
            noRecipes: "No Recipes Saved",
            addNew: "New Recipe",
            table: {
                number: "No.",
                title: "Title",
                type: "Type",
                actions: "Actions",
                confirmDelete: "Are you sure you want to delete the recipe {recipeTitle}?"
            },
            buttons: {
                view: "View",
                edit: "Edit",
                delete: "Delete"
            },
            addForm: {
                title: "Add a New Recipe",
                recipeTitle: "Title",
                recipeTitlePlaceholder: "Enter the recipe title",
                recipeType: "Type",
                ingredients: "Ingredients",
                ingredientsPlaceholder: "List of ingredients",
                save: "Save Recipe"
            }
        }
    },
    fr: {
        recipes: {
            title: "Mes Recettes",
            noRecipes: "Aucune Recette Enregistrée",
            addNew: "Nouvelle Recette",
            table: {
                number: "N°",
                title: "Titres",
                type: "Type",
                actions: "Actions",
                confirmDelete: "Vous êtes sûr de vouloir supprimer la recette {recipeTitle} ?"
            },
            buttons: {
                view: "Voir",
                edit: "Modifier",
                delete: "Supprimer"
            },
            addForm: {
                title: "Ajouter une Nouvelle Recette",
                recipeTitle: "Titre",
                recipeTitlePlaceholder: "Entrez le titre de la recette",
                recipeType: "Type",
                ingredients: "Ingrédients",
                ingredientsPlaceholder: "Liste des ingrédients",
                save: "Enregistrer la Recette"
            }
        }
    }
};

// Initialisation de vue-i18n
const i18n = createI18n({
    locale: 'fr', // Langue par défaut
    fallbackLocale: 'en', // Langue de secours
    messages,
});

const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component('CustomBtn', CustomButton);

app.use(i18n);
app.use(pinia);
app.use(router);
app.mount('#app');
