import { GenericListView } from "../molecules";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
export default function ElectionListViewSmall({ elections }) {
  return (
    <GenericListView
      items={elections.sort((a, b) => -a.localeCompare(b))}
      title="Elections"
      getContext={function (election) {
        return {
          pageID: "Election",
          date: election.date,
        };
      }}
      getLabel={(election) => election.titleShort}
      getIcon={(election) =>
        election.electionType === "Presidential"
          ? PersonIcon
          : AccountBalanceIcon
      }
    />
  );
}
