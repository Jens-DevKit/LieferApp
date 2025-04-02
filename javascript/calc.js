let totalPrice = 0;
let orderValue = 0;
let delieverPrice = 0;
let activeDeliveryButton = null;
let isDeliveryFree = false;
let deliverService = false;
let isUpdatingPrice = false;

function calculateTotalPrice() {
    let orderValue = 0;

    SHOPPING_BAG.forEach(item => {
        orderValue += item.price * item.quantity;
    });

    if (isUpdatingPrice === false) {
        isUpdatingPrice = true;
        const PRICE_UPDATED_EVENT = new Event('PRICE_UPDATED');
        document.dispatchEvent(PRICE_UPDATED_EVENT);

    }

    deliverCheck();

    return parseFloat(orderValue).toFixed(2);
}

function renderPrice() {
    const priceContainer = document.getElementById('priceContainer');
    priceContainer.innerHTML = "";

    orderValue = parseFloat(calculateTotalPrice());
    let totalPrice = orderValue + delieverPrice;

    const priceContent = `
        <div style="display: grid;
    grid-template-columns: repeat(3, 1fr);">
            <p>Gesamt:</p><p></p>
            <p style="text-align: end;"><strong>
                ${orderValue}€</strong>
            </p>
            <p>Lieferkosten:</p><p></p>
            <p style="text-align: end;"><strong>
                ${delieverPrice}€</strong>
            </p>
        </div>
    `;
    if (orderValue === 0) {
        document.getElementById('buyBtn').classList.remove('activeBtn');
    }
    priceContainer.innerHTML = priceContent;
    isUpdatingPrice = false;

    const totalPriceContainer = document.getElementById('totalPriceContainer');
    totalPriceContainer.innerHTML = "";

    const totalPriceContent = `
        <h3 class="center">Zum Bezahlen: ${totalPrice}€</h3>
    `;

    totalPriceContainer.innerHTML = totalPriceContent;
    isUpdatingPrice = false;
    document.getElementById('shoppingCartBtn').classList.add('activeBtn');
}



document.addEventListener('PRICE_UPDATED', () => {
    orderValue = parseFloat(calculateTotalPrice());

    if (orderValue < 20 && orderValue > 0) {
        document.getElementById('deliverKost').classList.remove('d_none');
        document.getElementById('deliverFree').classList.add('d_none');
        document.getElementById('deliverText').innerHTML = "Noch nicht erreicht";
        document.getElementById('deliver').innerHTML = `Liefern + ${delieverPrice}€`;
        isDeliveryFree = false;
    } if (orderValue > 20) {
        document.getElementById('deliverKost').classList.add('d_none');
        document.getElementById('deliverFree').classList.remove('d_none');
        document.getElementById('deliverText').innerHTML = "Freie Lieferung";
        document.getElementById('deliver').innerHTML = "Liefern";
        isDeliveryFree = true;
    } else {
        document.getElementById('deliverKost').classList.remove('d_none');
        document.getElementById('deliverFree').classList.add('d_none');
        document.getElementById('deliverText').innerHTML = "Noch nicht erreicht";
        document.getElementById('deliver').innerHTML = "Liefern + 3€";
        isDeliveryFree = false;
    }
});

function deliver(button) {

    if (activeDeliveryButton && activeDeliveryButton !== button) {
        activeDeliveryButton.classList.remove('active');
    }

    if (activeDeliveryButton === button) {
        button.classList.remove('active');
        activeDeliveryButton = null;
        deliverService = false;
    } else {
        button.classList.add('active');
        activeDeliveryButton = button;
        deliverService = true;
    }

    renderPrice();
}

function pickup(button) {

    if (activeDeliveryButton && activeDeliveryButton !== button) {
        activeDeliveryButton.classList.remove('active');
    }

    if (activeDeliveryButton === button) {
        button.classList.remove('active');
        activeDeliveryButton = null;
        deliverService = false;
    } else {
        button.classList.add('active');
        activeDeliveryButton = button;
        deliverService = false;
    }
    renderPrice();
}

function deliverCheck() {
    if (isDeliveryFree === false && deliverService === true) {
        delieverPrice = 3;
    } else {
        delieverPrice = 0;
    }
}

function sendSHOPPING_BAG() {

    if (orderValue === 0 || activeDeliveryButton === null) {
        const textContainer = document.getElementById('modalContent');
        textContainer.innerHTML = "";


        const textContent = `
        <p style="font-size: 1.2em;">Bitte packen Sie ihre Waren in den Warenkorb und geben sie die Lieferung oder Abholung an. <br>
        Danke für Ihr Verständnis!
            </p>
    `;
        textContainer.innerHTML = textContent;
        document.body.classList.add('dontScroll');
        document.getElementById('modal').classList.remove('backgroundOverlay');

    } else {
        const textContainer = document.getElementById('modalContent');
        textContainer.innerHTML = "";


        const textContent = `
        <p style="font-size: 1.2em;">Leider konnten wir die Bestellung nicht weiterleiten, bitte versuchen sie es
                später noch einmal.</p>
            <p>Wir haben Ihre Bestellung Gespeichert, Sie können diese einfach aufrufen indem Sie auf Letzte Bestellung
                im
                Warenkorb klicken. Danke für Ihr verständnis
            </p>
    `;
        textContainer.innerHTML = textContent;
        document.body.classList.add('dontScroll');
        document.getElementById('modal').classList.remove('backgroundOverlay');
        saveSHOPPING_BAG()
    }
}