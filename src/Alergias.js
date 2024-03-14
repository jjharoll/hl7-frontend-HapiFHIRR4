// src/Alergias.js
import React, { useState } from 'react';
import axios from 'axios';
import './Alergias.css';
import Logo from './Logo'; // Importa el componente Logo

const Alergias = ( {logo}) => {
  const [alergiaId, setAlergiaId] = useState('');
  const [alergia, setAlergia] = useState(null);
  const [error, setError] = useState(null);
  const [mostrarCampoCrear, setMostrarCampoCrear] = useState(false);
  const [nuevaAlergia, setNuevaAlergia] = useState('');
  const [mostrarCampoEliminar, setMostrarCampoEliminar] = useState(false);

  const obtenerAlergia = async () => {
    try {
      const response = await axios.get(`https://hapi.fhir.org/baseR4/AllergyIntolerance/${alergiaId}`);
      setAlergia(response.data);
    } catch (error) {
      setError('Error al obtener la alergia');
    }
  };

  const crearAlergia = async () => {
    try {
      const response = await axios.post('https://hapi.fhir.org/baseR4/AllergyIntolerance', {
        resourceType: 'AllergyIntolerance'
      });
      setAlergia(response.data);
      setMostrarCampoCrear(false);
    } catch (error) {
      setError('Error al crear la alergia');
    }
  };

  const eliminarAlergia = async () => {
    try {
      await axios.delete(`https://hapi.fhir.org/baseR4/AllergyIntolerance/${alergiaId}`);
      setAlergia(null);
      setAlergiaId('');
      setMostrarCampoEliminar(false);
    } catch (error) {
      setError('Error al eliminar la alergia');
    }
  };

  return (
    <div className="alergias-container">
         <Logo logo={logo} /> {/* Utiliza el componente Logo con la imagen recibida como prop */}
      <h1>Gestión de Alergias</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="ID de la Alergia"
          value={alergiaId}
          onChange={(e) => setAlergiaId(e.target.value)}
        />
        <button onClick={obtenerAlergia}>Obtener Alergia</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {alergia && (
        <div>
          <div className="alergia-info">
            <h2>Resultado:</h2>
            <pre>{JSON.stringify(alergia, null, 2)}</pre>
          </div>
          <div className="important-fields">
            <h2>Campos Importantes:</h2>
            <p>ID: {alergia.id}</p>
            <p>Tipo: {alergia.type}</p>
            <p>Código: {alergia.code.coding[0].code}</p>
            <p>Descripción: {alergia.code.coding[0].display}</p>
          </div>
        </div>
      )}
      <div className="buttons-container">
        <button onClick={() => setMostrarCampoCrear(true)}>Crear Alergia</button>
        <button onClick={() => setMostrarCampoEliminar(true)}>Eliminar Alergia</button>
      </div>
      {mostrarCampoCrear && (
        <div className="crear-alergia">
          <input
            type="text"
            placeholder="Nueva Alergia"
            value={nuevaAlergia}
            onChange={(e) => setNuevaAlergia(e.target.value)}
          />
          <button onClick={crearAlergia}>Guardar</button>
        </div>
      )}
      {mostrarCampoEliminar && (
        <div className="eliminar-alergia">
          <p>¿Estás seguro de que deseas eliminar esta alergia?</p>
          <button onClick={eliminarAlergia}>Sí, Eliminar</button>
          <button onClick={() => setMostrarCampoEliminar(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Alergias;
