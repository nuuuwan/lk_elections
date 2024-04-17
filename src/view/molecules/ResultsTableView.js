import { Header, SectionBox } from "../atoms";
import {POLITICAL_PARTY_TO_COLOR} from "../../nonview/constants";
import {LIGHT_COLORS} from "../../nonview/constants/POLITICAL_PARTY_TO_COLOR";
function ResultsTableViewRowForEnt({election, ent, majorParties}) {
  const result = election.getResults(ent.id);
  if (!result) {
    return null;
  }
  const partyToPVotes = result.partyToVotes.partyToPVotes;
  const pOther = Object.entries(partyToPVotes).filter(
    function([party, pVotes]) {
      return !majorParties.includes(party);
    }
  ).reduce(
    function(sum, [party, pVotes]) {
      return sum + pVotes;
    },
    0
  );

  const winningParty = result.partyToVotes.winningParty;
  

  return (
    <tr>
      <td>
        {ent.name}
      </td>
      {majorParties.map(
        function(party, iParty) {
          const isWinner = party === winningParty;
          const color = POLITICAL_PARTY_TO_COLOR[party];
          const background = isWinner ? color : "white";
          const foreground = LIGHT_COLORS.includes(background) ? "black" : "white";
          return (
            <td key={'cell-'+iParty} className="td-number" style={{background, color:foreground, borderRadius: 6}}>
              {partyToPVotes[party].toLocaleString(undefined, {style: "percent"})}
            </td>
          )
        }
      )}
      <td  className="td-number">
              {pOther.toLocaleString(undefined, {style: "percent"})}
            </td>
    </tr>
  )
}

export default function ResultsTableView({ election, ents }) {

  const sortEnt = ents[ents.length  - 1];
  const sortResults = election.getResults(sortEnt.id);
  if (!sortResults) {
    return null;
  }
  
  const allMajorParties = ents.reduce(

    function(allMajorParties, ent) {
      const result = election.getResults(ent.id);
      if (result === null) {
        return allMajorParties;
      }
      const sortedMajor = result.partyToVotes.sortedMajor;
      const majorParties = Object.keys(sortedMajor).filter(party => party !== "Other");
      return [].concat(allMajorParties, majorParties);
    },
    [],
  );
  const uniqueMajorParties = [...new Set(allMajorParties)];
  const sortPartyToPVotes = sortResults.partyToVotes.partyToPVotes;
  const sortedMajorParties = uniqueMajorParties.sort(
    function(a, b) {
      return sortPartyToPVotes[b] - sortPartyToPVotes[a];
    }
  )

  return (
    <SectionBox>
      <Header level={3}>{election.titleShort}</Header>
      <table>
        <thead>
          <tr>
            <th></th>
            {sortedMajorParties.map(
              function(party, iParty) {
                return <th key={'head-'+iParty}>{party}</th>
              }
            )}
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {ents.map(
            function(ent, iEnt) {
              return <ResultsTableViewRowForEnt key={'row-'+iEnt} election={election} ent={ent} majorParties={sortedMajorParties}/>
            }
          )}
        </tbody>
      </table>
    </SectionBox>
  );
}
