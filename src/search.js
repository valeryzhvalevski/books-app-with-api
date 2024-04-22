document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const clearResultsButton = document.getElementById("clearResultsButton");
  const loader = document.getElementById("loader-main");
  const mainContainer = document.querySelector(".container-main");

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      alert("Please enter a search term");
      return;
    }

    try {
      loader.style.display = "flex";
      mainContainer.style.display = "none";

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      displaySearchResults(data.docs);

      loader.style.display = "none";
      mainContainer.style.display = "block";
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results. Please try again.");

      loader.style.display = "none";
      mainContainer.style.display = "block";
    }
  });

  clearResultsButton.addEventListener("click", () => {
    searchResults.innerHTML = "";
    searchInput.value = "";
  });

  function displaySearchResults(books) {
    searchResults.innerHTML = "";

    if (books.length === 0) {
      searchResults.innerHTML = "<p>No books found</p>";
      return;
    }

    books.forEach((book) => {
      const title = book.title;
      const author = book.author_name
        ? book.author_name.join(", ")
        : "Unknown Author";

      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
      bookElement.innerHTML = `
              <h3>${title}</h3>
              <p>Author: ${author}</p>
          `;

      bookElement.addEventListener("click", () => {
        window.location.href = `https://openlibrary.org${book.key}`;
      });

      searchResults.appendChild(bookElement);
    });
  }
});
