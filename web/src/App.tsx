import HomePage from "@/containers/HomePage";
import SteamRetrievePage from "@/containers/SteamRetrievePage";
import { Box, VStack } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    <Box w="100vw" h="100vh" overflowX="hidden" bg="gray.200">
      <RouterProvider router={router} />;
    </Box>
  );
}

export default App;
