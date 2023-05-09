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

// function Library(name) {
//     this.name = name
//     this.data = []
// }
// Library.prototype.importLibrary = function() {
//   this.data = JSON.parse(localStorage.getItem(this.name))
// }
// Library.prototype.exportLibrary = function() {
//   try {
//     localStorage.setItem('current', this.name)
//     localStorage.setItem(this.name, JSON.stringify(this.data))
//   } catch (err) {
//     return "Sorry, apparently the localStorage isn't available to save the library!"
//   }
// }
// Library.prototype.addToLibrary = function(book) {
//   try {
//     const noDouble = this.data.every( (b) => (b.title && b.author) !== (book.title && book.author))
//     if (!noDouble) {
//       throw new Error(`"${book.title}" by "${book.author}" already exists in this library!`)
//     }
//     this.data.unshift(book)
//     this.exportLibrary()
//     if (container.classList.contains('card')) {
//       provideCard(book)
//     } else {
//       provideTableRow(book)
//     }
//   } catch (err) {
//     alert(err.message)
//   }
// }
// Library.prototype.removeFromLibrary = function(bookTitle) {
//   const bookIndex = this.data.findIndex((entry) => entry.title === bookTitle)
//   this.data.splice(bookIndex, 1)
//   this.exportLibrary()
// }

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
      alert("Sorry, apparently the localStorage isn't available to save the library!")
    }
  }

  addToLibrary = (book) => {
    try {
      const noDouble = this.data.every( (b) => (b.title && b.author) !== (book.title && book.author))
      if (!noDouble) {
        throw new Error(`"${book.title}" by "${book.author}" already exists in this library!`)
      }
      this.data.unshift(book)
      this.exportLibrary()
      if (container.classList.contains('card')) {
        provideCard(book)
      } else {
        provideTableRow(book)
      }
    } catch (err) {
      alert(err.message)
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
const container = document.querySelector('.container')
const newLibraryButton = document.querySelector('body nav div button')
const readInput = document.querySelector('#book-read')
const yearInput = document.querySelector('#book-year')
const submitButton = document.querySelector('button[type="submit"]')
const resetButton = document.querySelector('button[type="reset"]')
let currentLibrary
let appendOne = false

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

function showLibraryAsCardSet() {
  clearContainer()
  container.classList.add('card')
  if (!(currentLibrary.data === null)) {
    for (let book = 0; book < currentLibrary.data.length; book++) {
      provideCard(currentLibrary.data[book])
    }
  }
}

function provideCard(book) {
  const form = document.querySelector('.form-container')
  const card = document.createElement('div')
  card.setAttribute('class', 'card')
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
  if (appendOne) {
    form.insertAdjacentElement('afterend', card)
    appendOne = false
  } else {
    container.appendChild(card)
  }
}

function showLibraryAsTable() {
  clearContainer()
  const libraryTable = document.createElement('table')
  const tableHead = document.createElement('thead')
  const tableBody = document.createElement('tbody')
  document.querySelector('body').classList.add('table')
  container.classList.add('table')
  headings.forEach((elem) => {
    const tableHeading = document.createElement('th')
    tableHeading.textContent = elem
    tableHead.appendChild(tableHeading)
  })
  libraryTable.appendChild(tableHead)
  libraryTable.appendChild(tableBody)
  container.appendChild(libraryTable)
  const tBody = document.querySelector('tbody')
  currentLibrary.data.forEach((book) => {
    tBody.appendChild(provideTableRow(book))
  })
}

function provideTableRow(book) {
  const tableRow = document.createElement('tr')
  tableRow.setAttribute('data-title', book.title)
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
  const removeButton = attachRemoveButton(book.title)
  removeButton.addEventListener('click', () => {
    currentLibrary.removeFromLibrary(removeButton.value)
    const tableBody = document.querySelector('tbody')
    const removeRow = document.querySelector(
      `tr[data-title = '${removeButton.value}']`
    )
    tableBody.removeChild(removeRow)
  })
  buttonCell.appendChild(removeButton)
  tableRow.appendChild(buttonCell)
  if (appendOne) {
    document.querySelector('tbody').insertAdjacentElement('afterbegin', tableRow)
    appendOne = false
  } else {
    return  tableRow
  }
}

function initializeLibrary() {
  const setSelection = document.querySelector('#choose-library')
  setSelection.querySelectorAll('option').forEach( (opt) => setSelection.removeChild(opt))
  if (setSelection.hasAttribute('disabled')) {
    setSelection.removeAttribute('disabled')
    newLibraryButton.removeAttribute('disabled')
  }
  if (localStorage && localStorage.length !== 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const setOptions = document.createElement('option')
      if (localStorage.key(i) !== 'current') {
        setOptions.textContent = localStorage.key(i)
        setOptions.setAttribute('value', localStorage.key(i))
        if (localStorage.key(i) === localStorage.getItem('current')) {
          setOptions.setAttribute('selected', '')
        } else {
          setOptions.removeAttribute('selected')
        }
        setSelection.appendChild(setOptions)
      }
    }
    currentLibrary = new Library(localStorage.getItem('current'))
    currentLibrary.importLibrary()
  } else if (localStorage && localStorage.length === 0) {
    const setOptions = document.createElement('option')
    currentLibrary = new Library('Example Library')
    setOptions.textContent = currentLibrary.name
    setOptions.setAttribute('value', currentLibrary.name)
    setOptions.setAttribute('selected', '')
    setSelection.appendChild(setOptions)
    currentLibrary.data = defaultLibrary
    currentLibrary.exportLibrary()
  } else {
    newLibraryButton.setAttribute('disabled', '')
    setSelection.setAttribute('disabled', '')
    currentLibrary = new Library('Example Library')
    currentLibrary.data = defaultLibrary
  }
  if (container.classList.contains('table')) {
    showLibraryAsTable()
  } else {
    showLibraryAsCardSet()
  }
}

function toggleLibraryDisplayMode() {
  document.querySelector('.card-style').classList.toggle('checked')
  document.querySelector('.table-style').classList.toggle('checked')
  if (container.classList.contains('table')) {
    document.querySelector('#table-form-toggler').classList.remove('form-open')
    document.querySelector('main.table').classList.remove('form-open')
      showLibraryAsCardSet()
  } else {
    showLibraryAsTable()
  }
}

function clearContainer() {
  if (container.classList.contains('card')) {
    container.classList.remove('card')
    document.querySelectorAll('main div.card')
    .forEach( (div) => document.querySelector('main').removeChild(div))
  } else if (container.classList.contains('table')) {
    container.removeChild(document.querySelector('table'))
    document.querySelector('body').classList.remove('table')
    container.classList.remove('table')
  }
}

function appendNewBook(ev) {
  ev.preventDefault()
  const bookData = []
  document.querySelectorAll('.form-container input').forEach( (i) => {
    bookData.push(i.id !== 'book-read' ? i.value : i.checked)
  })
  const newBook = new Book(...bookData)
  appendOne = true
  currentLibrary.addToLibrary(newBook)
  resetButton.click()
}

function resetForm(ev) {
  ev.preventDefault()
  document.querySelectorAll('#add-book input').forEach( (v) => (v.value = ''))
  readInput.checked = false
  yearInput.value = new Date().getFullYear()

}

function createNewLibrary() {
  document.querySelector('.new-library.window').classList.toggle('show')
  if (document.querySelector('.new-library.window').classList.contains('show')) {
    document.querySelector('.new-library.window input').focus()
    document.querySelector('button.create').addEventListener('click', function create() {
      document.querySelector('button.create').removeEventListener('click', create)
        const newLibraryName = document.querySelector('#receive-name').value
      if (newLibraryName) {
        try {
          if (newLibraryName === 'current') throw new Error('This name is reserved!')
          currentLibrary = new Library(newLibraryName)
          localStorage.setItem('current', newLibraryName)
          currentLibrary.exportLibrary()
          initializeLibrary()
        } catch(err) {
          alert(err.message)
        } finally {
          document.querySelector('button.close').click()
        }
      }
    })
  } else {
    document.querySelector('.new-library.window input').blur()
    document.querySelector('.new-library.window input').value = ''
  }
}

function changeLibrary(ev) {
  localStorage.setItem('current', ev.target.value)
  initializeLibrary()
}

function removeLibrary() {
  document.querySelector('.close-library.window').classList.toggle('show')

  if (document.querySelector('.close-library.window').classList.contains('show')) {

    document.querySelector('button.confirm').addEventListener('click', function confirm() {
      document.querySelector('button.confirm').removeEventListener('click', confirm)
      localStorage.removeItem(currentLibrary.name)
      if (localStorage.length > 1) {
        const storageKeys = []
        for ( let k = 0; k < localStorage.length; k++) {
          storageKeys.push(localStorage.key(k))
        }
        localStorage.setItem('current', localStorage.key(storageKeys.findIndex( (i) => i !== 'current')))
      } else {
        localStorage.clear()
      }
      initializeLibrary()
      document.querySelector('button.quit').click()
    })
    document.querySelector('button.quit').addEventListener('click', removeLibrary)
  } else {
    document.querySelector('button.quit').removeEventListener('click', removeLibrary)
  }
}

yearInput.setAttribute('max', new Date().getFullYear())
yearInput.value = new Date().getFullYear()
initializeLibrary()

document.querySelector('#choose-library').addEventListener('change', changeLibrary)
document.querySelector('#new-library > button').addEventListener('click', createNewLibrary)
document.querySelector('button.close').addEventListener('click', createNewLibrary)
document.querySelector('.remove-library').addEventListener('click', removeLibrary)
document.querySelector('#display-style').addEventListener('change', toggleLibraryDisplayMode)
submitButton.addEventListener('click', appendNewBook)
resetButton.addEventListener('click' , resetForm)
document.querySelector('#table-form-toggler').addEventListener('click', () => {
  document.querySelector('#table-form-toggler').classList.toggle('form-open')
  document.querySelector('main.table').classList.toggle('form-open')
})