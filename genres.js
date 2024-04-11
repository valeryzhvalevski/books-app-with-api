document.addEventListener("DOMContentLoaded", function() {
    const genreContainer = document.getElementById("genre-container");
    const genreContent = document.getElementById("genre-container__content");
    const btnMore = document.getElementById("genre-container__btn-more");

    let start = 0; // Начальное значение индекса книги
    const limit = 15; // Количество книг, которые будут загружены за раз

    // Функция для загрузки и отображения книг
    function loadBooks() {
        const genre = genreContainer.dataset.genre; // Получаем значение жанра из data-атрибута
        btnMore.textContent = "Loading..."; // Изменяем текст кнопки на "Loading"
        fetch(`https://openlibrary.org/subjects/${genre}.json?limit=${limit}&offset=${start}`)
            .then(response => response.json())
            .then(data => {
                data.works.forEach(book => {
                    const title = book.title;
                    const coverId = book.cover_id ? book.cover_id : "default"; // Проверяем наличие обложки
                    const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
                    const link = `https://openlibrary.org${book.key}`; // Ссылка на книгу

                    // Создаем элементы для отображения книги
                    const bookDiv = document.createElement("a");
                    bookDiv.classList.add("book-genre");
                    bookDiv.href = link;
                    bookDiv.target = "_blank"; 

                    const bookTitle = document.createElement("h4");
                    bookTitle.textContent = title;

                    const bookCover = document.createElement("img");
                    bookCover.src = coverUrl;
                    bookCover.alt = title;

                    bookDiv.appendChild(bookTitle);
                    bookDiv.appendChild(bookCover);

                    genreContent.appendChild(bookDiv);
                });
                btnMore.textContent = "More"; // Возвращаем исходный текст кнопки после загрузки
            })
            .catch(error => {
                console.error("Error loading books:", error);
                btnMore.textContent = "More"; // Возвращаем исходный текст кнопки в случае ошибки
            });
        
        start += limit; // Увеличиваем начальное значение индекса для загрузки следующих книг
    }

    // Событие при клике на кнопку "More"
    btnMore.addEventListener("click", function() {
        loadBooks();
    });

    // Функция для отображения контента по выбранному жанру
    function showGenreContent(genre) {
        genreContainer.style.display = "block";
        genreContent.innerHTML = ""; // Очищаем контент при смене жанра
        genreContainer.dataset.genre = genre; // Устанавливаем значение жанра в data-атрибут
        start = 0; // Сбрасываем значение начального индекса
        loadBooks(); // Загружаем книги
    }

    // Событие при клике на жанр
    const genres = document.querySelectorAll(".genre");
    genres.forEach(genre => {
        genre.addEventListener("click", function() {
            const selectedGenre = this.id;
            showGenreContent(selectedGenre);
        });
    });
});
