console.log('Howdy from Async 2 Part 1!')

// Fact about favorite number
const favoriteNumber = 42;
const url = `http://numbersapi.com/${favoriteNumber}?json`;

const getFavoriteNumberFact = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const favoriteNumberElement = document.getElementById('favorite-number');
    const favoriteNumberFact = document.createElement('p');
    favoriteNumberFact.textContent = data.text;
    favoriteNumberElement.appendChild(favoriteNumberFact);
  } catch (error) {
    console.error(error);
  }
};

getFavoriteNumberFact();

// 5 Random Facts
const getNumberFacts = async () => {
  let numbers = [];
  while (numbers.length < 5) {
    let num = Math.floor(Math.random() * 100) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  const urls1 = numbers.map(num => `http://numbersapi.com/${num}?json`);

  try {
    const dataArray = await Promise.all(urls1.map(async url => {
      const response = await fetch(url);
      return response.json();
    }));
    const randomFactsElement = document.getElementById('random-facts');
    dataArray.forEach(data => {
      const fact = data.text;
      const factElement = document.createElement('p');
      factElement.textContent = fact;
      randomFactsElement.appendChild(factElement);
    });
  } catch (error) {
    console.error(error);
  }
};

getNumberFacts();

// 4 Facts about Favorite Number
const getFavoriteFacts = async () => {
  const urls2 = Array.from({ length: 4 }, () => `http://numbersapi.com/${favoriteNumber}?json`);

  try {
    const dataArray = await Promise.all(urls2.map(async url => {
      const response = await fetch(url);
      return response.json();
    }));
    const favoriteFactsElement = document.getElementById('favorite-facts');
    dataArray.forEach(data => {
      const fact = data.text;
      const factParagraph = document.createElement('p');
      factParagraph.textContent = fact;
      favoriteFactsElement.appendChild(factParagraph);
    });
  } catch (error) {
    console.error(error);
  }
};

getFavoriteFacts();





