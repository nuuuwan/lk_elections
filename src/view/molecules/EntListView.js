import { EntType } from "../../nonview/base";

import { GenericListView } from "../molecules";

export default function EntListView({ ents }) {
  if (!ents) {
    return null;
  }
  const entType = EntType.fromID(ents[0].id);

  return (
    <GenericListView
      items={ents.sort((a, b) => a.name.localeCompare(b.name))}
      title={entType.longNamePlural}
      getContext={function (ent) {
        return {
          pageID: entType.longNameCamel,
          [entType.idKey]: ent.id,
        };
      }}
      getLabel={(ent) => ent.name}
      getIcon={(ent) => undefined}
    />
  );
}
