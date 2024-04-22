import {
  BellwetherView,
  FloatingVoteAnalysisView,
  SwingAnalysisForEntView,
  SimilarRegionsView,
  ElectionListView,
  ElectoralSummaryView,
} from "../molecules";

export default class CommonEntAnalysisView {
  static get(ent, entsSimilar, entsAll, elections, partyGroups) {
    return [
      <ElectoralSummaryView ent={ent} elections={elections} />,
      <SimilarRegionsView
        ent={ent}
        elections={elections}
        otherEnts={entsAll}
      />,
      <BellwetherView ent={ent} elections={elections} />,

      <FloatingVoteAnalysisView
        partyGroups={partyGroups}
        elections={elections}
        ents={entsSimilar}
      />,
      <SwingAnalysisForEntView
        partyGroups={partyGroups}
        elections={elections}
        ent={ent}
      />,
    ].concat(ElectionListView.get({ elections, ents: entsAll }));
  }
}
