import {getPetObjByName,
        getNextRandomPets,
        getCurrentDataSet,
        fillPetsPageWithContent,
        updateMainPageWithContent,
        createPopupWindow
} from '../../assets/scripts/common.js';

const openedMenuElements = getOpenedMenuCollections();

function getOpenedMenuCollections() {
    const elementsArray = [
        document.getElementsByTagName('body'),
        document.getElementsByClassName('logo-menu'),
        document.getElementsByTagName('nav'),
        document.getElementsByClassName('drop-button')
    ];
    return elementsArray;
}

const toggleMenu = function(htmlCollectionsArray) {
    htmlCollectionsArray.map(htmlCollection => htmlCollection[0].classList.toggle('opened-menu'));
}

const closeMenu = function(htmlCollectionsArray) {
    htmlCollectionsArray.map(htmlCollection => htmlCollection[0].classList.remove('opened-menu'));
}

const changeMenuButtonScin = function() {
    const imageButtonElement = document.querySelector('.img-drop-button');
    const lightButtonIconName = "drop_button-light";
    const darkButtonIconName = "drop_button-dark";
    const isButtonLight = (imageButtonElement.src.search(lightButtonIconName) >= 0) ? true : false;

    imageButtonElement.src = `../../assets/icons/${isButtonLight ? darkButtonIconName : lightButtonIconName}.svg`;
}

const openPopupWindow = function(popupWindowElement) {
    document.querySelector('main').prepend(popupWindowElement);
    document.querySelector('body').classList.add('opened-popup');
}

const closePopupWindow = function() {
    document.querySelector('.popup-window').remove();
    document.querySelector('body').classList.remove('opened-popup')
}

const updateSliderRandom = function(petsArray) {
    const nextPetsArray = getNextRandomPets(petsArray);
    updateMainPageWithContent(nextPetsArray);
}

const animateSlider = function(sideName) {
    const petsCardsElements = document.querySelectorAll('.card');
    const animatedClassName = 'card-animated-' + sideName;
    for (let petCardElement of petsCardsElements) {
        petCardElement.classList.add(animatedClassName);
    }
    setTimeout(() => {
        for (let petCardElement of petsCardsElements) {
            petCardElement.classList.remove(animatedClassName);
        }
    }, 500);
}

export const mainPageClickInteractive = function(event, petsArray) {
    switch (true) {
        //clicking on menu burger button
        case (event.target.classList.contains('img-drop-button')):
            toggleMenu(openedMenuElements);
            break;
        //clicking anywhere else when burger menu opened
        case (!event.target.classList.contains('img-drop-button') && document.querySelector('body').classList.contains('opened-menu')):
            closeMenu(openedMenuElements);
            break;
        //clicking on slider arrow-button
        case (['button-slider-arrow', 'arrow-image'].filter(className => event.target.classList.contains(className)).length > 0):
            if (event.target.classList.contains('right')) {
                animateSlider('left');
            } else {
                animateSlider('right');
            }
            setTimeout(() => updateSliderRandom(petsArray), 250);
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
            toggleMenu(openedMenuElements);
            changeMenuButtonScin();
            break;
        //clicking anywhere else when burger menu opened
        case (!event.target.classList.contains('img-drop-button') && document.querySelector('body').classList.contains('opened-menu')):
            closeMenu(openedMenuElements);
            changeMenuButtonScin();
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
