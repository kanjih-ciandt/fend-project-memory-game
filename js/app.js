/*
 * Create a list that holds all of your cards
 */
let lastCardSelect = null;
let currentCardSelect = null;
let isActiveActionLister = true;
let isGameStarted = false;
let listSelected= [];
let startTime = new Date().getTime();
let moveCount = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from https://stackoverflow.com/questions/7070054
function shuffle(deck) {
    for (let i = deck.children.length; i >= 0; i--) {
        deck.appendChild(deck.children[Math.random() * i | 0]);
    }
}


function startGame() {
    isGameStarted = false;
    console.log('started');
    startTime = new Date().getTime();
    moveController(true);

    let deck = document.getElementById("deck");
    lastCardSelect = null;
    currentCardSelect = null;
    shuffle(deck);

    deck.childNodes.forEach(function(item){
        if (item.tagName === 'LI'){
            item.classList.remove("open");
            item.classList.remove("show");
            item.classList.remove("not-match");
            item.classList.remove("match");
        }
    });
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function notMatch() {
    currentCardSelect.classList.add("not-match");
    lastCardSelect.classList.add("not-match");
    let current = currentCardSelect;
    let last = lastCardSelect;
    isActiveActionLister= false;

    setTimeout( () =>{
        current.classList.remove("open");
        current.classList.remove("show");
        current.classList.remove("not-match");
        last.classList.remove("not-match");
        isActiveActionLister = true;
    }, 1000, current, last, isActiveActionLister);
}

function checkCard() {
    if(lastCardSelect === currentCardSelect) {
        return;
    }

    let currentElement = currentCardSelect.id.split('_')[0];
    let lastElement = lastCardSelect.id.split('_')[0];
    if (currentElement === lastElement) {
        currentCardSelect.classList.add("match");
        lastCardSelect.classList.add("match");
        listSelected.push(currentCardSelect.id);
        listSelected.push(lastCardSelect.id);
        if (listSelected.length >= 16) {
            finishedGame();
        }
    } else {
        notMatch()
    }

    moveController();
    currentCardSelect = null;
    lastCardSelect = null;
}

function moveController(reset){
    if (reset) {
        moveCount = 0;
        document.getElementById("star-3").classList.remove("fa-star-o");
        document.getElementById("star-3").classList.add("fa-star");
        document.getElementById("star-2").classList.remove("fa-star-o");
        document.getElementById("star-2").classList.add("fa-star");
    } else {
        moveCount++;
    }

    if (moveCount >= 25 && moveCount < 50) {
        document.getElementById("star-3").classList.remove("fa-star");
        document.getElementById("star-3").classList.add("fa-star-o");
    } else if (moveCount >= 50) {
        document.getElementById("star-2").classList.remove("fa-star");
        document.getElementById("star-2").classList.add("fa-star-o");
    }
    document.getElementById("moves").innerHTML = moveCount;
}

function eventHandler(event) {
    if (event.target.id === 'deck' || listSelected.includes(event.target.id)){
        return;
    }
    isGameStarted = true;
    if (isActiveActionLister) {
        currentCardSelect = document.getElementById(event.target.id);
        if ('null' !== currentCardSelect) {
            currentCardSelect.classList.add("open");
            currentCardSelect.classList.add("show");
        }

        if (lastCardSelect && lastCardSelect !== currentCardSelect) {
            lastCardSelect.classList.remove("open");
            lastCardSelect.classList.remove("show");
            checkCard();
        }
        lastCardSelect = currentCardSelect;
    }
}

function finishedGame() {
    isGameStarted = false;
    setTimeout( () =>{
        alert('Ganhou !!!! \nOn this time:' +  document.querySelectorAll('.clock')[0].innerText );
    }, 1000);
}

function clock() {// We create a new Date object and assign it to a variable called "time".
    if (isGameStarted) {
        let currentTime = new Date().getTime();
        let t = currentTime - startTime;
        let seconds = Math.floor( (t/1000) % 60 );
        let minutes = Math.floor( (t/1000/60) % 60 );
        let hours = Math.floor( (t/(1000*60*60)) % 24 );

        document.querySelectorAll('.second')[0].innerHTML = ("0" + seconds).slice(-2);
        document.querySelectorAll('.minute')[0].innerHTML = ("0" + minutes).slice(-2);
        document.querySelectorAll('.hour')[0].innerHTML = ("0" + hours).slice(-2);
    } else {
        startTime = new Date().getTime();
    }
}

function initialize(){
    document.getElementById("deck").addEventListener('click', eventHandler);
    startGame();
}
window.onload = initialize;
setInterval(clock, 1000);
