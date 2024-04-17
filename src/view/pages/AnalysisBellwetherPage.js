import { URLContext, Ent, EntType } from "../../nonview/base";
import { AnalysisBellwether, Election } from "../../nonview/core";
import AbstractCustomPage from "./AbstractCustomPage";
import {
  SectionBox,
  WikiSummaryView,
  ElectionLinkShort,
  Header,
  EntLink,
} from "../atoms";
import { CircularProgress } from "@mui/material";

export default class AnalysisBellwetherPage extends AbstractCustomPage {
  static getPageID() {
    return "AnalysisBellwether";
  }

  constructor(props) {
    super(props);
    const { pageID } = URLContext.get();

    this.state = {
      pageID: pageID,
    };
  }

  async componentDidMount() {
    const elections = Election.listAll();
    for (let election of elections) {
      await election.loadData();
    }
    const pdEnts = await Ent.listFromType(EntType.PD);
    const edEnts = await Ent.listFromType(EntType.ED);
    const countryEnt = await Ent.fromID("LK");
    this.setState({ elections, countryEnt, pdEnts, edEnts });
  }
  get supertitle() {
    return "Analysis";
  }

  get title() {
    return "Bellwethers";
  }

  renderMismatches(mismatches) {
    return mismatches.map(function ([isMatch, election], iElection) {
      const color = isMatch ? "#0808" : "#f00";
      return (
        <ElectionLinkShort
          key={"election-" + iElection}
          election={election}
          color={color}
        />
      );
    });
  }

  renderBellwetherTableRow(ent, stats, iEnt, isNew) {
    console.debug(stats, isNew);
    const { nMatch, meanError, mismatches } = stats;
    const background = isNew ? "#f8f8f8" : "white";
    return (
      <tr key={"item-" + iEnt} style={{ background }}>
        <td>
          <EntLink ent={ent} />
        </td>
        <td>{nMatch}</td>
        <td>
          {meanError.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
        </td>
        <td>{this.renderMismatches(mismatches)}</td>
      </tr>
    );
  }

  renderBellwetherTable() {
    const { pdEnts, edEnts } = this.state;
    if (!pdEnts) {
      return <CircularProgress />;
    }
    const ents = [].concat(edEnts, pdEnts);
    const entsAndStats = ents
      .map((ent) => {
        const stats = AnalysisBellwether.statsForElections(
          this.state.elections,
          ent
        );
        return { ent, stats };
      })
      .sort(function (a, b) {
        const dNMatch = b.stats.nMatch - a.stats.nMatch;
        if (dNMatch !== 0) {
          return dNMatch;
        }
        return a.stats.meanError - b.stats.meanError;
      });

    const { n } = entsAndStats[0].stats;
    let prevNMatch = undefined;
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Matches (of {n})</th>
            <th>Diff.</th>
            <th>Mismatches</th>
          </tr>
        </thead>
        <tbody>
          {entsAndStats.map(
            function ({ ent, stats }, iEnt) {
              const { nMatch } = stats;
              const isNew = nMatch !== prevNMatch;
              prevNMatch = nMatch;
              return this.renderBellwetherTableRow(ent, stats, iEnt, isNew);
            }.bind(this)
          )}
        </tbody>
      </table>
    );
  }

  renderBodyMiddle() {
    return <WikiSummaryView wikiPageName={"Bellwether"} />;
  }

  renderBodyRight() {
    return (
      <SectionBox>
        <Header level={2}>Best to Worst Bellwethers</Header>
        {this.renderBellwetherTable()}
      </SectionBox>
    );
  }
}
