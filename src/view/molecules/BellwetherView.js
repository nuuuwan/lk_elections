import { Box } from "@mui/material";
import { POLITICAL_PARTY_TO_COLOR } from "../../nonview/constants";
import { Header, ElectionLink } from "../atoms";

import "./BellwetherView.css";

function BellwetherViewForElection({ election, ent }) {
  const resultsForEnt = election.getResults(ent.id);
  if (!resultsForEnt) {
    return null;
  }
  const resultsForLK = election.getResults("LK");
  const winningPartyEnt = resultsForEnt.partyToVotes.winningParty;
  const winningPartyLK = resultsForLK.partyToVotes.winningParty;
  const colorEnt = POLITICAL_PARTY_TO_COLOR[winningPartyEnt];
  const colorLK = POLITICAL_PARTY_TO_COLOR[winningPartyLK];
  const isMatch = winningPartyEnt === winningPartyLK;
  const l1Error = resultsForLK.partyToVotes.getL1Error(
    resultsForEnt.partyToVotes
  );

  let l1ErrorStr = Number(l1Error).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  let l1ErrorColor = "red";
  if (l1Error < 0.02) {
    l1ErrorColor = "green";
  } else if (l1Error < 0.1) {
    l1ErrorColor = "orange";
  }
  return (
    <tr>
      <td>
        <ElectionLink election={election} />
      </td>
      <td style={{ color: colorEnt }}>{winningPartyEnt}</td>
      <td style={{ color: colorLK }}>{winningPartyLK}</td>
      <td style={{ color: colorLK }}>{isMatch ? "✓" : ""}</td>
      <td className="td-number" style={{ color: l1ErrorColor }}>
        {l1ErrorStr}
      </td>
    </tr>
  );
}

export default function BellwetherView({ elections, ent }) {
  return (
    <Box>
      <Header level={2}>Bellwether Analysis</Header>
      <table>
        <thead>
          <tr>
            <th>Election</th>
            <th>{ent.name}</th>
            <th>Sri Lanka</th>
            <th></th>
            <th>Error (L1)</th>
          </tr>
        </thead>
        <tbody>
          {elections.map(function (election, iElection) {
            return (
              <BellwetherViewForElection
                key={"election-" + iElection}
                election={election}
                ent={ent}
              />
            );
          })}
        </tbody>
      </table>
    </Box>
  );
}
