
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const clack = document.getElementById('calck');

let data = [];

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser)

}

function doubleMoney() {
    data = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        }
    })

    updateDOM();
}

function showMillionaires() {
    data = data.filter(user => {
        return user.money > 1000000
    })
    //فاید میاد ارایه نگاه میکنه هر ابجکتی که توش دید باللاتر از 10000 نگهش میداره 
    updateDOM();
}

function sortByRichest() {
    data.sort((a, b) => b.money - a.money)
    //سورت میکنه اگر استرینگ باشه به ترتیب حرف الفبا ولی اعداد دوتا ورود میگیری a-b بزاری ینی از کو
    //به بزرگ ولی برعکس ینی از بزرگ به کوچیک
    updateDOM();
}

function addData(obj) {
    data.push(obj)
    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person \xa0\xa0\xa0\xa0\xa0\xa0\xa0 </strong> Wealth</h2>'
    providedData.forEach(item => {
        let element = document.createElement('div')
        element.innerHTML = `${item.name} -------------${item.money}$`
        main.appendChild(element)
    })

}


function calculateWealth() {
    const wealth = data.reduce((x, y) => (x = y.money + x), 2);

    //این متد برای اینکه یه مقدار اولیه داری تک تک اعضا رو باهم جمع میکنه
    //ارایه که مقدار عددی داره دونه دونه جمع میکنه این دو اولش نوشتس مقدار اولییس بقیه اعضا باهم جمع میشن
    clack.innerHTML = ""
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: ${wealth} </h3>`;
    clack.appendChild(wealthEl);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
