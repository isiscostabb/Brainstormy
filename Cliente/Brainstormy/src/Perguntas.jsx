
import { Link } from 'react-router-dom';
import Conteiner from './Componentes/Conteiner';

import './Perguntas.css';

function Perguntas() {

  return (
    <>
        <Conteiner altura={'100vh'} largura={'100vw'}>

          {/* SAIR */}
          <Link to="/Criacao">
            <button type="submit" className='sair'>
              <p>Voltar</p>
            </button>
          </Link>

          <div className='caixaPerguntas'>

            <Conteiner altura={'30%'} largura={'90%'} direcao={'column'}>
              <h1 className='h1Perguntas'>BEM-VINDO PROFESSOR,</h1>
              <h1 className='h1Perguntas'>VAMOS INICIAR A CRIAÇÃO DAS PERGUNTAS!</h1>
              <h2 className='h2Perguntas'>deverão ser criadas ao todo 10 perguntas, 3 alternativas erradas e 1 alternativa correta</h2>
            </Conteiner>

            <Conteiner altura={'50%'} largura={'90%'} direcao={'column'}>
              <h2 className='h2Criacao'>VAMOS COMEÇAR DEFININDO UM NOME PARA SALA:</h2>
              <p className='pPerguntas'>será o código que os alunos deverão inserir para jogar na sala</p>
              <input type="number" className='inputCriacao'/>
              <h2 className='h2Criacao'>AGORA NOS CONTE QUAL SERÁ O TEMA DO QUIZ:</h2>
              <p className='pPerguntas'>sobre qual assunto/conteúdo irão se tratar as perguntas?</p>
              <input type="text" className='inputCriacao'/>
            </Conteiner>

            <Conteiner altura={'20%'} largura={'90%'} direcao={'column'}>
              <h2 className='h2Perguntas'>TUDO CERTO? AGORA VAMOS PROSSEGUIR PARA A PRÓXIMA ETAPA</h2>
              <button className='seguir'><h2>CRIAR SUAS PERGUNTAS</h2></button>
            </Conteiner>

          </div>


        </Conteiner>
    </>
  );
}

export default Perguntas;
