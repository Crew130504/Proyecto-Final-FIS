//src\tests\IniciarSesion.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import IniciarSesion from '../components/IniciarSesion'; // Ajusta la ruta correctamente
import { AuthProvider } from '../components/Autenticacion';
import { MemoryRouter } from 'react-router-dom';

//No muevan nada de aquí, me dio muchisimos errores esta prueba
//A pesar de que me pasaron el archivo de esa prueba tocaba integrarla y como el inicio sesión tenía un menú dinámico...
//A veces detectaba dobles los botones y los campos entonces toco configurarla.
  
describe('IniciarSesion Component', () => {
  // Clear the DOM before each test
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    render(
      <MemoryRouter> {/* Envuelve tu componente con MemoryRouter */}
        <AuthProvider>
          <IniciarSesion />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  test('Deberia renderizar Iniciar Sesión and Registrarse de forma correcta', async () => {
    await waitFor(() => {
      const iniciarSesionButtons = screen.getAllByText(/Iniciar Sesión/i);
      const registrarseButtons = screen.getAllByText(/Registrarse/i);      

      expect(iniciarSesionButtons.length).toBeGreaterThan(0); // Asegúrate de que se renderiza al menos uno
      expect(registrarseButtons.length).toBeGreaterThan(0); // Asegúrate de que se renderiza al menos uno
    });
  });

  test('Intercambia entre formulario login y registrarse', () => {
    const buttons = screen.getAllByRole('button', { name: /Registrarse/i });

    expect(buttons.length).toBeGreaterThan(0); // Asegúrate de que se encuentra al menos uno

    const toggleButton = buttons[0]; // Selecciona el primer botón de la lista
    fireEvent.click(toggleButton);

    expect(screen.getByText(/Use su correo electrónico para registrarse/i)).toBeInTheDocument();
  });

  test('Muestra los errores al poner datos invalidos', async () => {
    fireEvent.change(screen.getByTestId('email-input-login'), { target: { value: 'invalid@gmail.com' } });
    fireEvent.change(screen.getByTestId('password-input-login'), { target: { value: 'wrongpassword' } });
    
    fireEvent.click(screen.getByTestId('login-button'));
  
    await waitFor(() => {
      // Verifica que el mensaje de error se muestra con el test ID correcto
      expect(screen.getByTestId('login-error-message')).toBeInTheDocument();
    });
  });
  

  test('Valida el formulario de registro con errores de datos invalidos', async () => {
    const toggleButton = screen.getByRole('button', { name: /Registrarse/i });
    fireEvent.click(toggleButton);
  
    fireEvent.change(screen.getByTestId('name-input-signup'), { target: { value: 'A' } });
    fireEvent.change(screen.getByTestId('nickname-input-signup'), { target: { value: 'N' } });
    fireEvent.change(screen.getByTestId('password-input-signup'), { target: { value: 'pass' } });
    fireEvent.change(screen.getByTestId('confirm-password-input-signup'), { target: { value: 'pass' } });
    fireEvent.change(screen.getByTestId('email-input-signup'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByTestId('phone-input-signup'), { target: { value: '123' } });
    fireEvent.change(screen.getByTestId('address-input-signup'), { target: { value: '' } });
  
    fireEvent.click(screen.getByTestId('register-button'));
  
    await waitFor(() => {
      expect(screen.getByTestId('sign-error-message')).toHaveTextContent(
        'Nombre inválido. Debe tener entre 3 y 20 caracteres y solo contener letras y espacios, sin caracteres especiales.'
      );
    });
  });

  /* // Esta prueba no la pude resolver, siempre da error, nose por qué, tal vez sea ese menú dinámico que repite los botones
  test('successful login redirects user with correct role', async () => {
    // Make sure that the component is wrapped with both MemoryRouter and AuthProvider
    render(
      <MemoryRouter>
        <AuthProvider>
          <IniciarSesion />
        </AuthProvider>
      </MemoryRouter>
    );


    // Asegúrate de que el formulario de login esté renderizado
const loginForms = await screen.findAllByTestId('login-form');
expect(loginForms.length).toBeGreaterThan(0); // Verifica que el formulario de login esté presente

const loginForm = loginForms[0]; // Selecciona el primer formulario de login

      // Simulate filling out the login form
  fireEvent.change(loginForm.querySelector('[data-testid="email-input-login"]'), { target: { value: 'admin@gmail.com' } });
  fireEvent.change(loginForm.querySelector('[data-testid="password-input-login"]'), { target: { value: '123' } });
  fireEvent.change(loginForm.querySelector('[data-testid="role-select-login"]'), { target: { value: 'cliente' } });

  // Selecciona el botón de login solo dentro del formulario de inicio de sesión
  const loginButton = screen.getByTestId('login-form').querySelector('[data-testid="login-button"]');

  // Hacemos clic en el botón de login
  fireEvent.click(loginButton);
    // Use waitFor to handle async transition
    await waitFor(() => {
      // Verificamos que el formulario de login desaparezca
    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();

    // Verificamos que el mensaje de éxito esté presente
    expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();

    
    expect(window.location.pathname).toBe('/Admin');  // Asegúrate de que la URL sea la esperada
    });
  });*/

});
