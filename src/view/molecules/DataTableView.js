import { Box } from "@mui/material";
import { Ent, Format } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";
import { ElectionLink, EntLink, PartyLink } from "../atoms";

function formatCell(key, value) {
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

  return value;
}

export default function DataTableView({ dataList }) {
  dataList = dataList.filter((data) => data !== null);
  const headerKeys = Object.keys(dataList[0]);
  return (
    <Box>
      <table>
        <thead>
          <tr>
            {headerKeys.map((headerKey) => (
              <th>{headerKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataList.map((data, index) => (
            <tr key={index}>
              {headerKeys.map((headerKey) => (
                <td>{formatCell(headerKey, data[headerKey])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
