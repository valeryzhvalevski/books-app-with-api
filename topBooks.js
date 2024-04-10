document.addEventListener("DOMContentLoaded", () => {
    const topBooksContainer = document.querySelector('.top-books');

    const apiUrl = 'https://openlibrary.org/search.json?q=popular&limit=10';

    async function displayTopBooks() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const topBooks = data.docs;

        if (topBooks.length === 0) {
          console.log('No books found.');
          return;
        }

        topBooks.forEach((book, index) => {
          const bookElement = document.createElement('div');
          bookElement.classList.add('book');
          
          const coverImage = document.createElement('img');
          coverImage.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
          coverImage.alt = `${book.title} Cover`;
          bookElement.appendChild(coverImage);

          const bookDetails = document.createElement('div');
          bookDetails.classList.add('book-details');

          const titleElement = document.createElement('h3');
          titleElement.textContent = book.title;

          const authorElement = document.createElement('p');
          authorElement.textContent = `Author: ${book.author_name.join(', ')}`;

          bookDetails.appendChild(titleElement);
          bookDetails.appendChild(authorElement);
          bookElement.appendChild(bookDetails);

          bookElement.addEventListener('click', () => {
            window.location.href = `https://openlibrary.org${book.key}`;
          });

          topBooksContainer.appendChild(bookElement);
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    displayTopBooks();
  });


