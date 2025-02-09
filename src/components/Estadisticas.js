import React, { useState, useEffect } from 'react';
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
import { Apiurl } from '../services/apirest';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const Estadisticas = () => {
  const [estampasMasVendidas, setEstampasMasVendidas] = useState([]);
  const [artistasMasVendidos, setArtistasMasVendidos] = useState([]);
  const [recaudoTotal, setRecaudoTotal] = useState(0);
  const [recaudoTotalPorArtista, setRecaudoTotalPorArtista] = useState([]);
  const [ventasTotales, setVentasTotales] = useState(0);
  const [clientesTotales, setClientesTotales] = useState(0);

  
  // Efecto para fetchear datos
  useEffect(() => {
    // Obtener estampas más vendidas
    fetch(`${Apiurl}/admin/stats/ev/5`) // Cambia el límite según sea necesario
      .then((response) => response.json())
      .then((data) => {
        const datos = data.body[0];
        setEstampasMasVendidas(datos);
      })
      .catch((error) => console.error('Error al obtener estampas más vendidas:', error));

    // Obtener artistas más vendidos
    fetch(`${Apiurl}/admin/stats/av/5`) // Cambia el límite según sea necesario
      .then((response) => response.json())
      .then((data) => {
        const datos = data.body[0];
        setArtistasMasVendidos(datos);
      })
      .catch((error) => console.error('Error al obtener artistas más vendidos:', error));

    // Obtener recaudo total
    fetch(`${Apiurl}/admin/stats/tr`)
      .then((response) => response.json())
      .then((data) => {
        const datos = data.body[0];
        setRecaudoTotal(datos[0].total);
      })
      .catch((error) => console.error('Error al obtener recaudo total:', error));

    // Obtener recaudo total por artista
    fetch(`${Apiurl}/admin/stats/ra/0`)
      .then((response) => response.json())
      .then((data) => {
        const datos = data.body[0];
        setRecaudoTotalPorArtista(datos);
      })
      .catch((error) => console.error('Error al obtener recaudo total por artista:', error));
    
      // Obtener ventas totales
    fetch(`${Apiurl}/admin/stats/vt`)
      .then((response) => response.json())
      .then((data) => {
        const datos = data.body[0];
        setVentasTotales(datos[0].total);
      })
      .catch((error) => console.error('Error al obtener ventas totales:', error));

    // Obtener clientes totales
    fetch(`${Apiurl}/admin/stats/ct`)
      .then((response) => response.json())
      .then((data) => {
        const datos = data.body[0];
        setClientesTotales(datos[0].total);
      })
      .catch((error) => console.error('Error al obtener clientes totales:', error)); 
  }, []);

  const barDataEstampas = {
    labels: estampasMasVendidas.map((e) => e.nombreEstampa),
    datasets: [
      {
        label: 'Ventas por Estampa',
        data: estampasMasVendidas.map((e) => e.total),
      },
    ],
  };

  const barDataArtistasMasVendidos = {
    labels: artistasMasVendidos.map((a) => a.username),
    datasets: [
      {
        label: 'Ventas por Artista',
        data: artistasMasVendidos.map((a) => a.total),
      },
    ],
  };

  const barDataRecaudoPorArtista = {
    labels: recaudoTotalPorArtista.map((a) => a.username),
    datasets: [
      {
        label: 'Recaudo por Artista',
        data: recaudoTotalPorArtista.map((a) => a.total),
      },
    ],
  };

  return (
    <div className="estadisticas-container">
      <h1>Estadísticas de la Tienda</h1>
      <div className='estadisticas-grid'>
        <div className="estadistica">
          <h3>Recaudo total</h3>
          <p>${recaudoTotal}</p>
        </div>
        <div className="estadistica">
          <h3>Ventas totales</h3>
          <p>{ventasTotales}</p>
        </div>
        <div className="estadistica">
          <h3>Clientes totales</h3>
          <p>{clientesTotales}</p>
        </div>
        <div className="estadistica">
          <h3>Estampas más vendidas</h3>
          <Bar data={barDataEstampas} options={{ responsive: true }} />
        </div>
        <div className="estadistica">
          <h3>Artistas con mas ventas</h3>
          <Bar data={barDataArtistasMasVendidos} options={{ responsive: true }} />
        </div>
        <div className="estadistica">
          <h3>Recaudo por Artista</h3>
          <Bar data={barDataRecaudoPorArtista} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );

};

export default Estadisticas;