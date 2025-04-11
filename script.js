const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rateText = document.getElementById('rate');
const swap = document.getElementById('btn');

swap.addEventListener('click',()=>{
    const tmp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = tmp;
})

currency_one.addEventListener('change', calculateMoney);
currency_two.addEventListener('change', calculateMoney);

amount_one.addEventListener('input',calculateMoney);
amount_two.addEventListener('input',calculateMoney);

function calculateMoney() {
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one.value}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two.value];
            rateText.innerText = `1 ${currency_one.value} = ${rate} ${currency_two.value}`;
            amount_two.value = (amount_one.value * rate).toFixed(2);
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
        });
}

calculateMoney();
