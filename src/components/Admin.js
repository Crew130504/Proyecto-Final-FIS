// src/components/Contacto.js
import React from 'react';
import './Admin.css';

//Esta es la vista del administrador, es la vista a la que se redirige automaticamente al iniciar sesión
const Admin = () => {
return (
    <div className="Admin">
        <h1><strong>Bienvenido Administrador</strong></h1>
        <h2><strong>Estas son las estadísticas de las ventas:</strong></h2>
            
            <p><strong>Ventas Totales:</strong> X</p>{/*Aquí pueden poner los datos directamente o con un método o algo*/}
            <p><strong>Dinero Recaudado:</strong> X</p>{/*Igual la vista estadísticas es más visual por lo que no es necesario aquí poner tablas*/}
            <p><strong>Top 10 artistas:</strong> X</p>
            <p><strong>Clientes Registrados:</strong> X</p>
    
    </div>
);
};

export default Admin;
