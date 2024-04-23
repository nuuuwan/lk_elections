import {
  BellwetherView,
  FloatingVoteAnalysisView,
  SwingAnalysisForEntView,
  SimilarRegionsView,
  ElectionListView,
  ElectoralSummaryView,
  DemographicsView,
} from "../molecules";

export default class CommonEntAnalysisView {
  static get({
    ent,
    entsSimilar,
    entsAll,
    elections,
    partyGroupList,
    demographicsIdx,
    demographicsViewFocusSmallest,
  }) {
    const demographicsList = entsSimilar.map((ent) => demographicsIdx[ent.id]);
    return [
      <DemographicsView
        demographicsList={demographicsList}
        demographicType="ethnicity-and-religion"
        focusSmallest={demographicsViewFocusSmallest}
      />,

      <ElectoralSummaryView ent={ent} elections={elections} />,
      <SimilarRegionsView
        ent={ent}
        elections={elections}
        otherEnts={entsAll}
      />,
      <BellwetherView ent={ent} elections={elections} />,

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
      })
    );
  }
}
