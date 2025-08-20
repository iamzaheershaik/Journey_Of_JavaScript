        var savingAmount = 0;
        var currentAmount = 10000;
        function accountType() {
            var choice = Number(document.getElementById("AccountType").value);
            switch (choice) {
                case 1:
                    var tt = 'Select Transcation Type: <select id="tType" onchange="return getTrType()"><option value="select">--select--</option><option value="1" >Withdraw</option><option value="2" >Deposit</option><option value="3" >Check Balance</option></select>'
                    document.getElementById('transcationType').innerHTML = tt;
                    break;
                case 2:
                    var tt = 'Select Transcation Type: <select id="tType" onchange="return getTrType()"><option value="select">--select--</option><option value="1" >Withdraw</option><option value="2" >Deposit</option><option value="3" >Check Balance</option></select>'
                    document.getElementById('transcationType').innerHTML = tt;
                    break;
            }
        }
        function getTrType() {
            var type = Number(document.getElementById('tType').value);

            switch (type) {
                case 1:
                    var withDraw = "Enter the Amount <input type='number' id='wAmount'> <input type='submit' value='WithDraw' onclick='return WithDraw()'>"
                    document.getElementById('process').innerHTML = withDraw;
                    break;
                case 2:
                    var deposit = "Enter the Amount <input type='number' id='dAmount'> <input type='submit' value='Deposit' onclick='return Deposit()'>"
                    document.getElementById('process').innerHTML = deposit;
                    break;
                case 3:
                    var check = "<input type='submit' value='Check Balance' onclick='return CheckBalance()'>"
                    document.getElementById('process').innerHTML = check;
                    break;
            }
        }
        function WithDraw() {
            var w = Number(document.getElementById('wAmount').value);
            var choice = Number(document.getElementById('AccountType').value);
            switch (choice) {
                case 1:
                    if (w > savingAmount) {
                        document.getElementById('result').innerHTML = '<span style="color: red;">Insufficient Amount.</span>';
                    } else if (w <= savingAmount) {
                        savingAmount -= w;
                        document.getElementById('result').innerHTML = '<span style="color: green;">Withdrawl Successfully!</span>' + savingAmount;
                    }
                    break;

                case 2:
                    if (w > currentAmount) {
                        document.getElementById('result').innerHTML = '<span style="color: red;">Insufficient Amount.</span>';
                    } else if (w <= currentAmount) {
                        currentAmount -= w;
                        document.getElementById('result').innerHTML = '<span style="color: green;">Withdrawl Successfully!</span>' + currentAmount;
                    }
                    break;
            }
        }
        function Deposit(){
            var depo = Number(document.getElementById('dAmount').value);
            var choice = Number(document.getElementById('AccountType').value);
            switch (choice) {
                case 1:
                    {
                        savingAmount += depo;
                        document.getElementById('result').innerHTML = '<span style="color: green;">Deposit Successfully!</span>' + savingAmount;
                    }
                    break;
                case 2:
                    currentAmount += depo;
                    document.getElementById('result').innerHTML = '<span style="color: green;">Deposit Successfully!</span>' + currentAmount;

                    break;
        }
    }
    function CheckBalance() {
                var choice = Number(document.getElementById('AccountType').value);
                switch (choice) {
                    case 1:
                        document.getElementById('result').innerHTML ='<span style="color: blue;">Saving Account Balance: </span>' + savingAmount;
                        break;

                    case 2:
                        document.getElementById('result').innerHTML ='<span style="color: blue;">Current Account Balance: </span>' + currentAmount;
                        break;
                }
    }