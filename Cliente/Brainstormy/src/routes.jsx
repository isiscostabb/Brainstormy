
import Sala from "./Sala";
import Lobby from "./Lobby";
import Criacao from "./Criacao";
import Perguntas from "./Perguntas"; 

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

    //PERGUNTAS
    {
      path: "/Perguntas",
      element: (
      <>
        <Perguntas />
      </>
      ),
    },
]);

export default routes;
