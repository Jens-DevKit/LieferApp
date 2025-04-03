let SHOPPING_BAG = [];
let activeButton = null;
let filterImg = [
    {
        name: 'Unsere Angebote',
        filter: 'angebote',
        picture: '../LieferAPP/img/percent.jpg',
    },
    {
        name: 'Für die Kleinen',
        filter: 'kids menü',
        picture: '../LieferAPP/img/kids.jpg',
    },
    {
        name: 'Gegen den Kleinen Hunger',
        filter: 'kleiner hunger',
        picture: '../LieferAPP/img/pancakes.jpg',
    },
    {
        name: 'Vorspeisen',
        filter: 'vorspeise',
        picture: '../LieferAPP/img/tomatoes.jpg',
    },
    {
        name: 'Hauptgericht',
        filter: 'hauptgang',
        picture: '../LieferAPP/img/fish.jpg',
    },
    {
        name: 'Dessert',
        filter: 'dessert',
        picture: '../LieferAPP/img/dessert.jpg',
    },
    {
        name: 'Speisekarte',
        filter: 'all',
        picture: '../LieferAPP/img/table.jpg',
    }
];

function init() {
    displayFood(ORDER_LIST);
    renderBasket();
    loadReloadSHOPPING_BAG();
    loadRATING_STARS()
    handleStarEvent(stars, currentRating, updateRating);
}

function searchFood() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const filteredList = ORDER_LIST.filter(item => {
        return item.name.toLowerCase().includes(filter) ||
            item.text.toLowerCase().includes(filter) ||
            item.filter.includes(filter);
    });
    displayFood(filteredList);
}

function displayFood(list) {
    const CONTAINER = document.getElementById('containerOrder');
    CONTAINER.innerHTML = "";
    list.forEach(i => CONTAINER.appendChild(Object.assign(document.createElement('div'), { className: 'menuCard', innerHTML: generateFoodContent(i) })));
}

function generateFoodContent(i) {
    return `
        <div>
            <h4>${i.name}</h4>
            <p>${i.text}</p>
            <div>${i.price}€</div>
        </div>
        <div>
            <button class="contentFit" onclick="pushBasket('${i.id}')">
                <img class="iconImg" src="./img/addbutton.png" alt="Add button">
            </button>
        </div>
    `;
}

function toggleFilter(filter, button) {
    if (activeButton) activeButton.classList.toggle('active', activeButton !== button);
    if (activeButton === button) {
        button.classList.remove('active');
        activeButton = null;
        renderOrderList('alle');
        filter = ('all');
    } else {
        button.classList.add('active');
        activeButton = button;
        renderOrderList(filter);
    }
    renderFilter(filter);
}

function renderFilter(filter) {
    const result = filterImg.find(item => item.filter === filter);
    document.getElementById('filterContainer').innerHTML = "";
    result ? createFilterElements(result) : renderFilter('all');
}

function createFilterElements(result) {
    const imgElement = Object.assign(document.createElement("img"), { src: result.picture, className: 'imgContainer' });
    const nameElement = Object.assign(document.createElement("h2"), { textContent: result.name });
    filterContainer.append(imgElement, nameElement);
}

function renderOrderList(filterCategory = 'alle') {
    const CONTAINER = document.getElementById('containerOrder');
    CONTAINER.innerHTML = "";

    filterFood(filterCategory).forEach(i => {
        const order = document.createElement('div');
        order.classList.add('menuCard');
        order.innerHTML = generateFoodContent(i);
        CONTAINER.appendChild(order);
    });
}

function filterFood(category) {
    if (category === 'alle') {
        return ORDER_LIST;
    }
    return ORDER_LIST.filter(item => item.filter.includes(category));
}

function pushBasket(itemId) {
    const itemInCart = SHOPPING_BAG.find(i => i.id === itemId);
    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        const item = ORDER_LIST.find(i => i.id === itemId);
        SHOPPING_BAG.push({ ...item, quantity: 1 });
    }
    document.getElementById('shoppingCartBtn').classList.add('activeBtn');
    renderBasket();
    saveReloadSHOPPING_BAG();
}

function popBasket(itemId) {
    const itemInCart = SHOPPING_BAG.find(i => i.id === itemId);
    if (itemInCart.quantity > 1) {
        itemInCart.quantity -= 1;
    } else {
        const index = SHOPPING_BAG.findIndex(i => i.id === itemId);
        if (index > -1) {
            SHOPPING_BAG.splice(index, 1);
        }
    }
    renderBasket();
    saveReloadSHOPPING_BAG();
}

function deleteBasket() {
    SHOPPING_BAG.length = 0;
    document.getElementById('buyBtn').classList.remove('activeBtn');
    renderBasket();
    saveReloadSHOPPING_BAG();
}

function renderBasket() {
    const SHOPPING_CONTAINER = document.getElementById('shoppingBag');
    SHOPPING_CONTAINER.innerHTML = "";

    SHOPPING_BAG.forEach((i) => {
        const bag = document.createElement('div');
        bag.classList.add('basketCard', 'padding');
        bag.innerHTML = generateBasketContent(i);
        document.getElementById('buyBtn').classList.add('activeBtn');
        SHOPPING_CONTAINER.appendChild(bag);
    });

    renderPrice();
}

function generateBasketContent(i) {
    return `
        <button class="contentFit" onclick="pushBasket('${i.id}')"><img class="iconImg" src="./img/addbutton.png"></button>
        <div>${i.name}<div>Preis: ${(i.price * i.quantity).toFixed(2)}€</div><div>Menge: ${i.quantity}</div></div>
        <button class="contentFit" onclick="popBasket('${i.id}')"><img class="iconImg" src="./img/supbutton.png"></button>
    `;
}

function saveSHOPPING_BAG() {
    localStorage.setItem('SHOPPING_BAG', JSON.stringify(SHOPPING_BAG));
}

function loadSHOPPING_BAG() {
    const storedSHOPPING_BAG = localStorage.getItem('SHOPPING_BAG');
    if (storedSHOPPING_BAG) {
        SHOPPING_BAG = JSON.parse(storedSHOPPING_BAG);
        renderBasket();
    }
}

function saveReloadSHOPPING_BAG() {
    const now = new Date();
    const item = {
        value: SHOPPING_BAG,
        expiry: now.getTime() + 300000
    };

    localStorage.setItem('SHOPPING_BAG_SHORT', JSON.stringify(item));
}

function loadReloadSHOPPING_BAG() {
    const storedSHOPPING_BAG = localStorage.getItem('SHOPPING_BAG_SHORT');
    if (storedSHOPPING_BAG) {
        SHOPPING_BAG = JSON.parse(storedSHOPPING_BAG);
        renderBasket();
    }
}

function loadReloadSHOPPING_BAG() {
    const storedSHOPPING_BAG_SHORT = localStorage.getItem('SHOPPING_BAG_SHORT');
    if (storedSHOPPING_BAG_SHORT) {
        const item = JSON.parse(storedSHOPPING_BAG_SHORT);
        const now = new Date();

        if (now.getTime() < item.expiry) {
            SHOPPING_BAG = item.value;
            renderBasket();
        } else {
            localStorage.removeItem('SHOPPING_BAG_SHORT');
        }
    }
}

function toggleShoppingBag() {
    document.getElementById('main_container').classList.toggle('block');
    document.getElementById('menu_container').classList.toggle('d_none');
    document.getElementById('shoppingBasket').classList.toggle('d_none');
    document.getElementById('shoppingCartBtn').classList.remove('activeBtn');
}

function toggleMenu() {
    document.getElementById('contactBtn').classList.toggle('d_none');
    document.getElementById('contactBtn').classList.toggle('respBtn');
    document.getElementById('searchBox').classList.toggle('respBtn');
}

function returnBtn() {
    document.getElementById('modal').classList.add('backgroundOverlay');
    document.body.classList.remove('dontScroll');

    document.getElementById('modalContent').addEventListener('click', function (event) {
        event.stopPropagation(event);
    });
}