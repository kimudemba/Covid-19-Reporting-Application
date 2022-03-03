import React, { useMemo } from "react";
import { useTable, useFilters } from "react-table";
import FrontEndExamData from "./frontExamData";
import FrontEndPatientData from "./frontPatientData";
import { Columns } from "../../columns";
import "../../styles/App.css";
export const ExamBasicTable = () => {
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => FrontEndExamData, []);
  const data2 = useMemo(() => FrontEndPatientData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        data2,
      },
      useFilters
    );

  return (
    <table {...getTableProps()} border="1" style={{ width: "100%" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
