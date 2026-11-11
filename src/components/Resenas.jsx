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
            nombre: nombre,
            comentario: comentario
        });

        setNombre("");
        setComentario("");
    }

    function nombreJuego(id) {
        const juego = productos.find(p => p.id === id);
        return juego ? juego.nombre : "";
    }

    return (
        <div className="panel">
            <h2>Reseñas</h2>

            <form onSubmit={enviar}>
                <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
                    {productos.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <textarea
                    placeholder="Escribe tu reseña..."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                />
                <button type="submit" disabled={!resenaValida}>
                    Publicar
                </button>
            </form>

            {resenas.length === 0 && <p>Todavía no hay reseñas</p>}

            <ul>
                {resenas.map((r, indice) => (
                    <li key={indice}>
                        <strong>{nombreJuego(r.productoId)}</strong> - {r.nombre}: {r.comentario}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Resenas;
