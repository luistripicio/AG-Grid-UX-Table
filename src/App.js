import React, {useEffect, useState} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './main.css';

function App() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
       fetch('https://localhost:7079/Position/Get')
       .then(result => result.json())
       .then(rowData => setRowData(rowData))
  }, []);
 
  return (
    <div className='container'>
      <h1 className='text-center'>AG Grid UX table</h1>
      <div className="ag-theme-alpine" style={{height: "800px"}}>
      <AgGridReact
          rowData={rowData}>
          <AgGridColumn field="ticker"></AgGridColumn>
          <AgGridColumn field="description"></AgGridColumn>
          <AgGridColumn field="issuer"></AgGridColumn>
          <AgGridColumn headerName="FM3 Strategy" field="fM3Strategy"></AgGridColumn>
          <AgGridColumn headerName="AIM Strategy" field="aimStrategy"></AgGridColumn>
          <AgGridColumn field="entity"></AgGridColumn>
          <AgGridColumn field="position"></AgGridColumn>
          <AgGridColumn field="positionStatus"></AgGridColumn>
          <AgGridColumn field="securityType"></AgGridColumn>
          <AgGridColumn field="maturityDate" valueFormatter={dateFormatter}></AgGridColumn>
          <AgGridColumn field="coupon"></AgGridColumn>
          <AgGridColumn field="unitCost"></AgGridColumn>
          <AgGridColumn field="priorDayPrice"></AgGridColumn>
          <AgGridColumn headerName="Last Price" field="lasT_PRICE"></AgGridColumn>
          <AgGridColumn field="marketValue"></AgGridColumn>
          <AgGridColumn field="dailyInterest"></AgGridColumn>
          <AgGridColumn field="accrual"></AgGridColumn>
          <AgGridColumn headerName="UD SPAC STATUS" field="uD_SPAC_STATUS"></AgGridColumn>
          <AgGridColumn field="dailyPnL"></AgGridColumn>
          <AgGridColumn headerName="MTD PnL" field="mtdPnL"></AgGridColumn>
          <AgGridColumn headerName="QTD PnL" field="qtdPnL"></AgGridColumn>
          <AgGridColumn headerName="YTD PnL" field="ytdPnL"></AgGridColumn>
          <AgGridColumn headerName="LTD PnL" field="ltdPnL"></AgGridColumn>
      </AgGridReact>
  </div>      
    </div>
  );
}

function dateFormatter(params) {
  console.log("Param",params.value);
  return moment(params.value).format('MM/DD/YYYY');
}

export default App;
