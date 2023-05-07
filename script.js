'use strict'

const defaultLibrary = [
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    category: 'Dystopia',
    year: 1932,
    pages: 310,
    read: false,
  },
  {
    title: 'Nineteen Eighty-four',
    author: 'George Orwell',
    category: 'Dystopia',
    year: 1949,
    pages: 382,
    read: true,
  },
  {
    title: 'The Stone And The Flute',
    author: 'Hans Bemmann',
    category: 'Fairy Tale',
    year: 1983,
    pages: 935,
    read: true,
  },
  {
    title:
      'The Hundred-Year-Old Man Who Climbed Out of The Window And Disappeared',
    author: 'Jonas Jonasson',
    category: 'Novel',
    year: 2009,
    pages: 413,
    read: true,
  },
  {
    title: 'The Man Who Planted Trees',
    author: 'Jean Giono',
    category: 'N/A',
    year: 1949,
    pages: 71,
    read: true,
  },
  {
    title: 'Harry Potter And The Deathly Hallows',
    author: 'Joanne K. Rowling',
    category: 'Fantasy',
    year: 2007,
    pages: 767,
    read: false,
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: "Children's Book",
    year: 1937,
    pages: 320,
    read: true,
  },
  {
    title: 'The Lord Of The Rings',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    year: 1955,
    pages: 1178,
    read: true,
  },
  {
    title: 'The Dark Tower',
    author: 'Stephen King',
    category: 'Fantasy',
    year: 2012,
    pages: 4720,
    read: true,
  },
  {
    title: 'The Talisman',
    author: 'Peter Straub, Stephen King',
    category: 'Fantasy',
    year: 1984,
    pages: 784,
    read: true,
  },
]

class Library {
  constructor(name) {
    this.name = name
    this.data = []
  }

  importLibrary = () => {
    this.data = JSON.parse(localStorage.getItem(this.name))
  }

  exportLibrary = () => {
    try {
      localStorage.setItem('current', this.name)
      localStorage.setItem(this.name, JSON.stringify(this.data))
    } catch (err) {
      return "Sorry, apparently the localStorage isn't available to save the library!"
    }
  }

  addToLibrary = (book) => {
    if (
      this.data.every(
        (b) => (b.title && b.author) !== (book.title && book.author)
      )
    ) {
      this.data.unshift(book)
      this.exportLibrary()
    } else {
      return `"${book.title}" by ${book.author} already exists in this library!`
    }
  }

  removeFromLibrary = (bookTitle) => {
    const bookIndex = this.data.findIndex((entry) => entry.title === bookTitle)
    this.data.splice(bookIndex, 1)
    this.exportLibrary()
  }
}

class Book {
  constructor(
    title,
    author = 'N/A',
    category = 'N/A',
    year = 'N/A',
    pages = 'N/A',
    read = false
  ) {
    this.title = title
    this.author = author
    this.category = category
    this.year = year
    this.pages = pages
    this.read = read
  }
}

const headings = ['Title', 'Author', 'Category', 'Year', 'Pages', 'Read', '']
const container = document.querySelector('main')
const newLibraryButton = document.querySelector('body nav div button')
let currentLibrary

function attachForm() {
  if (container.contains(document.querySelector('.form'))) {
    container.removeChild(document.querySelector('.form'))
  }
  const formCard = document.createElement('div')
  formCard.classList.add('form')
  const formForm = document.createElement('form')
  formForm.setAttribute('action', '')
  formForm.setAttribute('method', 'get')
  const titleLabel = document.createElement('label')
  const titleInput = document.createElement('input')
  titleLabel.setAttribute('for', 'book-title')
  titleLabel.textContent = 'Title'
  titleInput.setAttribute('type', 'text')
  titleInput.setAttribute('id', 'book-title')
  titleInput.setAttribute('name', 'book-title')
  titleInput.setAttribute('required', '')

  const authorLabel = document.createElement('label')
  const authorInput = document.createElement('input')
  authorLabel.setAttribute('for', 'book-author')
  authorLabel.textContent = 'Author'
  authorInput.setAttribute('type', 'text')
  authorInput.setAttribute('id', 'book-author')
  authorInput.setAttribute('name', 'book-author')

  const categoryLabel = document.createElement('label')
  const categoryInput = document.createElement('input')
  categoryLabel.setAttribute('for', 'book-category')
  categoryLabel.textContent = 'Category'
  categoryInput.setAttribute('type', 'text')
  categoryInput.setAttribute('id', 'book-category')
  categoryInput.setAttribute('name', 'book-category')

  const yearLabel = document.createElement('label')
  const yearInput = document.createElement('input')
  yearLabel.setAttribute('for', 'book-year')
  yearLabel.textContent = 'Year'
  yearInput.setAttribute('type', 'number')
  yearInput.setAttribute('id', 'book-year')
  yearInput.setAttribute('name', 'book-year')
  yearInput.setAttribute('min', '0')
  yearInput.setAttribute('max', new Date().getFullYear())
  yearInput.value = new Date().getFullYear()

  const pagesLabel = document.createElement('label')
  const pagesInput = document.createElement('input')
  pagesLabel.setAttribute('for', 'book-pages')
  pagesLabel.textContent = 'Pages'
  pagesInput.setAttribute('type', 'number')
  pagesInput.setAttribute('id', 'book-pages')
  pagesInput.setAttribute('name', 'book-pages')
  pagesInput.setAttribute('min', '0')
  pagesInput.setAttribute('max', 30000)

  const readLabel = document.createElement('label')
  const readInput = document.createElement('input')
  readLabel.setAttribute('for', 'book-read')
  readLabel.textContent = 'Read'
  readInput.setAttribute('type', 'checkbox')
  readInput.setAttribute('id', 'book-read')
  readInput.setAttribute('name', 'book-read')
  readInput.setAttribute('value', false)
  readInput.classList.add('switch')
  readInput.addEventListener('change' , () => readInput.setAttribute('value', readInput.checked))
  const cancelButton = document.createElement('button')
  const addButton = document.createElement('button')
  cancelButton.setAttribute('type', 'reset')
  cancelButton.textContent = 'cancel'
  addButton.setAttribute('type', 'submit')
  addButton.textContent = 'add'

  formForm.appendChild(titleLabel)
  formForm.appendChild(titleInput)
  formForm.appendChild(authorLabel)
  formForm.appendChild(authorInput)
  formForm.appendChild(categoryLabel)
  formForm.appendChild(categoryInput)
  formForm.appendChild(yearLabel)
  formForm.appendChild(yearInput)
  formForm.appendChild(pagesLabel)
  formForm.appendChild(pagesInput)
  formForm.appendChild(readLabel)
  formForm.appendChild(readInput)
  formForm.appendChild(cancelButton)
  formForm.appendChild(addButton)
  formCard.appendChild(formForm)
  container.insertAdjacentElement('afterbegin', formCard)
  document.querySelector('button[type="reset"]').addEventListener('click' , resetForm)
  document.querySelector('button[type="submit"]').addEventListener('click', appendNewBook)
}

function attachRemoveButton(title) {
  const removeButton = document.createElement('button')
  const trashBinSvg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  )
  const trashBinPath1 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  const trashBinPath2 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )

  removeButton.setAttribute('type', 'button')
  removeButton.setAttribute('class', 'remove')
  removeButton.setAttribute('name', 'remove')
  removeButton.setAttribute('value', title)
  trashBinSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  trashBinSvg.setAttribute('viewBox', '0 0 256 256')
  trashBinSvg.setAttribute('fill', 'currentColor')
  trashBinPath1.setAttribute(
    'd',
    'M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z'
  )
  trashBinPath1.setAttribute('opacity', '0.2')
  trashBinPath2.setAttribute(
    'd',
    'M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z'
  )
  trashBinSvg.appendChild(trashBinPath1)
  trashBinSvg.appendChild(trashBinPath2)
  removeButton.appendChild(trashBinSvg)
  return removeButton
}

function attachSwitch(value, iD) {
  const switchLabel = document.createElement('label')
  const switchInput = document.createElement('input')
  switchInput.setAttribute('type', 'checkbox')
  switchInput.setAttribute('id', iD)
  switchInput.setAttribute('class', 'switch')
  switchInput.setAttribute('name', 'switch')
  switchInput.checked = value
  switchInput.addEventListener('change', (ev) => {
    const bookIndex = currentLibrary.data.findIndex((entry) => entry.title === ev.target.id)
    currentLibrary.data[bookIndex].read = switchInput.checked
    currentLibrary.exportLibrary()
  })
  switchLabel.setAttribute('for', iD)
  switchLabel.appendChild(switchInput)
  return switchLabel
}

function showLibraryAsCardSet(lib) {
  container.classList.remove('table')
  document.querySelector('body').classList.remove('table')
  container.classList.add('card')
  if (lib.data !== []) {
    for (let book = 0; book < lib.data.length; book++) {
      provideCard(lib.data[book])
    }
  }
}

function provideCard(book) {
  const form = document.querySelector('.form')
  const card = document.createElement('div')
  card.setAttribute('data-title', book.title)

  for (const key in book) {
    if (Object.hasOwnProperty.call(book, key)) {
      const cardHeading = document.createElement('h2')
      const cardText = document.createElement('p')
      const cardRuler = document.createElement('hr')
      cardHeading.setAttribute('class', key)
      cardHeading.textContent = key
      cardHeading.textContent = cardHeading.textContent.replace(
        cardHeading.textContent[0],
        cardHeading.textContent[0].toUpperCase()
      )
      card.appendChild(cardHeading)
      cardText.setAttribute('class', key)
      if (key === 'read') {
        card.appendChild(
          attachSwitch(book.read, book.title)
        )
      } else {
        cardText.textContent = book[key]
        card.appendChild(cardText)
      }
      if (!(key === 'read')) {
        card.appendChild(cardRuler)
      }
    }
  }
  const removeButton = attachRemoveButton(book.title)
  removeButton.addEventListener('click', () => {
    currentLibrary.removeFromLibrary(removeButton.value)
    const removeCard = document.querySelector(
      `div[data-title = '${removeButton.value}']`
    )
    container.removeChild(removeCard)
  })
  card.appendChild(removeButton)
  if (form) {
    form.insertAdjacentElement('afterend', card)
  } else {
    container.appendChild(card)
  }
}

function showLibraryAsTable(lib) {
  const libraryTable = document.createElement('table')
  const tableHead = document.createElement('thead')
  const tableBody = document.createElement('tbody')

  container.classList.remove('card')
  document.querySelector('body').classList.add('table')
  container.classList.add('table')

  headings.forEach((elem) => {
    const tableHeading = document.createElement('th')
    tableHeading.textContent = elem
    tableHead.appendChild(tableHeading)
  })
  libraryTable.appendChild(tableHead)

  lib.data.forEach((book) => {
    tableBody.appendChild(provideTableRow(book))
    libraryTable.appendChild(tableBody)
  })
  container.appendChild(libraryTable)
}

function provideTableRow(book) {
  const tableRow = document.createElement('tr')
  const buttonCell = document.createElement('td')
  for (const key in book) {
    if (Object.hasOwnProperty.call(book, key)) {
      const tableDat = document.createElement('td')
      if (!(key === 'read')) {
        tableDat.textContent = book[key]
        tableRow.appendChild(tableDat)
      } else {
        tableDat.appendChild(attachSwitch(book.read, book.title))
        tableRow.appendChild(tableDat)
      }
    }
  }
  buttonCell.appendChild(attachRemoveButton(book.title))
  tableRow.appendChild(buttonCell)
  return  tableRow
}

function initializeLibrary() {
  const setSelection = document.querySelector('body nav div select')
  const setOptions = document.createElement('option')
  if (setSelection.hasAttribute('disabled')) {
    setSelection.removeAttribute('disabled')
    newLibraryButton.removeAttribute('disabled')
  }

  if (localStorage && localStorage.length !== 0) {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) !== 'current') {
        setOptions.textContent = localStorage.key(i)
        if (localStorage.key(i) === localStorage.getItem('current')) {
          setOptions.setAttribute('selected', '')
        }
        setSelection.appendChild(setOptions)
      }
    }
    currentLibrary = new Library(localStorage.getItem('current'))
    currentLibrary.importLibrary()
    showLibraryAsCardSet(currentLibrary)
  } else if (localStorage && localStorage.length === 0) {
    currentLibrary = new Library('Example Library')
    setOptions.textContent = currentLibrary.name
    setOptions.setAttribute('selected', '')
    setSelection.appendChild(setOptions)
    currentLibrary.data = defaultLibrary
    currentLibrary.exportLibrary()
    showLibraryAsCardSet(currentLibrary)
  } else {
    newLibraryButton.setAttribute('disabled', '')
    setSelection.setAttribute('disabled', '')
    currentLibrary = new Library('Example Library')
    currentLibrary.data = defaultLibrary
    showLibraryAsCardSet(currentLibrary)
  }
}

function toggleLibraryDisplayMode() {
  document.querySelector('.card-style').classList.toggle('checked')
  document.querySelector('.table-style').classList.toggle('checked')
  if (document.querySelector('main').classList.contains('table')) {
    document.querySelector('main').removeChild(document.querySelector('table'))
    showLibraryAsCardSet(currentLibrary)
    attachForm()
  } else {
    document.querySelector('button[type="submit"]').removeEventListener('click', appendNewBook)
    document.querySelector('button[type="reset"]').removeEventListener('click', resetForm)
    document
      .querySelectorAll('main div')
      .forEach((div) => document.querySelector('main').removeChild(div))
    showLibraryAsTable(currentLibrary)
  }
}

function appendNewBook(ev) {
  ev.preventDefault()
  document.querySelector('button[type="submit"]').removeEventListener('click', appendNewBook)
  const titleBook = document.querySelector('input[id="book-title"]').value
  const authorBook = document.querySelector('input[id="book-author"]').value
  const categoryBook = document.querySelector('input[id="book-category"]').value
  const yearBook = document.querySelector('input[id="book-year"]').value
  const pagesBook = document.querySelector('input[id="book-pages"]').value
  const readBook = document.querySelector('input[id="book-read"]').value
  const newBook = new Book(titleBook,authorBook,categoryBook,yearBook,pagesBook,readBook)
  currentLibrary.addToLibrary(newBook)
  provideCard(newBook)
  attachForm()
}

function resetForm(ev) {
  ev.preventDefault()
  document.querySelector('button[type="reset"]').removeEventListener('click', resetForm)
  ev.target.click()
  document.querySelector('#book-year').value = new Date().getFullYear()
  document.querySelector('button[type="reset"]').addEventListener('click', resetForm)
}

initializeLibrary()
attachForm()

document.querySelector('#display-style').addEventListener('change', toggleLibraryDisplayMode)
