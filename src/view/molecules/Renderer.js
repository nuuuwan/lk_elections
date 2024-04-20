import { Box } from "@mui/material";
import { Ent, Format, Fraction, PercentagePoint } from "../../nonview/base";
import { Election, Party, PartyGroup } from "../../nonview/core";

import {
  ElectionLink,
  EntLink,
  FractionView,
  PartyGroupLink,
  PartyLink,
} from "../atoms";

export default class Renderer {
  static formatCellValueObject(value) {
    if (Party.isKnownPartyID(value)) {
      value = new Party(value);
    }

    if (PartyGroup.isKnownPartyGroupID(value)) {
      value = PartyGroup.fromID(value);
    }

    if (value instanceof Election) {
      return <ElectionLink election={value} />;
    }
    if (value instanceof Ent) {
      return <EntLink ent={value} shortFormat={true} />;
    }
    if (value instanceof Party) {
      return <PartyLink partyID={value.id} />;
    }

    if (value instanceof PartyGroup) {
      return <PartyGroupLink partyGroupID={value.id} />;
    }

    return null;
  }

  static formatCellValueNumberInner(value) {
    if (value instanceof Fraction) {
      return <FractionView fraction={value} />;
    }

    if (value instanceof PercentagePoint) {
      return Format.percentagePointWithStyle(value.value, value.color);
    }

    if (typeof value === "number") {
      if (Number.isInteger(value)) {
        return Format.intHumanizeWithStyle(value);
      }
      return Format.percentWithStyle(value);
    }

    if (typeof value === "boolean") {
      return value ? "✔️" : "";
    }

    return value;
  }

  static formatCellValueNumber(value) {
    return (
      <Box sx={{ textAlign: "right" }}>
        {Renderer.formatCellValueNumberInner(value)}
      </Box>
    );
  }

  static formatCellValue(value) {
    if (!value) {
      return "-";
    }
    if (value === "Other") {
      return "Other";
    }

    return (
      Renderer.formatCellValueObject(value) ||
      Renderer.formatCellValueNumber(value)
    );
  }
}
