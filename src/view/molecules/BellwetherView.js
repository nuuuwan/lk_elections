import { Header, ElectionLink, SectionBox, PartyLink } from "../atoms";

function getBellwetherStats(election, ent) {
  const resultsForEnt = election.getResults(ent.id);
  if (!resultsForEnt) {
    return null;
  }
  const resultsForLK = election.getResults("LK");
  const winningPartyEnt = resultsForEnt.partyToVotes.winningParty;
  const winningPartyLK = resultsForLK.partyToVotes.winningParty;

  const isMatch = winningPartyEnt === winningPartyLK;
  const l1Error = resultsForLK.partyToVotes.getL1Error(
    resultsForEnt.partyToVotes
  );
  return { winningPartyEnt, winningPartyLK, l1Error, isMatch };
}

function renderPercent(l1Error) {
  let l1ErrorStr = Number(l1Error).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  let l1ErrorColor = "#ccc";
  if (l1Error < 0.02) {
    l1ErrorColor = "#000";
  } else if (l1Error < 0.1) {
    l1ErrorColor = "#888";
  }
  return (
    <td className="td-number" style={{ color: l1ErrorColor }}>
      {l1ErrorStr}
    </td>
  );
}

function BellwetherViewForElection({
  election,
  winningPartyEnt,
  winningPartyLK,
  l1Error,
  isMatch,
}) {
  return (
    <tr>
      <td>
        <ElectionLink election={election} />
      </td>
      <td>
        <PartyLink partyID={winningPartyEnt} />
      </td>
      <td>
        <PartyLink partyID={winningPartyLK} />
      </td>

      <td>
        <PartyLink partyID={winningPartyLK}>{isMatch ? "✓" : " "}</PartyLink>
      </td>
      {renderPercent(l1Error)}
    </tr>
  );
}

export default function BellwetherView({ elections, ent }) {
  let n = 0,
    nMatch = 0;
  let errorSum = 0;

  return (
    <SectionBox>
      <Header level={2}>Bellwether Analysis</Header>
      <table>
        <thead>
          <tr>
            <th>Election</th>
            <th>{ent.name}</th>
            <th>Sri Lanka</th>
            <th></th>
            <th>Mean Diff.</th>
          </tr>
        </thead>
        <tbody>
          {elections.map(function (election, iElection) {
            const stats = getBellwetherStats(election, ent);
            if (!stats) {
              return null;
            }
            const { winningPartyEnt, winningPartyLK, l1Error, isMatch } = stats;
            n += 1;
            if (isMatch) {
              nMatch += 1;
            }
            errorSum += l1Error;

            return (
              <BellwetherViewForElection
                key={"election-" + iElection}
                election={election}
                winningPartyEnt={winningPartyEnt}
                winningPartyLK={winningPartyLK}
                l1Error={l1Error}
                isMatch={isMatch}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3"></td>

            <td className="td-number">
              {nMatch}/{n}
            </td>
            {renderPercent(errorSum / n)}
          </tr>
        </tfoot>
      </table>
    </SectionBox>
  );
}
