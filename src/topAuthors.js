document.addEventListener("DOMContentLoaded", () => {
    const authorsList = document.getElementById("authors-list");
    const cloneList = document.getElementById("authors-list-clone");
  
    function createAuthorListItem(author) {
      const listItem = document.createElement("li");
      listItem.textContent = author.name;
      listItem.classList.add("author-item");
      listItem.addEventListener("click", () => {
        window.location.href = `https://openlibrary.org/authors/${author.id}`;
      });
      return listItem;
    }
  
    function loadAuthorsData(callback) {
      const authors = [
        { name: "Agatha Christie", id: "OL27695A" },
        { name: "J.K. Rowling", id: "OL23919A" },
        { name: "Stephen King", id: "OL9228935A" },
        { name: "J.R.R. Tolkien", id: "OL26320A" },
        { name: "Leo Tolstoy", id: "OL12488875A" },
      ];
      callback(authors);
    }
  
    function populateList(list, authors) {
      list.innerHTML = ""; 
      authors.forEach(author => {
        const listItem = createAuthorListItem(author);
        list.appendChild(listItem);
      });
    }
  
    function cloneListItems(originalList, cloneList) {
      cloneList.innerHTML = originalList.innerHTML;
    }
  
    loadAuthorsData(authors => {
      populateList(authorsList, authors);
      cloneListItems(authorsList, cloneList);
    });
  
    // Непрерывная прокрутка
    let scrollPosition = 0;
    const scrollSpeed = 0.5; 
    function scrollList() {
      scrollPosition += scrollSpeed;
      authorsList.style.transform = `translateX(${-scrollPosition}px)`;
      cloneList.style.transform = `translateX(${-scrollPosition}px)`;
      if (scrollPosition >= authorsList.scrollWidth) {
        scrollPosition = 0;
      }
      requestAnimationFrame(scrollList);
    }
    scrollList();
  });
  