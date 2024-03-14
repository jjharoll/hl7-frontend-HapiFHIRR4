// Datos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Datos.css';

const Datos = () => {
  const [tipo, setTipo] = useState('alergia');
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = '';
      switch (tipo) {
        case 'alergia':
          url = 'https://hapi.fhir.org/baseR4/AllergyIntolerance';
          break;
        case 'paciente':
          url = 'http://hapi.fhir.org/baseR4/Patient';
          break;
        case 'location':
          url = 'http://hapi.fhir.org/baseR4/Location';
          break;
        case 'partitioner':
          url = 'http://hapi.fhir.org/baseR4/Practitioner';
          break;
        default:
          url = '';
          break;
      }

      if (url !== '') {
        try {
          const response = await axios.get(url);
          setDatos(response.data.entry);
        } catch (error) {
          setError('Error al obtener los datos');
        }
      }
    };

    fetchData();
  }, [tipo]);

  const renderizarDatos = () => {
    return (
      <div className="datos">
        {datos.map((item, index) => (
          <div className="dato" key={index}>
            <h3>{item.resource.resourceType}</h3>
            <pre>{JSON.stringify(item.resource, null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="datos-container">
      <h2>Seleccione el Tipo de Datos:</h2>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="alergia">Alergias</option>
        <option value="paciente">Pacientes</option>
        <option value="location">Locations</option>
        <option value="partitioner">Practitioners</option>
      </select>

      {error && <p className="error-message">{error}</p>}
      
      {datos.length > 0 ? renderizarDatos() : <p>No se encontraron datos</p>}
    </div>
  );
};

export default Datos;
