import { Renderer } from "..";
export default function MatrixViewBodyCell({ z }) {
  return <td>{Renderer.formatCellValue(z)}</td>;
}
