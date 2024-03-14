// src/Infecciones.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Infecciones.css'; // Asegúrate de tener el CSS adecuado para este componente
import Logo from './Logo'; // Importa el componente Logo

const Infecciones = ({ logo }) => {
  const [infecciones, setInfecciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerInfecciones = async () => {
      try {
        const response = await axios.get('https://mi-servidor-fhir.com/infecciones');
        setInfecciones(response.data);
      } catch (error) {
        setError('Error al obtener las infecciones');
      }
    };

    obtenerInfecciones();
  }, []);

  return (
    <div className="infecciones-container">
      <Logo logo={logo} /> {/* Utiliza el componente Logo con la imagen recibida como prop */}
      <div className="infecciones-info">
        <h2>Infecciones</h2>
        {error && <p>Error: {error}</p>}
        <ul>
          {infecciones.map((infeccion, index) => (
            <li key={index}>{infeccion.nombre}</li> // Ajusta esto según la estructura de tus datos de infecciones
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Infecciones;
