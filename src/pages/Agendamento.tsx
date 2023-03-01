import Box from '@mui/material/Box';

export default function BasicTextFields() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

    <>Agendamento</>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
    </Box>
  </Box>
  );
}
