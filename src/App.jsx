import { useState } from "react";
import "./App.css";
import productos from "./data/productos";
import Buscador from "./components/Buscador";
import ProductoCard from "./components/ProductoCard";
import Carrito from "./components/Carrito";
import Favoritos from "./components/Favoritos";
import Resenas from "./components/Resenas";

function App() {
    const [texto, setTexto] = useState("");
    const [carrito, setCarrito] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [resenas, setResenas] = useState([]);

    function agregarAlCarrito(producto) {
        setCarrito([...carrito, producto]);
    }

    function quitarDelCarrito(indice) {
        setCarrito(carrito.filter((item, i) => i !== indice));
    }

    function agregarFavorito(producto) {
        const existe = favoritos.some(item => item.id === producto.id);

        if (!existe) {
            setFavoritos([...favoritos, producto]);
        }
    }

    function quitarFavorito(id) {
        setFavoritos(favoritos.filter(item => item.id !== id));
    }

    function agregarResena(resena) {
        setResenas([...resenas, resena]);
    }

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto.toLowerCase())
    );

    return (
        <div className="app">
            <h1>GOTYSHOP</h1>
            <p>Bienvenido a nuestra tienda de videojuegos</p>

            <Buscador texto={texto} setTexto={setTexto} />

            <div className="lista-productos">
                {filtrados.map(p => (
                    <ProductoCard
                        key={p.id}
                        producto={p}
                        agregarAlCarrito={agregarAlCarrito}
                        agregarFavorito={agregarFavorito}
                    />
                ))}
                {filtrados.length === 0 && <p>No se encontraron juegos</p>}
            </div>

            <div className="paneles">
                <Carrito carrito={carrito} quitarDelCarrito={quitarDelCarrito} />
                <Favoritos favoritos={favoritos} quitarFavorito={quitarFavorito} />
            </div>

            <Resenas
                productos={productos}
                resenas={resenas}
                agregarResena={agregarResena}
            />
        </div>
    );
}

export default App;
