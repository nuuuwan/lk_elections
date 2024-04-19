import { Fraction } from "../../nonview/base";
import { DataTableView } from "../molecules";
import { Header, SectionBox, ElectionLink } from "../atoms";
import { Party } from "../../nonview/core";

function getMajorParties(election) {
  const result = election.getResults("LK");
  if (!result) {
    return null;
  }
  const partyToPVotes = result.partyToVotes.partyToPVotes;
  return Object.keys(partyToPVotes);
}

function getDataList(election, ents) {
  const majorParties = getMajorParties(election);

  return ents.map(function (ent) {
    const result = election.getResults(ent.id);
    if (!result) {
      return null;
    }
    const pLimit = ent.id === "LK" ? 0.0025 : 0.025;
    let d = { Region: ent };
    const winningParty = result.partyToVotes.winningParty;
    let pOther = 0;
    for (let party of majorParties) {
      const p = result.partyToVotes.partyToPVotes[party];
      if (p < pLimit) {
        pOther += p;
        d[party] = "~";
      } else {
        d[party] = new Fraction(
          result.partyToVotes.partyToVotes[party],
          result.partyToVotes.totalVotes,
          party === winningParty ? new Party(winningParty).color : "#888"
        );
      }
    }

    if (pOther > 0) {
      const nOther = Math.round(pOther * result.partyToVotes.totalVotes);
      d["Other"] = new Fraction(nOther, result.partyToVotes.totalVotes, "#888");
    }

    return d;
  });
}

export default function ResultsTableView({ election, ents }) {
  const dataList = getDataList(election, ents);

  return (
    <SectionBox>
      <Header level={3}>
        <ElectionLink election={election} />
      </Header>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
