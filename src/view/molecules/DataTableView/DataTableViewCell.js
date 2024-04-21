import { Renderer } from "../../molecules";

export default function DataTableViewCell({ headerKey, value }) {
  return <td>{Renderer.formatCellValue(value)}</td>;
}
