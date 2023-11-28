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
// call stateControl() to return the current state

// const fedPlant = stateControl(blueFood); //soil + 5 *don't do blueFood()
// const fedPlantAgain = stateControl(greenFood); //soil + 10

//const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);
//const greenFood = changeState("soil")(10);
// const yuckyFood = changeState("soil")(-5);

const hydrate = changeState("water")(1);
// const superWater = changeState("water")(5);

const giveLight = changeState("light")(3);
const plant1 = stateControl("plant1");
const plant2 = stateControl("plant2");

window.onload = function () {
    document.getElementById('feed1').onclick = function () {
        const newState = plant1(blueFood);
        document.getElementById('soil-value1').innerText = `Soil: ${newState.soil}`;
    };
    document.getElementById('water1').onclick = function () {
        const newState = plant1(hydrate);
        document.getElementById('water-value1').innerText = `Water: ${newState.water}`;
    };
    document.getElementById('light1').onclick = function () {
        const newState = plant1(giveLight);
        document.getElementById('light-value1').innerText = `Light: ${newState.light}`;
    };
    document.getElementById('show-state1').onclick = function () {
        const currentState = plant1();
        document.getElementById('soil-value1').innerText = `Soil: ${currentState.soil}`;
        document.getElementById('water-value1').innerText = `Water: ${currentState.water}`;
        document.getElementById('light-value1').innerText = `Light: ${currentState.light}`;
    };

    document.getElementById('feed2').onclick = function () {
        const newState = plant2(blueFood);
        document.getElementById('soil-value2').innerText = `Soil: ${newState.soil}`;
    };
    document.getElementById('water2').onclick = function () {
        const newState = plant2(hydrate);
        document.getElementById('water-value2').innerText = `Water: ${newState.water}`;
    };
    document.getElementById('light2').onclick = function () {
        const newState = plant2(giveLight);
        document.getElementById('light-value2').innerText = `Light: ${newState.light}`;
    };
    document.getElementById('show-state2').onclick = function () {
        const currentState = plant2();
        document.getElementById('soil-value2').innerText = `Soil: ${currentState.soil}`;
        document.getElementById('water-value2').innerText = `Water: ${currentState.water}`;
        document.getElementById('light-value2').innerText = `Light: ${currentState.light}`;
    };
};



//feed(5)(plant)
//blueFood(plant)