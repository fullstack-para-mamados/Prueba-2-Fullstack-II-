function ProductoCard({ producto, agregarAlCarrito, agregarFavorito }) {
    return (
        // Tarjeta Bootstrap; h-100 hace que las tarjetas de una fila tengan la misma altura.
        <article className="card h-100 shadow-sm">
            {/* Contenido interno de la tarjeta. */}
            <div className="card-body d-flex flex-column">
                <img
                    src={producto.imagen}
                    alt={`Portada de ${producto.nombre}`}
                    className="img-fluid rounded mb-3"
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
                {/* Nombre del juego con estilo de título de tarjeta. */}
                <h3 className="card-title h5">{producto.nombre}</h3>

                {/* Categoría como etiqueta pequeña. */}
                <span className="badge text-bg-secondary align-self-start mb-2">
                    {producto.categoria}
                </span>

                {/* Precio con formato para Chile. */}
                <p className="card-text fw-bold fs-5 mt-auto">
                    ${producto.precio.toLocaleString("es-CL")}
                </p>

                {/* Botones separados y adaptables al ancho disponible. */}
                <div className="d-flex flex-wrap gap-2">
                    {/* Agrega este producto al carrito. */}
                    <button
                        type="button"
                        className="btn btn-primary flex-fill"
                        onClick={() => agregarAlCarrito(producto)}
                    >
                        Agregar al carrito
                    </button>

                    {/* Agrega este producto a favoritos. */}
                    <button
                        type="button"
                        className="btn btn-outline-danger flex-fill"
                        onClick={() => agregarFavorito(producto)}
                    >
                        ❤ Favorito
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductoCard;