import { useEffect, useState } from 'react';

function App() {
  const [vinyls, setVinyls] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorName, setSelectedAuthorName] = useState('');

  // Cargar autores únicos por nombre al iniciar
  useEffect(() => {
    fetch('http://localhost:3001/api/authors')
      .then(res => res.json())
      .then(data => {
        // Eliminar duplicados por Author_Name
        const uniqueByName = [
          ...new Map(data.map(author => [author.Author_Name, author])).values()
        ];
        setAuthors(uniqueByName);
      })
      .catch(err => console.error('Error al obtener autores:', err));
  }, []);

  // Buscar vinilos del autor seleccionado
  const fetchVinylsByAuthor = () => {
    if (!selectedAuthorName) return;

    fetch(`http://localhost:3001/api/vinyls/author-name/${encodeURIComponent(selectedAuthorName)}`)
      .then(res => res.json())
      .then(data => setVinyls(data))
      .catch(err => console.error('Error al obtener vinilos del autor:', err));
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>🎶 Vinilos por Autor</h1>

      <div style={{ marginBottom: '1rem' }}>
        <select
          value={selectedAuthorName}
          onChange={e => setSelectedAuthorName(e.target.value)}
        >
          <option value="">-- Selecciona un autor --</option>
          {authors.map(author => (
            <option key={author.Id} value={author.Author_Name}>
              {author.Author_Name}
            </option>
          ))}
        </select>
        <button onClick={fetchVinylsByAuthor} style={{ marginLeft: '0.5rem' }}>
          Buscar
        </button>
      </div>

      {selectedAuthorName && (
        <h2>🎤 Discos de {selectedAuthorName}</h2>
      )}

      <ul>
        {vinyls.length > 0 ? (
          vinyls.map(v => (
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
