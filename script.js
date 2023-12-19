// Local storage array

const LsCheck = localStorage.getItem("items");
const itemsLs = LsCheck === null ? [] : JSON.parse(LsCheck);
console.log(itemsLs);

// function to for finding items by id

const findItemById = (id) => {
  return itemsLs.find((element) => element.id === id);
};
console.log(findItemById("1"));

// containers

const formContainer = document.createElement("form");

const tableContainer = document.createElement("div");
tableContainer.setAttribute("id", "tableContainer");

const allItemsTableContainer = document.createElement("div");
allItemsTableContainer.setAttribute("id", "allItemsTableContainer");

const foundItemTableContainer = document.createElement("div");
foundItemTableContainer.setAttribute("id", "foundItemTableContainer");

// elements

const button = document.createElement("button");
button.innerText = "add item ";
const button2 = document.createElement("button");
button2.innerText = "edit item ";
const button3 = document.createElement("button");
button3.innerText = "delete item";
const button4 = document.createElement("button");
button4.innerText = "Find item in Local Storage";
const itemIdInput = document.createElement("input");
itemIdInput.placeholder = "item id";
const itemNameInput = document.createElement("input");
itemNameInput.placeholder = "item name";
const itemQuantityInput = document.createElement("input");
itemQuantityInput.placeholder = "item quantity";
const findItemInput = document.createElement("input");
findItemInput.placeholder = "item id number";

// form appends

formContainer.append(
  button,
  button2,
  button3,
  button4,
  itemIdInput,
  itemNameInput,
  itemQuantityInput,
  findItemInput,
);

// body appends

document.body.append(
  formContainer,
  allItemsTableContainer,
  foundItemTableContainer,
);

// clear inputs function

function clearInputFields() {
  itemIdInput.value = "";
  itemNameInput.value = "";
  itemQuantityInput.value = "";
}

// table function #1

function createAllItemsTable() {
  const tableCheck = document.querySelector("#allItemsTable"); // line 85

  if (tableCheck) {
    tableCheck.remove();
  }

  const table = document.createElement("table");
  table.setAttribute("id", "allItemsTable");
  const tableBody = document.createElement("tbody");

  itemsLs.forEach((el) => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    const cellText = document.createTextNode(
      `id: ${el.id} | name: ${el.name} | quantity: ${el.quantity}`,
    );
    cell.appendChild(cellText);
    row.appendChild(cell);
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  allItemsTableContainer.appendChild(table);
  table.setAttribute("border", "3");
}

// table function #2 (find items)

function createFoundItemTable(items) {
  const tableCheck = document.querySelector("#foundItemTable"); // line 112

  if (!tableCheck) {
    // If table does not exist, create a new one
    const table = document.createElement("table");
    table.setAttribute("id", "foundItemTable");
    const tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    foundItemTableContainer.appendChild(table);
    table.setAttribute("border", "3");
  }

  // recheck if table exists (if this is missing, on the first query table wont be displayed, only after 2nd query)
  const updatedTableCheck = document.querySelector("#foundItemTable");

  // Append a new row for each item
  items.forEach((el) => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    const cellText = document.createTextNode(
      `id: ${el.id} | name: ${el.name} | quantity: ${el.quantity}`,
    );
    cell.appendChild(cellText);
    row.appendChild(cell);

    // Append the row to the existing table
    updatedTableCheck.querySelector("tbody").appendChild(row);
  });
}

// events for button #1 (ADD ITEM)

button.addEventListener("click", (event) => {
  event.preventDefault();
  const itemId = itemIdInput.value;
  const itemName = itemNameInput.value;
  const itemQuantity = itemQuantityInput.value;

  if (itemId && itemName && itemQuantity) {
    const itemExists = findItemById(itemId);

    if (!itemExists) {
      const newQuery = {
        id: itemId,
        name: itemName,
        quantity: itemQuantity,
      };

      itemsLs.push(newQuery);
      localStorage.setItem("items", JSON.stringify(itemsLs)); // issaugom updatinta array LS
      console.log(itemsLs);
      alert("item added to LS successfuly");
      createAllItemsTable();
      clearInputFields();
    } else {
      alert("item with same id exists!");
    }
  } else {
    alert("fill in all fields");
  }
});

// events for button #2 (EDIT ITEM)

button2.addEventListener("click", (event) => {
  event.preventDefault();
  const itemId = itemIdInput.value;
  const itemName = itemNameInput.value;
  const itemQuantity = itemQuantityInput.value;

  if (itemId && itemName && itemQuantity) {
    const itemExists = findItemById(itemId);

    if (itemExists) {
      itemExists.name = itemName;
      itemExists.quantity = itemQuantity;
      localStorage.setItem("items", JSON.stringify(itemsLs));
      alert("item edited sucessfully");
      createAllItemsTable();
      clearInputFields();
    } else {
      alert("item not found");
    }
  } else {
    alert("fill in all fields");
  }
});

// events for button #3 (DELETE ITEM)

button3.addEventListener("click", (event) => {
  event.preventDefault();
  const itemId = itemIdInput.value;

  if (itemId) {
    const itemIndex = itemsLs.findIndex((element) => element.id === itemId); // surasti index pagal id

    if (itemIndex !== -1) {
      itemsLs.splice(itemIndex, 1); // removina viena itema pagal jo id vieta
      itemsLs.forEach((item, index) => {
        // sutvarko id seka, kai istrinamas itemas
        item.id = (index + 1).toString();
      });
      localStorage.setItem("items", JSON.stringify(itemsLs));
      alert("item removed sucessfully");
      createAllItemsTable();
      clearInputFields();
    } else {
      alert("item with such id was not found");
    }
  } else {
    alert("fill in all fields");
  }
});

// events for button #4 (FIND ITEM)

button4.addEventListener("click", (event) => {
  event.preventDefault();
  const findItemId = findItemInput.value;
  const itemExists = findItemById(findItemId);

  if (itemExists) {
    alert("item found in LS: ", itemExists);
    console.log(
      `item found in LS by your id input(${findItemInput.value}) is:`,
      itemExists,
    );
    createFoundItemTable([itemExists]);
    clearInputFields();
  } else {
    alert("item was not found");
  }
});
