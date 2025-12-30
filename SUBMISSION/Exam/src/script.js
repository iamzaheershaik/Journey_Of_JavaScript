var myForm = document.getElementById("expense-form");
var tableBody = document.getElementById("transaction-list");
var incomeDisplay = document.getElementById("total-income");
var expenseDisplay = document.getElementById("total-expenses");
var balanceDisplay = document.getElementById("balance");

var allTransactions = JSON.parse(localStorage.getItem("my_data")) || [];

function showEverything() {
  tableBody.innerHTML = "";

  var totalInc = 0;
  var totalExp = 0;

  for (var i = 0; i < allTransactions.length; i++) {
    var item = allTransactions[i];
    var row = document.createElement("tr");

    var color = "";
    var sign = "";

    if (item.category === "Income") {
      color = "#2ecc71";
      sign = "+";
      totalInc = totalInc + item.amount;
    } else {
      color = "#e74c3c";
      sign = "-";
      totalExp = totalExp + item.amount;
    }

    row.innerHTML =
      "<td>" +
      item.name +
      "</td>" +
      "<td style='color:" +
      color +
      "; font-weight:bold;'>" +
      sign +
      " ₹" +
      item.amount.toFixed(2) +
      "</td>" +
      "<td>" +
      item.date +
      "</td>" +
      "<td>" +
      "<button class='btn-edit' onclick='editThis(" +
      item.id +
      ")'>Edit</button>" +
      "<button class='btn-delete' onclick='deleteThis(" +
      item.id +
      ")'>Delete</button>" +
      "</td>";

    tableBody.appendChild(row);
  }

  incomeDisplay.innerText = "₹" + totalInc.toFixed(2);
  expenseDisplay.innerText = "₹" + totalExp.toFixed(2);

  var finalBalance = totalInc - totalExp;
  balanceDisplay.innerText = "₹" + finalBalance.toFixed(2);
  balanceDisplay.style.color = finalBalance < 0 ? "#e74c3c" : "#2c3e50";

  localStorage.setItem("my_data", JSON.stringify(allTransactions));
}

myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var nameValue = document.getElementById("name").value;
  var amountValue = parseFloat(document.getElementById("amount").value);
  var dateValue = document.getElementById("date").value;
  var catValue = document.getElementById("category").value;

  var newEntry = {
    id: Date.now(),
    name: nameValue,
    amount: amountValue,
    date: dateValue,
    category: catValue,
  };

  allTransactions.push(newEntry);
  showEverything();
  myForm.reset();
});

function deleteThis(id) {
  if (confirm("Delete this item?")) {
    allTransactions = allTransactions.filter(function (item) {
      return item.id !== id;
    });
    showEverything();
  }
}

function editThis(id) {
  var itemToEdit = null;
  for (var i = 0; i < allTransactions.length; i++) {
    if (allTransactions[i].id === id) {
      itemToEdit = allTransactions[i];
      break;
    }
  }

  var newName = prompt("New Name:", itemToEdit.name);
  var newAmount = prompt("New Amount:", itemToEdit.amount);

  if (newName !== null && newAmount !== null && newAmount !== "") {
    itemToEdit.name = newName;
    itemToEdit.amount = parseFloat(newAmount);
    showEverything();
  }
}

showEverything();
