import React from "react";
import DataTableViewRow from "./DataTableViewRow";
import DataTableViewStyle from "./DataTableViewStyle";

export default function DataTableViewBody({
  sortedDataList,
  headerKeys,
  showExpanded,
}) {
  if (!showExpanded) {
    sortedDataList = sortedDataList.slice(
      0,
      DataTableViewStyle.DEFAULT_DISPLAY_MAX_ROWS
    );
  }
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
      {!showExpanded ? (
        <tr>
          <td className="no-expand-info">...</td>
        </tr>
      ) : null}
    </tbody>
  );
}
