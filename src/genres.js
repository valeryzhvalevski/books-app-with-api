import { addToFavorites } from "./addToFavorites.js";
import { loadFavorites } from "./loadFavorites.js"; 

document.addEventListener("DOMContentLoaded", function() {
    const genreContainer = document.getElementById("genre-container");
    const genreContent = document.getElementById("genre-container__content");
    const btnMore = document.getElementById("genre-container__btn-more");
    const favoritesContainer = document.getElementById("favorites-container");

    let start = 0; 
    const limit = 15; 
    let favorites = []; 

    function loadBooks() {
        const genre = genreContainer.dataset.genre; 
        btnMore.textContent = "Loading..."; 
        fetch(`https://openlibrary.org/subjects/${genre}.json?limit=${limit}&offset=${start}`)
            .then(response => response.json())
            .then(data => {
                data.works.forEach(book => {
                    const title = book.title;
                    const coverId = book.cover_id ? book.cover_id : "default"; 
                    const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
                    const link = `https://openlibrary.org${book.key}`; 

                    const bookDiv = document.createElement("div");
                    bookDiv.classList.add("book-genre");

                    const bookTitle = document.createElement("h4");
                    bookTitle.textContent = title;

                    const bookCover = document.createElement("img");
                    bookCover.src = coverUrl;
                    bookCover.alt = title;

                    const addToFavoritesBtn = document.createElement("button");
                    addToFavoritesBtn.textContent = "Add to favorites";

                    addToFavoritesBtn.addEventListener("click", function() {
                        if (!favorites.includes(title)) {
                            favorites.push(title); 
                            const favoriteBook = document.createElement("div");
                            favoriteBook.classList.add("book-genre");
                
                            const favoriteBookTitle = document.createElement("h4");
                            favoriteBookTitle.textContent = title;
                
                            const favoriteBookCover = document.createElement("img");
                            favoriteBookCover.src = coverUrl;
                            favoriteBookCover.alt = title;
                
                            const favoriteBookLink = document.createElement("a");
                            favoriteBookLink.href = link;
                            favoriteBookLink.target = "_blank";
                            favoriteBookLink.textContent = "Ссылка на книгу";
                
                            favoriteBook.appendChild(favoriteBookTitle);
                            favoriteBook.appendChild(favoriteBookCover);
                            favoriteBook.appendChild(favoriteBookLink);
                
                            favoritesContainer.appendChild(favoriteBook);
                            addToFavorites(title, coverUrl, link); 
                            addToFavoritesBtn.textContent = "Added to favorites";
                            addToFavoritesBtn.style.backgroundColor = "#318124"; 
                        } else {
                            favorites = favorites.filter(item => item !== title); 

                            const bookToDelete = Array.from(favoritesContainer.querySelectorAll(".book-genre")).find(book => {
                                return book.querySelector("h4").textContent === title;
                            });

                            if (bookToDelete) {
                                favoritesContainer.removeChild(bookToDelete);
                            }

                            addToFavoritesBtn.textContent = "Add to favorites";
                            addToFavoritesBtn.style.backgroundColor = ""; 
                        }
                    });

                    bookDiv.appendChild(bookTitle);
                    bookDiv.appendChild(bookCover);
                    bookDiv.appendChild(addToFavoritesBtn);

                    genreContent.appendChild(bookDiv);
                });
                btnMore.textContent = "More"; 
            })
            .catch(error => {
                console.error("Error loading books:", error);
                btnMore.textContent = "More"; 
            });
        
        start += limit; 
    }

    btnMore.addEventListener("click", function() {
        loadBooks();
    });

    function showGenreContent(genre) {
        genreContainer.style.display = "block";
        genreContent.innerHTML = ""; 
        genreContainer.dataset.genre = genre; 
        start = 0; 
        loadBooks(); 
    }

    // Событие при клике на жанр
    const genres = document.querySelectorAll(".genre");
    genres.forEach(genre => {
        genre.addEventListener("click", function() {
            const selectedGenre = this.id;
            showGenreContent(selectedGenre);
        });
    });

    genres.forEach(genre => {
        genre.addEventListener("click", function() {
            genres.forEach(genre => {
                const h3Elements = genre.querySelectorAll("h3");
                h3Elements.forEach(h3 => {
                    h3.style.backgroundColor = ""; 
                });
            });
            
            const h3Elements = this.querySelectorAll("h3");
            h3Elements.forEach(h3 => {
                h3.style.backgroundColor = "rgb(80 153 216)"; 
            });
        });
    });

    loadFavorites(favoritesContainer);

//удаление 
favoritesContainer.addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("remove-book")) {
        const bookContainer = target.closest(".book-genre");
        if (bookContainer) {
            const title = bookContainer.querySelector("h4").textContent;
            favorites = favorites.filter(item => item !== title);
            favoritesContainer.removeChild(bookContainer);
        }
    }
});
});
