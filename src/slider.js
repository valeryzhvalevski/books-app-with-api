document.addEventListener("DOMContentLoaded", () => {
    const topBooksContainer = document.querySelector('.top-books');
    const apiUrl = 'https://openlibrary.org/search.json?q=popular&limit=5';
  
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
  
        topBooks.forEach((book) => {
          const bookElement = document.createElement('div');
          bookElement.classList.add('book');
          bookElement.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="${book.title} Cover">
            <div class="book-details">
              <h3>${book.title}</h3>
              <p>Author: ${book.author_name.join(', ')}</p>
            </div>
          `;
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
  
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let scrollPosition = 0;
  
    prevButton.addEventListener('click', () => {
      scrollPosition -= 320; 
      if (scrollPosition < 0) {
        scrollPosition = 0;
      }
      topBooksContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    });
  
    nextButton.addEventListener('click', () => {
      scrollPosition += 320; 
      topBooksContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    });
  });
  