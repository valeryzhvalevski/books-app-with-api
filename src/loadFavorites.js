export async function loadFavorites(favoritesContainer) {
    try {
        const response = await fetch("http://localhost:3001/books");
        if (!response.ok) {
            throw new Error("Ошибка при загрузке избранных книг");
        }
        const books = await response.json();
        books.forEach(book => {
            const favoriteBook = document.createElement("div");
            favoriteBook.classList.add("book-genre");
            
            favoriteBook.dataset.bookId = book.id;

            const favoriteBookTitle = document.createElement("h4");
            favoriteBookTitle.textContent = book.title;

            const favoriteBookCover = document.createElement("img");
            favoriteBookCover.src = book.coverUrl;
            favoriteBookCover.alt = book.title;

            const favoriteBookLink = document.createElement("a");
            favoriteBookLink.href = book.link;
            favoriteBookLink.target = "_blank";
            favoriteBookLink.textContent = "Ссылка на книгу";

            const removeFromFavoritesBtn = document.createElement("button");
            removeFromFavoritesBtn.textContent = "Удалить из избранного";
            removeFromFavoritesBtn.classList.add("remove-book"); 
            
            removeFromFavoritesBtn.addEventListener("click", async function() {
                try {
                    const bookId = favoriteBook.dataset.bookId; 
                    const response = await fetch(`http://localhost:3001/books/${bookId}`, {
                        method: "DELETE"
                    });
                    if (!response.ok) {
                        throw new Error("Ошибка при удалении избранной книги");
                    }
                    favoriteBook.remove();
                } catch (error) {
                    console.error("Ошибка при удалении избранной книги:", error);
                }
            });
            
            favoriteBook.appendChild(favoriteBookTitle);
            favoriteBook.appendChild(favoriteBookCover);
            favoriteBook.appendChild(favoriteBookLink);
            favoriteBook.appendChild(removeFromFavoritesBtn); 

            favoritesContainer.appendChild(favoriteBook);
        });
    } catch (error) {
        console.error("Ошибка при загрузке избранных книг:", error);
    }
}
