import { calcularTotal } from "../utils/calcularTotal";


function Carrito({ carrito, quitarDelCarrito }) {
    
    const total = calcularTotal(carrito);

    return (
        
        <section className="card shadow-sm">
            
            <div className="card-header">
               
                <h2 className="h5 mb-0">
                    Carrito{" "}
                    
                    <span className="badge text-bg-primary">
                        {carrito.length}
                    </span>
                </h2>
            </div>

           
            <div className="card-body">
               
                {carrito.length === 0 && (
                    
                    <p className="alert alert-info mb-0">
                        El carrito está vacío.
                    </p>
                )}

               
                <ul className="list-group list-group-flush">
                    {carrito.map((item, indice) => (
                        
                        <li
                            key={indice}
                            className="list-group-item d-flex justify-content-between align-items-center gap-3"
                        >
                            
                            <span>
                                {item.nombre} - $
                                {item.precio.toLocaleString("es-CL")}
                            </span>

                            
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

            
            <div className="card-footer d-flex justify-content-between fw-bold">
                <span>Total</span>

                
                <span>${total.toLocaleString("es-CL")}</span>
            </div>
        </section>
    );
}

export default Carrito;
