import React from "react";
import DataTableViewHead from "./DataTableViewHead";
import DataTableViewBody from "./DataTableViewBody";
import DataTableViewFoot from "./DataTableViewFoot";

export default function DataTableViewTable({
  sortedDataList,
  headerKeys,
  footerData,
  setSortKeyInner,
}) {
  return (
    <table>
      <DataTableViewHead
        headerKeys={headerKeys}
        setSortKeyInner={setSortKeyInner}
      />
      <DataTableViewBody
        sortedDataList={sortedDataList}
        headerKeys={headerKeys}
      />
      <DataTableViewFoot headerKeys={headerKeys} footerData={footerData} />
    </table>
  );
}
