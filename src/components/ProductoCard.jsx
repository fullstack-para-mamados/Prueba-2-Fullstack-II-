function ProductoCard({ producto, agregarAlCarrito, agregarFavorito }) {

    return (
        <div className="producto-card">
            <h3>{producto.nombre}</h3>
            <p className="categoria">{producto.categoria}</p>
            <p className="precio">${producto.precio.toLocaleString("es-CL")}</p>

            <div className="botones">
                <button onClick={() => agregarAlCarrito(producto)}>
                    Agregar al carrito
                </button>
                <button onClick={() => agregarFavorito(producto)}>
                    ❤ Favorito
                </button>
            </div>
        </div>
    );
}

export default ProductoCard;
