import { Box } from "@mui/material";
import { EntType, Integer, MathX, SparseMatrix } from "../../nonview/base";
import { Party, Seats } from "../../nonview/core";

import {
  CommaListView,
  ElectionLink,
  Essay,
  PartyLink,
  SectionBox,
} from "../atoms";
import { MatrixView } from "../molecules";

function getSparseMatrix(election, ents) {
  let dataListParts = [];
  const seats = new Seats(election);

  ents.forEach(function (ent) {
    const partyToSeats = seats.getPartyToSeats(ent.id);
    if (!partyToSeats) {
      return null;
    }
    const winningPartyID = Object.keys(partyToSeats)[0];
    for (let [partyID, seats] of Object.entries(partyToSeats)) {
      const party = Party.fromID(partyID);
      dataListParts.push({
        Region: ent,
        Party: party,
        Seats: new Integer(seats, {
          application: "seats",
          color: winningPartyID === partyID ? party.color : null,
        }),
      });
    }
  });
  const aggregatePartyToSeats = seats.getAggregatePartyToSeats(ents);
  let dataListSum = [];

  if (ents.length > 1) {
    const winningPartyID = Object.keys(aggregatePartyToSeats)[0];
    for (let [partyID, seats] of Object.entries(aggregatePartyToSeats)) {
      const party = Party.fromID(partyID);
      dataListSum.push({
        Region: "Aggregate",
        Party: party,
        Seats: new Integer(seats, {
          application: "seats",
          color: winningPartyID === partyID ? party.color : null,
        }),
      });
    }
  }

  return new SparseMatrix([...dataListSum, ...dataListParts]);
}

function getTitleAndDescription(election, ents) {
  const seats = new Seats(election);
  const aggregatePartyToSeats = seats.getAggregatePartyToSeats(ents);
  const nWithSeats = Object.keys(aggregatePartyToSeats).length;

  const winningPartyID = Object.keys(aggregatePartyToSeats)[0];
  const winningPartySeats = aggregatePartyToSeats[winningPartyID];
  const totalSeats = MathX.sum(Object.values(aggregatePartyToSeats));

  let winDescription = "#Plurality, but #NoMajority";
  if (winningPartySeats >= 150) {
    winDescription = "#⅔0Majority";
  } else if (winningPartySeats >= 112) {
    winDescription = "#Majority";
  }

  const winningParty = Party.fromID(winningPartyID);

  const seatsToPartyIDList = Object.entries(aggregatePartyToSeats).reduce(
    function (idx, [partyID, seats]) {
      if (!idx[seats]) {
        idx[seats] = [];
      }
      idx[seats].push(partyID);
      return idx;
    },
    {}
  );

  const title = (
    <Box component="span">
      Who won seats in <ElectionLink election={election} />?
    </Box>
  );
  const description = (
    <Essay>
      <>
        {nWithSeats} parties won at least one seat. Most seats were won by the{" "}
        <PartyLink party={winningParty} labelType="handle" /> (
        {winningPartySeats}/{totalSeats}), giving it a {winDescription} in
        parliament.
      </>
      <>
        {Object.keys(seatsToPartyIDList)
          .sort(function (a, b) {
            return parseInt(b) - parseInt(a);
          })
          .map(function (seats) {
            const partyIDList = seatsToPartyIDList[seats];
            return (
              <Box key={"party-list-with-" + seats}>
                {seats}{" "}
                <CommaListView>
                  {partyIDList.map(function (partyID) {
                    const party = Party.fromID(partyID);
                    const majority = seats - 112;
                    let majoritStr = "";
                    if (majority > 0) {
                      majoritStr = ` (+${majority} #Majority)`;
                    } else if (majority > -10) {
                      majoritStr = ` (${majority - 1} #Majority)`;
                    }
                    return (
                      <Box component={"span"}>
                        <PartyLink
                          party={party}
                          labelType="handle"
                          key={"party-" + partyID}
                        />
                        {majoritStr}
                      </Box>
                    );
                  })}
                </CommaListView>
              </Box>
            );
          })}
      </>
    </Essay>
  );
  return { title, description };
}

export default function ResultsSeatsTableView({ election, ents, title }) {
  const sortedValidEnts = election
    .sortEntsByValid(ents)
    .filter((ent) => ent.entType !== EntType.PD);
  if (sortedValidEnts.length === 0) {
    return null;
  }
  const sparseMatrix = getSparseMatrix(election, sortedValidEnts);
  const { title: titleInner, description } = getTitleAndDescription(
    election,
    sortedValidEnts
  );
  title = title || titleInner;

  return (
    <SectionBox title={title} description={description}>
      <MatrixView
        sparseMatrix={sparseMatrix}
        zKey="Seats"
        xKey="Party"
        yKey="Region"
      />
    </SectionBox>
  );
}
