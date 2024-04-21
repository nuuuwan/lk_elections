import DataTableViewFooterRow from "./DataTableViewFooterRow";

export default function DataTableViewFoot({ headerKeys, footerData }) {
  return footerData ? (
    <tfoot>
      <DataTableViewFooterRow headerKeys={headerKeys} footerData={footerData} />
    </tfoot>
  ) : null;
}
