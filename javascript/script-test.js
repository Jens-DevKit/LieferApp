function renderBasket() {
    const SHOPPING_CONTAINER = document.getElementById('shoppingBag');
    SHOPPING_CONTAINER.innerHTML = "";

    SHOPPING_BAG.forEach((i) => {
        const bag = document.createElement('div');
        bag.classList.add('basketCard');
        bag.classList.add('padding');

        const totalPrice = (i.price * i.quantity).toFixed(2);

        const bagContent = `
            <button onclick="pushBasket('${i.id}')">
                <img class="iconImg" src="./img/addbutton.png" alt="">
            </button>
            <div>
                ${i.name} 
                <div>Preis: ${totalPrice}€</div>
                <div>Menge: ${i.quantity}</div>
            </div>
            <div>
                <button onclick="popBasket('${i.id}')">
                    <img class="iconImg" src="./img/supbutton.png" alt="">
                </button>
            </div>
        `;
        bag.innerHTML = bagContent;
        document.getElementById('buyBtn').classList.add('activeBtn');
        SHOPPING_CONTAINER.appendChild(bag);
    });

    renderPrice();
}

function renderOrderList(filterCategory = 'alle') {
    const CONTAINER = document.getElementById('containerOrder');
    CONTAINER.innerHTML = "";

    const filteredList = filterFood(filterCategory);

    filteredList.forEach((i) => {
        const order = document.createElement('div');
        order.classList.add('menuCard');

        const orderContent = `
            <div>
                <h4>${i.name}</h4>
                <p>${i.text}</p>
                <div>${i.price}€</div>
            </div>
            <div>
                <button onclick="pushBasket('${i.id}')">
                    <img class="iconImg" src="./img/addbutton.png" alt="Add button">
                </button>
            </div>
        `;
        order.innerHTML = orderContent;

        CONTAINER.appendChild(order);
    });
}

function renderFilter(filter) {
    const result = filterImg.find(item => item.filter === filter);
    const showFilterLogo = document.getElementById('filterContainer');
    showFilterLogo.innerHTML = "";

    if (result) {
        const imgElement = document.createElement("img");
        imgElement.src = result.picture;
        imgElement.classList.add('imgContainer');
        const nameElement = document.createElement("h2");
        nameElement.textContent = result.name;

        filterContainer.appendChild(imgElement);
        filterContainer.appendChild(nameElement);
    } else {
        renderFilter(all)
    }
}

function displayFood(list) {
    const CONTAINER = document.getElementById('containerOrder');
    CONTAINER.innerHTML = "";

    list.forEach((i) => {
        const order = document.createElement('div');
        order.classList.add('menuCard');

        const orderContent = `
            <div>
                <h4>${i.name}</h4>
                <p>${i.text}</p>
                <div>${i.price}€</div>
            </div>
            <div>
                <button onclick="pushBasket('${i.id}')">
                    <img class="iconImg" src="./img/addbutton.png" alt="Add button">
                </button>
            </div>
        `;
        order.innerHTML = orderContent;

        CONTAINER.appendChild(order);
    });
}

function toggleFilter(filter, button) {
    if (activeButton && activeButton !== button) {
        activeButton.classList.remove('active');
    }

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