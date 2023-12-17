import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from "../features/common/auth/authSlice.ts";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
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
import { productApi } from "../features/common/products/services/productApi.ts";
import productDataInAddProductReducer from "../features/vendor/redux/reducer/addProductSlice.ts";
import { productsApi } from "../features/common/redux/api/productsApi.ts";
import { cartApi } from "../features/common/redux/api/cartApi.ts";
import { categoryApi } from "../features/common/redux/api/categoryApi.tsx";
import { orderApi } from "../features/common/redux/api/orderApi.ts";
import { voucherApi } from "../features/common/redux/api/voucherApi.ts";
import { attributeVendorApi } from "../features/vendor/redux/api/attributeVendor.ts";
import { addressApi } from "../features/common/redux/api/addressApi.ts";
import { voucherAdminApi } from "../features/admin/redux/api/voucherAdminApi.ts";
import { categoryAdminApi } from "../features/admin/redux/api/categoryAdminApi.ts";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["productInAddProduct"], // add this line
};

const rootReducer = combineReducers({
  auth: authReducer,
  productInAddProduct: productDataInAddProductReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [voucherApi.reducerPath]: voucherApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [voucherAdminApi.reducerPath]: voucherAdminApi.reducer,
  [categoryAdminApi.reducerPath]: categoryAdminApi.reducer,
  [attributeVendorApi.reducerPath]: attributeVendorApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([apiSlice.middleware, productApi.middleware]),
  devTools: true,
});

export const persistor = persistStore(store);
// export default store;

// const persistConfig = {
//     key:"root",
//     version:1,
//     storage,
// }
//
// const rootReducer = combineReducers({
//     auth: authReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer
// })
//
// const persistedReducer = persistReducer(persistConfig, rootReducer)
//
// export const store = configureStore(
//     {
//         reducer: persistedReducer,
//         middleware: getDefaultMiddleware =>
//             getDefaultMiddleware().concat(apiSlice.middleware),
//         devTools:true
//     }
// )
//
// export const AppDispatch = store.dispatch;
// export const RootState = store.getState();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
