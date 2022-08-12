import {petsPageClickInteractive,
        /*createRandomResponsiveDataSet*/
} from '../../assets/scripts/common.js';

fetch('../../assets/json/pets.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(petsArray => {
            //const petsRandomDataSet = createRandomResponsiveDataSet(petsArray);
            //console.log(petsRandomDataSet);
            //fillPetsPageWithContent(petsRandomDataSet);
            document.querySelector('body').addEventListener('click', event => petsPageClickInteractive (event, petsArray));
            //window.addEventListener('resize', event => fillPetsPageWithContent(petsRandomDataSet));
            //console.log(window.innerWidth)
        });