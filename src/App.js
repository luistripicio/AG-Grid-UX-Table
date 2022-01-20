import React, {useState} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './main.css';

function App() {
 
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);       
    getData().then(res=>{
      params.api.setRowData(res);
    });    
  };

  const refreshData = () => {
    getData().then(res=>{
      console.log(gridApi);
      gridApi.setRowData(res);
    });
  };

  const getData = () => {
      return fetch('https://localhost:7079/Position/Get')
        .then(result => result.json())
        .then(rowData => {return rowData});
  }
 
  return (
    <div className='container'>
      <h1 className='text-center'>AG Grid UX table</h1>
      <button onClick={() => refreshData()}>
           Refresh
      </button>
      <div className="ag-theme-alpine" style={{height: "800px"}}>
      <AgGridReact
          pagination={true}
          rowData={[]}
          enableCellChangeFlash={true}
          onGridReady={onGridReady}
          >
          <AgGridColumn field="ticker" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="description" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="issuer" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn headerName="FM3 Strategy" field="fM3Strategy" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn headerName="AIM Strategy" field="aimStrategy" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="entity" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="position" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="positionStatus" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="securityType" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="maturityDate" valueFormatter={dateFormatter} sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="coupon" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="unitCost" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="priorDayPrice" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn headerName="Last Price" field="lasT_PRICE" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="marketValue" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="dailyInterest" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn field="accrual" sortable={ true } filter={ true }></AgGridColumn>
          <AgGridColumn headerName="UD SPAC STATUS" field="uD_SPAC_STATUS" sortable={ true } filter={ true }></AgGridColumn>
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
