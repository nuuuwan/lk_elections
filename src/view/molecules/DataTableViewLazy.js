import React, { useState } from "react";
import { Box } from "@mui/material";
import { Ent, Format, Fraction } from "../../nonview/base";
import { Election, Party, PartyGroup } from "../../nonview/core";
import {
  ElectionLink,
  EntLink,
  FractionView,
  PartyGroupLink,
  PartyLink,
} from "../atoms";

function compare(a, b) {
  if (!a && !b) {
    return 0;
  }
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  if (typeof a === "number") {
    return a - b;
  }
  if (typeof a === "boolean") {
    return (a ? 1 : 0) - (b ? 1 : 0);
  }
  return a.localeCompare(b);
}

function formatCellValueObject(key, value) {
  if (Party.isKnownPartyID(value)) {
    value = new Party(value);
  }

  if (PartyGroup.isKnownPartyGroupID(value)) {
    value = PartyGroup.fromID(value);
  }

  if (value instanceof Election) {
    return <ElectionLink election={value} />;
  }
  if (value instanceof Ent) {
    return <EntLink ent={value} />;
  }
  if (value instanceof Party) {
    return <PartyLink partyID={value.id} />;
  }

  if (value instanceof PartyGroup) {
    return <PartyGroupLink partyGroupID={value.id} />;
  }

  if (value instanceof Fraction) {
    return <FractionView fraction={value} />;
  }

  return null;
}

function formatCellValueNumber(key, value) {
  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return Format.intHumanize(value);
    }
    if (value < 0.005) {
      return "-";
    }
    return Format.percentWithStyle(value);
  }

  if (typeof value === "boolean") {
    return value ? "✔️" : "";
  }

  return value;
}

function formatCellValue(key, value) {
  if (!value) {
    return "-";
  }

  return formatCellValueObject(key, value) || formatCellValueNumber(key, value);
}

function getHeaderKeys(dataList) {
  return dataList.reduce(function (headerKeys, data) {
    return Object.keys(data).reduce(function (headerKeys, key) {
      if (!headerKeys.includes(key)) {
        headerKeys.push(key);
      }
      return headerKeys;
    }, headerKeys);
  }, []);
}

function DataTableViewHeaderRow({ headerKeys, setSortKeyInner }) {
  return (
    <tr>
      <td className="td-row-num"></td>
      {headerKeys.map(function (headerKey, iCol) {
        const onClickSort = function () {
          setSortKeyInner(headerKey);
        };
        return (
          <th key={"header-" + iCol}>
            {formatCellValue(headerKey, headerKey)}
            <div onClick={onClickSort} className="sorter">
              ▴
            </div>
          </th>
        );
      })}
    </tr>
  );
}

function DataTableViewCell({ headerKey, value }) {
  return <td>{formatCellValue(headerKey, value)}</td>;
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
          {formatCellValue(headerKey, footerData[headerKey])}
        </th>
      ))}
    </tr>
  );
}

export default function DataTableViewLazy({ dataList, footerData, sortKey }) {
  const [sortKeyInner, setSortKeyInner] = useState(sortKey);

  // Filter Null
  const filteredDataList = dataList.filter((data) => data !== null);
  if (filteredDataList.length === 0) {
    return null;
  }

  // Get Headers
  const headerKeys = getHeaderKeys(filteredDataList);

  // Sort
  let sortedDataList;
  if (sortKeyInner) {
    sortedDataList = filteredDataList.sort(function (a, b) {
      return compare(b[sortKeyInner], a[sortKeyInner]);
    });
  } else {
    sortedDataList = filteredDataList;
  }

  // Filter out Null Columns
  const colFilteredHeaderKeys = headerKeys.filter(function (headerKey) {
    const colValues = dataList
      .map(function (data) {
        if (!data) {
          return null;
        }
        const value = data[headerKey];
        const colValue = formatCellValue(headerKey, value);
        return colValue;
      })
      .filter((colValue) => !!colValue && colValue !== "-");
    return colValues.length > 0;
  });

  return (
    <Box>
      <table>
        <thead>
          <DataTableViewHeaderRow
            headerKeys={colFilteredHeaderKeys}
            setSortKeyInner={setSortKeyInner}
          />
        </thead>
        <tbody>
          {sortedDataList.map(function (data, iRow) {
            return (
              <DataTableViewRow
                key={"data-row-" + iRow}
                iRow={iRow}
                headerKeys={colFilteredHeaderKeys}
                data={data}
              />
            );
          })}
        </tbody>
        {footerData ? (
          <tfoot>
            <DataTableViewFooterRow
              headerKeys={colFilteredHeaderKeys}
              footerData={footerData}
            />
          </tfoot>
        ) : null}
      </table>
    </Box>
  );
}
