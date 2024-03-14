import HomePage from "@/containers/HomePage";
import SteamRetrievePage from "@/containers/SteamRetrievePage";
import { VStack } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./containers/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
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
    <VStack w="full">
      <RouterProvider router={router} />;
    </VStack>
  );
}

export default App;
