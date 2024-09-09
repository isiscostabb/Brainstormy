
import './Conteiner.css'

function Conteiner({ largura, altura, direcao, children }) {
    return (
        <div className="conteiner" style={{ height: altura, width: largura, flexDirection: direcao }}>
            {children}
        </div>
    );
}

export default Conteiner;