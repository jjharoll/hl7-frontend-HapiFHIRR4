import React, { useState } from 'react';
import './BuscarPaciente.css';

const PatientInfo = () => {
  const [respuesta, setRespuesta] = useState(null);
  const [nombre, setNombre] = useState('');

  const handleChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://hapi.fhir.org/baseR4/Patient/${nombre}`);
      const data = await response.json();
      setRespuesta(data);
    } catch (error) {
      console.error('Error al obtener la información del paciente:', error);
    }
  };

  const camposImportantes = ['name', 'gender', 'birthDate'];

  return (
    <div className="container">
      <h2>Buscar Paciente por Nombre</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del paciente"
          value={nombre}
          onChange={handleChange}
        />
        <button type="submit">Buscar</button>
      </form>

      {respuesta && (
        <div className="response-container">
          <h3>Respuesta del Servidor</h3>
          <pre className="json-response">
            {Object.entries(respuesta).map(([key, value]) => (
              <div key={key}>
                <span className={camposImportantes.includes(key) ? 'important-field' : ''}>
                  {key}:
                </span>{' '}
                {JSON.stringify(value)}
              </div>
            ))}
          </pre>
        </div>
      )}

      {respuesta && (
        <div className="important-info">
          <h3>Información Importante del Paciente</h3>
          <ul>
            {camposImportantes.map((campo) => (
              <li key={campo}>
                <strong>{campo}:</strong> {JSON.stringify(respuesta[campo])}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
