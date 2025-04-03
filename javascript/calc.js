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
    orderValue = parseFloat(calculateTotalPrice());
    let totalPrice = orderValue + delieverPrice;

    document.getElementById('priceContainer').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(3, 1fr);">
            <p>Gesamt:</p><p></p><p style="text-align: end;"><strong>${orderValue}€</strong></p>
            <p>Lieferkosten:</p><p></p><p style="text-align: end;"><strong>${delieverPrice}€</strong></p>
        </div>
    `;
    isUpdatingPrice = false;
    document.getElementById('totalPriceContainer').innerHTML = `<h3 class="center">Zum Bezahlen: ${totalPrice}€</h3>`;
    document.getElementById('buyBtn').classList.toggle('activeBtn', orderValue !== 0);
    document.getElementById('shoppingCartBtn').classList.add('activeBtn');
}

document.addEventListener('PRICE_UPDATED', () => {
    orderValue = parseFloat(calculateTotalPrice());
    isDeliveryFree = orderValue > 20;

    updateDeliveryStatus(isDeliveryFree, orderValue > 0 ? delieverPrice : 3);
});

function updateDeliveryStatus(isFree, deliveryPrice) {
    const kost = document.getElementById('deliverKost');
    const free = document.getElementById('deliverFree');
    const text = document.getElementById('deliverText');
    const button = document.getElementById('deliver');

    kost.classList.toggle('d_none', isFree);
    free.classList.toggle('d_none', !isFree);
    text.innerHTML = isFree ? "Freie Lieferung" : "Noch nicht erreicht";
    button.innerHTML = isFree ? "Liefern" : `Liefern + ${deliveryPrice}€`;
}

function deliver(button) {
    if (activeDeliveryButton) activeDeliveryButton.classList.remove('active', activeDeliveryButton !== button);
    activeDeliveryButton = activeDeliveryButton === button ? null : button;

    button.classList.add('active');
    activeDeliveryButton = button;
    deliverService = true;

    renderPrice();
}

function pickup(button) {
    if (activeDeliveryButton) activeDeliveryButton.classList.remove('active', activeDeliveryButton !== button);
    activeDeliveryButton = activeDeliveryButton === button ? null : button;

    button.classList.add('active');
    activeDeliveryButton = button;
    deliverService = false;

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
    const textContainer = document.getElementById('modalContent');
    textContainer.innerHTML = "";

    textContainer.innerHTML = textContentCreator();

    document.body.classList.add('dontScroll');
    document.getElementById('modal').classList.remove('backgroundOverlay');
    saveSHOPPING_BAG();
}

function textContentCreator() {
    if (orderValue === 0 || activeDeliveryButton === null) {
        return `
            <p style="font-size: 1.5em;"><strong>Fehler!</strong> <br><br>
            <span style="font-size: 1em;">Prüfen Sie Ihre Waren und die Liefereinstellung. <br>
            Danke für Ihr Verständnis!</span></p> 
        `;
    } else {
        return `
            <p style="font-size: 1.5em;"><strong>Fehler!</strong> <br><br>
            <span style="font-size: 1em;">Leider konnten wir die Bestellung nicht weiterleiten, bitte versuchen sie es
            später noch einmal. <br>
            Danke für Ihr Verständnis!</span></p>
        `;}
}