const form = document.querySelector(".add");
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions =
  localStorage.getItem("transactions") != null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];

// update statistics
function updateStatistics() {
  const updatedIncome = transactions
    .filter((transaction) => transaction.amount > 1)
    .reduce((total, transaction) => {
      return (total += Number(transaction.amount));
    }, 0);

  const updatedExpense = transactions
    .filter((transaction) => transaction.amount < 1)
    .reduce(
      (total, transaction) => (total += Math.abs(Number(transaction.amount))),
      0
    );

  const updatedBalance = updatedIncome - updatedExpense;

  income.textContent = updatedIncome;
  expense.textContent = updatedExpense;
  balance.textContent = updatedBalance;
}

// generate list template function for DOM
function generateTemplate(id, source, amount, time) {
  return `<li data-id="${id}">
          <p>
            <span>${source}</span>
            <span id="time">${time}</span>
          </p>
          $<span>${Math.abs(amount)}</span>
          <i class="bi bi-trash delete"></i>
        </li>`;
}

// add transaction to DOM
function addTransactionDOM(id, source, amount, time) {
  if (amount >= 0) {
    incomeList.innerHTML += generateTemplate(id, source, amount, time);
  } else {
    expenseList.innerHTML += generateTemplate(id, source, amount, time);
  }
}

//add new transaction localStorage
function addTransaction(source, amount) {
  const time = new Date();
  const transaction = {
    id: Math.floor(Math.random() * 100000),
    source: source,
    amount: amount,
    time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`,
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  addTransactionDOM(transaction.id, source, amount, transaction.time);
}

// form details
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTransaction(form.source.value, Number(form.amount.value));
  updateStatistics();
  form.reset();
});

// get transactions
function getTransactions() {
  transactions.forEach((transaction) => {
    let { id, source, amount, time } = transaction;
    addTransactionDOM(id, source, amount, time);
  });
}

// delete transaction localStorage
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

/*
getAttribute(data-id) works alone with (e)
dataset.id works alone with event
dont make that mistake that
*/

// delete transaction expenseDOM
expenseList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    deleteTransaction(Number(event.target.parentElement.dataset.id));
    updateStatistics();
  }
});
// delete transaction incomeDOM
incomeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    deleteTransaction(Number(event.target.parentElement.dataset.id));
    updateStatistics();
  }
});

// load the page and the data
function init() {
  getTransactions();
  updateStatistics();
}

init();
