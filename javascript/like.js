const stars = document.querySelectorAll('.star');
let currentRating = 0;
let averageRating = 4.2;

function handleStarEvent(stars, currentRating, updateRating) {
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => toggleHoverEffect(stars, index));
        star.addEventListener('mouseout', () => removeHoverEffect(stars));
        star.addEventListener('click', () => {
            updateRating(currentRating = index + 1);
            saveRATING_STARS(currentRating);
        });
    });
}

function toggleHoverEffect(stars, index) {
    stars.forEach((star, i) => {
        star.classList.toggle('hover', i <= index);
    });
}

function removeHoverEffect(stars) {
    stars.forEach(star => star.classList.remove('hover'));
}

function updateRating(rating) {
    stars.forEach((star, index) => {
        star.classList.toggle('selected', index < rating);
    });
    document.getElementById('average-rating').textContent =
        `Deine Bewertung: ${rating}`;
}

if (!currentRating) {
    stars.forEach((star, index) => {
        if (index < Math.round(averageRating)) {
            star.classList.add('selected');
        }
    });
}

function saveRATING_STARS(currentRating) {
    localStorage.setItem('RATING_STARS', JSON.stringify(currentRating));
}

function loadRATING_STARS() {
    const storedRATING_STARS = localStorage.getItem('RATING_STARS');
    if (storedRATING_STARS) {
        currentRating = JSON.parse(storedRATING_STARS);
        updateRating(currentRating);
    }
}
