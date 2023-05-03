const defaultLibrary = [
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    category: "Dystopia",
    year: 1932,
    pages: 310,
    read: false,
  },
  {
    title: "Nineteen Eighty-four",
    author: "George Orwell",
    category: "Dystopia",
    year: 1949,
    pages: 382,
    read: true,
  },
  {
    title: "The Stone And The Flute",
    author: "Hans Bemmann",
    category: "Fairy Tale",
    year: 1983,
    pages: 935,
    read: true,
  },
  {
    title:
      "The Hundred-Year-Old Man Who Climbed Out of The Window And Disappeared",
    author: "Jonas Jonasson",
    category: "Novel",
    year: 2009,
    pages: 413,
    read: true,
  },
  {
    title: "The Man Who Planted Trees",
    author: "Jean Giono",
    category: "N/A",
    year: 1949,
    pages: 71,
    read: true,
  },
  {
    title: "Harry Potter And The Deathly Hallows",
    author: "Joanne K. Rowling",
    category: "Fantasy",
    year: 2007,
    pages: 767,
    read: false,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Children's Book",
    year: 1937,
    pages: 320,
    read: true,
  },
  {
    title: "The Lord Of The Rings",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    year: 1955,
    pages: 1178,
    read: true,
  },
  {
    title: "The Dark Tower",
    author: "Stephen King",
    category: "Fantasy",
    year: 2012,
    pages: 4720,
    read: true,
  },
  {
    title: "The Talisman",
    author: "Peter Straub, Stephen King",
    category: "Fantasy",
    year: 1984,
    pages: 784,
    read: true,
  },
]

const headings = ["Title", "Author", "Category", "Year", "Pages", "Read", ""]

class Library {
  constructor(name) {
    this.name = name
    this.library = []
  }

  addToLibrary = (book) => {
    if (
      this.library.every(
        (b) => (b.title && b.author) !== (book.title && book.author)
      )
    ) {
      this.library.push(book)
      this.saveToLocalStorage()
    } else {
      return `"${book.title}" by ${book.author} already exists in this library!`
    }
  }

  removeFromLibrary = (book) => {
    if (this.library.includes(book)) {
      this.library.splice(this.library.indexOf(book))
      this.saveToLocalStorage()
    } else {
      return `There is no Book '${book.title}' in this library!`
    }
  }

  importLibrary = (name) => {
    this.library = JSON.parse(localStorage.getItem(name))
  }

  saveToLocalStorage = () => {
    try {
      localStorage.setItem(this.name, JSON.stringify(this.library))
    } catch (err) {
      return "Sorry, apparently the localStorage isn't available to save the library!"
    }
  }

  showLibraryAsTable = () => {
    const container = document.querySelector("main")
    const bookTable = document.createElement("table")
    const bookHead = document.createElement("thead")
    const bookBody = document.createElement("tbody")

    container.classList.remove("card")
    container.classList.add("table")

    headings.forEach((elem) => {
      const bookHeading = document.createElement("th")
      bookHeading.textContent = elem
      bookHead.appendChild(bookHeading)
    })
    bookTable.appendChild(bookHead)

    this.library.forEach((book) => {
      const bookRow = document.createElement("tr")
      for (const key in book) {
        if (Object.hasOwnProperty.call(book, key)) {
          const bookDat = document.createElement("td")
          if (!(key === "read")) {
            bookDat.textContent = book[key]
            bookRow.appendChild(bookDat)
          } else {
            const checkboxRead = document.createElement("input")
            checkboxRead.setAttribute("type", "checkbox")
            checkboxRead.setAttribute("id", "read")
            checkboxRead.setAttribute("name", "read")
            checkboxRead.setAttribute("value", book[key])
            if (book[key]) {
              checkboxRead.setAttribute("checked", "checked")
            }
            bookDat.appendChild(checkboxRead)
            bookRow.appendChild(bookDat)
          }
        }
      }
      const buttonCell = document.createElement("td")
      const buttonRemove = document.createElement("button")
      const trashBinSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      )
      const trashBinPath1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      const trashBinPath2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      buttonRemove.setAttribute("type", "button")
      buttonRemove.setAttribute("id", "remove")
      buttonRemove.setAttribute("name", "remove")
      trashBinSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
      trashBinSvg.setAttribute("viewBox", "0 0 256 256")
      trashBinSvg.setAttribute("fill", "currentColor")
      trashBinPath1.setAttribute(
        "d",
        "M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z"
      )
      trashBinPath1.setAttribute("opacity", "0.2")
      trashBinPath2.setAttribute(
        "d",
        "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
      )
      trashBinSvg.appendChild(trashBinPath1)
      trashBinSvg.appendChild(trashBinPath2)
      buttonRemove.appendChild(trashBinSvg)
      buttonCell.appendChild(buttonRemove)
      bookRow.appendChild(buttonCell)
      bookBody.appendChild(bookRow)
      bookTable.appendChild(bookBody)
    })
    container.appendChild(bookTable)
  }

  showLibraryAsCardSet = () => {
    const container = document.querySelector("main")

    container.classList.remove("table")
    container.classList.add("card")

    this.library.forEach((book) => {
      const card = document.createElement("div")
      for (const key in book) {
        if (Object.hasOwnProperty.call(book, key)) {
          const cardHeading = document.createElement("h2")
          const cardText = document.createElement("p")
          cardHeading.textContent = key
          cardHeading.textContent = cardHeading.textContent.replace(
            cardHeading.textContent[0],
            cardHeading.textContent[0].toUpperCase()
          )
          cardText.textContent = book[key]
          card.appendChild(cardHeading)
          card.appendChild(cardText)
        }
      }
      container.appendChild(card)
    })
  }
}

// class Book {
//   constructor(
//     title,
//     author = "N/A",
//     category = "n/A",
//     year = "N/A",
//     pages = "N/A",
//     read = false
//   ) {
//     this.title = title
//     this.author = author
//     this.category = category
//     this.year = year
//     this.pages = pages
//     this.read = read
//   }
// }

const defLib = new Library("defaultLibrary")
defLib.library = defaultLibrary

defLib.showLibraryAsCardSet()

document.querySelector("#library-style").addEventListener("change", () => {
  document.querySelector("#library-style").classList.toggle("checked")
  document.querySelector(".card-style").classList.toggle("checked")
  document.querySelector(".table-style").classList.toggle("checked")
  if (document.querySelector("main").classList.contains("card")) {
    document
      .querySelector("main")
      .querySelectorAll("div")
      .forEach((div) => document.querySelector("main").removeChild(div))
    defLib.showLibraryAsTable()
  } else {
    document.querySelector("main").removeChild(document.querySelector("table"))
    defLib.showLibraryAsCardSet()
  }
})
