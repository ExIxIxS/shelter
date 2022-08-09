const closeMenu = function(event) {
    document.querySelector('body').classList.remove('opened-menu');
    document.querySelector('#logo-menu').classList.remove('opened-menu');
    document.querySelector('nav').classList.remove('opened-menu');
    document.querySelector('.drop-button').classList.remove('opened-menu');
}

const mainPageClickInteractive = function(event) {
    switch (true) {
        //clicking on menu burger button
        case (event.target.classList.contains('img-drop-button')):
            document.querySelector('body').classList.toggle('opened-menu');
            document.querySelector('#logo-menu').classList.toggle('opened-menu');
            document.querySelector('nav').classList.toggle('opened-menu');
            document.querySelector('.drop-button').classList.toggle('opened-menu');
            break;
        //clicking on menu burger button
        case (!event.target.classList.contains('img-drop-button') && document.querySelector('body').classList.contains('opened-menu')):
            closeMenu();
    }

}

fetch('../../assets/json/pets.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(petsArray => {
            document.querySelector('body').addEventListener('click', mainPageClickInteractive);
        });