import { createStore } from "redux";

import { reducers } from "./reducers";

import { loadStore, saveStore } from "./utils/store";

const persistedStore = loadStore();

const store = createStore(reducers, persistedStore);

store.subscribe(() => saveStore(store.getState()));

export default store;
