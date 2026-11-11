function Carrito({ carrito, quitarDelCarrito }) {
    // JavaScript: suma el precio de todos los productos del carrito.
    const total = carrito.reduce((suma, item) => suma + item.precio, 0);

    return (
        // Bootstrap: card crea el panel y shadow-sm agrega una sombra suave.
        <section className="card shadow-sm">
            {/* Bootstrap: card-header separa visualmente el título del contenido. */}
            <div className="card-header">
                {/* Bootstrap: h5 aplica tamaño de título y mb-0 quita el margen inferior. */}
                <h2 className="h5 mb-0">
                    Carrito{" "}
                    {/* Bootstrap: badge muestra la cantidad como una etiqueta. */}
                    <span className="badge text-bg-primary">
                        {carrito.length}
                    </span>
                </h2>
            </div>

            {/* Bootstrap: card-body agrega espacio interior. */}
            <div className="card-body">
                {/* JavaScript: este mensaje aparece solo cuando el carrito está vacío. */}
                {carrito.length === 0 && (
                    // Bootstrap: alert y alert-info dan formato de aviso.
                    <p className="alert alert-info mb-0">
                        El carrito está vacío.
                    </p>
                )}

                {/* Bootstrap: list-group da formato de lista a los productos. */}
                <ul className="list-group list-group-flush">
                    {carrito.map((item, indice) => (
                        // JavaScript: indice identifica qué elemento quitar.
                        // Bootstrap: d-flex alinea el texto y el botón en una fila.
                        <li
                            key={indice}
                            className="list-group-item d-flex justify-content-between align-items-center gap-3"
                        >
                            {/* JavaScript: muestra el nombre y precio del producto. */}
                            <span>
                                {item.nombre} - $
                                {item.precio.toLocaleString("es-CL")}
                            </span>

                            {/* Bootstrap: btn y btn-outline-danger estilizan el botón. */}
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                aria-label={`Quitar ${item.nombre} del carrito`}
                                onClick={() => quitarDelCarrito(indice)}
                            >
                                Quitar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bootstrap: card-footer destaca el total al pie del panel. */}
            <div className="card-footer d-flex justify-content-between fw-bold">
                <span>Total</span>

                {/* JavaScript: formatea el resultado de la suma como pesos chilenos. */}
                <span>${total.toLocaleString("es-CL")}</span>
            </div>
        </section>
    );
}

export default Carrito;