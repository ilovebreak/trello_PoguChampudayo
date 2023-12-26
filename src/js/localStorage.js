import Card from "./Card";

export function saveToStorage() {
  const cardContainers = document.querySelectorAll(".card-container");
let storedData = {}
  let storageValue = ''
  
  for (let cardContainer of cardContainers) {
    switch (cardContainer.className) {
        case "card-container todo": 
            storageValue = 'todo';
            break;
        case "card-container in-progress": 
            storageValue = 'in-progress'
            break
        case "card-container done": 
            storageValue = 'done'
            break
        default:
            break
    }

    let cards = cardContainer.querySelectorAll('.draggable')
    for (let card of cards) {
        let cardText = card.firstElementChild.textContent;
        storedData[cardText] = storageValue
    }

  }
  localStorage.setItem("storedData", JSON.stringify(storedData));
}

export function loadFromStorage() {
  const json = localStorage.getItem("storedData");

  let storedData;

  try {
    storedData = JSON.parse(json);
    console.log(storedData)
  } catch (error) {
    console.log(error);
  }

  if (storedData) {
    Object.keys(storedData).forEach((key) => {
      let cardContainer = document.querySelector('.' + storedData[key]);
      console.log(key)
      cardContainer.insertBefore(Card.create(key).element, cardContainer.lastElementChild)
    });
  }
}

