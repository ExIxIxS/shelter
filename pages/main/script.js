import {addMainPageContent,
        mainPageClickInteractive
} from '../../assets/scripts/common.js';

fetch('../../assets/json/pets.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(petsArray => {
            addMainPageContent(petsArray);
            document.querySelector('body').addEventListener('click', event => mainPageClickInteractive(event, petsArray));
        });