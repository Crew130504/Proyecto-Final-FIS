// src/tests/Inicio.test.js
import { render, screen } from '@testing-library/react';
import Inicio from '../components/Inicio';

//Otro test de prueba que hice, mejor dicho que me ayudo hacerlo chatgpt porque también me dio errores al principio...
//No tiene mucha importancia...

describe('Componente Inicio', () => {
  test('debería mostrar el título "Bienvenido a la Tienda de Camisetas"', () => {
    render(<Inicio />);

    // Verificar que el título "Bienvenido a la Tienda de Camisetas" esté presente en la pantalla
    const titleElement = screen.getByText(/Bienvenido a la Tienda de Camisetas/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('debería mostrar las secciones de la tienda correctamente', () => {
    render(<Inicio />);

    // Verificar que cada sección (Quiénes Somos, Visión, Calidad, Servicios) esté presente
    const quienesSomos = screen.getByText(/¿Quiénes Somos?/i);
    const vision = screen.getByText(/Nuestra Visión y Trayectoria/i);
    const calidad = screen.getByText(/Calidad de Nuestros Productos/i);
    const servicios = screen.getByText(/Nuestros Servicios/i);

    expect(quienesSomos).toBeInTheDocument();
    expect(vision).toBeInTheDocument();
    expect(calidad).toBeInTheDocument();
    expect(servicios).toBeInTheDocument();
  });

  test('debería mostrar las imágenes de cada sección correctamente', () => {
    render(<Inicio />);

    // Verificar que las imágenes están presentes
    const imagenes = screen.getAllByRole('img');
    expect(imagenes.length).toBeGreaterThan(0); // Comprobar que hay imágenes
    expect(imagenes[0]).toHaveAttribute('src', 'https://gafascolors.com/wp-content/uploads/2022/03/tienda-de-estampados-personalizados-bogota-colombia-medellin-online-24-horas-1024x768.jpg');
    expect(imagenes[1]).toHaveAttribute('src', 'https://gafascolors.com/wp-content/uploads/2021/07/Estampado-de-Camisetas-personalizadas-Sublimadas-bordadas-marcadas-bogota-medellin-33.jpg');
    expect(imagenes[2]).toHaveAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGjFxCFLEBnDJZdwI0ugzss4fjEHgjTQk1lw&s');
    expect(imagenes[3]).toHaveAttribute('src', 'https://www.cuteshop.mx/wp-content/uploads/2019/04/animalitos-kawaii-600x776.jpg');
  });

  test('debería mostrar el contenido dentro de cada tarjeta', () => {
    render(<Inicio />);

    // Verificar que el contenido dentro de las tarjetas de cada sección esté presente
    const contentQuienesSomos = screen.getByText(/Somos una tienda apasionada por el diseño y la moda/i);
    const contentVision = screen.getByText(/Desde nuestros inicios, hemos trabajado para ser un referente/i);
    const contentCalidad = screen.getByText(/Utilizamos materiales de primera calidad/i);
    const contentServicios = screen.getByText(/Además de una gran variedad de diseños, ofrecemos la posibilidad/i);

    expect(contentQuienesSomos).toBeInTheDocument();
    expect(contentVision).toBeInTheDocument();
    expect(contentCalidad).toBeInTheDocument();
    expect(contentServicios).toBeInTheDocument();
  });
});
