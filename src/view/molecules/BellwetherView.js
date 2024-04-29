import { Ent, Fraction, SparseMatrix } from "../../nonview/base";
import { Party, AnalysisBellwether } from "../../nonview/core";

import { EntLink, SectionBox, Essay } from "../atoms";
import { MatrixView } from "../molecules";

function getSparseMatrix(elections, ent) {
  return elections.reduce(function (sparseMatrix, election) {
    const stats = AnalysisBellwether.statsForElectionAndEnt(election, ent);
    if (!stats) {
      return sparseMatrix;
    }
    const { winningPartyEnt, winningPartyLK, l1Error, isMatch } = stats;

    return Object.entries({
      [ent.name]: Party.fromID(winningPartyEnt),
      SriLanka: Party.fromID(winningPartyLK),
      Match: isMatch,
      Error: new Fraction(l1Error, 1, { application: "diff" }),
    }).reduce(function (sparseMatrix, [key, value]) {
      return sparseMatrix.push({
        Election: election,
        Key: key,
        Value: value,
      });
    }, sparseMatrix);
  }, new SparseMatrix());
}

function getTitleAndDescription(elections, ent) {
  const { n, nMatch, bellwetherType } =
    AnalysisBellwether.statsForElectionsAndEnt(elections, ent);
  const title = (
    <>
      Is <EntLink ent={ent} /> a good Bellwether?
    </>
  );
  const description = (
    <Essay>
      <>
        In {nMatch}/{n} of the last elections, <EntLink ent={ent} />
        {"'s "}
        result matched <EntLink ent={Ent.LK} />.
      </>
      <>{bellwetherType}</>
    </Essay>
  );
  return { title, description };
}

export default function BellwetherView({ elections, ent }) {
  const sparseMatrix = getSparseMatrix(elections, ent);

  const { title, description } = getTitleAndDescription(elections, ent);
  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        xKey="Key"
        yKey="Election"
        zKey="Value"
      />
    </SectionBox>
  );
}
