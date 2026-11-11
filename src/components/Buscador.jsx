function Buscador({ texto, setTexto }) {

    return (
        <input
            type="text"
            placeholder="🔎 Buscar juego..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
        />
    );
}

export default Buscador;