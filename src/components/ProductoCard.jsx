function ProductoCard({ producto, agregarAlCarrito, agregarFavorito }) {
    return (
        
        <article className="card h-100 shadow-sm">
         
            <div className="card-body d-flex flex-column">
                <img
                    src={producto.imagen}
                    alt={`Portada de ${producto.nombre}`}
                    className="img-fluid rounded mb-3"
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
           
                <h3 className="card-title h5">{producto.nombre}</h3>

  
                <span className="badge text-bg-secondary align-self-start mb-2">
                    {producto.categoria}
                </span>

         
                <p className="card-text fw-bold fs-5 mt-auto">
                    ${producto.precio.toLocaleString("es-CL")}
                </p>

        
                <div className="d-flex flex-wrap gap-2">
                
                    <button
                        type="button"
                        className="btn btn-primary flex-fill"
                        onClick={() => agregarAlCarrito(producto)}
                    >
                        Agregar al carrito
                    </button>

            
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
