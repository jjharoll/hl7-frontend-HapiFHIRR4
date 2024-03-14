// src/Diagnosticos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Diagnosticos.css'; // Asegúrate de tener el CSS adecuado para este componente
import Logo from './Logo'; // Importa el componente Logo

const Diagnosticos = ({ logo }) => {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDiagnosticos = async () => {
      try {
        const response = await axios.get('https://mi-servidor-fhir.com/diagnosticos');
        setDiagnosticos(response.data);
      } catch (error) {
        setError('Error al obtener los diagnósticos');
      }
    };

    obtenerDiagnosticos();
  }, []);

  return (
    <div className="diagnosticos-container">
      <Logo logo={logo} /> {/* Utiliza el componente Logo con la imagen recibida como prop */}
      <div className="diagnosticos-info">
        <h2>Diagnosticos</h2>
        {error && <p>Error: {error}</p>}
        <ul>
          {diagnosticos.map((diagnostico, index) => (
            <li key={index}>{diagnostico.nombre}</li> // Ajusta esto según la estructura de tus datos de diagnósticos
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Diagnosticos;
