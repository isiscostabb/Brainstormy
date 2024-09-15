
import { Link } from 'react-router-dom';

import Conteiner from './Componentes/Conteiner';

import './Criacao.css';

function Criacao() {

  return (
    <>
        <Conteiner altura={'100vh'} largura={'100vw'}>

          {/* SAIR */}
          <Link to="/">
            <button type="submit" className='sair'>
              <p>Voltar</p>
            </button>
          </Link>

            <div className='caixa'>

                <Conteiner altura={'30%'} largura={'90%'} direcao={'column'}>
                  <h1 className='h1Criacao'>CRIAR UMA SALA</h1>
                  <p>login disponivel apenas para professores</p>
                </Conteiner>

                <Conteiner altura={'50%'} largura={'90%'} direcao={'column'}>
                  <h2 className='h2Criacao'>USUÁRIO:</h2>
                  <input type="text" className='inputCriacao'/>

                  <h2 className='h2Criacao'>SENHA:</h2>
                  <input type="password" className='inputCriacao'/>
                </Conteiner>

                <Conteiner altura={'20%'} largura={'90%'}>
                  <Link to="/Perguntas">
                    <button className='entrar'><h2>ENTRAR</h2></button>
                  </Link>
                </Conteiner>
            </div>

        </Conteiner>
    </>
  );
}

export default Criacao;

