import { Result } from "../../core";

export default class ElectionExpand {
  static expand(pdResultsList) {
    // ED
    const edIDs = pdResultsList.reduce(function (edIDs, result) {
      const pdID = result.entityID;
      const edID = pdID.substring(0, 5);
      if (!edIDs.includes(edID)) {
        edIDs.push(edID);
      }
      return edIDs;
    }, []);
    const edResultsList = edIDs.map(function (edID) {
      const edResults = pdResultsList.filter(function (result) {
        return result.entityID.startsWith(edID);
      });
      return Result.fromList(edID, edResults);
    });

    // Country
    const countryResult = Result.fromList("LK", pdResultsList);
    const expandedResultsList = [].concat(pdResultsList, edResultsList, [
      countryResult,
    ]);

    return expandedResultsList;
  }
}
