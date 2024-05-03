import { MLModel, MathX } from "../base";
import Election from "./Election/Election";
import Result from "./Result";

export default class ElectionModel {
  constructor(
    elections,
    currentElection,
    releasedPDIDList,
    notReleasePDIDList
  ) {
    this.elections = elections;
    this.currentElection = currentElection;
    this.releasedPDIDList = releasedPDIDList;
    this.nonReleasedPDIDList = notReleasePDIDList;

    this.train();
  }
  static getPartyIDList(modelElection) {
    const resultsList = modelElection.pdResultsList;
    const aggrResults = Result.fromList("aggr", resultsList);
    const partyToPVotes = aggrResults.partyToVotes.partyToPVotes;
    return Object.entries(partyToPVotes)
      .filter(function ([partyID, pVotes]) {
        return pVotes > 0.05;
      })
      .map(function ([partyID, pVotes]) {
        return partyID;
      });
  }

  static getFeatureVector(modelElection, partyID, pdIDList) {
    return pdIDList.map(function (pdID) {
      const pdResult = modelElection.getResults(pdID);
      if (!pdResult) {
        return 0.0;
      }
      const partyToPVotes = pdResult.partyToVotes.partyToPVotes;
      return partyToPVotes[partyID] || 0.0;
    });
  }

  static getFeatureMatrixForElection(modelElection, pdIDLIst) {
    return ElectionModel.getPartyIDList(modelElection).map(function (partyID) {
      return ElectionModel.getFeatureVector(modelElection, partyID, pdIDLIst);
    });
  }

  static getFeatureMatrix(elections, pdIDList) {
    return elections.reduce(function (X, election) {
      return X.concat(
        ElectionModel.getFeatureMatrixForElection(election, pdIDList)
      );
    }, []);
  }

  static normalize(partyToVoteInfo) {
    const totalPVotes = MathX.sum(
      Object.values(partyToVoteInfo).map((x) => x.pVotesPredicted)
    );
    return Object.fromEntries(
      Object.entries(partyToVoteInfo).map(function ([partyID, voteInfo]) {
        voteInfo.pVotesPredicted = voteInfo.pVotesPredicted / totalPVotes;
        return [partyID, voteInfo];
      })
    );
  }

  getXTrain() {
    return ElectionModel.getFeatureMatrix(
      this.getPreviousElections(),
      this.releasedPDIDList
    );
  }

  getYTrain() {
    return ElectionModel.getFeatureMatrix(
      this.getPreviousElections(),
      this.nonReleasedPDIDList
    );
  }

  getPreviousElections() {
    return this.elections.filter(
      (election) => election.localeCompare(this.currentElection) < 0
    );
  }

  getXEvaluate() {
    return ElectionModel.getFeatureMatrix(
      [this.currentElection],
      this.releasedPDIDList
    );
  }

  getYActual() {
    return ElectionModel.getFeatureMatrix(
      [this.currentElection],
      this.nonReleasedPDIDList
    );
  }

  train() {
    // Train
    console.debug(this.releasedPDIDList);
    const previousElections = this.getPreviousElections();
    console.debug(previousElections.map((election) => election.date));
    const XTrain = this.getXTrain();
    const YTrain = this.getYTrain();

    console.debug(XTrain);
    console.debug(YTrain);
    const model = new MLModel(XTrain, YTrain);

    const XEvaluate = this.getXEvaluate();
    const YActual = this.getYActual();
    const YHat = XEvaluate.map((Xi) => model.predict(Xi));
    const partyIDList = ElectionModel.getPartyIDList(
      this.currentElection,
      this.releasedPDIDList
    );
    console.debug(partyIDList);

    const pdToPartyToVoteInfo = YHat.reduce(
      function (pdToPartyToPVotes, Yi, i) {
        const partyID = partyIDList[i];
        return Yi.reduce(
          function (pdToPartyToPVotes, pVotes, j) {
            const pdID = this.nonReleasedPDIDList[j];

            if (!pdToPartyToPVotes[pdID]) {
              pdToPartyToPVotes[pdID] = {};
            }
            pdToPartyToPVotes[pdID][partyID] = {
              pVotesPredicted: pVotes,
              pVotesActual: YActual[i][j],
            };
            return pdToPartyToPVotes;
          }.bind(this),
          pdToPartyToPVotes
        );
      }.bind(this),
      {}
    );

    const normPDToPartyTOPVotes = Object.fromEntries(
      Object.entries(pdToPartyToVoteInfo).map(function ([
        pdID,
        partyToVoteInfo,
      ]) {
        return [pdID, ElectionModel.normalize(partyToVoteInfo)];
      })
    );
    console.debug(normPDToPartyTOPVotes);
    return normPDToPartyTOPVotes;
  }

  getElectionReleased() {
    let election = new Election(
      this.currentElection.electionType,
      this.currentElection.date
    );
    election.resultsList = this.releasedPDIDList
      .map((pdID) => this.currentElection.getResults(pdID))
      .filter((result) => result);
    election.resultsIdx = Object.fromEntries(
      election.resultsList.map((result) => [result.entityID, result])
    );
    election.isLoaded = true;
    return election;
  }

  getElectionNotReleasedPrediction() {
    const lastElection = this.getPreviousElections()[0];
    let election = new Election(
      this.currentElection.electionType,
      this.currentElection.date
    );
    election.resultsList = this.nonReleasedPDIDList
      .map((pdID) => lastElection.getResults(pdID))
      .filter((result) => result);

    election.resultsIdx = Object.fromEntries(
      election.resultsList.map((result) => [result.entityID, result])
    );
    election.isLoaded = true;
    return election;
  }
}
