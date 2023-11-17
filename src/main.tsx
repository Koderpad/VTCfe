import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./ConfigCss.css";
import { store, persistor } from "./app/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// import { persistStore } from "redux-persist";

// let persis = persistStore(store);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );

// Check if the root element exists before rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
