import {petsPageClickInteractive,
        createRandomDataSet,
        getCurrentDataSet,
        fillPetsPageWithContent
} from '../../assets/scripts/common.js';

fetch('../../assets/json/pets.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(petsArray => {
            const petsDataSet8x6 = createRandomDataSet(petsArray, 8, 6);
            const petsDataSet6x8 = createRandomDataSet(petsArray, 6, 8);
            const petsDataSet3x16 = createRandomDataSet(petsArray, 3, 16);
            const startPageNumber = 1;
            let currentDataSet = getCurrentDataSet([petsDataSet8x6, petsDataSet6x8, petsDataSet3x16]);

            //delete before release
            console.log(window.innerWidth);

            fillPetsPageWithContent(currentDataSet[0], startPageNumber, currentDataSet.length);
            document.querySelector('body').addEventListener('click', event => petsPageClickInteractive (event, petsArray, currentDataSet));
            //window.addEventListener('resize', event => fillPetsPageWithContent(petsRandomDataSet));

        });