import React, { useState } from "react";
import { Comparator } from "../../../nonview/core";
import { Renderer } from "../../molecules";

import DataTableViewTable from "./DataTableViewTable";

function getHeaderKeys(dataList) {
  const headerKeys = dataList.reduce(function (headerKeys, data) {
    return Object.keys(data).reduce(function (headerKeys, key) {
      if (!headerKeys.includes(key)) {
        headerKeys.push(key);
      }
      return headerKeys;
    }, headerKeys);
  }, []);

  // Filter out Null Columns
  const colFilteredHeaderKeys = headerKeys.filter(function (headerKey) {
    const colValues = dataList
      .map(function (data) {
        if (!data) {
          return null;
        }
        const value = data[headerKey];
        const colValue = Renderer.formatCellValue(value);
        return colValue;
      })
      .filter((colValue) => !!colValue && colValue !== "-" && colValue !== "~");

    return colValues.length > 0;
  });

  return colFilteredHeaderKeys;
}

function getSortedDataList(dataList, sortKey, sortReverse) {
  const filteredDataList = dataList.filter((data) => data !== null);
  if (filteredDataList.length === 0) {
    return null;
  }

  if (!sortKey) {
    return filteredDataList;
  }
  return filteredDataList.sort(function (a, b) {
    return Comparator.cmp(b[sortKey], a[sortKey], sortReverse);
  });
}

export default function DataTableViewLazy({ dataList, footerData }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortReverse, setSortReverse] = useState(true);

  const sortedDataList = getSortedDataList(dataList, sortKey, sortReverse);
  if (!sortedDataList) {
    return null;
  }

  const setSortKeyInner = function (key) {
    if (sortKey === key) {
      setSortReverse(!sortReverse);
    } else {
      setSortKey(key);
      setSortReverse(true);
    }
  };

  const headerKeys = getHeaderKeys(sortedDataList);

  return (
    <DataTableViewTable
      {...{ sortedDataList, headerKeys, footerData, setSortKeyInner }}
    />
  );
}
