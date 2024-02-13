import React from "react";
import { Paper, Typography } from "@mui/material";
import { Time } from "../../nonview/base";
import { NoteView } from "../molecules";
import { Link } from "../atoms";

export default function ElectionView({ election }) {
  const { hashtag, formalName, url, deadline, deadlineNotes } = election;

  const timeNow = Time.now();
  const delta = Time.minus(deadline, timeNow);
  return (
    <Paper sx={{ m: 1, p: 1 }}>
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
        or in
      </Typography>
      <Typography variant="h1" color="#800">
        {delta.days}
      </Typography>

      {deadlineNotes.map(function (note, iNote) {
        const key = `note-${iNote}`;
        return <NoteView key={key} note={note} />;
      })}
    </Paper>
  );
}
