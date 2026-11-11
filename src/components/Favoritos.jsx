function Favoritos({ favoritos, quitarFavorito }) {

    return (
        <div className="panel">
            <h2>Favoritos ({favoritos.length})</h2>

            {favoritos.length === 0 && <p>Aún no tienes favoritos</p>}

            <ul>
                {favoritos.map(item => (
                    <li key={item.id}>
                        {item.nombre}
                        <button onClick={() => quitarFavorito(item.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Favoritos;
