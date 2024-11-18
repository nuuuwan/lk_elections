import { Format } from '../../nonview/base';
import { Box } from '@mui/material';

export default function RealDeltaView({ real }) {
  let color = real.context?.color || 'inherit';

  let background = 'inherit';
  const EPSILON = 0.05;
  if (real.context?.application === 'seats') {
    if (real.x > EPSILON) {
      background = '#f002';
    } else if (real.x < -EPSILON) {
      background = '#00f2';
    } else {
      background = 'white';
    }
  }
  return (
    <Box sx={{ color, margin: 0, padding: 0, background }}>
      {Format.realDeltaHumanizeWithStyle(real.x, [5, 50], [18, 24])}
    </Box>
  );
}
