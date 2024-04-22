import React from "react";
import DataTableViewCell from "./DataTableViewCell";

export default function DataTableViewRow({ headerKeys, data, iRow }) {
  return (
    <tr>
      {headerKeys.map(function (headerKey, iCol) {
        const value = data[headerKey];

        return (
          <DataTableViewCell
            key={"data-cell-" + iCol}
            headerKey={headerKey}
            value={value}
          />
        );
      })}
    </tr>
  );
}