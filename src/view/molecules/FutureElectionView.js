import React from "react";
import { Box, Typography } from "@mui/material";
import { Time } from "../../nonview/base";
import { NoteView } from ".";
import { Link, TimeDeltaView } from "../atoms";

export default function FutureElectionView({ election }) {
  const { hashtag, formalName, url, deadline, deadlineNotes } = election;

  const timeNow = Time.now();
  const timeDelta = Time.minus(deadline, timeNow);
  return (
    <Box sx={{ m: 1, p: 1, maxWidth:"90%" }}>
      <Link href={url}>
        <Typography variant="h5" color="#084">
          #{hashtag}
        </Typography>
      </Link>
      <Typography variant="h6" color="#f80">
        {formalName}
      </Typography>
      <Typography variant="body2">must be held by</Typography>
      <Typography variant="h6">{deadline.toString()}</Typography>
      <Typography variant="body2" color="#800">
        which is in 
      </Typography>
      <Typography variant="h1" color="#800">
        <TimeDeltaView timeDelta={timeDelta} />
      </Typography>

      {deadlineNotes.map(function (note, iNote) {
        const key = `note-${iNote}`;
        return <NoteView key={key} note={note} />;
      })}
    </Box>
  );
}
