function Favoritos({ favoritos, quitarFavorito }) {
    return (
        // Bootstrap: card crea el panel y shadow-sm añade una sombra suave.
        <section className="card shadow-sm">
            {/* Bootstrap: card-header separa el título del contenido. */}
            <div className="card-header">
                <h2 className="h5 mb-0">
                    Favoritos{" "}
                    {/* Bootstrap: badge muestra cuántos favoritos hay. */}
                    <span className="badge text-bg-danger">
                        {favoritos.length}
                    </span>
                </h2>
            </div>

            {/* Bootstrap: card-body agrega espacio interior. */}
            <div className="card-body">
                {/* Si no hay favoritos, muestra un aviso. */}
                {favoritos.length === 0 && (
                    // Bootstrap: alert da formato de aviso.
                    <p className="alert alert-info mb-0">
                        Aún no tienes favoritos.
                    </p>
                )}

                {/* Bootstrap: list-group da formato a la lista. */}
                <ul className="list-group list-group-flush">
                    {favoritos.map(item => (
                        // React: item.id identifica cada elemento de la lista.
                        // Bootstrap: d-flex alinea el nombre y el botón.
                        <li
                            key={item.id}
                            className="list-group-item d-flex justify-content-between align-items-center gap-3"
                        >
                            {/* Nombre del juego marcado como favorito. */}
                            <span>{item.nombre}</span>

                            {/* Bootstrap: da estilo al botón para quitar el favorito. */}
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                aria-label={`Quitar ${item.nombre} de favoritos`}
                                onClick={() => quitarFavorito(item.id)}
                            >
                                Quitar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Favoritos;