"use strict";

const url = "https://anapioficeandfire.com/api/characters/583";

async function getLordFromHouse(url) {
  const houseResponse = await fetch(url);
  const house = await houseResponse.json();
  const lordResponse = await fetch(house.currentLord);
  const lord = await lordResponse.json();

  console.log(lord.name);
  for (const title of lord.titles) {
    console.log(title);
  }
}

getLordFromHouse(url);
