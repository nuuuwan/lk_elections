import { EntType } from "../../nonview/base";
import {
  BellwetherView,
  FloatingVoteAnalysisView,
  SwingAnalysisForEntView,
  SimilarRegionsView,
  ElectionListView,
  ElectoralSummaryView,
  DemographicsView,
  SeatsHistoryView,
} from "../molecules";

export default class CommonEntAnalysisView {
  static get({
    ent,
    entsSimilar,
    entsAll,
    entsAllAll,
    elections,
    partyGroupList,
    demographicsIdx,
    demographicsViewFocusSmallest,
  }) {
    const demographicsList = entsSimilar.map((ent) => demographicsIdx[ent.id]);
    const noSeats = ent.entType === EntType.PD || ent.entType === EntType.ED;
    return [
      <DemographicsView
        demographicsList={demographicsList}
        demographicType="ethnicity-and-religion"
        focusSmallest={demographicsViewFocusSmallest}
      />,

      <ElectoralSummaryView ent={ent} elections={elections} />,

      <SeatsHistoryView
        ents={entsAllAll}
        elections={elections}
        partyGroupList={partyGroupList}
      />,
      <SimilarRegionsView
        ent={ent}
        elections={elections}
        otherEnts={entsAll}
      />,
      ent.id !== "LK" ? (
        <BellwetherView ent={ent} elections={elections} />
      ) : null,
      <FloatingVoteAnalysisView
        partyGroupList={partyGroupList}
        elections={elections}
        ents={entsSimilar}
        focusSmallest={demographicsViewFocusSmallest}
      />,
      <SwingAnalysisForEntView
        partyGroupList={partyGroupList}
        elections={elections}
        ent={ent}
      />,
    ].concat(
      ElectionListView.get({
        elections,
        ents: entsSimilar,
        focusSmallest: demographicsViewFocusSmallest,
        noSeats,
      })
    );
  }
}
