import {petsPageClickInteractive,
        createRandomDataSet,
        getCurrentDataSet,
        fillPetsPageWithContent,
        updateResizedPetsPage
} from '../../assets/scripts/common.js';

fetch('../../assets/json/pets.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(petsArray => {
            const responsivePetsDataSetArray = [createRandomDataSet(petsArray, 8, 6), createRandomDataSet(petsArray, 6, 8), createRandomDataSet(petsArray, 3, 16)];
            const startPageNumber = 1;
            const currentDataSet = getCurrentDataSet(responsivePetsDataSetArray);

            fillPetsPageWithContent(currentDataSet[0], startPageNumber, currentDataSet.length);
            document.querySelector('body').addEventListener('click', event => petsPageClickInteractive(event, petsArray, responsivePetsDataSetArray));
            window.addEventListener('resize', event => updateResizedPetsPage(responsivePetsDataSetArray));
        });