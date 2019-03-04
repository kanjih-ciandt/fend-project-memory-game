/*
 * Create a list that holds all of your cards
 */
let lastCardSelect = null;
let currentCardSelect = null;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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

    setTimeout( () =>{
        current.classList.remove("open");
        current.classList.remove("show");
        current.classList.remove("not-match");
        last.classList.remove("not-match");
    }, 1000, current, last);
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
    } else {
        notMatch()
    }

    currentCardSelect = null;
    lastCardSelect = null;
}

function eventHandler(event) {
    console.log(event.target.id);
    currentCardSelect =  document.getElementById(event.target.id);
    currentCardSelect.classList.add("open");
    currentCardSelect.classList.add("show");

    if (lastCardSelect && lastCardSelect !== currentCardSelect) {
        lastCardSelect.classList.remove("open");
        lastCardSelect.classList.remove("show");
        checkCard();

    }
    lastCardSelect = currentCardSelect;

}

function initialize(){
    document.getElementById("deck").addEventListener('click', eventHandler);
}
window.onload = initialize;

