import "@/App.css";
import HomePage from "@/containers/HomePage";
import SteamRetrievePage from "@/containers/SteamRetrievePage";
import { Box } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./AppContext";
import Root from "./containers/Root";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/retrieve-inventory",
        element: <SteamRetrievePage />,
      },
    ],
  },
]);
function App() {
  return (
    <AppContextProvider>
      <Box w="100vw" h="100vh" overflowX="hidden" bg="gray.200">
        <RouterProvider router={router} />;
      </Box>
    </AppContextProvider>
  );
}

export default App;
