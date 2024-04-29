import { Typography } from "@mui/material";
import {
  Ent,
  Format,
  Fraction,
  Integer,
  PercentagePoint,
} from "../../nonview/base";
import {
  DemographicGroup,
  Election,
  Party,
  PartyGroup,
} from "../../nonview/core";

import {
  ElectionLink,
  EntLink,
  FractionView,
  IntegerView,
  PartyGroupLink,
  PartyLink,
} from "../atoms";

export default class Renderer {
  static formatCellValueObject(value) {
    if (value instanceof Election) {
      return <ElectionLink election={value} />;
    }
    if (value instanceof Ent) {
      return <EntLink ent={value} />;
    }
    if (value instanceof Party) {
      return <PartyLink party={value} />;
    }

    if (value instanceof PartyGroup) {
      return <PartyGroupLink partyGroup={value} />;
    }

    if (value instanceof DemographicGroup) {
      return (
        <Typography component="span" sx={{ color: value.color }}>
          {value.handle}
        </Typography>
      );
    }

    return null;
  }

  static formatCellValueNumberObject(value) {
    if (value instanceof Fraction) {
      return <FractionView fraction={value} />;
    }

    if (value instanceof Integer) {
      return <IntegerView integer={value} />;
    }

    if (value instanceof PercentagePoint) {
      return Format.percentagePointWithStyle(value.value, value.color);
    }
    return null;
  }

  static formatCellValueNumberInner(value) {
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

  static formatCellValue(value) {
    if (!value) {
      return "-";
    }
    if (value === "Other") {
      return "Other";
    }

    return (
      Renderer.formatCellValueObject(value) ||
      Renderer.formatCellValueNumberObject(value) ||
      Renderer.formatCellValueNumberInner(value)
    );
  }
}
