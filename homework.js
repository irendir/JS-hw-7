window.countriesBackup = [];

function getCode() {
    const code = document.getElementById('country-code');
    code.addEventListener('change', e => code.innerHTML = countriesBackup.map(country => `<option>${country.region}</option>`));
    code.dispatchEvent(new Event('change'));
}

function setListeners() {
    let tableBody = document.querySelector('table tbody');
    tableBody.onclick = e => {
        e.target.classList.toggle('bg-warning')
        console.log(e.target.innerText);
    }

    let searchInput = document.getElementById('search');
    searchInput.onkeyup = e => {
        let searchValue = e.currentTarget.value;
        console.log(searchValue);
        let filteredCountries = window.countriesBackup.filter(country => {
            return country.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 
        || country.capital.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        || country.region.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    }   );
        renderCountries(filteredCountries);
    }
}
let a = 0;
let b = 0;

function renderCountries(countries) {
    console.table(countries);
    let htmlTable = countries.reduce((acc, country, item) => acc + `<tr>
        <td>${item + 1}</td>
        <td>${country.name}</td>
        <td>${country.capital}</td>
        <td>${country.region}</td>
        <td>${country.population}</td>
        <td></td>
    </tr>`, '');
    document.querySelector('.container table tbody').innerHTML = htmlTable;
    getCode();
}

function loadCountries() {
    document.getElementById('load-countries').disabled = true;
    document.querySelector('.load-countries-spinner').classList.remove('hidden');
    fetch('https://restcountries.com/v2/all').then(res => res.json()).then(function(data) {
        let countries = data.map(function(country) {
            return {
                alpha3Code: country.alpha3Code,
                name: country.name,
                capital: country.capital || '',
                region: country.region,
                population: country.population,
                flag: country.flag,
                borders: country.borders || []
            }
        });
        window.countriesBackup = countries;
        b = new Date().getTime();
        console.log(b - a);
        document.getElementById('load-countries').disabled = false;
        document.querySelector('.load-countries-spinner').classList.add('hidden');
        document.querySelector('table').classList.remove('hidden');
        renderCountries(countries);
        setListeners();
    });
}

let loadBtn = document.getElementById('load-countries');
loadBtn.onclick = function(e) {
    a = new Date().getTime();
    loadCountries();
}

document.querySelector('.google-link').onclick = e => {
    e.preventDefault();
    if(confirm('Are you sure')) {
        alert('Ну и зря');
        window.location.href = e.currentTarget.attributes.href.value;
    }
}
