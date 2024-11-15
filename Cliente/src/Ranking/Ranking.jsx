import { Link } from 'react-router-dom';
import Conteiner from '../Conteiner';




import './Ranking.css';


function CriarPergunta() {






  return (
    <>
        <Conteiner altura={'100vh'} largura={'100vw'}>
        <div className='esquerdo'>
            <div className='esquerdoCima'>
                <div className='imagemPrimeiro'>
                    <img src="../public/coroagirandogife.gif" alt="" className='coroa'/>

                </div>
            </div>
            <div className='esquerdoBaixo'>
                <div className='primeiroLugar'>
                   
                </div>
            </div>
        </div>


        <div className='direito'>
            <div className='direitoMid'>
               
            </div>
        </div>
       
   
       
        </Conteiner>
    </>
  );
}


export default CriarPergunta;
