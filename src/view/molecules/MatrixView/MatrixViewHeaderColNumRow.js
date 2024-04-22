import HiddenHeaderCell from "./HiddenHeaderCell";
import MatrixViewStyle from "./MatrixViewStyle";
function numberToLetter(number) {
  return String.fromCharCode(64 + number);
}

export default function MatrixViewHeaderColNumRow({ idx, showExpanded }) {
  let colEntriesList = Object.keys(Object.values(idx)[0]);
  if (
    !showExpanded &&
    colEntriesList.length > MatrixViewStyle.DEFAULT_DISPLAY_MAX_ROWS
  ) {
    colEntriesList = colEntriesList.slice(
      0,
      MatrixViewStyle.DEFAULT_DISPLAY_MAX_ROWS
    );
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
