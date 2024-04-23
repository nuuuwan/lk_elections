import { ElectionLink, Essay, PartyLink, SectionBox } from "../atoms";
import { DataTableView } from ".";
import { Format, Fraction } from "../../nonview/base";
import { Box } from "@mui/material";

function getDataList(party, elections) {
  return elections
    .sort()
    .reverse()
    .map(function (election) {
      const resultsForLK = election.getResults("LK");
      if (!resultsForLK) {
        return null;
      }
      const partyToVotes = resultsForLK.partyToVotes;
      const votes = partyToVotes.partyToVotes[party.id];
      if (!votes) {
        return null;
      }
      const pVotes = partyToVotes.partyToPVotes[party.id];

      let position =
        Object.keys(partyToVotes.partyToVotes).indexOf(party.id) + 1;
      if (position === 1) {
        position = "✔️";
      }

      const fraction = new Fraction(votes, Math.round(votes / pVotes, 0));

      return {
        Election: election,
        Position: position,
        Votes: fraction,
      };
    })
    .filter((x) => x);
}

function getDescription(party, elections, dataList) {
  const nAll = elections.length;
  const n = dataList.length;
  const best = dataList.sort((a, b) => b.fraction.p - a.fraction.p)[0];
  return (
    <Essay>
      <>
        The <PartyLink partyID={party.id} longName={true} /> has participated in{" "}
        {n} of the last {nAll} elections.
      </>
      <>
        Its best showing was in the <ElectionLink election={best.Election} />{" "}
        Election, when it got {Format.percent(best.Votes.p)} of the vote, and
        came {Format.position(best.Position)}.
      </>
    </Essay>
  );
}

export default function PartyElectoralSummaryView({ party, elections }) {
  const dataList = getDataList(party, elections);
  const description = getDescription(party, elections, dataList);
  return (
    <SectionBox title="Electoral Summary" description={description}>
      <DataTableView dataList={dataList} />
    </SectionBox>
  );
}
