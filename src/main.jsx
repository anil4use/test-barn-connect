import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/redux-store/store";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Provider } from "react-redux";
import Routers from "./routes/Routers.jsx";
import App from "./App.jsx";
import { Button, Text } from "./components/shared/custom design/Chakracustomize.jsx";



const theme = extendTheme({
  components: {
    Button,
    Text,
  },
 
})
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider >
      <Provider store={store}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
