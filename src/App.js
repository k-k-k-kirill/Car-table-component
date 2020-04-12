import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

//Component imports
import Table from './components/Table/Table'
import TableMobile from './components/Table/TableMobile'

function App() {
  return (
    <div className="container">
      { window.innerWidth < 1024 ? <TableMobile /> : <Table /> }
    </div>
  );
}

export default App;
