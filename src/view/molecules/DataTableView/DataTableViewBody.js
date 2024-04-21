import React from "react";
import DataTableViewRow from "./DataTableViewRow";

export default function DataTableViewBody({ sortedDataList, headerKeys }) {
  return (
    <tbody>
      {sortedDataList.map(function (data, iRow) {
        return (
          <DataTableViewRow
            key={"data-row-" + iRow}
            iRow={iRow}
            headerKeys={headerKeys}
            data={data}
          />
        );
      })}
    </tbody>
  );
}
