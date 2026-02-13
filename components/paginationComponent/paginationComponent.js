// cardComponent.js

import { component } from "../../core/component.js";
import { APP_SETTINGS } from "../../appSettings.js";
import { startSearch } from "../../services/userInterfaceService.js";

class paginationComponent extends component {
  constructor() {
    super(
      null,
      "./components/paginationComponent/paginationComponent.css",
      "./components/paginationComponent/paginationComponent.html",
    );
  }

  getPaginationComponent(numberPerPage, numberOfItems, currentPage = 1) {
    let card = this.template.cloneNode(true);

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(numberOfItems / numberPerPage);

    // Récupération du conteneur des numéros
    const paginationNumbers = card.querySelector(".pagination-numbers");

    // Vider le conteneur
    paginationNumbers.innerHTML = "";

    // Génération des numéros de page
    const pageNumbers = this.getPageNumbers(currentPage, totalPages);

    pageNumbers.forEach((pageNum) => {
      if (pageNum === "...") {
        // Créer un élément ellipsis
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.textContent = "...";
        paginationNumbers.appendChild(ellipsis);
      } else {
        // Créer un bouton de page
        const button = document.createElement("button");
        button.className = "pagination-page";
        button.textContent = pageNum;

        // Marquer la page active
        if (pageNum === currentPage) {
          button.classList.add("active");
        }

        // Ajouter l'événement de clic
        button.addEventListener("click", () => {
          this.goToPage(pageNum);
        });

        paginationNumbers.appendChild(button);
      }
    });

    // Gérer les boutons précédent/suivant
    const prevBtn = card.querySelector(".pagination-prev");
    const nextBtn = card.querySelector(".pagination-next");

    // Désactiver le bouton précédent si on est sur la première page
    if (currentPage === 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.addEventListener("click", () => {
        this.goToPage(currentPage - 1);
      });
    }

    // Désactiver le bouton suivant si on est sur la dernière page
    if (currentPage === totalPages) {
      nextBtn.disabled = true;
    } else {
      nextBtn.addEventListener("click", () => {
        this.goToPage(currentPage + 1);
      });
    }

    return card;
  }

  /**
   * Génère la liste des numéros de page à afficher
   * Avec ellipsis (...) pour les grandes plages
   */
  getPageNumbers(currentPage, totalPages) {
    const pages = [];
    const maxVisible = 5; // Nombre maximum de boutons visibles

    if (totalPages <= maxVisible) {
      // Si peu de pages, afficher toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logique avec ellipsis
      if (currentPage <= 3) {
        // Début : 1 2 3 4 ... dernière
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Fin : 1 ... avant-dernière-2 avant-dernière-1 avant-dernière dernière
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu : 1 ... currentPage-1 currentPage currentPage+1 ... dernière
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  }

  /**
   * Méthode à implémenter pour gérer le changement de page
   */
  goToPage(pageNumber) {
    if (document.getElementById("searchInput").value.length > 0) {
      let value = document.getElementById("searchInput").value;
      startSearch(
        APP_SETTINGS.API_URL,
        APP_SETTINGS.SEARCHED_ATTRIBUTE,
        value,
        pageNumber,
      );
    }
  }
}

export { paginationComponent };
