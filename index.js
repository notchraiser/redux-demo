import { applyMiddleware, createStore, combineReducers } from "redux";
import logger from "redux-logger";

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
function buy_cake() {
  return {
    type: BUY_CAKE,
    payload: 2,
    info: "First redux action",
  };
}
function buy_icecream() {
  return {
    type: BUY_ICECREAM,
    payload: 1,
    info: "Second redux action",
  };
}

const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIcecream: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - action.payload };

    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return { ...state, numOfIcecream: state.numOfIcecream - action.payload };
    default:
      return state;
  }
};

const allReducers = combineReducers({
  cakeReducer,
  iceCreamReducer,
});
const log = logger.createLogger();
const store = createStore(allReducers, applyMiddleware(log));
console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() => {});
store.dispatch(buy_cake());
store.dispatch(buy_icecream());
unsubscribe();
