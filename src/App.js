// src/App.js
import React, { useState } from 'react';
import './App.css';
import Paciente from './Paciente';
import Location from './Location'; // Importa el componente Location
import Practitioner from './Practitioner'; // Importa el componente Practitioner
import Alergiar from'./Alergias';
import Datos from'./Datos';
import IngresarDatosPaciente from'./IngresarDatosPaciente';
import BuscarPaciente from'./BuscarPaciente';
import hl7Logo from './fhir.png'; // Importa la imagen del logotipo de HL7

function App() {
  const [selectedTab, setSelectedTab] = useState('paciente');

  const renderComponent = () => {
    switch(selectedTab) {
      case 'paciente':
        return <Paciente logo={hl7Logo} />;
      case 'location':
        return <Location logo={hl7Logo} />;
      case 'practitioner':
        return <Practitioner logo={hl7Logo}/>;
      case 'alergia':
        return <Alergiar logo={hl7Logo}/>;
      case 'datos':
        return <Datos/>;
      case 'datospaciente':
        return <IngresarDatosPaciente/>;
      case 'buscarpaciente':
        return <BuscarPaciente/>;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <ul>
            <li className={selectedTab === 'paciente' ? 'active' : ''} onClick={() => setSelectedTab('paciente')}>PacienteID</li>
            <li className={selectedTab === 'buscarpaciente' ? 'active' : ''} onClick={() => setSelectedTab('buscarpaciente')}>PacienteNombre</li>
            <li className={selectedTab === 'location' ? 'active' : ''} onClick={() => setSelectedTab('location')}>Location</li>
            <li className={selectedTab === 'practitioner' ? 'active' : ''} onClick={() => setSelectedTab('practitioner')}>Practitioner</li>
            <li className={selectedTab === 'alergia' ? 'active' : ''} onClick={() => setSelectedTab('alergia')}>Alergias</li>
            <li className={selectedTab === 'datos' ? 'active' : ''} onClick={() => setSelectedTab('datos')}>Datos</li>
            <li className={selectedTab === 'datospaciente' ? 'active' : ''} onClick={() => setSelectedTab('datospaciente')}>Ingreso Paciente</li>
            
          </ul>
        </nav>
      </header>
      <div className="main-content">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
