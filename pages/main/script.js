const openOrCloseMenu = function() {
    document.querySelector('body').classList.toggle('opened-menu');
    document.querySelector('#logo-menu').classList.toggle('opened-menu');
    document.querySelector('nav').classList.toggle('opened-menu');
    document.querySelector('.drop-button').classList.toggle('opened-menu');
}

const closeMenu = function() {
    document.querySelector('body').classList.remove('opened-menu');
    document.querySelector('#logo-menu').classList.remove('opened-menu');
    document.querySelector('nav').classList.remove('opened-menu');
    document.querySelector('.drop-button').classList.remove('opened-menu');
}

const getRandomInt = function(maxInt, minInt = 0) {
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt; //Максимум и минимум включаются
}

const getRandomPets = function(petsArray) {
    const activePets = [];
    const petsCardsElements = document.querySelectorAll('.card');
    for (let petCardElement of petsCardsElements) {
        activePets.push(petCardElement.querySelector('p').innerHTML);
    }
    const vailablePets = petsArray.filter(petObj => !activePets.includes(petObj.name));
    const nextPetsArray = [];
    for (let i = 0; i < activePets.length; i++) {
        const randomIndex = getRandomInt(vailablePets.length - 1);
        nextPetsArray.push(...vailablePets.splice(randomIndex, 1));
    }
    return nextPetsArray;
}

const updateSliderRandom = function(petsArray) {
    const nextPetsArray = getRandomPets(petsArray);
    fillMainPageWithContent(nextPetsArray);
}

const fillMainPageWithContent = function(petsArray) {
    const petsCardsElements = document.querySelectorAll('.card');
    let petsArrayIndex = 0;
    for (let petCardElement of petsCardsElements) {
        const petObj = petsArray[petsArrayIndex];
        const petCardImgElement = petCardElement.querySelector('img');
        petCardImgElement.src = petObj.img;
        petCardImgElement.alt = `${petObj.type} ${petObj.name}`;
        petCardElement.querySelector('p').innerHTML = petObj.name;
        petsArrayIndex++;
    }
}

const mainPageClickInteractive = function(event, petsArray) {
    switch (true) {
        //clicking on menu burger button
        case (event.target.classList.contains('img-drop-button')):
            openOrCloseMenu();
            break;
        //clicking anywhere else when menu opened
        case (!event.target.classList.contains('img-drop-button') && document.querySelector('body').classList.contains('opened-menu')):
            closeMenu();
            break;
        //clicking on slider arrow-button
        case (event.target.classList.contains('button-slider-arrow') || event.target.classList.contains('arrow-image')):
            updateSliderRandom(petsArray);
            break;
    }

}

fetch('../../assets/json/pets.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(petsArray => {
            fillMainPageWithContent(petsArray);
            document.querySelector('body').addEventListener('click', event => mainPageClickInteractive(event, petsArray));
        });