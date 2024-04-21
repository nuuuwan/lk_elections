import HiddenHeaderCell from "./HiddenHeaderCell";
function numberToLetter(number) {
  return String.fromCharCode(64 + number);
}

export default function MatrixViewColNumHeaderRow({ idx }) {
  return (
    <tr>
      <HiddenHeaderCell />
      <HiddenHeaderCell />

      {Object.keys(Object.values(idx)[0]).map(function (xScalar, iX) {
        return (
          <th key={"header-" + iX} className="td-row-num">
            {numberToLetter(iX + 1)}
          </th>
        );
      })}
    </tr>
  );
}
