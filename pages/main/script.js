import {addMainPageContent
} from '../../assets/scripts/common.js';

import {mainPageClickInteractive
} from '../../assets/scripts/userActions.js';

fetch('../../assets/json/pets.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(petsArray => {
            addMainPageContent(petsArray);
            document.querySelector('body').addEventListener('click', event => mainPageClickInteractive(event, petsArray));
        });
