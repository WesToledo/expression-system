import React from 'react';
import { useStateLink } from '@hookstate/core';
import MUIDataTable from 'mui-datatables';

import CustomToolbar from './CustomToolBar';
import CustomToolbarSelect from './CustomToolbarSelect';
/**/
const DataTable = ({
  options,
  data,
  columns,
  title,
  tooltipEdit,
  tooltipDelete,
  tooltipAdd,
  currentRow,
  hrefAdd,
  setModalDelete
}) => {

  const currentRowSelected = useStateLink(currentRow);

  options = {
    ...options,
    filter: true,
    filterType: 'dropdown',
    responsive: 'stacked',
    rowsPerPage: 10,
    selectableRows: 'single',
    textLabels: {
      body: {
        noMatch: 'Nenhum correspondente encontrado',
        toolTip: 'Ordenar',
        columnHeaderTooltip: column => `Ordenar por ${column.label}`
      },
      pagination: {
        next: 'Próxima Página',
        previous: 'Página Anterior',
        rowsPerPage: 'Linhas por página:',
        displayRows: 'de'
      },
      toolbar: {
        search: 'Pesquisar',
        downloadCsv: 'Download CSV',
        print: 'Imprimir',
        viewColumns: 'Exibir Colunas',
        filterTable: 'Filtrar na Tabela'
      },
      filter: {
        all: 'Tudo',
        title: 'FILTROS',
        reset: 'RESETAR'
      },
      viewColumns: {
        title: 'Exibir Colunas',
        titleAria: 'Mostrar/Esconder Colunas na Tabela'
      },
      selectedRows: {
        text: 'linha selecionada',
        delete: 'Deletar',
        deleteAria: 'Deletar Linha Selecionada'
      }
    },
    customToolbar: () => {
      return <CustomToolbar tooltipAdd={tooltipAdd} hrefAdd={hrefAdd} />;
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => 
    
        <CustomToolbarSelect
          selectedRows={selectedRows}
          displayData={displayData}
          setSelectedRows={setSelectedRows}
          tooltipEdit={tooltipEdit}
          tooltipDelete={tooltipDelete}
          currentRowSelected={currentRowSelected}
          hrefAdd={hrefAdd}
          setModalDelete={setModalDelete}
        />
      
    };

  return (
    <MUIDataTable
      title={title}
      className="remove-box-shadow"
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default DataTable;
