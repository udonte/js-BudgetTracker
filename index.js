const form = document.querySelector(".add");
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");
const listItem = document.querySelector("li");
let transactions =
  localStorage.getItem("transactions") != null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];

// generate list template function
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

//add new transaction
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
  addTransaction(form.source.value, form.amount.value);
  form.reset();
});

// get transactions
function getTransactions() {
  transactions.forEach((transaction) => {
    let { id, source, amount, time } = transaction;
    addTransactionDOM(id, source, amount, time);
  });
}

getTransactions();

function deleteId(id) {
  let filteredTransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );
  console.log(filteredTransactions);
  transactions = filteredTransactions;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

expenseList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let listItem = e.target.parentElement;
    listItem.remove();
    let listId = Number(listItem.getAttribute("data-id"));
    console.log(listId);
    deleteId(listId);
    console.log(transactions);
  }
});

incomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let listItem = e.target.parentElement;
    listItem.remove();
    let listId = Number(listItem.getAttribute("data-id"));
    console.log(listId);
    deleteId(listId);
    console.log(transactions);
  }
});
