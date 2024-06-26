import { compose, createStore, applyMiddleware } from "redux";

//redux persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //default to localStorage for web

//root reducer
import { rootReducer } from "./root-reducer";

//import { thunk } from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

//configuration object
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

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
const middleWares = [loggerMiddleware, sagaMiddleware];

// Use compose to apply multiple enhancers
const composedEnhancers = compose(applyMiddleware(...middleWares));

// Create the Redux store with the root reducer, initial state, and composed enhancers
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
