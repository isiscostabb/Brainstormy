
import Sala from "./Sala";
import Lobby from "./Lobby";
import Login from "./Login";
import Dados from "./Dados"; 
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

    //LOGIN
    {
      path: "/Login",
      element: (
      <>
        <Login />
      </>
      ),
    },

    //DADOS
    {
      path: "/Dados",
      element: (
      <>
        <Dados />
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
