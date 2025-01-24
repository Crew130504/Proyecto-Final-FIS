import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './Estadisticas.css';

//Muestra las estadísticas de la página para el administrador con gráficos y ayudas visuales.
//Esta parte no la hice yo pero bueno, primero importo una dependencia para las gráficas y luego le puso datos.

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const Estadisticas = () => {
  // Datos iniciales
  const ventasTotales = 500;
  const clientes = 200;
  const artistas = 10;

  const ventasPorMes = [120, 150, 230]; // Septiembre, Octubre, Noviembre
  const clientesPorMes = [40, 65, 95]; // Septiembre, Octubre, Noviembre

  const coloresMasVendidos = [
    { color: 'Negro', cantidad: 200 },
    { color: 'Blanco', cantidad: 150 },
    { color: 'Rojo', cantidad: 100 },
    { color: 'Azul', cantidad: 50 },
  ];

  const tallasMasVendidas = [
    { talla: 'S', cantidad: 110 },
    { talla: 'M', cantidad: 180 },
    { talla: 'L', cantidad: 160 },
    { talla: 'XL', cantidad: 50 },
  ];

  const tamanoEstampado = [
    { tamano: 'Pequeño', cantidad: 150 },
    { tamano: 'Mediano', cantidad: 250 },
    { tamano: 'Grande', cantidad: 100 },
  ];

  const materialesMasPopulares = [
    { material: 'Algodón', cantidad: 260 },
    { material: 'Poliéster', cantidad: 150 },
    { material: 'Seda', cantidad: 60 },
    { material: 'Rayón', cantidad: 30 },
  ];

  const ubicacionesEstampado = [
    { ubicacion: 'Central', cantidad: 200 },
    { ubicacion: 'Superior', cantidad: 150 },
    { ubicacion: 'Inferior', cantidad: 80 },
    { ubicacion: 'Izquierda', cantidad: 40 },
    { ubicacion: 'Derecha', cantidad: 30 },
  ];

  const estampasMasVendidas = [
    { nombre: 'Estampa A', cantidad: 200 },
    { nombre: 'Estampa B', cantidad: 180 },
    { nombre: 'Estampa C', cantidad: 120 },
  ];

  // Configuración de gráficos
  const lineDataVentas = {
    labels: ['Septiembre', 'Octubre', 'Noviembre'],
    datasets: [
      {
        label: 'Ventas Totales',
        data: ventasPorMes,
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const lineDataClientes = {
    labels: ['Septiembre', 'Octubre', 'Noviembre'],
    datasets: [
      {
        label: 'Nuevos Clientes',
        data: clientesPorMes,
        borderColor: '#e67e22',
        backgroundColor: 'rgba(230, 126, 34, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const pieDataColores = {
    labels: coloresMasVendidos.map((c) => c.color),
    datasets: [
      {
        data: coloresMasVendidos.map((c) => c.cantidad),
        backgroundColor: ['#000000', '#ffffff', '#e74c3c', '#3498db'],
        borderColor: '#ccc',
      },
    ],
  };

  const pieDataTallas = {
    labels: tallasMasVendidas.map((t) => t.talla),
    datasets: [
      {
        data: tallasMasVendidas.map((t) => t.cantidad),
        backgroundColor: ['#8e44ad', '#27ae60', '#2980b9', '#c0392b'],
        borderColor: '#ccc',
      },
    ],
  };

  const barDataEstampas = {
    labels: estampasMasVendidas.map((e) => e.nombre),
    datasets: [
      {
        label: 'Ventas por Estampa',
        data: estampasMasVendidas.map((e) => e.cantidad),
        backgroundColor: ['#1abc9c', '#3498db', '#e74c3c'],
        borderColor: ['#16a085', '#2980b9', '#c0392b'],
        borderWidth: 1,
      },
    ],
  };

  const barDataTamanoEstampado = {
    labels: tamanoEstampado.map((t) => t.tamano),
    datasets: [
      {
        label: 'Tamaños más populares',
        data: tamanoEstampado.map((t) => t.cantidad),
        backgroundColor: ['#f1c40f', '#e67e22', '#9b59b6'],
        borderColor: ['#d4ac0d', '#ca6f1e', '#76448a'],
        borderWidth: 1,
      },
    ],
  };

  const pieDataMateriales = {
    labels: materialesMasPopulares.map((m) => m.material),
    datasets: [
      {
        data: materialesMasPopulares.map((m) => m.cantidad),
        backgroundColor: ['#1abc9c', '#3498db', '#e74c3c', '#f39c12'],
        borderColor: '#ccc',
      },
    ],
  };

  const barDataUbicaciones = {
    labels: ubicacionesEstampado.map((u) => u.ubicacion),
    datasets: [
      {
        label: 'Ubicaciones más populares',
        data: ubicacionesEstampado.map((u) => u.cantidad),
        backgroundColor: ['#34495e', '#2ecc71', '#3498db', '#e74c3c', '#9b59b6'],
        borderColor: ['#2c3e50', '#27ae60', '#2980b9', '#c0392b', '#8e44ad'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="estadisticas-container">
      <h1>Estadísticas de la Tienda</h1>

      <div className="estadistica">
        <h3>Ventas Totales</h3>
        <Line data={lineDataVentas} />
        <p>Total: {ventasTotales} camisetas vendidas</p>
      </div>

      <div className="estadistica">
        <h3>Nuevos Clientes</h3>
        <Line data={lineDataClientes} />
        <p>Total: {clientes} clientes registrados</p>
      </div>

      <div className="estadistica">
        <h3>Colores Más Vendidos</h3>
        <Pie data={pieDataColores} />
      </div>

      <div className="estadistica">
        <h3>Tallas Más Vendidas</h3>
        <Pie data={pieDataTallas} />
      </div>

      <div className="estadistica">
        <h3>Estampas Más Vendidas</h3>
        <Bar data={barDataEstampas} options={{ responsive: true }} />
      </div>

      <div className="estadistica">
        <h3>Tamaño de Estampado Más Popular</h3>
        <Bar data={barDataTamanoEstampado} options={{ responsive: true }} />
      </div>

      <div className="estadistica">
        <h3>Material Más Popular</h3>
        <Pie data={pieDataMateriales} />
      </div>

      <div className="estadistica">
        <h3>Ubicación de Estampado Más Popular</h3>
        <Bar data={barDataUbicaciones} options={{ responsive: true }} />
      </div>

      <div className="estadistica">
        <h3>Número de Artistas</h3>
        <p>{artistas} artistas registrados</p>
      </div>
    </div>
  );
};

export default Estadisticas;
