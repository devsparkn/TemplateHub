import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// Create root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // persist only cart slice, user slice will NOT persist
};

//  Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//  Create persistor to control persisting
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
