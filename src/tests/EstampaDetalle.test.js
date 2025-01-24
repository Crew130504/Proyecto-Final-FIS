import { render, screen, fireEvent } from '@testing-library/react';
import EstampaDetalle from '../components/EstampaDetalle';
// Un test de prueba que hice para un componente facil

test('debería actualizar el precio total cuando cambia la cantidad', () => {
  const estampa = { nombre: 'Estampa divertida', precio: 20, disponibilidad: 10, imagen: 'path_to_image' };
  
  render(<EstampaDetalle estampa={estampa} onClose={() => {}} />);
  
  // Inicialmente, el precio total debe ser igual al precio de la estampa
  expect(screen.getByText('Precio total: $20')).toBeInTheDocument();
  
  // Cambiar la cantidad a 3
  fireEvent.change(screen.getByLabelText(/Cantidad/i), { target: { value: '3' } });
  
  // El precio total debe actualizarse
  expect(screen.getByText('Precio total: $60')).toBeInTheDocument();
});
