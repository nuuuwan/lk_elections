import ResultsTableView from "./ResultsTableView";
import ResultsSeatsTableView from "./ResultsSeatsTableView";

export default class ElectionListView {
  static get({ elections, ents, focusSmallest }) {
    return elections
      .sort()
      .reverse()
      .reduce(function (widgets, election, iElection) {
        if (election.isFuture) {
          return widgets;
        }

        widgets.push(
          <ResultsTableView
            election={election}
            ents={ents}
            focusSmallest={focusSmallest}
          />
        );
        if (election.electionType === "Parliamentary") {
          widgets.push(
            <ResultsSeatsTableView election={election} ents={ents} />
          );
        }
        return widgets;
      }, []);
  }
}
