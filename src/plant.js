export const changeState = (prop) => {
    return (value) => {
        return (state) => ({
            ...state,
            [prop]: (state[prop] || 0) + value
        });
    };
};
export const storeState = () => {
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
export const winCheck = (food, water, light, name) => {
    const sum = food + water + light;
    if (name === "Cactus" && sum > 20 && water < 3) {
        return true;
    }
    if (name === "Seymour" && sum > 20 && food > 15) {
        return true;
    }
    if (name === "Orchid" && sum > 20 && water > 7) {
        return true;
    }
    if (name === "Venus Fly Trap" && sum > 20 && food > 10 & water > 5) {
        return true;
    }
    if (name === "Sunflower" && sum > 20 && light > 20) {
        return true;
    }
    if (name === "Giving Tree" && sum > 20 && food > 5 && light > 5 && water > 5) {
        return true;
    }
    if (name === "Jade" && sum > 20 && water < 5) {
        return true;
    }
    if (name === "Radish" && sum > 20 && water > 5 && light > 5) {
        return true;
    }
};
export const actionCheck = (num) => {
    if (num < 0) {
        return true;
    }
};
export const stateControl = storeState();
export const blueFood = changeState("food")(5);
export const hydrate = changeState("water")(1);
export const giveLight = changeState("light")(3);