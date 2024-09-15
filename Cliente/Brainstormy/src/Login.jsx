
import { Link } from 'react-router-dom';

import Conteiner from './Componentes/Conteiner';

import './Login.css';

function Login() {

  return (
    <>
        <Conteiner altura={'100vh'} largura={'100vw'}>

          {/* SAIR */}
          <Link to="/">
            <button type="submit" className='sair'>
              <p>Voltar</p>
            </button>
          </Link>

            <div className='caixaLogin'>

                <Conteiner altura={'30%'} largura={'90%'} direcao={'column'}>
                  <h1 className='h1Login'>CRIAR UMA SALA</h1>
                  <p>login disponivel apenas para professores</p>
                </Conteiner>

                <Conteiner altura={'50%'} largura={'90%'} direcao={'column'}>
                  <h2 className='h2Login'>USUÁRIO:</h2>
                  <input type="text" className='inputLogin'/>

                  <h2 className='h2Login'>SENHA:</h2>
                  <input type="password" className='inputLogin'/>
                </Conteiner>

                <Conteiner altura={'20%'} largura={'90%'}>
                  <Link to="/Dados">
                    <button className='entrar'><h2>ENTRAR</h2></button>
                  </Link>
                </Conteiner>
            </div>

        </Conteiner>
    </>
  );
}

export default Login;

