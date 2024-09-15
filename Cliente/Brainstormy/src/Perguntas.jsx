
import { Link } from 'react-router-dom';
import Conteiner from './Componentes/Conteiner';

import './Perguntas.css';

function Perguntas() {

  return (
    <>
        <Conteiner altura={'100vh'} largura={'100vw'}>

          {/* SAIR */}
          <Link to="/Dados">
            <button type="submit" className='sair'>
              <p>Voltar</p>
            </button>
          </Link>

          {/* PROX */}
          <Link to="/Perguntas">
            <button type="submit" className='proximo'>
              <p>Próximo</p>
            </button>
          </Link>

          <div className='caixaDados'>

            <h1 className='h1Dados'>CRIAÇÃO DAS PERGUNTAS</h1>

            <Conteiner largura={'90%'} direcao={'column'}>
                <h2 className='h2Login'>PERGUNTA 1:</h2>
                <input type="text" className='inputLogin'/>

                <h2 className='h2Login'>RESPOSTA CORRETA:</h2>
                <input type="text" className='inputLogin'/>
                
                <h2 className='h2Login'>RESPOSTA INCORRETA:</h2>
                <input type="text" className='inputLogin'/>

                <h2 className='h2Login'>RESPOSTA INCORRETA:</h2>
                <input type="text" className='inputLogin'/>

                <h2 className='h2Login'>RESPOSTA INCORRETA:</h2>
                <input type="text" className='inputLogin'/>
            </Conteiner>

          </div>

        </Conteiner>
    </>
  );
}

export default Perguntas;