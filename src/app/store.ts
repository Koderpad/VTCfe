import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from "../features/common/auth/authSlice.ts";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { productDetailApi } from "../features/common/products/services/noAuth/productDetailApi.ts";
import productDataInAddProductReducer from "../features/vendor/redux/reducer/addProductSlice.ts";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["productInAddProduct", "productDetailApi", "api"], // add this line
};

const rootReducer = combineReducers({
  auth: authReducer,
  productInAddProduct: productDataInAddProductReducer,
  // [productsApi.reducerPath]: productsApi.reducer,
  // [cartApi.reducerPath]: cartApi.reducer,
  // [orderApi.reducerPath]: orderApi.reducer,
  // [voucherApi.reducerPath]: voucherApi.reducer,
  // [categoryApi.reducerPath]: categoryApi.reducer,
  // [addressApi.reducerPath]: addressApi.reducer,
  [productDetailApi.reducerPath]: productDetailApi.reducer,
  // [voucherAdminApi.reducerPath]: voucherAdminApi.reducer,
  // [categoryAdminApi.reducerPath]: categoryAdminApi.reducer,
  // [attributeVendorApi.reducerPath]: attributeVendorApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false, // Add this line to disable immutableCheck

      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }).concat([apiSlice.middleware, productDetailApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
  // devTools: true,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
