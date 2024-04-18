import { Box } from "@mui/material";
import { Ent, Format, MathX } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";
import { ElectionLink, EntLink, PartyLink } from "../atoms";


function formatCellValueObject(key, value) {
  if (value instanceof Election) {
    return <ElectionLink election={value} />;
  }
  if (value instanceof Ent) {
    return <EntLink ent={value} />;
  }
  if (value instanceof Party) {
    return <PartyLink partyID={value.id} />;
  }
  return null;
}

function formatCellValueNumber(key, value) {
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

function formatCellValue(key, value) { 
  if (!value) {
    return "";
  }

  return formatCellValueObject(key, value) || formatCellValueNumber(key, value);

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

function DataTableViewHeaderRow({ headerKeys }) {
  return (
    <tr>
      {headerKeys.map((headerKey, iCol) => (
        <th key={"header-" + iCol}>{headerKey}</th>
      ))}
    </tr>
  );
}

function DataTableViewCell({ headerKey, value, isMaxValue }) {
  return <td>{formatCellValueWithStyle(headerKey, value, isMaxValue)}</td>;
}

function DataTableViewRow({ headerKeys, data, maxValue }) {
  return (
    <tr>
      {headerKeys.map(function (headerKey, iCol) {
        const value = data[headerKey];
        const isMaxValue = value === maxValue;

        return (
          <DataTableViewCell
            key={"data-cell-" + iCol}
            headerKey={headerKey}
            value={value}
            isMaxValue={isMaxValue}
          />
        );
      })}
    </tr>
  );
}

export default function DataTableView({ dataList }) {
  const filteredDataList = dataList.filter((data) => data !== null);
  if (filteredDataList.length === 0) {
    return null;
  }
  const headerKeys = getHeaderKeys(filteredDataList);

  return (
    <Box>
      <table>
        <thead>
          <DataTableViewHeaderRow headerKeys={headerKeys} />
        </thead>
        <tbody>
          {filteredDataList.map(function (data, iRow) {
            const maxValue = MathX.max(Object.values(data));
            return (
              <DataTableViewRow
                key={"data-row-" + iRow}
                headerKeys={headerKeys}
                data={data}
                maxValue={maxValue}
              />
            );
          })}
        </tbody>
      </table>
    </Box>
  );
}
