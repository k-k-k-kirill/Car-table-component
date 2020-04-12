import React from 'react'
import dataRaw from '../../data/CarData.json'
import arrow from '../../assets/down.svg'
import Pagination from './Pagination'

import {
    useTable,
    useFilters,
    useSortBy,
    usePagination
  } from 'react-table'

//Styles
import './Table.scss'

const TableMobile = () => {

    // Define a default UI for filtering
    const DefaultColumnFilter = ({
        column: { filterValue, setFilter, Header },
    }) => {    
        return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
            setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Enter ${Header.toLowerCase()}...`}
        />
        )
    }

    const columns = React.useMemo(
    () => [
            {
              Header: 'Model',
              accessor: 'model', // accessor is the "key" in the data
              Filter: DefaultColumnFilter
            },
            {
              Header: 'Make',
              accessor: 'make',
              Filter: DefaultColumnFilter
            },
            {
              Header: 'Price',
              accessor: 'price',
              disableFilters: true
            },
            {
              Header: 'Mileage',
              accessor: 'mileage',
              disableFilters: true
            },
            {
              Header: 'Year',
              accessor: 'year',
              disableFilters: true
            },
      ],
    []
    )

    const data = React.useMemo(() => dataRaw.map((row) => {
        return {
            model: row.model,
            make: row.make,
            price: row.price,
            mileage: row.mileage,
            year: row.year
        }
    }),
    [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageCount,
        gotoPage,
    } = useTable({columns, data, initialState: { pageSize: 9 }}, useFilters, useSortBy, usePagination )
    
    return (
        <>
        <div className="table-responsive-sm car-table__container car-table__container--mobile">
            <table className="table table-striped table-hover" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps()}
                        >   
                            <div className="car-table__header">
                                <span className="car-table__header" {...column.getSortByToggleProps()}>
                                    {column.render('Header')}
                                    {column.isSorted
                                        ? column.isSortedDesc
                                        ? <img className="arrow arrow--up" src={arrow} alt="Sort" />
                                        : <img className="arrow" src={arrow} alt="Sort" />
                                    : ''} 
                                </span>
                                <div className="filter__container">{column.canFilter ? column.render('Filter') : null}</div>
                            </div>
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                            <td
                                {...cell.getCellProps()}
                            >
                                {cell.render('Cell')}
                            </td>
                            )
                        })}
                        </tr>
                    )
                    })}
                </tbody>
            </table>

        </div>
        <div>
            <Pagination pageCount={pageCount} clicked={gotoPage} />
        </div>
        </>
    )
}

export default TableMobile