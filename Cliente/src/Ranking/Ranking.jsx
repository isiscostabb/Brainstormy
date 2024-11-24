
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Conteiner from '../Conteiner';
import './Ranking.css';

function Ranking() {
  const location = useLocation();
  const username = location.state?.username;
  const pontuacao = location.state?.pontuacao;
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
            {/* Parte esquerda */}
            <div className="esquerdo">
              <div className="esquerdoCima">
                <img src="coroagirandogife.gif" alt="coroa" className="coroa" />
                <div className="primeiroCirculo">
                  <h2 className="h2PrimeiroCirculo">1º</h2>
                </div>
              </div>
              <div className="esquerdoBaixo">
                <div className="primeiroLugar">
                  {/* Substitua aqui com o primeiro usuário da lista */}
                  <p className="p1User">{username}</p>
                  <p className="p1Pont">{pontuacao} pontos</p>
                </div>
              </div>
            </div>

            {/* Parte direita */}
            <div className="direito">
              <div className="direitoTop">
                <p className="pCab">POSIÇÃO</p>
                <p className="pCab">JOGADOR</p>
                <p className="pCab">PONTUAÇÃO</p>
              </div>

              <div className="direitoMid">
                <div className='linhaPlayer'>
                  <div className='posicaoRank'> <p className='pPosicaoRank'>2º</p></div>
                  <div className='usuarioRank'> <p className='pUsuarioRank'>USUÁRIO</p></div>
                  <div className='pontosRank'> <p className='pPontosRank'> 120</p></div>
                </div>
              </div>
            </div>
          </Conteiner>
    </>
  );
}

export default Ranking;
