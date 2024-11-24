
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Conteiner from '../Conteiner';
import './Ranking.css';

function Ranking() {

  const location = useLocation();
  const username = location.state?.username;
  const pontuacao = location.state?.pontuacao;
  const updatedPodio = location.state?.updatedPodio;
  const navigate = useNavigate();

  return (
    <>
          {/* Voltar para o lobby */}
          <Link to="/">
            <button type="submit" className="sair">
              <p>Sair da Sala</p>
            </button>
          </Link>

          <Conteiner altura={'100vh'} largura={'100vw'}>
            <div className="esquerdo">
              <div className="esquerdoCima">
                <img src="coroagirandogife.gif" alt="coroa" className="coroa" />
                <div className="primeiroCirculo">
                  <h2 className="h2PrimeiroCirculo">1º</h2>
                </div>
              </div>
              <div className="esquerdoBaixo">
                <div className="primeiroLugar">
                  <p className="p1User">{updatedPodio[0]?.username}</p>
                  <p className="p1Pont">{updatedPodio[0]?.pontuacao} pontos</p>
                </div>
              </div>
            </div>

            <div className="direito">
              <div className="direitoTop">
                <p className="pCab"> POSIÇÃO </p>
                <p className="pCab"> JOGADORES </p>
                <p className="pCab"> PONTUAÇÃO </p>
              </div>

              <div className="direitoMid">
                {updatedPodio?.map((item, index) => (
                    <div key={index} className="linhaPlayer">
                      <div className='posicaoRank'> <p className='pPosicaoRank'> {index + 1}º </p></div>
                      <div className='usuarioRank'> <p className='pUsuarioRank'> {item.username}</p></div>
                      <div className='pontosRank'> <p className='pPontosRank'> {item.pontuacao} </p></div>
                    </div>
                  ))}
              </div>
            </div>
          </Conteiner>
        </>
  );
}

export default Ranking;
