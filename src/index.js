import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

const changeState = (prop) => {
    return (value) => {
        return (state) => ({
            ...state,
            [prop]: (state[prop] || 0) + value
        });
    };
};
const storeState = () => {
    const plantStates = {};
    return (plantId) => {
        if (!plantStates[plantId]) {
            plantStates[plantId] = {};
        }
        let currentState = plantStates[plantId];
        return (stateChangeFunction = state => state) => {
            const newState = stateChangeFunction(currentState);
            currentState = { ...newState };
            return newState;
        };
    };
};
const stateControl = storeState();
const blueFood = changeState("soil")(5);
const hydrate = changeState("water")(1);
const giveLight = changeState("light")(3);

window.onload = function () {
    let counter = 1;
    document.getElementById('newPlant').onclick = function (e) {
        e.preventDefault();
        const inputPlantType = document.querySelector("select#plantTypes").value;
        const plantId = `plant${counter}`;
        const newPlant = stateControl(plantId);
        counter++;
        const body = document.querySelector("body");
        const newPlantDiv = document.createElement("div");
        const name = document.createElement("h1");
        name.append(inputPlantType);
        const soilButton = document.createElement("button");
        soilButton.setAttribute("id", "soil");
        soilButton.innerText = "Add Soil";
        const waterButton = document.createElement("button");
        waterButton.setAttribute("id", "water");
        waterButton.innerText = "Add Water";
        const lightButton = document.createElement("button");
        lightButton.setAttribute("id", "light");
        lightButton.innerText = "Add Light";
        const h3Soil = document.createElement('h3');
        const divSoil = document.createElement('div');
        divSoil.setAttribute("id", "chosen-soil-value");
        h3Soil.append(divSoil);
        const h3Water = document.createElement('h3');
        const divWater = document.createElement('div');
        divWater.setAttribute("id", "chosen-water-value");
        h3Water.append(divWater);
        const h3Light = document.createElement('h3');
        const divLight = document.createElement('div');
        divLight.setAttribute("id", "chosen-light-value");
        h3Light.append(divLight);
        newPlantDiv.setAttribute("class", "plantCard");
        newPlantDiv.append(name, soilButton, h3Soil, waterButton, h3Water, lightButton, h3Light);
        body.append(newPlantDiv);

        soilButton.onclick = function () {
            const newState = newPlant(blueFood);
            divSoil.innerText = `Soil: ${newState.soil}`;
        };
        waterButton.onclick = function () {
            const newState = newPlant(hydrate);
            divWater.innerText = `Water: ${newState.water}`;
        };
        lightButton.onclick = function () {
            const newState = newPlant(giveLight);
            divLight.innerText = `Light: ${newState.light}`;
        };
    };
};