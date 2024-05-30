import { compose, createStore, applyMiddleware } from "redux";

//redux persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //default sto localStorage for web

//root reducer
import { rootReducer } from "./root-reducer";

//configuration object
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

// Set up middleware
const middleWares = [loggerMiddleware];

// Use compose to apply multiple enhancers
const composedEnhancers = compose(applyMiddleware(...middleWares));

// Create the Redux store with the root reducer, initial state, and composed enhancers
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
