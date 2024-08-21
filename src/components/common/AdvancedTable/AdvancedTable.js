import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Grid, Table, TableHeaderRow, Toolbar, ExportPanel, TableFilterRow, SearchPanel, PagingPanel } from '@devexpress/dx-react-grid-material-ui'
import { SortingState, IntegratedSorting, FilteringState, IntegratedFiltering, SearchState, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid'
import { GridExporter } from '@devexpress/dx-react-grid-export'
import saveAs from 'file-saver'
import { StyledTable } from './AdvancedTable.styles'
import MenuComponent from './MenuComponent'

const ExportToggleButton = () => {
  return <></>
}

const AdvancedTable = ({ reportTitle = 'Search Results', rows, columns, Actions, showExportPanel, showSearchPanel }) => {
  // const [rows, setRows] = useState([])
  const exporterRef = useRef(null)
  let saveCounter = 2

  // useEffect(() => {
  //
  //   const newData = rowsData.map((row) => {
  //     return {
  //       index: row.nEntityId,
  //       sTin: row.sTin,
  //       sPersonFullName: row.tblPerson[0]?.sPersonFullName || row.tblCompany[0].sCompanyName,
  //       nEntityTypeId: row.nEntityTypeId,
  //       sApplicationNumber: row.tblApplications[0].sApplicationNumber,
  //       dtCreationDate: dayjs(row.dtCreationDate).format('MM/DD/YYYY HH:mm:ss'),
  //     }
  //   })
  //   setRows(newData)
  // }, [])

  // target export
  const startExport = useCallback(() => {
    exporterRef.current.exportGrid()
  }, [exporterRef])

  // export function
  const onSave = (workbook) => {
    if (saveCounter % 2 == 0) {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'SearchResults.xlsx')
      })
    }
    saveCounter++
  }

  const CellComponent = ({ ...restProps }) => {
    return <Table.Cell data-label={restProps.column.title} {...restProps} title={restProps.column?.type?.toLowerCase() === 'date' ? '' : restProps.value} />
  }

  return (
    <StyledTable>
      <Grid rows={rows} columns={columns}>
        {/* export */}
        {showExportPanel && <Toolbar />}
        {showExportPanel ? <ExportPanel startExport={startExport} toggleButtonComponent={ExportToggleButton} menuComponent={(props) => <MenuComponent columns={columns} rows={rows} {...props} />} /> : null}

        <PagingState defaultCurrentPage={0} pageSize={10} />
        <IntegratedPaging />

        {/* search input */}
        {showSearchPanel && <SearchState />}

        {/* filter */}
        <FilteringState />
        <IntegratedFiltering />

        {/* sorting */}
        <SortingState defaultSorting={[{ columnName: 'index', direction: 'asc' }]} />
        <IntegratedSorting />

        <Actions for={['actions']} />
        {/* table */}
        <Table cellComponent={CellComponent} />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        {showSearchPanel && <SearchPanel />}

        <PagingPanel />
      </Grid>
      <GridExporter ref={exporterRef} rows={rows} columns={columns} onSave={onSave} />
    </StyledTable>
  )
}

export default AdvancedTable
