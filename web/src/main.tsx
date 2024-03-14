import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./socket.ts";

const theme = extendTheme({
  fonts: {
    body: `'Nunito', sans-serif`,
  },
  colors: {
    brand: {
      100: "#1a535c",
      200: "#4ecdc4",
      300: "#f7fff7",
      400: "#ff6b6b",
      500: "#ffe66d",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
