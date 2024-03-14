// IngresarDatosPaciente.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IngresarDatosPaciente.css';

const IngresarDatosPaciente = () => {
  const [nombre, setNombre] = useState('');
  const [fechaLlegada, setFechaLlegada] = useState('');
  const [cedula, setCedula] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [alergias, setAlergias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://hapi.fhir.org/baseR4/Patient');
        setPacientes(response.data.entry);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los pacientes');
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientChange = async (e) => {
    setSelectedPatientId(e.target.value);
    try {
      const response = await axios.get(`http://hapi.fhir.org/baseR4/AllergyIntolerance`);
      const alergias = response.data;
      console.log(alergias);
      const alergiasDelPaciente = alergias.filter(alergia => {
        // Verificar si la referencia del paciente coincide con el ID del paciente seleccionado
        return alergia.resource.patient.reference === `Patient/${e.target.value}`;
      }).map(alergia => alergia.resource);
      setAlergias(alergiasDelPaciente);
    } catch (error) {
      setError('Error al obtener las alergias del paciente');
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del paciente al backend
  };

  return (
    <div className="form-container">
      <h2>Ingresar Datos del Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label htmlFor="fechaLlegada">Fecha de Llegada:</label>
          <input type="date" id="fechaLlegada" value={fechaLlegada} onChange={(e) => setFechaLlegada(e.target.value)} />
        </div>
        <div>
          <label htmlFor="cedula">Cédula:</label>
          <input type="text" id="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
        </div>
        <div>
          <label htmlFor="paciente">Seleccionar Paciente Existente:</label>
          <select id="paciente" value={selectedPatientId} onChange={handlePatientChange}>
            <option value="">Seleccionar paciente...</option>
            {pacientes.map((paciente) => (
              <option key={paciente?.resource?.id} value={paciente?.fullUrl}>
                {paciente?.resource?.id} - {paciente?.resource?.name?.[0]?.family}, {paciente?.resource?.name?.[0]?.given?.[0]}
              </option>
            ))}
          </select>
        </div>
        <div className="alergias-list">
          <h3>Alergias del Paciente:</h3>
          <ul>
            {alergias.map((alergia) => (
              <li key={alergia?.fullUrl}>
                {alergia?.resource?.code?.coding?.[0]?.display}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Guardar Datos</button>
      </form>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default IngresarDatosPaciente;
