var savingAmount = 0;
var currentAmount = 10000;

function accountType() {
    var choice = Number(document.getElementById("AccountType").value);
    switch (choice) {
        case 1:
            var tt = 'Select Transaction Type: <select id="tType" onchange="return getTrType()"><option value="select">--select--</option><option value="1">Withdraw</option><option value="2">Deposit</option><option value="3">Check Balance</option></select>';
            document.getElementById('transcationType').innerHTML = tt;
            document.getElementById('process').innerHTML = '';
            document.getElementById('result').innerHTML = '';
            break;
        case 2:
            var tt = 'Select Transaction Type: <select id="tType" onchange="return getTrType()"><option value="select">--select--</option><option value="1">Withdraw</option><option value="2">Deposit</option><option value="3">Check Balance</option></select>';
            document.getElementById('transcationType').innerHTML = tt;
            document.getElementById('process').innerHTML = '';
            document.getElementById('result').innerHTML = '';
            break;
        default:
            document.getElementById('transcationType').innerHTML = '';
            document.getElementById('process').innerHTML = '';
            document.getElementById('result').innerHTML = '';
            break;
    }
}

function getTrType() {
    var type = Number(document.getElementById('tType').value);

    switch (type) {
        case 1:
            var withDraw = "Enter the Amount <input type='number' id='wAmount'> <input type='submit' value='Withdraw' onclick='return WithDraw()'>";
            document.getElementById('process').innerHTML = withDraw;
            document.getElementById('result').innerHTML = '';
            break;
        case 2:
            var deposit = "Enter the Amount <input type='number' id='dAmount'> <input type='submit' value='Deposit' onclick='return Deposit()'>";
            document.getElementById('process').innerHTML = deposit;
            document.getElementById('result').innerHTML = '';
            break;
        case 3:
            var check = "<input type='submit' value='Check Balance' onclick='return CheckBalance()'>";
            document.getElementById('process').innerHTML = check;
            document.getElementById('result').innerHTML = '';
            break;
        default:
            document.getElementById('process').innerHTML = '';
            document.getElementById('result').innerHTML = '';
            break;
    }
}

function WithDraw() {
    var w = Number(document.getElementById('wAmount').value);
    var choice = Number(document.getElementById('AccountType').value);

    if (w <= 0) {
        document.getElementById('result').innerHTML = '<span style="color: red;">Please enter a valid amount.</span>';
        return;
    }

    switch (choice) {
        case 1:
            if (w > savingAmount) {
                document.getElementById('result').innerHTML = '<span style="color: red;">Insufficient Amount.</span>';
            } else {
                savingAmount -= w;
                document.getElementById('result').innerHTML = '<span style="color: green;">Withdrawal Successful! Balance: </span>' + savingAmount;
            }
            break;
        case 2:
            if (w > currentAmount) {
                document.getElementById('result').innerHTML = '<span style="color: red;">Insufficient Amount.</span>';
            } else {
                currentAmount -= w;
                document.getElementById('result').innerHTML = '<span style="color: green;">Withdrawal Successful! Balance: </span>' + currentAmount;
            }
            break;
    }
}

function Deposit() {
    var depo = Number(document.getElementById('dAmount').value);
    var choice = Number(document.getElementById('AccountType').value);

    if (depo <= 0) {
        document.getElementById('result').innerHTML = '<span style="color: red;">Please enter a valid amount.</span>';
        return;
    }

    switch (choice) {
        case 1:
            savingAmount += depo;
            document.getElementById('result').innerHTML = '<span style="color: green;">Deposit Successful! Balance: </span>' + savingAmount;
            break;
        case 2:
            currentAmount += depo;
            document.getElementById('result').innerHTML = '<span style="color: green;">Deposit Successful! Balance: </span>' + currentAmount;
            break;
    }
}

function CheckBalance() {
    var choice = Number(document.getElementById('AccountType').value);
    switch (choice) {
        case 1:
            document.getElementById('result').innerHTML = '<span style="color: blue;">Saving Account Balance: </span>' + savingAmount;
            break;
        case 2:
            document.getElementById('result').innerHTML = '<span style="color: blue;">Current Account Balance: </span>' + currentAmount;
            break;
    }
}