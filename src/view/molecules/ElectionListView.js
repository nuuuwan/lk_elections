import ResultsTableView from "./ResultsTableView";
import ResultsSeatsTableView from "./ResultsSeatsTableView";
import ParliView from "./ParliView/ParliView";

export default class ElectionListView {
  static get({ elections, ents, focusSmallest, noSeats, title }) {
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
            title={title}
            focusSmallest={focusSmallest}
          />
        );
        if (election.electionType === "Parliamentary" && !noSeats) {
          widgets.push(
            <ResultsSeatsTableView
              election={election}
              ents={ents}
              title={title}
            />
          );
          widgets.push(
            <ParliView election={election} ents={ents} title={title} />
          );
        }
        return widgets;
      }, []);
  }
}
