var blackjack_game = {
    'you': {'scoreSpan' : '#player-score', 'div': '#player-box', 'score' : 0},
    'dealer': {'scoreSpan' : '#dealer-score', 'div': '#dealer-box', 'score' : 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cards_map': {'2': 2, '3': 3, '4': 4, '5': 5, '6':  6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws' :0,
    'is_stand': false,
    'turns_over': false
};

const player = blackjack_game['you'];
const dealer = blackjack_game['dealer'];

const hit_sound = new Audio("static/sounds/blackjack/swish.m4a");
const win_sound = new Audio("static/sounds/blackjack/cash.mp3");
const loss_sound = new Audio("static/sounds/blackjack/loss.mp3");

document.querySelector("#blackjack-hit").addEventListener('click', blackjack_hit);
document.querySelector("#blackjack-deal").addEventListener('click', blackjack_deal);
document.querySelector("#blackjack-stand").addEventListener('click', dealer_logic);

function blackjack_hit() {
    if (blackjack_game['is_stand'] === false) {
        var card = random_card();
        show_card(card, player);
        update_score(card, player);
        show_score(player);

        if (player['score'] >= 21) {
            blackjack_game['turns_over'] = true;
            var winner = compute_winner();
            show_result(winner);
        }
    }
}

function show_card(card, active_player) {
    if (active_player['score'] <= 21){
        // getting queen card to show up when player hits
        var card_image = document.createElement('img');
        card_image.src = `static/imgs/blackjack/${card}.png`;
        document.querySelector(active_player['div']).appendChild(card_image);
        hit_sound.play();
    }
}

function blackjack_deal() {
    if (blackjack_game['turns_over'] === true) {

        blackjack_game['is_stand'] = false;
        var player_images = document.querySelector('#player-box').querySelectorAll('img');
        var dealer_images = document.querySelector('#dealer-box').querySelectorAll('img');

        //removing all cards from player box
        for (var i = 0; i < player_images.length; i++) {
            player_images[i].remove();
        }

        //removing all cards from dealer box
        for (var i = 0; i < dealer_images.length; i++) {
            dealer_images[i].remove();
        }

        //resetting everything after a round is over
        player['score'] = 0;
        dealer['score'] = 0;

        document.getElementById('player-score').innerHTML = 0;
        document.getElementById('dealer-score').innerHTML = 0;
        document.getElementById('player-score').style.color = "white";
        document.getElementById('dealer-score').style.color = "white";

        document.getElementById('blackjack-result').innerHTML = "Let's Play!";
        document.getElementById('blackjack-result').style.color = "black";

        blackjack_game['turns_over'] = true;
    }
}

function random_card() {
    var random_index = Math.floor(Math.random() * 13);
    return blackjack_game['cards'][random_index]; //returning value of cards[random_index] in object form
}

function update_score(card, active_player) {
    //adding 11 or 1 for ace: if adding 1 keeps player below 21, add 11, else add 1
    if (card == 'A') {
        if (active_player['score'] + blackjack_game['cards_map'][card][1] < 21) {
            active_player['score'] += blackjack_game['cards_map'][card][1];
        } else {
            active_player['score'] += blackjack_game['cards_map'][card][0];
        }
    } else {
        active_player['score'] += blackjack_game['cards_map'][card];
    }

    console.log(player['score']);
}

function show_score(active_player) {
    if (active_player['score'] > 21) {
        if (active_player == blackjack_game['you']) {
            document.getElementById('player-score').style.color = "red";
            document.getElementById('player-score').innerHTML = "Bust!";
        } else if (active_player == blackjack_game['dealer']) {
            document.getElementById('dealer-score').style.color = "red";
            document.getElementById('dealer-score').innerHTML = "Bust!";        
        }
    } else {
        if (active_player == blackjack_game['you']) {
            document.getElementById('player-score').innerHTML = active_player['score'];
        } else if (active_player == blackjack_game['dealer']) {
            document.getElementById('dealer-score').innerHTML = active_player['score'];
        }
    }
}

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//async = multithreading
async function dealer_logic() {
    blackjack_game['is_stand'] = true;

    while (dealer['score'] < 16 && blackjack_game['is_stand'] === true) {
        card = random_card();
        show_card(card, dealer);
        update_score(card, dealer);
        show_score(dealer);
        await sleep(1000);

        if (dealer['score'] >= 16 || player['score'] >= 21) {
            blackjack_game['turns_over'] = true;
            var winner = compute_winner();
            show_result(winner);
        }   
    }
}

function compute_winner() {
    var winner;

    if (player['score'] <= 21) {
        if (player['score'] > dealer['score'] || dealer['score'] > 21 || player['score'] == 21) {
            console.log("you won");
            blackjack_game['wins']++;
            document.getElementById('wins').innerHTML = blackjack_game['wins'];
            winner = player;
        } else if (player['score'] < dealer['score']) {
            console.log("dealer won");
            blackjack_game['losses']++;
            document.getElementById('losses').innerHTML = blackjack_game['losses'];
            winner = dealer;
        } else if(player['score'] == dealer['score']) {
            console.log("draw");
            blackjack_game['draws']++;
            document.getElementById('draws').innerHTML = blackjack_game['draws'];
        }
    } 

    //player busts but dealer doesn't
    else if(player['score'] > 21 && dealer['score'] <= 21) {
        console.log("dealer won");
        blackjack_game['losses']++;
        document.getElementById('losses').innerHTML = blackjack_game['losses'];
        winner = dealer;
    } 
    
    //player singlehandedly busts
    else if (player['score'] > 21) {
        console.log("dealer won, you busted");
        blackjack_game['losses']++;
        blackjack_game['turns_over'] = true;
        document.getElementById('losses').innerHTML = blackjack_game['losses'];
        winner = dealer;
    }

    //player busts and dealer busts
    else if(player['score'] > 21 && dealer['score'] > 21) {
        console.log("draw");
        console.log(blackjack_game['draws']++);
        document.getElementById('draws').innerHTML = blackjack_game['draws'];
    }

    return winner;
}

function show_result(winner) {
    var message, message_color;
    if (blackjack_game['turns_over'] === true) {
        if (winner === player) {
            message = 'you won!';
            message_color = 'green';
            win_sound.play();
        } else if (winner === dealer) {
            message = 'you lost!';
            message_color = 'red';
            loss_sound.play();
        } else {
            message = 'draw!';
            message_color = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = message_color;
    }
}