import { GenericListView } from "../molecules";

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
    />
  );
}
