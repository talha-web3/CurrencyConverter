const baseURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
const flagElems = document.querySelectorAll('.flags');
const selectElems = document.querySelectorAll('select');
const buttonElem = document.querySelector('#btn');
const inputElem = document.querySelector('input');
const displayElem = document.querySelector('#display');

const populateSelectOptions = (select) => {
    for (let key in countryList) {
        let option = document.createElement('option');
        option.textContent = key;
        option.value = key;
        select.append(option);
    }
};

const updateFlag = (select) => {
    const countryCode = countryList[select.value];
    select.parentElement.querySelector('.flag').src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

selectElems.forEach((select) => {
    populateSelectOptions(select);
    select.addEventListener('change', () => updateFlag(select));
});

buttonElem.addEventListener('click', getRate);

async function getRate(event) {
    event.preventDefault();

    let from = '';
    let to = '';
    selectElems.forEach((select) => {
        if (select.name === 'from') {
            from = select.value.toLowerCase();
        }
        if (select.name === 'to') {
            to = select.value.toLowerCase();
        }
    });

    let URL = `${baseURL}/${from}/${to}.json`;

    const response = await fetch(URL);
    const data = await response.json();

    const rate = data[to];
    const totalRate = (rate * inputElem.value).toFixed(2);

    displayElem.innerText = `${inputElem.value}${from.toUpperCase()}= ${totalRate}${to.toUpperCase()}`;
}