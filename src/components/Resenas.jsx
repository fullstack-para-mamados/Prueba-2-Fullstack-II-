import { useState } from "react";
import { validarResena } from "../utils/validarResena";

function Resenas({ productos, resenas, agregarResena }) {
    const [productoId, setProductoId] = useState(productos[0].id);
    const [nombre, setNombre] = useState("");
    const [comentario, setComentario] = useState("");

    const resenaValida = validarResena(nombre, comentario);

    function enviar(e) {
        e.preventDefault();

        if (!validarResena(nombre, comentario)) {
            return;
        }

        agregarResena({
            productoId: Number(productoId),
            nombre,
            comentario
        });

        setNombre("");
        setComentario("");
    }

    function nombreJuego(id) {
        const juego = productos.find(p => p.id === id);
        return juego ? juego.nombre : "";
    }

    return (
        <section className="card shadow-sm">
            <div className="card-header">
                <h2 className="h5 mb-0">Reseñas</h2>
            </div>

            <div className="card-body">
                <form onSubmit={enviar}>
                    <div className="mb-3">
                        <label htmlFor="review-game" className="form-label">
                            Juego
                        </label>
                        <select
                            id="review-game"
                            className="form-select"
                            value={productoId}
                            onChange={e => setProductoId(e.target.value)}
                        >
                            {productos.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="review-name" className="form-label">
                            Tu nombre
                        </label>
                        <input
                            id="review-name"
                            type="text"
                            className="form-control"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="review-comment" className="form-label">
                            Tu reseña
                        </label>
                        <textarea
                            id="review-comment"
                            className="form-control"
                            rows="4"
                            placeholder="Escribe tu reseña..."
                            value={comentario}
                            onChange={e => setComentario(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!resenaValida}
                    >
                        Publicar
                    </button>
                </form>

                {resenas.length === 0 && (
                    <p className="alert alert-info mt-3 mb-0">
                        Todavía no hay reseñas.
                    </p>
                )}

                {resenas.length > 0 && (
                    <ul className="list-group mt-3">
                        {resenas.map((r, indice) => (
                            <li className="list-group-item" key={indice}>
                                <strong>{nombreJuego(r.productoId)}</strong>
                                {" - "}
                                {r.nombre}: {r.comentario}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default Resenas;