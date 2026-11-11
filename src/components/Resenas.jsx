import { useState } from "react";

function Resenas({ productos, resenas, agregarResena }) {
    // React: guarda qué juego se seleccionó en el menú.
    const [productoId, setProductoId] = useState(productos[0].id);

    // React: guarda el nombre escrito en el formulario.
    const [nombre, setNombre] = useState("");

    // React: guarda el texto de la reseña.
    const [comentario, setComentario] = useState("");

    // Se ejecuta cuando se envía el formulario.
    function enviar(e) {
        // Evita que el navegador recargue la página al enviar.
        e.preventDefault();

        // Conserva la validación original: ambos campos deben tener texto.
        if (nombre.trim() === "" || comentario.trim() === "") {
            return;
        }

        // Envía la reseña al componente App.
        agregarResena({
            productoId: Number(productoId),
            nombre: nombre,
            comentario: comentario
        });

        // Limpia los campos después de publicar.
        setNombre("");
        setComentario("");
    }

    // Busca el nombre del juego para mostrarlo junto a cada reseña.
    function nombreJuego(id) {
        const juego = productos.find(p => p.id === id);
        return juego ? juego.nombre : "";
    }

    return (
        // Bootstrap: card crea el panel y shadow-sm agrega una sombra suave.
        <section className="card shadow-sm">
            {/* Bootstrap: card-header separa el título del formulario. */}
            <div className="card-header">
                <h2 className="h5 mb-0">Reseñas</h2>
            </div>

            {/* Bootstrap: card-body agrega espacio interior. */}
            <div className="card-body">
                {/* El formulario conserva la selección de juego y los campos. */}
                <form onSubmit={enviar}>
                    {/* Bootstrap: mb-3 separa este campo de los siguientes. */}
                    <div className="mb-3">
                        {/* Bootstrap: form-label da formato a la etiqueta. */}
                        <label htmlFor="review-game" className="form-label">
                            Juego
                        </label>

                        {/* Bootstrap: form-select estiliza el menú desplegable. */}
                        <select
                            id="review-game"
                            className="form-select"
                            value={productoId}
                            onChange={e => setProductoId(e.target.value)}
                        >
                            {/* React: crea una opción por cada juego del catálogo. */}
                            {productos.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo para el nombre de quien escribe la reseña. */}
                    <div className="mb-3">
                        <label htmlFor="review-name" className="form-label">
                            Tu nombre
                        </label>

                        {/* Bootstrap: form-control estiliza el campo de texto. */}
                        <input
                            id="review-name"
                            type="text"
                            className="form-control"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    {/* Campo para escribir la reseña. */}
                    <div className="mb-3">
                        <label htmlFor="review-comment" className="form-label">
                            Tu reseña
                        </label>

                        {/* Bootstrap: form-control también sirve para textarea. */}
                        <textarea
                            id="review-comment"
                            className="form-control"
                            rows="4"
                            placeholder="Escribe tu reseña..."
                            value={comentario}
                            onChange={e => setComentario(e.target.value)}
                        />
                    </div>

                    {/* Bootstrap: btn y btn-primary estilizan el botón de envío. */}
                    <button type="submit" className="btn btn-primary">
                        Publicar
                    </button>
                </form>

                {/* Aviso si todavía no se ha publicado ninguna reseña. */}
                {resenas.length === 0 && (
                    <p className="alert alert-info mt-3 mb-0">
                        Todavía no hay reseñas.
                    </p>
                )}

                {/* Bootstrap: list-group da formato a la lista de reseñas. */}
                {resenas.length > 0 && (
                    <ul className="list-group mt-3">
                        {resenas.map((r, indice) => (
                            <li className="list-group-item" key={indice}>
                                {/* Muestra el juego elegido, el nombre y el comentario. */}
                                <strong>{nombreJuego(r.productoId)}</strong>
                                {" — "}
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