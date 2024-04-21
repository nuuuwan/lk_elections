import React from "react";
import DataTableViewHeaderRow from "./DataTableViewHeaderRow";

export default function DataTableViewHead({ headerKeys, setSortKeyInner }) {
  return (
    <thead>
      <DataTableViewHeaderRow
        headerKeys={headerKeys}
        setSortKey={setSortKeyInner}
      />
    </thead>
  );
}
