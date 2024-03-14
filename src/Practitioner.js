// src/Practitioner.js
import React, { useState } from 'react';
import axios from 'axios';
import './Practitioner.css';
import Logo from './Logo';

const Practitioner = ({ logo }) => {
  const [practitionerId, setPractitionerId] = useState('');
  const [practitioner, setPractitioner] = useState(null);
  const [error, setError] = useState(null);

  const obtenerPractitioner = async () => {
    try {
      const response = await axios.get(`http://hapi.fhir.org/baseR4/Practitioner/${practitionerId}`);
      setPractitioner(response.data);
    } catch (error) {
      setError('Error al obtener el profesional');
    }
  };

  return (
    <div className="practitioner-container">
      <Logo logo={logo} />
      <div className="info-container">
        <h1>Información del Profesional</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="ID del Profesional"
            value={practitionerId}
            onChange={(e) => setPractitionerId(e.target.value)}
          />
          <button onClick={obtenerPractitioner}>Obtener Profesional</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {practitioner && (
          <div className="practitioner-info">
            <h2>Resultado:</h2>
            <pre>{JSON.stringify(practitioner, null, 2)}</pre>
            <h2>Campos importantes:</h2>
            <p>ID: {practitioner.id}</p>
            <p>Identificador: {practitioner.identifier[0].value}</p>
            <p>Activo: {practitioner.active ? 'Sí' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practitioner;
