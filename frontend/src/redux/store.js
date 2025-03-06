import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slice/studentSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; 

const persistConfig = {
  key: "student",
  storage, 
};

const persistedStudentReducer = persistReducer(persistConfig, studentReducer);

const store = configureStore({
  reducer: {
    student: persistedStudentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
