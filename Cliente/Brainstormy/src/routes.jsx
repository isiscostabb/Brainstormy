
import Sala from "./Sala";
import Lobby from "./Lobby";
import Criacao from "./Criacao";

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

    //CRIACAO
    {
      path: "/Criacao",
      element: (
      <>
        <Criacao />
      </>
      ),
    },
]);

export default routes;
