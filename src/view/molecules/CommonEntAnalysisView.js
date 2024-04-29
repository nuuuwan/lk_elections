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
import { GeoMap } from "../organisms";

export default class CommonEntAnalysisView {
  static getIntro({
    ent,
    entsSimilar,

    elections,

    demographicsIdx,
    demographicsViewFocusSmallest,
  }) {
    const demographicsList = entsSimilar.map((ent) => demographicsIdx[ent.id]);

    const geoEnt = ent.id.endsWith("P") ? entsSimilar[1] : ent;

    return [
      <GeoMap ent={geoEnt} />,
      ,
      <DemographicsView
        demographicsList={demographicsList}
        demographicType="ethnicity-and-religion"
        focusSmallest={demographicsViewFocusSmallest}
      />,

      <ElectoralSummaryView ent={ent} elections={elections} />,
    ];
  }
  static getAnalysis(
    ent,
    entsSimilar,
    entsAll,
    entsAllAll,
    elections,
    partyGroupList,

    demographicsViewFocusSmallest
  ) {
    return [
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
    ];
  }

  static getElectionHistory({
    ent,
    entsSimilar,
    elections,
    demographicsViewFocusSmallest,
  }) {
    const noSeats = ent.entType === EntType.PD || ent.entType === EntType.ED;
    return ElectionListView.get({
      elections,
      ents: entsSimilar,
      focusSmallest: demographicsViewFocusSmallest,
      noSeats,
    });
  }
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
    return [].concat(
      this.getIntro({
        ent,
        entsSimilar,
        elections,
        demographicsIdx,
        demographicsViewFocusSmallest,
      }),
      this.getAnalysis(
        ent,
        entsSimilar,
        entsAll,
        entsAllAll,
        elections,
        partyGroupList,
        demographicsViewFocusSmallest
      ),
      this.getElectionHistory({
        ent,
        entsSimilar,
        elections,
        demographicsViewFocusSmallest,
      })
    );
  }
}
