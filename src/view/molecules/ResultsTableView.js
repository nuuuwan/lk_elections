import { EntLink, Header, SectionBox, PartyLink } from "../atoms";

function ResultsTableViewRowForEnt({ election, ent, majorParties }) {
  const result = election.getResults(ent.id);
  if (!result) {
    return null;
  }
  const partyToPVotes = result.partyToVotes.partyToPVotes;
  const pOther = Object.entries(partyToPVotes)
    .filter(function ([party, pVotes]) {
      return !majorParties.includes(party);
    })
    .reduce(function (sum, [party, pVotes]) {
      return sum + pVotes;
    }, 0);

  const winningParty = result.partyToVotes.winningParty;

  return (
    <tr>
      <td>
        <EntLink ent={ent} />
      </td>
      {majorParties.map(function (party, iParty) {
        const isWinner = party === winningParty;

        return (
          <td
            key={"cell-" + iParty}
            className="td-number"
            style={{ borderRadius: 6 }}
          >
            <PartyLink partyID={party} noColor={!isWinner}>
              {partyToPVotes[party].toLocaleString(undefined, {
                style: "percent",
              })}
            </PartyLink>
          </td>
        );
      })}
      <td className="td-number">
        {pOther.toLocaleString(undefined, { style: "percent" })}
      </td>
    </tr>
  );
}

export default function ResultsTableView({ election, ents }) {
  const sortedEnts0 = ents.sort(function (a, b) {
    return a.id.localeCompare(b.id);
  });

  const sortEnt = sortedEnts0[ents.length - 1];

  const sortResults = election.getResults(sortEnt.id);
  if (!sortResults) {
    return null;
  }

  const allMajorParties = ents.reduce(function (allMajorParties, ent) {
    const result = election.getResults(ent.id);
    if (result === null) {
      return allMajorParties;
    }
    const sortedMajor = result.partyToVotes.sortedMajor;
    const majorParties = Object.keys(sortedMajor).filter(
      (party) => party !== "Other"
    );
    return [].concat(allMajorParties, majorParties);
  }, []);
  const uniqueMajorParties = [...new Set(allMajorParties)];
  const sortPartyToPVotes = sortResults.partyToVotes.partyToPVotes;
  const sortedMajorParties = uniqueMajorParties.sort(function (a, b) {
    return sortPartyToPVotes[b] - sortPartyToPVotes[a];
  });
  const sortedWinningParty = sortedMajorParties[0];
  const sortedEnts = ents.sort(function (a, b) {
    const resultA = election.getResults(a.id);
    const resultB = election.getResults(b.id);
    if (resultA === null) {
      return 1;
    }
    if (resultB === null) {
      return -1;
    }
    const partyToVotesA = resultA.partyToVotes.partyToPVotes;
    const partyToVotesB = resultB.partyToVotes.partyToPVotes;
    return (
      partyToVotesB[sortedWinningParty] - partyToVotesA[sortedWinningParty]
    );
  });

  return (
    <SectionBox>
      <Header level={3}>{election.titleShort}</Header>
      <table>
        <thead>
          <tr>
            <th></th>
            {sortedMajorParties.map(function (party, iParty) {
              return (
                <th key={"head-" + iParty}>
                  <PartyLink
                    partyID={party}
                    noColor={sortedWinningParty !== party}
                  />
                </th>
              );
            })}
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {sortedEnts.map(function (ent, iEnt) {
            return (
              <ResultsTableViewRowForEnt
                key={"row-" + iEnt}
                election={election}
                ent={ent}
                majorParties={sortedMajorParties}
              />
            );
          })}
        </tbody>
      </table>
    </SectionBox>
  );
}
