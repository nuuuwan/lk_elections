import { Header, EntLink, SectionBox } from "../atoms";

function getL1Error(pdEnt1, pdEnt2, election) {
  const result1 = election.getResults(pdEnt1.id);
  const result2 = election.getResults(pdEnt2.id);
  if (!result1 || !result2) {
    return undefined;
  }

  return result1.partyToVotes.getL1Error(result2.partyToVotes);
}

function getMeanL1Error(pdEnt1, pdEnt2, elections) {
  let l1Error = 0;
  for (let election of elections) {
    const l1ErrorForElection = getL1Error(pdEnt1, pdEnt2, election);
    if (l1ErrorForElection === undefined) {
      continue;
    }
    l1Error += l1ErrorForElection;
  }
  const n = elections.length;
  return l1Error / n;
}

export default function SimilarPollingDivisionsView({
  elections,
  ent,
  pdEnts,
}) {
  const pdAndL1Errors = pdEnts
    .map((pdEnt) => {
      const l1Error = getMeanL1Error(ent, pdEnt, elections);
      return { pdEnt, l1Error };
    })
    .sort((a, b) => a.l1Error - b.l1Error);

  return (
    <SectionBox>
      <Header level={2}>Similar Polling Divisions</Header>
      <table>
        <thead>
          <tr>
            <th>Polling Division</th>
            <th>Mean Diff.</th>
          </tr>
        </thead>
        <tbody>
          {pdAndL1Errors.slice(0, 11).map(({ pdEnt, l1Error }) => {
            if (pdEnt.id === ent.id) {
              return null;
            }
            return (
              <tr key={pdEnt.id}>
                <td>
                  <EntLink ent={pdEnt} />
                </td>
                <td className="td-number">
                  {l1Error.toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </SectionBox>
  );
}
