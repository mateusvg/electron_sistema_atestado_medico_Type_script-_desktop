import * as React from 'react';
import Box from '@mui/material/Box';
import { pink, green, blue, orange } from '@mui/material/colors';

import CircleIcon from '@mui/icons-material/Circle';



export default function SvgIconsColor() {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 2,
        },
      }}
    >
        <CircleIcon sx={{ color: blue[500] }} />

    </Box>
  );
}