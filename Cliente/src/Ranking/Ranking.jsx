import { Link } from 'react-router-dom';
import Conteiner from '../Conteiner';
import './Ranking.css';



function CriarPergunta() {


  return (
    <>
     <Link to="/">
          <button type="submit" className='sair' >
            <p>Sair da Sala</p>
          </button>
        </Link>
        <Conteiner altura={'100vh'} largura={'100vw'}>
        <div className='esquerdo'>
            <div className='esquerdoCima'>
               <img src="coroagirandogife.gif" alt="" className='coroa'/>
            </div>
            <div className='esquerdoBaixo'>
                <div className='primeiroLugar'>
                    <div className='linhaPlayer'>
                         <div className='posicaoRank dRank'> <p className='pe' >1º</p></div>
                         <div className='usuarioRank dRank'> <p className='pe pe2' >Usuario</p></div>
                         <div className='pontosRank dRank'> <p className='pe' >120</p></div>
                    </div>
                </div>
            </div>
        </div>




        <div className='direito'>
          <div className='direitoTop'>
               <div className='posicaoRank tRank'> <p className='pe'>Rank</p></div>
               <div className='usuarioRank tRank'> <p className='pe pe2'>Jogador</p></div>
               <div className='pontosRank tRank'> <p className='pe'>Pontos</p></div>
          </div>
          <div className='direitoMid'>
               <div className='linhaPlayer'>
                    <div className='posicaoRank dRank'> <p className='pe'>2º</p></div>
                    <div className='usuarioRank dRank'> <p className='pe pe2'>Usuario</p></div>
                    <div className='pontosRank dRank'> <p className='pe'> 120</p></div>
               </div>
               
            </div>
        </div>
       
   
       
        </Conteiner>
    </>
  );
}




export default CriarPergunta;
