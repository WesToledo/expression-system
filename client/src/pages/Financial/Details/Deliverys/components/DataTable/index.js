import React, { useCallback, useRef } from "react";
import MUIDataTable from "mui-datatables";

import CustomToolbarSelect from "./CustomToolbarSelect";

import PayModal from "~/pages/Financial/Details/Deliverys/PayModal";
/**/
const DataTable = ({ options, data, columns, title }) => {
  const modalRef = useRef(null);

  const handleOpenModal = useCallback((selectedRowsData) => {
    modalRef.current.handleClickOpen(selectedRowsData);
  }, []);

  options = {
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    rowsPerPage: 10,
    selectableRows: "single",
    textLabels: {
      body: {
        noMatch: "Nenhum correspondente encontrado",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Próxima Página",
        previous: "Página Anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Pesquisar",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Exibir Colunas",
        filterTable: "Filtrar na Tabela",
      },
      filter: {
        all: "Tudo",
        title: "FILTROS",
        reset: "RESETAR",
      },
      viewColumns: {
        title: "Exibir Colunas",
        titleAria: "Mostrar/Esconder Colunas na Tabela",
      },
      selectedRows: {
        text: "entrega(s) selecionada(s)",
        delete: "Deletar",
        deleteAria: "Deletar Linha Selecionada",
      },
    },
    isRowSelectable: (dataIndex) => {
      return !data[dataIndex].paid;
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      const selectedRowsData = selectedRows.data.map((row) => {
        return data[row.dataIndex];
      });

      return (
        <CustomToolbarSelect
          selectedRows={selectedRows}
          displayData={displayData}
          setSelectedRows={setSelectedRows}
          selectedRowsData={selectedRowsData}
          handleOpenModal={handleOpenModal}
        />
      );
    },
    ...options,
  };

  return (
    <>
      <PayModal ref={modalRef}  />

      <MUIDataTable
        title={title}
        className="remove-box-shadow"
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default DataTable;
