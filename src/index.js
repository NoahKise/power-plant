import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { stateControl, blueFood, hydrate, giveLight, winCheck, actionCheck } from './plant.js';

window.onload = function () {
    let counter = 1;
    document.getElementById('newPlant').onclick = function (e) {
        e.preventDefault();
        let actionCounter = 10;
        const inputPlantType = document.querySelector("select#plantTypes option:checked").textContent;
        const plantId = `plant${counter}`;
        const newPlant = stateControl(plantId);
        counter++;
        const body = document.querySelector("body");
        const newPlantDiv = document.createElement("div");
        const name = document.createElement("h1");
        name.append(inputPlantType);
        const foodButton = document.createElement("button");
        foodButton.setAttribute("id", "food");
        foodButton.innerText = "Add Food";
        const waterButton = document.createElement("button");
        waterButton.setAttribute("id", "water");
        waterButton.innerText = "Add Water";
        const lightButton = document.createElement("button");
        lightButton.setAttribute("id", "light");
        lightButton.innerText = "Add Light";
        const h3food = document.createElement('h3');
        const divfood = document.createElement('div');
        divfood.setAttribute("id", "chosen-food-value");
        h3food.append(divfood);
        const h3Water = document.createElement('h3');
        const divWater = document.createElement('div');
        divWater.setAttribute("id", "chosen-water-value");
        h3Water.append(divWater);
        const h3Light = document.createElement('h3');
        const divLight = document.createElement('div');
        divLight.setAttribute("id", "chosen-light-value");
        h3Light.append(divLight);
        newPlantDiv.setAttribute("class", "plantCard");
        const actionDisplay = document.createElement("h2");
        actionDisplay.innerText = `Actions Remaining: ${actionCounter}`;
        newPlantDiv.append(name, foodButton, h3food, waterButton, h3Water, lightButton, h3Light, actionDisplay);

        body.append(newPlantDiv);

        foodButton.onclick = function () {
            const newState = newPlant(blueFood);
            divfood.innerText = `Food: ${newState.food}`;
            actionCounter -= 1;
            actionDisplay.innerText = `Actions Remaining: ${actionCounter}`;
            if (winCheck(newState.food, newState.water, newState.light, inputPlantType)) {
                actionDisplay.innerText = `You Win!`;
            }
            if (actionCheck(actionCounter)) {
                actionDisplay.innerText = `Sorry, you ran out of actions`;
            }
        };
        waterButton.onclick = function () {
            const newState = newPlant(hydrate);
            divWater.innerText = `Water: ${newState.water}`;
            actionCounter -= 1;
            actionDisplay.innerText = `Actions Remaining: ${actionCounter}`;
            if (winCheck(newState.food, newState.water, newState.light, inputPlantType)) {
                actionDisplay.innerText = `You Win!`;
            }
            if (actionCheck(actionCounter)) {
                actionDisplay.innerText = `Sorry, you ran out of actions`;
            }
        };
        lightButton.onclick = function () {
            const newState = newPlant(giveLight);
            divLight.innerText = `Light: ${newState.light}`;
            actionCounter -= 1;
            actionDisplay.innerText = `Actions Remaining: ${actionCounter}`;
            if (winCheck(newState.food, newState.water, newState.light, inputPlantType)) {
                actionDisplay.innerText = `You Win!`;
            }
            if (actionCheck(actionCounter)) {
                actionDisplay.innerText = `Sorry, you ran out of actions`;
            }
        };
    };
};