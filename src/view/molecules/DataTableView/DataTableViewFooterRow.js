import { Renderer } from "../../molecules";

export default function DataTableViewFooterRow({ headerKeys, footerData }) {
  return (
    <tr>
      {headerKeys.map((headerKey, iCol) => (
        <th key={"footer-" + iCol} className="th-footer">
          {Renderer.formatCellValue(footerData[headerKey])}
        </th>
      ))}
    </tr>
  );
}
