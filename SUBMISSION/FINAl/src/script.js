const STORAGE_KEY = 'finance_tracker_data';
let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const financeForm = document.getElementById('finance-form');
const list = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');
function updateUI() {
    list.innerHTML = '';
    let income = 0;
    let expense = 0;

    data.forEach((item) => {
        const isIncome = item.category === 'Income';
        if (isIncome) income += item.amount;
        else expense += item.amount;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td style="color: ${isIncome ? '#2ecc71' : '#e74c3c'}">
                ${isIncome ? '+' : '-'} ₹${item.amount.toFixed(2)}
            </td>
            <td>${item.date}</td>
            <td>
                <button class="btn-edit" onclick="editItem(${item.id})">Edit</button>
                <button class="btn-del" onclick="deleteItem(${item.id})">Delete</button>
            </td>
        `;
        list.appendChild(row);
    });
    totalIncomeEl.innerText = `₹${income.toFixed(2)}`;
    totalExpensesEl.innerText = `₹${expense.toFixed(2)}`;
    
   
    const currentBalance = income - expense;
    balanceEl.innerText = `₹${currentBalance.toFixed(2)}`;
    balanceEl.style.color = currentBalance < 0 ? '#e74c3c' : '#2c3e50';

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
financeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newItem = {
        id: Date.now(),
        name: document.getElementById('name').value,
        amount: parseFloat(document.getElementById('amount').value),
        date: document.getElementById('date').value,
        category: document.getElementById('category').value
    };

    data.push(newItem);
    financeForm.reset();
    updateUI();
});
window.deleteItem = (id) => {
    if (confirm("Delete this transaction?")) {
        data = data.filter(item => item.id !== id);
        updateUI();
    }
};
window.editItem = (id) => {
    const item = data.find(i => i.id === id);
    const newName = prompt("Enter new name:", item.name);
    const newAmount = prompt("Enter new amount:", item.amount);

    if (newName !== null && newAmount !== null) {
        item.name = newName;
        item.amount = parseFloat(newAmount);
        updateUI();
    }
};
updateUI();




