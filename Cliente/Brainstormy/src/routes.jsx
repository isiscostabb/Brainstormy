
import Sala from "./Sala";
import Lobby from "./Lobby";

import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  //LOBBY
  {
    path: "/",
    element: (
    <>
      <Lobby/>
    </>
    ),
  },
  
  //SALA
  {
    path: "/Sala",
    element: (
    <>
      <Sala />
    </>
    ),
  },
]);

export default routes;
