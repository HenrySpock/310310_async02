console.log('Howdy from Async 2 Part 2!')

let deckId;
let remainingCards;
const drawnCards = [];

async function getCards() {
    try {
      const response1 = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data1 = await response1.json();
      const deckId = data1.deck_id;
      const response2 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data2 = await response2.json();
      if (data2.cards && data2.cards.length > 0) {
        const card = data2.cards[0];
        console.log(`Card is: ${card.value} of ${card.suit}`);
      } else {
        console.log('No cards remaining in deck.');
      }
    } catch (error) {
      console.error(error);
    }
}
  
getCards();

// ---------------

async function getTwoCards() {
    try {
      const shuffleResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const shuffleData = await shuffleResponse.json();
      const deckId = shuffleData.deck_id;
      const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
      const drawData = await drawResponse.json();
      const cards = drawData.cards;
      if (cards && cards.length > 0) {
        console.log(`First card is: ${cards[0].value} of ${cards[0].suit}`);
        console.log(`Second card is: ${cards[1].value} of ${cards[1].suit}`);
      } else {
        console.log('No cards drawn from deck');
      }
    } catch (error) {
      console.error(error);
    }
}
  
getTwoCards(); 
  
// ---------------

async function getCardFromDeck() {
    if (remainingCards > 0) {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();
      remainingCards = data.remaining;
      const card = data.cards[0];
      console.log(`Card is: ${card.value} of ${card.suit}`);
      console.log(`${remainingCards} cards remaining in deck.`); 
  
      drawnCards.push(card.code);
      displayCard(card.image);
  
      if (remainingCards === 0) {
        console.log('All cards have been drawn.');
        document.getElementById('hit-me-btn').disabled = true;
      }
    } else {
      console.log('No more cards in deck.');
      document.getElementById('hit-me-btn').disabled = true;
    }
} 
  
async function getNewDeck() {
    clearCards()
    document.getElementById('hit-me-btn').disabled = false;
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      deckId = data.deck_id;
      remainingCards = data.remaining;
      console.log(`New deck created with ID ${deckId} and ${remainingCards} cards remaining.`);
    } catch (error) {
      console.error(error);
    }
}

function displayCard(imageUrl) {
    const cardDisplay = document.getElementById('card-display');
    const cardContainer = document.createElement('div');
    const card = document.createElement('img');
    card.src = imageUrl;
    card.alt = 'card';
    
    // rotate the card randomly between -20 and 20 degrees
    const rotateDeg = Math.floor(Math.random() * 361); // random degree between 0 and 360
    card.style.transform = `rotate(${rotateDeg}deg)`;
    
    cardContainer.style.position = 'absolute';
    cardContainer.style.left = '50%';
    cardContainer.style.top = '50%';
    cardContainer.style.transform = 'translate(-50%, -50%)';
    
    cardContainer.appendChild(card);
    cardDisplay.appendChild(cardContainer);
}

getNewDeck();  

document.getElementById('hit-me-btn').addEventListener('click', getCardFromDeck);
document.getElementById('new-deck-btn').addEventListener('click', getNewDeck);

function clearCards() {
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = '';
}