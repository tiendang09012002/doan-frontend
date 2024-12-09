import { createStore } from "redux";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import Reducers from "./reducer";

const persistConfig = {
    key: "redux-store",
    storage: storage,
    keyPrefix: "phamduong",
}

const store = createStore(persistReducer(persistConfig,Reducers));
persistStore(store);
export default store;