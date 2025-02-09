import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Carrito from './components/Carrito';
import CatalogoEstampas from './components/CatalogoEstampas';
import Contacto from './components/Contacto';
import IniciarSesion from './components/IniciarSesion';
import Registrarse from './components/Registrarse';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import ProtectedRoute from './components/Proteccion_rutas'; // Importa ProtectedRoute
import Admin from './components/Admin'; // Importa el componente Admin
import { AuthProvider } from './components/Autenticacion'; // Importa AuthProvider
import SubirEstampa from './components/SubirEstampa';
import EstampasPublicadas from './components/EstampasPublicadas';
import Estadisticas from './components/Estadisticas';
import Compras from './components/Compras';
import ProcesoCompra from './components/ProcesoCompra';
import PerfilUsuarioCliente from './components/PerfilUsuarioCliente'; // Componente Cliente
import PerfilUsuarioArtista from './components/PerfilUsuarioArtista'; // Componente Artista
//Importaciones para el footer
import SoporteTecnico from './components/secondaryComponents/SoporteTecnico';
import PoliticaPrivacidad from './components/secondaryComponents/PoliticaPrivacidad';
import AvisoLegal from './components/secondaryComponents/AvisoLegal';
import PoliticaCookies from './components/secondaryComponents/PoliticaCookies';
import PoliticaUso from './components/secondaryComponents/PoliticaUso';
import NuestrasSucursales from './components/secondaryComponents/NuestrasSucursales';
import SobreNosotros from './components/secondaryComponents/SobreNosotros';
import EquipoDev from './components/secondaryComponents/EquipoDev';
import Vision from './components/secondaryComponents/Vision';
import Afiliados from './components/secondaryComponents/Afiliados';
import Opiniones from './components/secondaryComponents/Opiniones';
import LibreriaRecursos from './components/secondaryComponents/LibreriaRecursos';
import PQRS from './components/secondaryComponents/PQRS';
import PaletaColores from './components/secondaryComponents/PaletaColores';

//Este el archivo App, aquí se manejan todas las direcciones de la página
//El authprovider es para verificar siempre un usuario no autenticado no pueda dirigirse a partes que no deberia
//Por esa razón la mayoría de los links deben estar dentro del authprovider

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/CatalogoEstampas" element={<CatalogoEstampas />} />
            <Route path="/Iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/Registrarse" element={<Registrarse />} />
            <Route path="/Contacto" element={<Contacto />} />    
            <Route path="/SoporteTecnico" element={<SoporteTecnico />} />
            

            {/*La ruta del proceso de compras esta protegida ya que solo la debe usar un cliente autenticado */}
            <Route
              path="/ProcesoCompra"
              element={
                <ProtectedRoute allowedRole="cliente">
                  <ProcesoCompra />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Carrito"
              element={
                <ProtectedRoute allowedRole="cliente">
                  <Carrito />
                </ProtectedRoute>
              }
            />
            {/*La ruta de subir estampas esta protegida ya que solo la debe usar un artista autenticado */}
            <Route
              path="/Compras"
              element={
                <ProtectedRoute allowedRole="cliente">
                  <Compras />
                </ProtectedRoute>
              }
            />
            {/*La ruta de subir estampas esta protegida ya que solo la debe usar un artista autenticado */}
            <Route
              path="/SubirEstampa"
              element={
                <ProtectedRoute allowedRole="artista">
                  <SubirEstampa />
                </ProtectedRoute>
              }
            />
                   
            {/*La ruta de ver estampas publicadas esta protegida ya que solo la debe usar un artista autenticado */}
            <Route
              path="/EstampasPublicadas"
              element={
                <ProtectedRoute allowedRole="artista">
                  <EstampasPublicadas />
                </ProtectedRoute>
              }
            />
            {/*La ruta de ver estadísticas esta protegida ya que solo la debe usar el admin logueado */}
            <Route
              path="/Estadisticas"
              element={
                <ProtectedRoute allowedRole="admin">
                  <Estadisticas />
                </ProtectedRoute>
              }
            />
            

            {/*Todas las rutas secundarias del footer*/}
            <Route path="/PoliticaPrivacidad" element={<PoliticaPrivacidad />} />
            <Route path="/AvisoLegal" element={<AvisoLegal />} />
            <Route path="/PoliticaCookies" element={<PoliticaCookies />} />
            <Route path="/PoliticaUso" element={<PoliticaUso />} />
            <Route path="/NuestrasSucursales" element={<NuestrasSucursales />} />
            <Route path="/SobreNosotros" element={<SobreNosotros />} />
            <Route path="/EquipoDev" element={<EquipoDev />} />
            <Route path="/Vision" element={<Vision />} />
            <Route path="/Afiliados" element={<Afiliados />} />
            <Route path="/Opiniones" element={<Opiniones />} />
            <Route path="/PQRS" element={<PQRS />} />
            <Route path="/LibreriaRecursos" element={<LibreriaRecursos />} />
            <Route path="/PaletaColores" element={<PaletaColores />} />
            {/* Ruta protegida para el admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Rutas para los perfiles de cliente y artista */}
            <Route path="/PerfilUsuarioCliente" element={<PerfilUsuarioCliente />} />

            <Route
              path="/PerfilUsuarioArtista"
              element={
                <ProtectedRoute role="artista">
                  <PerfilUsuarioArtista />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
