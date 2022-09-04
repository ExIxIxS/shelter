const createCompleteElement = function(type, className, innerHTML) {
    const element = document.createElement(type);
    element.className = (className) ? className : '';
    element.innerHTML = (innerHTML) ? innerHTML : '';
    return element;
}

const getRandomInt = function(maxInt, minInt = 0) {
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt; //max and min inclusive
}

export const getPetObjByName = function(petsArray, petName) {
    return petsArray.find(item => item.name === petName);
}

export const getNextRandomPets = function(petsArray) {
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

const createPetCardElement = function(petObj) {
    const htmlTemplate = `
        <div class="graphic">
            <img class="open-popup" src="${petObj.img}" alt="${petObj.type} ${petObj.name}" width="270" height="270">
        </div>
        <p class="open-popup">${petObj.name}</p>
        <div class="button button-light button-card open-popup">
            Learn more
        </div>`

    const cardElement = createCompleteElement('div', 'card open-popup', htmlTemplate);

    return cardElement;
}

const createPetsContainerElement = function(petsArray) {
    const PetsContainerElement = createCompleteElement('div', 'cards-container');
    for (let petObj of petsArray) {
        PetsContainerElement.append(createPetCardElement(petObj));
    }
    return PetsContainerElement;
}

export const addMainPageContent = function(petsArray) {
    const cardElements = [];
    const additionalClasses = ['left-card', 'central-card', 'right-card'];
    //3-cards grid
    for (let index = 0; index < 3; index++) {
        const PetCardElement = createPetCardElement(petsArray[index]);
        PetCardElement.classList.add(additionalClasses[index]);
        cardElements.push(PetCardElement);
    }
    document.querySelector('.slider-card-frame').append(...cardElements);
}

export const updateMainPageWithContent = function(petsArray) {
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

export const fillPetsPageWithContent = function(petsArray, pageNumber, lastPageNumber) {
    const cardContainerElement = document.querySelector('.cards-container');
    if (cardContainerElement !== null) {
        cardContainerElement.remove();
    }
    document.querySelector('main section .container_centered h3').after(createPetsContainerElement(petsArray));
    document.querySelector('.page-number').innerHTML = pageNumber;
    buttonDisablerSwitch(pageNumber, lastPageNumber)
}

export const createPopupWindow = function(petObj) {
    const htmlTemplate = `
            <div class="popup-content">
                <div class="popup-image">
                    <img src="${petObj.img}" alt="${petObj.type} ${petObj.name}" width="500" height="500">
                </div>
                <div class="popup-text">
                    <h3 class="popup-pet-name">${petObj.name}</h3>
                    <h4 class="popup-pet-type">${petObj.type} - ${petObj.breed}</h4>
                    <h5 class="popup-pet-description">${petObj.description}</h5>
                    <ul class="popup-pet-properties">
                        <li class="popup-pet-age"><strong>Age:</strong> ${petObj.age}</li>
                        <li class="popup-pet-inoculations"><strong>Inoculations:</strong> ${petObj.inoculations.join(', ')}</li>
                        <li class="popup-pet-diseases"><strong>Diseases:</strong> ${petObj.diseases.join(', ')}</li>
                        <li class="popup-pet-parasites"><strong>Parasites:</strong> ${petObj.parasites.join(', ')}</li>
                    </ul>
                </div>
                <div class="button button-light popup-button">
                    <img class="cross-image" src="../../assets/icons/button-cross.svg" alt="cross" width="12" height="12">
                </div>
            </div>`

    const popupWindowElement = createCompleteElement('div', 'popup-window', htmlTemplate);
    return popupWindowElement;
}
