import { useEffect, useState } from 'react';

function App() {
  const [vinyls, setVinyls] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/vinyls')
      .then(res => res.json())
      .then(data => setVinyls(data))
      .catch(err => console.error('Error al obtener vinilos:', err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>🎶 Mis Vinilos</h1>
      <ul>
        {Array.isArray(vinyls) && vinyls.length > 0 ? (
          vinyls.map((v) => (
            <li key={v.Id}>
              <strong>{v.Title}</strong> – {v.Release_date}
            </li>
          ))
        ) : (
          <p>No hay vinilos para mostrar</p>
        )}
      </ul>
    </div>
  );
}

export default App;
