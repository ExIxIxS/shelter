import {petsPageClickInteractive
} from '../../assets/scripts/common.js';

fetch('../../assets/json/pets.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(petsArray => {
            document.querySelector('body').addEventListener('click', event => petsPageClickInteractive (event, petsArray));
        });