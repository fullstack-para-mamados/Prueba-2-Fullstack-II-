function Carrito({ carrito, quitarDelCarrito }) {

    const total = carrito.reduce((suma, item) => suma + item.precio, 0);

    return (
        <div className="panel">
            <h2>Carrito ({carrito.length})</h2>

            {carrito.length === 0 && <p>El carrito está vacío</p>}

            <ul>
                {carrito.map((item, indice) => (
                    <li key={indice}>
                        {item.nombre} - ${item.precio.toLocaleString("es-CL")}
                        <button onClick={() => quitarDelCarrito(indice)}>X</button>
                    </li>
                ))}
            </ul>

            <p className="total">Total: ${total.toLocaleString("es-CL")}</p>
        </div>
    );
}

export default Carrito;
