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
        <h4 class="center">
            Gesamt: ${totalPrice}€
        </h4>
    `;

    priceContainer.innerHTML = priceContent;
    isUpdatingPrice = false;

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