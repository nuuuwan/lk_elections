import { ElectionLink } from "../atoms";
import { GenericListView } from "../molecules";

export default function ElectionListViewSmall({ elections }) {
  return (
    <GenericListView
      title="Elections"
      items={elections}
      renderItem={function (election) {
        return <ElectionLink election={election} />;
      }}
    />
  );
}
