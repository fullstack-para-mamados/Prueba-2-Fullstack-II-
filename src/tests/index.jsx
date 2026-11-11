import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App.jsx';
import Buscador from '../components/Buscador.jsx';
import ProductoCard from '../components/ProductoCard.jsx';
import Carrito from '../components/Carrito.jsx';
import Favoritos from '../components/Favoritos.jsx';
import Resenas from '../components/Resenas.jsx';
import productos from '../data/productos.js';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let host, root;
function render(element) {
  act(() => { root.render(element); });
  return host;
}
function click(element) { act(() => element.dispatchEvent(new MouseEvent('click', { bubbles: true }))); }
function type(element, value) {
  act(() => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    if (element.tagName === 'TEXTAREA') Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(element, value);
    else setter.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
  });
}
beforeEach(() => { localStorage.clear(); host = document.createElement('div'); document.body.appendChild(host); root = createRoot(host); });
afterEach(() => { act(() => root.unmount()); host.remove(); });

describe('GOTYSHOP: 10 pruebas unitarias', () => {
  it('01 muestra los seis videojuegos', () => {
    render(<App />);
    expect(host.querySelectorAll('article.card').length).toBe(6);
  });
  it('02 comunica el texto de búsqueda por props (mock)', () => {
    const setTexto = jasmine.createSpy('setTexto');
    render(<Buscador texto="" setTexto={setTexto} />);
    type(host.querySelector('input'), 'Elden');
    expect(setTexto).toHaveBeenCalledWith('Elden');
  });
  it('03 informa cuando no hay resultados', () => {
    render(<App />);
    type(host.querySelector('input[type="text"]'), 'no-existe-123');
    expect(host.textContent).toContain('No se encontraron juegos');
  });
  it('04 agrega un producto al carrito mediante callback simulado', () => {
    const agregar = jasmine.createSpy('agregar');
    render(<ProductoCard producto={productos[0]} agregarAlCarrito={agregar} agregarFavorito={() => {}} />);
    click(host.querySelector('button'));
    expect(agregar).toHaveBeenCalledWith(productos[0]);
  });
  it('05 calcula el total del carrito', () => {
    render(<Carrito carrito={[productos[0], productos[1]]} quitarDelCarrito={() => {}} />);
    expect(host.textContent).toContain((productos[0].precio + productos[1].precio).toLocaleString('es-CL'));
  });
  it('06 elimina el producto seleccionado (mock)', () => {
    const quitar = jasmine.createSpy('quitar');
    render(<Carrito carrito={[productos[0]]} quitarDelCarrito={quitar} />);
    click(host.querySelector('button'));
    expect(quitar).toHaveBeenCalledWith(0);
  });
  it('07 agrega un videojuego a favoritos (mock)', () => {
    const agregar = jasmine.createSpy('favorito');
    render(<ProductoCard producto={productos[0]} agregarAlCarrito={() => {}} agregarFavorito={agregar} />);
    click(host.querySelectorAll('button')[1]);
    expect(agregar).toHaveBeenCalledWith(productos[0]);
  });
  it('08 evita favoritos duplicados en App', () => {
    render(<App />);
    const favorito = host.querySelector('article.card button.btn-outline-danger');
    click(favorito); click(favorito);
    expect(host.querySelector('section[aria-label="Carrito y favoritos"]').textContent).toMatch(/Favoritos\s*1/);
  });
  it('09 publica una reseña válida usando un callback mock', () => {
    const agregar = jasmine.createSpy('agregarResena');
    render(<Resenas productos={productos} resenas={[]} agregarResena={agregar} />);
    type(host.querySelector('input'), 'Ana');
    type(host.querySelector('textarea'), 'Excelente juego');
    act(() => host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(agregar).toHaveBeenCalledWith(jasmine.objectContaining({ nombre: 'Ana', comentario: 'Excelente juego' }));
  });
  it('10 no publica reseñas vacías', () => {
    const agregar = jasmine.createSpy('agregarResena');
    render(<Resenas productos={productos} resenas={[]} agregarResena={agregar} />);
    act(() => host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(agregar).not.toHaveBeenCalled();
  });
});
