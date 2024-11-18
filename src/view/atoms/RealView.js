import { Format } from '../../nonview/base';
import { Box } from '@mui/material';

export default function RealView({ real }) {
  const color = real.context?.color || 'inherit';

  let background = 'inherit';
  if (real.context?.application === 'seats') {
    background = color + '1';
  }

  return (
    <Box sx={{ color, margin: 0, padding: 0, background }}>
      {Format.realHumanizeWithStyle(real.x, [5, 50], [18, 24])}
    </Box>
  );
}
