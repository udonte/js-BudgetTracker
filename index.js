const form = document.querySelector(".add");
let transactions =
  localStorage.getItem("transactions") != null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const time = new Date();
  const transaction = {
    id: Math.floor(Math.random() * 100000),
    source: form.source.value.trim(),
    amount: form.amount.value.trim(),
    time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}}`,
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
});
