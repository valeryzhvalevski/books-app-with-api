// document.addEventListener("DOMContentLoaded", () => {
//     const genres = document.querySelectorAll(".genre");
//     const favoritesContainer = document.getElementById("favorites-container");
//     const loader = document.getElementById("loader-main");
//     const favorites = new Set(); 

//     // const showLoader = () => {
//     //     loader.style.display = "block"; // Показываем загрузчик
//     // };

//     // const hideLoader = () => {
//     //     loader.style.display = "none"; // Скрываем загрузчик
//     // };

//     const addToFavorites = (book) => {
//         const bookKey = book.key;
//         const bookTitle = book.title;
//         const button = event.target;

//         if (!favorites.has(bookKey)) {
//             favorites.add(bookKey);

//             const favoriteBookElement = document.createElement("div");
//             favoriteBookElement.classList.add("favorite-book");

//             const cover = document.createElement("img");
//             cover.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
//             favoriteBookElement.appendChild(cover);

//             const title = document.createElement("p");
//             title.textContent = bookTitle;
//             favoriteBookElement.appendChild(title);

//             favoritesContainer.appendChild(favoriteBookElement);

//             button.textContent = "Добавлено в избранное";
//             button.classList.add("added");
//         }
//     };

//     genres.forEach((genre) => {
//         const booksContainer = genre.querySelector(".books");
//         const moreButton = genre.querySelector(".more-btn");
//         let startIndex = 0; 
//         let booksToAdd = 6; 

//         // в контейнер
//         const addBooks = (booksData) => {
//             booksData.slice(0, booksToAdd).forEach((book) => {
//                 const bookElement = document.createElement("div");
//                 bookElement.classList.add("book");

//                 const title = document.createElement("p");
//                 title.textContent = book.title;
//                 bookElement.appendChild(title);

//                 if (book.cover_i) {
//                     const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
//                     const cover = document.createElement("img");
//                     cover.src = coverUrl;
//                     bookElement.appendChild(cover);
//                 } else {
//                     const defaultCoverUrl = "book.jpg"; 
//                     const defaultCover = document.createElement("img");
//                     defaultCover.src = defaultCoverUrl;
//                     bookElement.appendChild(defaultCover);
//                 }

//                 // в избранное
//                 const addToFavoritesButton = document.createElement("button");
//                 addToFavoritesButton.textContent = "Добавить в избранное";
//                 addToFavoritesButton.classList.add("add-to-favorites-btn");
//                 addToFavoritesButton.addEventListener("click", () => {
//                     addToFavorites(book);
//                 });
//                 bookElement.appendChild(addToFavoritesButton);

//                 bookElement.addEventListener("click", () => {
//                     if (!event.target.classList.contains("add-to-favorites-btn")) {
//                         window.location.href = `https://openlibrary.org${book.key}`;
//                     }
//                 });

//                 booksContainer.appendChild(bookElement);
//             });
//         };

//         // еще
//         const loadMoreBooks = () => {
//             fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(genre.id)}&limit=${booksToAdd}&offset=${startIndex}`)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch books');
//                     }
//                     return response.json();
//                 })
//                 .then((data) => {
//                     if (data.docs && data.docs.length > 0) {
//                         addBooks(data.docs);
//                         startIndex += booksToAdd; 
//                     } else {
//                         moreButton.disabled = true; 
//                         moreButton.textContent = "No more books";
//                     }
//                 })
//                 .catch((error) => console.error("Error fetching books:", error));
//         };

//         moreButton.addEventListener("click", loadMoreBooks);

//         loadMoreBooks();
//     });
// });



document.addEventListener("DOMContentLoaded", () => {
    const genres = document.querySelectorAll(".genre");
    const favorites = new Set(); // Множество для хранения избранных книг
    const favoritesContainer = document.getElementById("favorites-container");

    genres.forEach((genre) => {
        const booksContainer = genre.querySelector(".books");
        const moreButton = genre.querySelector(".more-btn");

        let startIndex = 0;
        let booksToAdd = 4;

        const addToFavorites = (book, event) => {
            const bookKey = book.key;
            const bookTitle = book.title;
            const button = event.target;
        
            if (favorites.has(bookKey)) {
                // Если книга уже в избранном, удаляем её
                favorites.delete(bookKey);
                // Удаляем соответствующий элемент из контейнера избранных книг
                const favoriteBookElement = favoritesContainer.querySelector(`[data-key="${bookKey}"]`);
                if (favoriteBookElement) {
                    favoritesContainer.removeChild(favoriteBookElement);
                }
                button.textContent = "Добавить в избранное";
                button.classList.remove("added");
            } else {
                // Если книга не в избранном, добавляем её
                favorites.add(bookKey);
        
                const favoriteBookElement = document.createElement("div");
                favoriteBookElement.classList.add("favorite-book");
                favoriteBookElement.setAttribute("data-key", bookKey);
        
                const cover = document.createElement("img");
                cover.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                favoriteBookElement.appendChild(cover);
        
                const title = document.createElement("p");
                title.textContent = bookTitle;
                favoriteBookElement.appendChild(title);
        
                favoritesContainer.appendChild(favoriteBookElement);
        
                button.textContent = "Добавлено в избранное";
                button.classList.add("added");
            }
        };
        

        const loadMoreBooks = () => {
            const loader = document.getElementById("loader-main");
            const mainContainer = document.querySelector('.container-main');
            loader.style.display = "block"; // Показываем загрузчик
            mainContainer.style.display = "none";
            fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(genre.id)}&limit=${booksToAdd}&offset=${startIndex}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch books');
                    }
                    return response.json();
                })
                .then((data) => {
                    loader.style.display = "none"; // Скрываем загрузчик
                    mainContainer.style.display = "block";
                    if (data.docs && data.docs.length > 0) {
                        data.docs.forEach((book) => {
                            const bookElement = document.createElement("div");
                            bookElement.classList.add("book");

                            const title = document.createElement("p");
                            title.textContent = book.title;
                            bookElement.appendChild(title);

                            if (book.cover_i) {
                                const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                                const cover = document.createElement("img");
                                cover.src = coverUrl;
                                bookElement.appendChild(cover);
                            } else {
                                const defaultCoverUrl = "book.jpg";
                                const defaultCover = document.createElement("img");
                                defaultCover.src = defaultCoverUrl;
                                bookElement.appendChild(defaultCover);
                            }

                            const addToFavoritesButton = document.createElement("button");
                            addToFavoritesButton.textContent = "Добавить в избранное";
                            addToFavoritesButton.classList.add("add-to-favorites-btn");
                            addToFavoritesButton.addEventListener("click", (event) => {
                                addToFavorites(book, event);
                            });
                            bookElement.appendChild(addToFavoritesButton);

                            bookElement.addEventListener("click", () => {
                                if (!event.target.classList.contains("add-to-favorites-btn")) {
                                    window.location.href = `https://openlibrary.org${book.key}`;
                                }
                            });

                            booksContainer.appendChild(bookElement);
                        });
                        startIndex += booksToAdd;
                    } else {
                        moreButton.disabled = true;
                        moreButton.textContent = "No more books";
                    }
                })
                .catch((error) => {
                    loader.style.display = "none"; // Скрываем загрузчик в случае ошибки
                    console.error("Error fetching books:", error);
                });
        };

        moreButton.addEventListener("click", loadMoreBooks);

        loadMoreBooks();
    });
});
