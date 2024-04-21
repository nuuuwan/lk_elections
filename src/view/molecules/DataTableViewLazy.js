import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import { Comparator } from "../../nonview/core";
import { Renderer } from "../molecules";

function DataTableViewHeaderRow({ headerKeys, setSortKey }) {
  return (
    <tr>
      <td className="td-row-num"></td>
      {headerKeys.map(function (headerKey, iCol) {
        const onClickSort = function () {
          setSortKey(headerKey);
        };
        return (
          <th key={"header-" + iCol}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={onClickSort}>
                <SwapVerticalCircleIcon sx={{ fontSize: "80%" }} />
              </IconButton>
              {Renderer.formatCellValue(headerKey)}
            </Box>
          </th>
        );
      })}
    </tr>
  );
}

function DataTableViewCell({ headerKey, value }) {
  return <td>{Renderer.formatCellValue(value)}</td>;
}

function DataTableViewRow({ headerKeys, data, iRow }) {
  return (
    <tr>
      <td className="td-row-num">{iRow + 1}</td>
      {headerKeys.map(function (headerKey, iCol) {
        const value = data[headerKey];

        return (
          <DataTableViewCell
            key={"data-cell-" + iCol}
            headerKey={headerKey}
            value={value}
          />
        );
      })}
    </tr>
  );
}

function DataTableViewFooterRow({ headerKeys, footerData }) {
  return (
    <tr>
      <td className="td-row-num"></td>
      {headerKeys.map((headerKey, iCol) => (
        <th key={"footer-" + iCol} className="th-footer">
          {Renderer.formatCellValue(footerData[headerKey])}
        </th>
      ))}
    </tr>
  );
}

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

function DataTableViewHead({ headerKeys, setSortKeyInner }) {
  return (
    <thead>
      <DataTableViewHeaderRow
        headerKeys={headerKeys}
        setSortKey={setSortKeyInner}
      />
    </thead>
  );
}

function DataTableViewBody({ sortedDataList, headerKeys }) {
  return (
    <tbody>
      {sortedDataList.map(function (data, iRow) {
        return (
          <DataTableViewRow
            key={"data-row-" + iRow}
            iRow={iRow}
            headerKeys={headerKeys}
            data={data}
          />
        );
      })}
    </tbody>
  );
}

function DataTableViewFoot({ headerKeys, footerData }) {
  return footerData ? (
    <tfoot>
      <DataTableViewFooterRow headerKeys={headerKeys} footerData={footerData} />
    </tfoot>
  ) : null;
}

function DataTableViewTable({
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
