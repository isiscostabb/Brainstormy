
import Sala from "./Sala/Sala";
import Lobby from "./Lobby/Lobby";
import Login from "./Professor/Login";
import Dados from "./Professor/Dados"; 
import CriarPergunta from "./Professor/CriarPergunta";
import Ranking from "./Ranking/Ranking"; 

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

    
    //CRIAR PERGUNTAS
    {
      path: "/CriarPergunta",
      element: (
      <>
        <CriarPergunta />
      </>
      ),
    },


    //RANKING
  {
    path: "/Ranking",
    element: (
    <>
      <Ranking/>
    </>
    ),
  },
]);

export default routes;