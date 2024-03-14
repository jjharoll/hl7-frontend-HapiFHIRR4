// src/Location.js
import React, { useState } from 'react';
import axios from 'axios';
import './Location.css';
import Logo from './Logo';

const Location = ({ logo }) => {
  const [locationId, setLocationId] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const obtenerLocation = async () => {
    try {
      const response = await axios.get(`http://hapi.fhir.org/baseR4/Location/${locationId}`);
      setLocation(response.data);
    } catch (error) {
      setError('Error al obtener la ubicación');
    }
  };

  return (
    <div className="location-container">
      <Logo logo={logo} />
      <div className="info-container">
        <h1>Información de la Ubicación</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="ID de la Ubicación"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          />
          <button onClick={obtenerLocation}>Obtener Ubicación</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {location && (
          <div className="location-info">
            <h2>Resultado:</h2>
            <pre>{JSON.stringify(location, null, 2)}</pre>
            <h2>Campos importantes:</h2>
            <p>ID: {location.id}</p>
            <p>Nombre: {location.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;
