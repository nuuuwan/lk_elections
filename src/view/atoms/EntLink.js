import { Box } from "@mui/material";
import { EntType, Random } from "../../nonview/base";
import { LinkContext } from "../atoms";

function getEasterEggEmoji(label) {
  const P_EASTER_EGG = 0.01;
  if (Random.coinFlipWin(P_EASTER_EGG)) {
    for (let [key, keyEmoji] of Object.entries({
      Moratuwa: "🦈",
      Anuradhapura: "🛕",
      "Nuwara-Eliya": "☕",
      Kurunegala: "🐘🪨",
      Jaffna: "🪈",
    })) {
      if (label.startsWith(key)) {
        return keyEmoji;
      }
    }
  }
  return "";
}

export default function EntLink({ ent, short = true }) {
  const entType = EntType.fromID(ent.id);

  const context = {
    pageID: entType.longNameCamel,
    [entType.idKey]: ent.id,
  };

  const label = short ? ent.short : ent.longName;

  let emoji = "";
  if (label.startsWith("Sri Lanka")) {
    emoji = " 🇱🇰";
  }

  emoji += getEasterEggEmoji(label);

  return (
    <Box component="span">
      <LinkContext context={context}>
        <Box sx={{ whiteSpace: "nowrap" }} component="span">
          #{label.replaceAll(" ", "")}
        </Box>
      </LinkContext>
      {emoji}
    </Box>
  );
}
