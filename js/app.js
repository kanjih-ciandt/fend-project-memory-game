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
let modal = document.getElementById('myModal');

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
    } else {
        notMatch();
    }

    moveController();
    currentCardSelect = null;
    lastCardSelect = null;

    if (listSelected.length >= 16) {
        finishedGame();
    }
}

function moveController(reset){
    if (reset) {
        moveCount = 0;
        document.getElementById("star-3").classList.remove("fa-star-o");
        document.getElementById("star-3").classList.add("fa-star");
        document.getElementById("star-2").classList.remove("fa-star-o");
        document.getElementById("star-2").classList.add("fa-star");
        document.getElementById("star-w3").classList.remove("fa-star-o");
        document.getElementById("star-w3").classList.add("fa-star");
        document.getElementById("star-w2").classList.remove("fa-star-o");
        document.getElementById("star-w2").classList.add("fa-star");
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
    modal.style.display = "block";
    document.getElementById("win-moves").innerHTML = moveCount;
    if (moveCount >= 25 && moveCount < 50) {
        document.getElementById("star-w3").classList.remove("fa-star");
        document.getElementById("star-w3").classList.add("fa-star-o");
    } else if (moveCount >= 50) {
        document.getElementById("star-w2").classList.remove("fa-star");
        document.getElementById("star-w2").classList.add("fa-star-o");
    }

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
        document.querySelectorAll('.second')[1].innerHTML = ("0" + seconds).slice(-2);
        document.querySelectorAll('.minute')[1].innerHTML = ("0" + minutes).slice(-2);
        document.querySelectorAll('.hour')[1].innerHTML = ("0" + hours).slice(-2);
    } else {
        startTime = new Date().getTime();
    }
}

function initialize(){
    document.getElementById("deck").addEventListener('click', eventHandler);

    let span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    startGame();
}
window.onload = initialize;
setInterval(clock, 500);
