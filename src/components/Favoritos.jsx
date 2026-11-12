function Favoritos({ favoritos, quitarFavorito }) {
    return (
        
        <section className="card shadow-sm">
            
            <div className="card-header">
                <h2 className="h5 mb-0">
                    Favoritos{" "}
               
                    <span className="badge text-bg-danger">
                        {favoritos.length}
                    </span>
                </h2>
            </div>

       
            <div className="card-body">
               
                {favoritos.length === 0 && (
              
                    <p className="alert alert-info mb-0">
                        Aún no tienes favoritos.
                    </p>
                )}

           
                <ul className="list-group list-group-flush">
                    {favoritos.map(item => (
         
                        <li
                            key={item.id}
                            className="list-group-item d-flex justify-content-between align-items-center gap-3"
                        >
         
                            <span>{item.nombre}</span>

                  
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
