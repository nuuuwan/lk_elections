
import { Format } from "../../nonview/base";

export default function FractionView({ fraction }) {
  const color = fraction.color || "inherit";
  return (
    <div style={{ color,margin: 0, padding: 0 }}>
      <div >
        {Format.percentWithStyle(fraction.p)}
      </div>
      <div >
        {Format.intHumanizeWithStyle(fraction.n)}
      </div>
    </div>
  );
}
