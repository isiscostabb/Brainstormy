import React, { useEffect, useState } from 'react';
import { getData } from './Database/getData'; // importe a função de consulta

function SalasComponent() {
  const [temas, setTemas] = useState([]); // para armazenar os temas

  useEffect(() => {
    // Função assíncrona para buscar os dados
    const fetchData = async () => {
      const temasData = await getData(); // chama a função que consulta o supabase
      setTemas(temasData); // atualiza o estado com os dados obtidos
    };

    fetchData(); // chama a função
  }, []); // vazio para executar apenas na montagem do componente

  return (
    <div>
      <h1>Temas das Salas</h1>
      <ul>
        {temas.map((tema, index) => (
          <li key={index}>{tema.tema}</li> // renderiza cada tema
        ))}
      </ul>
    </div>
  );
}

export default SalasComponent;
