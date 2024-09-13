
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
                </Conteiner>

                <Conteiner altura={'50%'} largura={'90%'} direcao={'column'}>
                </Conteiner>

                <Conteiner altura={'20%'} largura={'90%'}>
                </Conteiner>
            </div>

        </Conteiner>
    </>
  );
}

export default Criacao;

