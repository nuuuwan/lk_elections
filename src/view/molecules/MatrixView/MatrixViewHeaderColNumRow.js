import HiddenHeaderCell from "./HiddenHeaderCell";
import { DataTable } from "../../../nonview/core";
function numberToLetter(number) {
  return String.fromCharCode(64 + number);
}

export default function MatrixViewHeaderColNumRow({ idx, showExpanded }) {
  let colEntriesList = Object.keys(Object.values(idx)[0]);
  if (!showExpanded && colEntriesList.length > DataTable.MAX_COLS) {
    colEntriesList = colEntriesList.slice(0, DataTable.MAX_COLS);
  }
  return (
    <tr>
      <HiddenHeaderCell />
      <HiddenHeaderCell />

      {colEntriesList.map(function (xScalar, iX) {
        return (
          <th key={"header-" + iX} className="td-row-num">
            {numberToLetter(iX + 1)}
          </th>
        );
      })}
    </tr>
  );
}
