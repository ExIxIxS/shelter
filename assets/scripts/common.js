const createCompleteElement = function(type, className = '', innerHTML = '',) {
    const element = document.createElement(type);
    if (className !== '')
        {element.className = className};
    if (innerHTML !== '')
        {element.innerHTML = innerHTML};
    return element;
}

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

const changeMenuButtonScin = function() {
    const imageButtonElement = document.querySelector('.img-drop-button');
    if (imageButtonElement.src.search(/drop_button-light.svg/) !== -1) {
        imageButtonElement.src = '../../assets/icons/drop_button-dark.svg';
    } else {
        imageButtonElement.src = '../../assets/icons/drop_button-light.svg';
    }
}

const getRandomInt = function(maxInt, minInt = 0) {
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt; //max and min inclusive
}

const getRandomPets = function(petsArray) {
    //generate pets Array for main`s page slider
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

export const createRandomDataSet = function(petsArray, objAmountPerPage, pagesAmount) {
    //generating Array from 48 petObj
    const petsCommonDataSet = [];
    for (let i = 1; i <= (48 / petsArray.length); i++) {

        const tempArray = [];
        for (let index = 0; index < petsArray.length; index++) {
            tempArray.push(petsArray[index]);
        }
        while (tempArray.length > 0) {
            let randomIndex = getRandomInt(tempArray.length);
            petsCommonDataSet.push(...tempArray.splice(randomIndex, 1));
        }
    }
    //creating DataSet
    const petsDataSet = [];
        for (let i = 1; i <= pagesAmount; i++) {
            const pagePetsArray = [];
            while (pagePetsArray.length !== objAmountPerPage) {
                for (let index = 0; index < petsCommonDataSet.length; index++) {
                    if (!pagePetsArray.includes(petsCommonDataSet[index])) {
                        pagePetsArray.push(...petsCommonDataSet.splice(index, 1));
                        break;
                    }
                }
            }
            petsDataSet.push(pagePetsArray);
        }
    return petsDataSet;
}


export const getCurrentDataSet = function(arrayOfDataSets) {
    switch (true) {
        case (window.innerWidth >= 1280):
            return arrayOfDataSets[0];
        case (window.innerWidth >= 768):
            return arrayOfDataSets[1];
        case (window.innerWidth <= 767):
            return arrayOfDataSets[2];
    }
}

const buttonDisablerSwitch  = function (currentPageNumber, lastPageNumber) {
    const leftButtonsCollection = document.querySelectorAll('.button-left');
    const rightButtonsCollection = document.querySelectorAll('.button-right');
    switch (currentPageNumber) {
        case 1:
            leftButtonsCollection.forEach(item => {
                item.disabled = true;
                item.dataset.disabled = true;
            });
            rightButtonsCollection.forEach(item => {
                item.disabled = false;
                item.dataset.disabled = false;
            });
            break;
        case lastPageNumber:
            leftButtonsCollection.forEach(item => {
                item.disabled = false;
                item.dataset.disabled = false;
            });
            rightButtonsCollection.forEach(item => {
                item.disabled = true;
                item.dataset.disabled = true;
            });
            break;
        default:
            leftButtonsCollection.forEach(item => {
                item.disabled = false;
                item.dataset.disabled = false;
            });
            rightButtonsCollection.forEach(item => {
                item.disabled = false;
                item.dataset.disabled = false;
            });
    }
}

export const fillMainPageWithContent = function(petsArray) {
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

const updateSliderRandom = function(petsArray) {
    const nextPetsArray = getRandomPets(petsArray);
    fillMainPageWithContent(nextPetsArray);
}

const getPetObjByName = function(petsArray, petName) {
    return petsArray.filter(item => item.name === petName)[0];
}

const createPetCardElement = function(petObj) {
    const cardElement = createCompleteElement('div', 'card open-popup');
    const graphicElement = createCompleteElement('div', 'graphic');
    const imageElement = createCompleteElement('img', 'open-popup');
    imageElement.src = petObj.img;
    imageElement.alt = `${petObj.type} ${petObj.name}`;
    imageElement.width = `270`;
    imageElement.height = `270`;
    const textElement = createCompleteElement('p', 'open-popup', petObj.name);
    const buttonElement = createCompleteElement('div', 'button button-light button-card open-popup', 'Learn more');

    graphicElement.append(imageElement);
    cardElement.append(graphicElement, textElement, buttonElement);

    return cardElement;
}

const createPetsContainerElement = function(petsArray) {
    const PetsContainerElement = createCompleteElement('div', 'cards-container');
    for (let petObj of petsArray) {
        PetsContainerElement.append(createPetCardElement(petObj));
    }
    return PetsContainerElement;
}

export const fillPetsPageWithContent = function(petsArray, pageNumber, lastPageNumber) {
    const cardContainerElement = document.querySelector('.cards-container');
    if (cardContainerElement !== null) {
        cardContainerElement.remove();
    }
    document.querySelector('main section .container_centered h3').after(createPetsContainerElement(petsArray));
    document.querySelector('.page-number').innerHTML = pageNumber;
    buttonDisablerSwitch(pageNumber, lastPageNumber)
}

const createPopupWindow = function(petObj) {
    const popupWindowElement = createCompleteElement('div', 'popup-window');
    const popupContentElement = createCompleteElement('div', 'popup-content');
    const popupDivImageElement = createCompleteElement('div', 'popup-image');
    const popupImageElement = createCompleteElement('img');
    popupImageElement.src = petObj.img;
    popupImageElement.alt = `${petObj.type} ${petObj.name}`;
    popupImageElement.width = '500';
    popupImageElement.height = '500';
    const popupTextElement = createCompleteElement('div', 'popup-text');
    const popupPetNameElement = createCompleteElement('h3', 'popup-pet-name', petObj.name);
    const popupPetTypeElement = createCompleteElement('h4', 'popup-pet-type', `${petObj.type} - ${petObj.breed}`);
    const popupPetDescrElement = createCompleteElement('h5', 'popup-pet-description', petObj.description);
    const popupPetPropElement = createCompleteElement('ul', 'popup-pet-properties');
    const popupPetAgeElement = createCompleteElement('li', 'popup-pet-age', `<strong>Age:</strong> ${petObj.age}`);
    const popupPetInoculationsElement = createCompleteElement('li', 'popup-pet-inoculations', `<strong>Inoculations:</strong> ${petObj.inoculations.join(', ')}`);
    const popupPetDiseasesElement = createCompleteElement('li', 'popup-pet-diseases', `<strong>Diseases:</strong> ${petObj.diseases.join(', ')}`);
    const popupPetParasitesElement = createCompleteElement('li', 'popup-pet-parasites', `<strong>Parasites:</strong> ${petObj.parasites.join(', ')}`);
    const popupButtonContent = '<img class="cross-image" src="../../assets/icons/button-cross.svg" alt="cross" width="12" height="12">'
    const popupButtonElement = createCompleteElement('div', 'button button-light popup-button', popupButtonContent);

    popupPetPropElement.append(popupPetAgeElement, popupPetInoculationsElement, popupPetDiseasesElement, popupPetParasitesElement);
    popupTextElement.append(popupPetNameElement, popupPetTypeElement, popupPetDescrElement, popupPetPropElement);
    popupDivImageElement.append(popupImageElement);
    popupContentElement.append(popupDivImageElement, popupTextElement);
    popupWindowElement.append(popupContentElement, popupButtonElement);

    return popupWindowElement;
}

const openPopupWindow = function(popupWindowElement) {
    document.querySelector('main').prepend(popupWindowElement);
    document.querySelector('body').classList.add('opened-popup');
}

const closePopupWindow = function() {
    document.querySelector('.popup-window').remove();
    document.querySelector('body').classList.remove('opened-popup')
}

export const mainPageClickInteractive = function(event, petsArray) {
    switch (true) {
        //clicking on menu burger button
        case (event.target.classList.contains('img-drop-button')):
            openOrCloseMenu();
            break;
        //clicking anywhere else when burger menu opened
        case (!event.target.classList.contains('img-drop-button') && document.querySelector('body').classList.contains('opened-menu')):
            closeMenu();
            break;
        //clicking on slider arrow-button
        case (['button-slider-arrow', 'arrow-image'].filter(className => event.target.classList.contains(className)).length > 0):
            updateSliderRandom(petsArray);
            break;
        //clicking on pet`s card
        case (event.target.classList.contains('open-popup')):
            let targetCardElement = event.target;
            while (!targetCardElement.classList.contains('card')) {
                targetCardElement = targetCardElement.parentElement;
            }
            const petObj = getPetObjByName(petsArray, targetCardElement.querySelector('p').innerHTML);
            openPopupWindow(createPopupWindow(petObj));
            break;
        //clicking on cross-button or out of popup when it opened
        case (['popup-window', 'popup-button', 'cross-image'].filter(className => event.target.classList.contains(className)).length > 0):
            closePopupWindow();
            break;
    }
}

export const petsPageClickInteractive = function(event, petsArray, responsivePetsDataSetArray) {
    const currentDataSet = getCurrentDataSet(responsivePetsDataSetArray);
    switch (true) {
        //clicking on menu burger button
        case (event.target.classList.contains('img-drop-button')):
            openOrCloseMenu();
            changeMenuButtonScin();
            break;
        //clicking anywhere else when burger menu opened
        case (!event.target.classList.contains('img-drop-button') && document.querySelector('body').classList.contains('opened-menu')):
            closeMenu();
            break;
        //clicking on paginator`s buttons
        case (['button-single', 'button-double'].filter(className => event.target.classList.contains(className)).length > 0):
            const pageNumberElement = document.querySelector('.page-number');
            let currentPageNumber = Number(pageNumberElement.innerHTML);
            switch (true) {
                //clicking on left single button
                case (['button-left', 'button-single'].filter(className => event.target.classList.contains(className)).length === 2):
                    if (currentPageNumber !== 1) {
                        currentPageNumber--;
                    }
                    break;
                //clicking on right single button
                case (['button-right', 'button-single'].filter(className => event.target.classList.contains(className)).length === 2):
                    if (currentPageNumber !== currentDataSet.length) {
                        currentPageNumber++;
                    }
                    break;
                //clicking on left double button
                case (['button-left', 'button-double'].filter(className => event.target.classList.contains(className)).length === 2):
                        currentPageNumber = 1;
                    break;
                //clicking on right double button
                case (['button-right', 'button-double'].filter(className => event.target.classList.contains(className)).length === 2):
                        currentPageNumber = currentDataSet.length;
                    break;
            }
            pageNumberElement.innerHTML = currentPageNumber;
            fillPetsPageWithContent(currentDataSet[currentPageNumber - 1], currentPageNumber, currentDataSet.length);
            break;
        //clicking on pet`s card
        case (event.target.classList.contains('open-popup')):
            let targetCardElement = event.target;
            while (!targetCardElement.classList.contains('card')) {
                targetCardElement = targetCardElement.parentElement;
            }
            const petObj = getPetObjByName(petsArray, targetCardElement.querySelector('p').innerHTML);
            openPopupWindow(createPopupWindow(petObj));
            break;
        //clicking on cross-button or out of popup when it opened
        case (['popup-window', 'popup-button', 'cross-image'].filter(className => event.target.classList.contains(className)).length > 0):
            closePopupWindow();
            break;
    }
}

export const updateResizedPetsPage = function(responsivePetsDataSetArray) {
    const currentDataSet = getCurrentDataSet(responsivePetsDataSetArray);
    let currentPageNumber = Number(document.querySelector('.page-number').innerHTML);
    currentPageNumber = (currentPageNumber > currentDataSet.length) ? currentDataSet.length : currentPageNumber;
    fillPetsPageWithContent(currentDataSet[currentPageNumber-1], currentPageNumber, currentDataSet.length)
}