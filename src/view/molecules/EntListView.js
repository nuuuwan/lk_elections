import { EntLink } from "../atoms";
import { EntType } from "../../nonview/base";
import { GenericListView } from "../molecules";

export default function EntListView({ ents, shortFormat }) {
  const entType = EntType.fromID(ents[0].id);
  const renderItem = function (ent) {
    return <EntLink ent={ent} shortFormat={shortFormat} />;
  };

  const sortedEnts = ents.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <GenericListView
      title={entType.longNamePlural}
      items={sortedEnts}
      renderItem={renderItem}
    />
  );
}
