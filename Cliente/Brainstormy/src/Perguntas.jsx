
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

            <h1 className='h1Pergunta'>PERGUNTA 1</h1>

            <Conteiner largura={'90%'} direcao={'column'}>
                <input type="text" className='inputLogin' id='pergunta'/>

                <h2 className='h2Login'>RESPOSTA CORRETA:</h2>
                <input type="text" className='inputLogin' id='respCorreta'/>
                
                <h2 className='h2Login'>RESPOSTA INCORRETA:</h2>
                <input type="text" className='inputLogin' id='respIncorreta'/>

                <h2 className='h2Login'>RESPOSTA INCORRETA:</h2>
                <input type="text" className='inputLogin' id='respIncorreta'/>

                <h2 className='h2Login'>RESPOSTA INCORRETA:</h2>
                <input type="text" className='inputLogin' id='respIncorreta'/>
            </Conteiner>

          </div>

        </Conteiner>
    </>
  );
}

export default Perguntas;