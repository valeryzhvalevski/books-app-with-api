export async function addToFavorites(title, coverUrl, link) {
    try {
        const response = await fetch("http://localhost:3001/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                coverUrl: coverUrl,
                link: link
            })
        });
        
        if (!response.ok) {
            throw new Error("Ошибка при добавлении в избранное");
        }
        
        const data = await response.json();
        console.log("Книга успешно добавлена в избранное:", data);
    } catch (error) {
        console.error("Ошибка при добавлении в избранное:", error);
    }
}

// загрузкиа избранных книг
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

            const favoriteBookTitle = document.createElement("h4");
            favoriteBookTitle.textContent = book.title;

            const favoriteBookCover = document.createElement("img");
            favoriteBookCover.src = book.coverUrl;
            favoriteBookCover.alt = book.title;

            const favoriteBookLink = document.createElement("a");
            favoriteBookLink.href = book.link;
            favoriteBookLink.target = "_blank";
            favoriteBookLink.textContent = "Ссылка на книгу";

            favoriteBook.appendChild(favoriteBookTitle);
            favoriteBook.appendChild(favoriteBookCover);
            favoriteBook.appendChild(favoriteBookLink);

            favoritesContainer.appendChild(favoriteBook);
        });
    } catch (error) {
        console.error("Ошибка при загрузке избранных книг:", error);
    }
}
