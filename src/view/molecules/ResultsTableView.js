import { DataTableView } from "../molecules";
import { Header, SectionBox, ElectionLink } from "../atoms";

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
    let d = { Region: ent };
    for (let party of majorParties) {
      d[party] = result.partyToVotes.partyToPVotes[party];
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
