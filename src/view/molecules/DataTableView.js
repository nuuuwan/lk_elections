import { Box } from "@mui/material";
import { Ent, Format, MathX } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";
import { ElectionLink, EntLink, PartyLink } from "../atoms";

function formatCellValue(key, value) {
  if (value === 0) {
    return "-";
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

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return Format.int(value);
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

function formatCellValueWithStyle(key, value, isMaxValue) {
  let color = "black";
  if (Party.isKnownPartyID(key)) {
    if (isMaxValue) {
      const party = new Party(key);
      color = party.color;
    } else {
      color = "#888";
    }
  }
  return <span style={{ color }}>{formatCellValue(key, value)}</span>;
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

export default function DataTableView({ dataList }) {
  const filteredDataList = dataList.filter((data) => data !== null);
  if (filteredDataList.length === 0) {
    return null;
  }
  const headerKeys = getHeaderKeys(filteredDataList).filter(function (key) {
    const values = filteredDataList
      .map((d) => d[key])
      .filter((v) => v !== null && formatCellValue(key, v) !== "-");
    return values.length > 0;
  });

  const firstDataKeys = Object.entries(filteredDataList[0]).filter(function (
    entry
  ) {
    return typeof entry[1] === "number";
  })[0];

  let sortedDataList;
  if (firstDataKeys && firstDataKeys.length > 0) {
    const firstDataKey = firstDataKeys[0];
    sortedDataList = filteredDataList.sort(function (a, b) {
      return (a[firstDataKey] || 0) - (b[firstDataKey] || 0);
    });
  } else {
    sortedDataList = filteredDataList;
  }

  return (
    <Box>
      <table>
        <thead>
          <tr>
            {headerKeys.map((headerKey, iCol) => (
              <th key={"header-" + iCol}>{headerKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDataList.map(function (data, iRow) {
            const maxValue = MathX.max(Object.values(data));
            return (
              <tr key={"data-row-" + iRow}>
                {headerKeys.map(function (headerKey, iCol) {
                  const value = data[headerKey];
                  const isMaxValue = value === maxValue;
                  return (
                    <td key={"data-cell-" + iCol}>
                      {formatCellValueWithStyle(headerKey, value, isMaxValue)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
}
