// src/Paciente.js
import React, { useState } from 'react';
import axios from 'axios';
import './Paciente.css';
import Logo from './Logo';

const Paciente = ({ logo }) => {
  const [codigoPaciente, setCodigoPaciente] = useState('');
  const [paciente, setPaciente] = useState(null);
  const [error, setError] = useState(null);

  const obtenerPaciente = async () => {
    try {
      const response = await axios.get(`http://hapi.fhir.org/baseR4/Patient/${codigoPaciente}`);
      setPaciente(response.data);
    } catch (error) {
      setError('Error al obtener el paciente');
    }
  };

  return (
    <div className="paciente-container">
      <Logo logo={logo} />
      <div className="info-container">
        <h1>Información del Paciente</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="ID del Paciente"
            value={codigoPaciente}
            onChange={(e) => setCodigoPaciente(e.target.value)}
          />
          <button onClick={obtenerPaciente}>Obtener Paciente</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {paciente && (
          <div className="paciente-info">
            <h2>Resultado:</h2>
            <pre>{JSON.stringify(paciente, null, 2)}</pre>
            <h2>Campos importantes:</h2>
            <p>ID: {paciente.id}</p>
            <p>Nombre: {paciente.name[0].given.join(' ') + ' ' + paciente.name[0].family}</p>
            <p>Teléfono: {paciente.telecom[0].value}</p>
            <p>Género: {paciente.gender}</p>
            <p>Fecha de Nacimiento: {paciente.birthDate}</p>
            <p>Dirección: {paciente.address[0].line.join(', ')}, {paciente.address[0].city}, {paciente.address[0].state}, {paciente.address[0].postalCode}, {paciente.address[0].country}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paciente;
