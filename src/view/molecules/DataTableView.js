import { Box } from "@mui/material";
import { Ent, Format } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";
import { ElectionLink, EntLink, PartyLink } from "../atoms";

function formatCell(key, value) {
    if (value === 0) {
        return '-';
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
    return Format.percent(value);
  }

  if (typeof value === "boolean") {
    return value ? "✔️" : "";
  }
 
  return value;
}

function getHeaderKeys(dataList) {
return dataList.reduce(
    function(headerKeys, data) {
        return Object.keys(data).reduce(
            function(headerKeys, key) {
                if (!headerKeys.includes(key)) {
                    headerKeys.push(key);
                }
                return headerKeys;
            },
            headerKeys,
        );
    },
    [], 
  );
}

export default function DataTableView({ dataList }) {
    
  dataList = dataList.filter((data) => data !== null);
  if (dataList.length === 0) {
    return null;
  }
  const headerKeys = getHeaderKeys(dataList);

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
          {dataList.map((data, iRow) => (
            <tr key={'data-row-' + iRow}>
              {headerKeys.map((headerKey, iCol) => (
                <td key={'data-cell-'+iCol}>{formatCell(headerKey, data[headerKey])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
