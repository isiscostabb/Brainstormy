
import { Link } from 'react-router-dom';
import Conteiner from './Componentes/Conteiner';

import './Dados.css';

function Dados() {

  return (
    <>
        <Conteiner altura={'100vh'} largura={'100vw'}>

          {/* SAIR */}
          <Link to="/Login">
            <button type="submit" className='sair'>
              <p>Voltar</p>
            </button>
          </Link>

          <div className='caixaDados'>

            <Conteiner altura={'30%'} largura={'90%'} direcao={'column'}>
              <h1 className='h1Dados'>BEM-VINDO PROFESSOR,</h1>
              <h1 className='h1Dados'>VAMOS INICIAR A CRIAÇÃO DAS PERGUNTAS!</h1>
              <h2 className='h2Dados'>deverão ser criadas ao todo 10 perguntas, 3 alternativas erradas e 1 alternativa correta</h2>
            </Conteiner>

            <Conteiner altura={'50%'} largura={'90%'} direcao={'column'}>
              <h2 className='h2Login'>VAMOS COMEÇAR DEFININDO UM NOME PARA SALA:</h2>
              <p className='pDados'>será o código que os alunos deverão inserir para jogar na sala</p>
              <input type="number" className='inputLogin'/>
              <h2 className='h2Login'>AGORA NOS CONTE QUAL SERÁ O TEMA DO QUIZ:</h2>
              <p className='pDados'>sobre qual assunto/conteúdo irão se tratar as perguntas?</p>
              <input type="text" className='inputLogin'/>
            </Conteiner>

            <Conteiner altura={'20%'} largura={'90%'} direcao={'column'}>
              <h2 className='h2Dados'>TUDO CERTO? AGORA VAMOS PROSSEGUIR PARA A PRÓXIMA ETAPA</h2>
              <Link to={'/Perguntas'}><button className='seguir'><h2>CRIAR SUAS PERGUNTAS</h2></button></Link>
            </Conteiner>

          </div>


        </Conteiner>
    </>
  );
}

export default Dados;
