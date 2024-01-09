const btnAdd = document.querySelector("#btn-add");
const tableBody = document.querySelector("#table-body");
const btnRemove = document.querySelector("#btn-remove");
const removeCountEl = document.querySelector("#remove-count");
const personCounterEl = document.querySelector("#person-counter");
const searchEl = document.querySelector("#search");

let rowHasCreated = false;

let selectedArr = [];
let removeCount = 0;

let allRows = [];

let itemArr = [
  {
    id: 0,
    name: "Albert Einstein",
    year: "1879-1955",
    country: "Germany",
    achievements: "General theory of relativity",
  },
  {
    id: 1,
    name: "Alan Turing",
    year: "1912-1954",
    country: "England",
    achievements: "The father of theoretical computer science",
  },

  {
    id: 2,
    name: "Tim Berners-Lee",
    year: "1955",
    country: "England",
    achievements: "The inventor of the World Wide Web, HTML",
  },
];

class Person {
  constructor(name, year, country, achievements) {
    this.id = itemArr.length;
    this.name = name;
    this.year = year;
    this.country = country;
    this.achievements = achievements;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getYear() {
    return this.year;
  }

  getCountry() {
    return this.country;
  }

  getAchivs() {
    return this.achievements;
  }
}

function addPerson() {
  const row = createInputRow();
  appendRow(tableBody, row);

  createConfirmBtn(row);
}

function pushObjToArr(obj) {
  itemArr.push(obj);
}

function handleConfirm(row) {
  const inputEl = document.querySelectorAll("#add-search");
  let newPerson = new Person(
    inputEl[0].value,
    inputEl[1].value,
    inputEl[2].value,
    inputEl[3].value
  );
  pushObjToArr(newPerson);
  setLocalStorage(newPerson);
  updateRow(newPerson, row);
  renderTable(itemArr);
  rowHasCreated = false;
}

function createConfirmBtn(row) {
  const inputParentAchivEl = document.querySelector(
    "[name='input-achiv']"
  ).parentElement;

  const btnConfirm = document.createElement("button");
  btnConfirm.id = "btn-confirm";
  btnConfirm.classList.add("btn-blue");
  btnConfirm.textContent = "Confirm";
  inputParentAchivEl.appendChild(btnConfirm);

  btnConfirm.addEventListener("click", () => handleConfirm(row));
}

function appendRow(parent, row) {
  parent.appendChild(row);
}

function createInputRow() {
  if (!rowHasCreated) {
    rowHasCreated = true;
    const row = document.createElement("tr");
    row.innerHTML = `<th>${itemArr.length}</th>
        <td>            <input
        type="search"
        name="input-name"
        id="add-search"
        placeholder="Name..."
      /></td>
        <td> <input
        type="search"
        name="input-year"
        id="add-search"
        placeholder="Year..."
      /></td>
      <td> <input
      type="search"
      name="input-country"
      id="add-search"
      placeholder="Country..."
    /></td>
    <td> <input
    type="search"
    name="input-achiv"
    id="add-search"
    placeholder="Achievements..."
    /></td>
    `;
    return row;
  }
}

function sortASC(arr) {
  arr.sort((a, b) => a.id - b.id);
}

function renderTable(arr) {
  tableBody.innerHTML = "";
  sortASC(itemArr);
  arr.forEach((person) => displayRow(person));
  allRows = document.querySelectorAll("tr[id]");
  allRows.forEach((el) =>
    el.addEventListener("click", (e) => toggleSelected(e.target.parentElement))
  );
  updatePersonCount();
}

function updateRow(person, row) {
  row.innerHTML = `<th>${person.id}</th>
    <td>${person.name}</td>
    <td>${person.year}</td>
  <td> ${person.country}</td>
<td>${person.achievements}</td>
`;
  row.setAttribute("id", person.id);
}

function updateRemoveCount() {
  removeCountEl.innerText = `${selectedArr.length}`;
}

function displayRow(person) {
  const row = document.createElement("tr");
  updateRow(person, row);
  tableBody.appendChild(row);
}

function createNewPerson(id, name, year, country, achievs) {
  let newPerson = new Person(
    inputEl[0].value,
    inputEl[1].value,
    inputEl[2].value,
    inputEl[3].value
  );
}

function toggleSelected(row) {
  row.classList.contains("selected")
    ? selectedArr.pop()
    : selectedArr.push(row);
  row.classList.toggle("selected");

  console.log(selectedArr);
  updateRemoveCount();
}

function updateSelectedArr() {
  removeSelectedArr();
}

function removeSelectedArr() {
  if (selectedArr[0]) {
    selectedArr.forEach((el) => {
      let id = el.id;
      itemArr.splice(
        itemArr.indexOf(itemArr.find((person) => person.id == id)),
        1
      );

      console.log(selectedArr);
    });
    renderTable(itemArr);
    selectedArr = [];
    updateRemoveCount();
  }
}

function updateTable() {
  Object.keys(localStorage).forEach((key) => {
    let item = localStorage.getItem(key);
    pushObjToArr(JSON.parse(item));
  });

  renderTable(itemArr);
}

function handleSearchByName(query) {
  searchByName(query);
}

function searchByName(query) {
  let filteredArr = itemArr.filter((el) => el.name.includes(searchEl.value));
  renderTable(filteredArr);

  console.log(itemArr, filteredArr);
}

searchEl.addEventListener("input", (e) => handleSearchByName(e.data));

function selectedItems(allRows) {
  let selectedArr = [];
}

function setLocalStorage(obj) {
  localStorage.setItem(obj.id, JSON.stringify(obj));
}

function handleRemove() {
  updateSelectedArr();
}

btnRemove.addEventListener("click", handleRemove);

window.onload = updateTable;
btnAdd.addEventListener("click", addPerson);

function updatePersonCount() {
  personCounterEl.textContent = `Persons: ${itemArr.length}`;
}
