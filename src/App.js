import React, {useEffect, useState} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-enterprise';
import {formatNumber, dateFormatter} from './utls/hook.js';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './main.css';


function App() {
 

  const [tableFontSize, setTableFontSize] = useState('14px');

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  useEffect(()=>{
    getData();
  });

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onCellValueChanged = (params) => {
    var changedData = [params.data];
    params.api.applyTransaction({ update: changedData });
  };

  const getData = () => {
      fetch('https://aggridapi.azurewebsites.net/position/get')
      //fetch('https://localhost:7079/position/get')
        .then(result => result.json())
        .then(rowData => {
          setRowData(rowData);
      });
  }

  return (
    <div style={{width: '100%', height: '100%'}} className='container'>
      <h1 className='text-center'>AG Grid UX table</h1>
      <p className='text-center'><strong>Dragable columns: AIM Strategy, Entity</strong></p>
      <div  id="myGrid" className="ag-theme-alpine-dark" style={{width:'100%',height: "650px"}}>
      <AgGridReact
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: 'agTextColumnFilter',
            floatingFilter: true,
          }}
          defaultColGroupDef={{ marryChildren: true }}
          autoGroupColumnDef={{ minWidth: 100 }}
          autoGroupColumnDef={{ minWidth: 200 }}
          suppressDragLeaveHidesColumns={true}
          suppressMakeColumnVisibleAfterUnGroup={true}
          rowGroupPanelShow={'always'}
          groupIncludeFooter={true}
          groupIncludeTotalFooter={true}
          columnTypes={{
            quarterFigure: {
              editable: true,
              cellClass: 'number-cell',
              aggFunc: 'sum',
              valueFormatter: formatNumber,
              valueParser: function numberParser(params) {
                return Number(params.newValue);
              },
            },
          }}
          columnTypes={{
            numberColumn: {
              width: 130,
              filter: 'agNumberColumnFilter',
            },
            dateColumn: {
              filter: 'agDateColumnFilter',
              filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                  const dateParts = cellValue.split('/');
                  const day = Number(dateParts[0]);
                  const month = Number(dateParts[1]) - 1;
                  const year = Number(dateParts[2]);
                  const cellDate = new Date(year, month, day);
                  if (cellDate < filterLocalDateAtMidnight) {
                    return -1;
                  } else if (cellDate > filterLocalDateAtMidnight) {
                    return 1;
                  } else {
                    return 0;
                  }
                },
              },
            },
          }}                    
          pagination={true}
          rowData={rowData}
          suppressAggFuncInHeader={true}
          animateRows={true}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
          > 
          <AgGridColumn
            headerName="PnL Total"
            type="totalColumn"
            aggFunc="sum"
            valueGetter={"getValue('mtdPnL') + getValue('qtdPnL') + getValue('ytdPnL') + getValue('ltdPnL')"} 
          />
          <AgGridColumn headerName="MTD PnL" field="mtdPnL" aggFunc="sum"></AgGridColumn>
          <AgGridColumn headerName="QTD PnL" field="qtdPnL" aggFunc="sum"></AgGridColumn>
          <AgGridColumn headerName="YTD PnL" field="ytdPnL" aggFunc="sum"></AgGridColumn>
          <AgGridColumn headerName="LTD PnL" field="ltdPnL" aggFunc="sum"></AgGridColumn>          
          <AgGridColumn field="ticker" ></AgGridColumn>
          <AgGridColumn field="description" ></AgGridColumn>
          <AgGridColumn field="issuer" ></AgGridColumn>
          <AgGridColumn headerName="FM3 Strategy" field="fM3Strategy"></AgGridColumn>
          <AgGridColumn headerName="AIM Strategy" field="aimStrategy" enableRowGroup={true}></AgGridColumn>
          <AgGridColumn field="entity" enableRowGroup={true}></AgGridColumn>
          <AgGridColumn field="position" ></AgGridColumn>
          <AgGridColumn field="positionStatus" ></AgGridColumn>
          <AgGridColumn field="securityType" ></AgGridColumn>
          <AgGridColumn field="maturityDate" valueFormatter={dateFormatter} type="dateColumn" ></AgGridColumn>
          <AgGridColumn field="coupon" ></AgGridColumn>
          <AgGridColumn field="unitCost" ></AgGridColumn>
          <AgGridColumn field="priorDayPrice" ></AgGridColumn>
          <AgGridColumn headerName="Last Price" field="lasT_PRICE" ></AgGridColumn>
          <AgGridColumn field="marketValue" ></AgGridColumn>
          <AgGridColumn field="dailyInterest" ></AgGridColumn>
          <AgGridColumn field="accrual" ></AgGridColumn>
          <AgGridColumn headerName="UD SPAC STATUS" field="uD_SPAC_STATUS" ></AgGridColumn>
          <AgGridColumn field="dailyPnL"></AgGridColumn>         
      </AgGridReact>
  </div>      
    </div>
  );
}

export default App;
