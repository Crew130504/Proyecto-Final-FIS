import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SubirEstampa from '../components/SubirEstampa';

//test de prueba al subir la estampa verifica que se cumplan los requisitos y mensajes de los campos.

describe('SubirEstampa', () => {

    
    beforeAll(() => {
        jest.setTimeout(10000); // Aumenta el timeout si es necesario
    });
  // Limpiar recursos después de cada prueba
  afterEach(() => {
    jest.clearAllTimers();  // Asegúrate de limpiar todos los timers
    jest.clearAllMocks();   // Limpia cualquier mock
    jest.useRealTimers();   // Si usas temporizadores falsos, asegúrate de restaurar los reales
  });

  test('Renderiza los campos correctamente', () => {
    render(<SubirEstampa />);

    // Verificar que el título, precio, descripción y archivo de imagen se rendericen
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/imagen/i)).toBeInTheDocument();
  });

  test('Límite de caracteres (max 17)', () => {
    render(<SubirEstampa />);

    const tituloInput = screen.getByLabelText(/título/i);
    userEvent.type(tituloInput, 'Este es un título muy largo');

    // Verificar que el título se limita a 17 caracteres
    expect(tituloInput.value).toBe('Este es un título');
  });

  test('Revisa que el precio se muestre con comas', () => {
    render(<SubirEstampa />);

    const precioInput = screen.getByLabelText(/precio/i);
    userEvent.type(precioInput, '1234567');

    // Verificar que el precio se formatea con comas
    expect(precioInput.value).toBe('1,234,567');
  });

  test('Muestra un error si la imagen tiene un nombre muy largo (max 25)', () => {
    render(<SubirEstampa />);

    const imagenInput = screen.getByLabelText(/imagen/i);
    const file = new File(['dummy content'], 'imagenexcesivamentelargaparaeltest.jpg', { type: 'image/jpeg' });

    userEvent.upload(imagenInput, file);

    // Verificar que se muestra un mensaje de error
    expect(screen.getByText(/El nombre de la imagen debe tener menos de 25 caracteres/)).toBeInTheDocument();
  });

  test('Muestra un error si hay campos vacíos', async () => {
    render(<SubirEstampa />);

    // Seleccionamos el botón usando getByRole para evitar el conflicto de texto duplicado
    const submitButton = screen.getByRole('button', { name: /subir estampa/i });
    userEvent.click(submitButton);

    // Esperar que aparezca el mensaje de error
    const errorMessage = await screen.findByText(/por favor, completa todos los campos./i);
    expect(errorMessage).toBeInTheDocument();
  });

});
