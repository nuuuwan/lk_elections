import {
  BellwetherView,
  FloatingVoteAnalysisView,
  SwingAnalysisForEntView,
  SimilarRegionsView,
  ElectionListView,
  ElectoralSummaryView,
} from "../molecules";

export default class CommonEntAnalysisView {
  static get(ent, entsSimilar, entsAll, elections, partyGroupList) {
    return [
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
      />,
      <SwingAnalysisForEntView
        partyGroupList={partyGroupList}
        elections={elections}
        ent={ent}
      />,
    ].concat(ElectionListView.get({ elections, ents: entsSimilar }));
  }
}
