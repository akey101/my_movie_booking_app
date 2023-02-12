const url = new URLSearchParams(window.location.search);
const clickedMovie = url.get('movie-name');
const movieName = document.querySelector('.movie-name');
movieName.textContent = clickedMovie;
const numberOfScreens = document.getElementById('number-of-screens');
const tax = document.querySelector('#gst');
const totals = document.querySelector('#total')
let popup = document.getElementById('popup');

function gettingCost(){
    tax.textContent = (Number(numberOfScreens.value)*84*18)/100;
    totals.textContent = Number(tax.textContent)+Number(numberOfScreens.value)*84;
}

const credit = document.getElementById('credit-card');
const debit = document.getElementById('debit-card');
const upi = document.getElementById('upi');
const netBanking = document.getElementById('netBanking');

const paymentSelection = document.querySelector('.paymentSelection');
function paymentSelected(){
    if(credit.checked){
        paymentSelection.innerHTML=`<label for="nameOnCard">Name on Credit Card</label><br>
        <input type="text" id="nameOnCard"><br>
        <label for="creditCardNumber">Credit Card Number</label><br>
        <input type="number" id="creditCardNumber"><br>
        <div>
            <label for="expiry">Expiry</label><br>
            <input type="date" id="expiry"><br>
            <label for="cvv">CVV</label><br>
            <input type="password" id="cvv">
        </div>`
    }

    if(debit.checked){
        paymentSelection.innerHTML=`
        <label for="nameOnCard">Name on Debit Card</label><br>
        <input type="text" id="nameOnCard"><br>
        <label for="debitCardNumber">Debit Card Number</label><br>
        <input type="number" id="debitCardNumber"><br>
        <div>
            <label for="expiry">Expiry</label><br>
            <input type="date" id="expiry"><br>
            <label for="cvv">CVV</label><br>
            <input type="password" id="cvv">
        </div>`
    }

    if(upi.checked){
        paymentSelection.innerHTML=`<label for="upi-id">UPI ID</label><br>
        <input type="text" id="upi-id" placeholder="xyz@yourbank"><br>`
    }

    if(netBanking.checked){
        paymentSelection.innerHTML=`
        <label for="bankName">Name of the Bank</label><br>
        <input type="text" id="nameOfBank"><br>
        <label for="bankAccNumber">Bank Account Number</label><br>
        <input type="number" id="bankAccNumber"><br>
        <label for="username">User Name/ Customer ID</label><br>
        <input type="text" id="username"><br>
        <label for="password">Password</label><br>
        <input type="password" id="password"><br>`
    }
}
// ProceedtoPay popup
function openPopup(){
    popup.classList.add('open-popup');
}
