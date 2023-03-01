import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';

//Services
import { updateStatusTableAdmin } from '../services/updateStatusTable'
import { getAllRegistersAdmin } from '../services/getAllRegistersTable';

//Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CircleIconGreen from '../components/CircleIconGreen'
import CircleIconRed from '../components/CircleIconRed'
import CircleIconBlue from '../components/CircleIconBlue'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SelectChangeEvent } from '@mui/material/Select';

type resultProps = {
  idForm: string
  nomePaciente: string
  cpf: string
  anexo: any
  nomeMedico: string
  data: string
  aptidao: string
  Status: string
}

export default function DenseTable() {


  const handleDownload = (anexo: any) => {
    anexo = anexo.replace('data:image/png;base64,', '')
    const payload = { anexo: anexo }
    // console.log(payload.anexo)
    var a = document.createElement("a"); //Create <a>
    a.href = "data:image/png;base64," + payload.anexo; //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); //Downloaded file
  };

  //Get all registers
  const [result, setResult] = useState<resultProps[]>([]);
  const getAllRegisters = async () => {
    const data = await getAllRegistersAdmin()
    setResult(data)
  }
  useEffect(() => {
    getAllRegisters()
  }, [])

  //Search
  const [searchInput, setSearchInput] = useState("")
  const handleChange = (e: any) => {
    e.preventDefault()
    console.log(searchInput)
    setSearchInput(e.target.value)
  }
  if (searchInput.length > 0) {
    result.filter((data) => {
      console.log(`dados: ${data.cpf}`)
      return data.cpf.includes(searchInput)
    })
  }
  //clearSearh
  const handleClearClick = () => {
    setSearchInput("");
    console.log(searchInput)
  };

  //MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Status Modal
  const [status, setStatus] = React.useState('');
  const handleChangeDropDownModalEdit = (e: SelectChangeEvent) => {
    e.preventDefault()
    if (e.target.value === 'Em processamento') {
      console.log(`novo status ${status}`)
      setStatus('1')
    } else if (e.target.value === 'Aprovado') {
      setStatus('2')
    } else {
      setStatus('3')
    }

  };

   function CircleIcon(props: any){
    if (props.status === 'Reprovado') {
        return <CircleIconRed/>
    } else if (props.status === 'Aprovado') {
        return <CircleIconGreen/>
    } else {
      console.log(props)
        return <CircleIconBlue/>
    }
}

  // Post form update status
  const [cpf, setCpf] = useState('')
  const handleOpenModalEdit = (cpf: any, status: any)=>{
    handleOpen()
    console.log(`stadus modal ${status}`)
    console.log(`cpf modal ${cpf}`)
    setStatus(status)
    setCpf(cpf)

  }
  const handleSubmitAlterStatus = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const updateStatus = async () => {
      console.log(status, cpf)
      const updateStatusAdminTable = await updateStatusTableAdmin({ status: status, cpf: cpf })
    }
    updateStatus()
    handleClose()
    setTimeout(() => {
      getAllRegisters()
      getAllRegisters()
    }, 100)
  };

  return (
    <Box>
      <Grid container justifyContent="center" marginBottom={5}>
        <Input
          id="input-with-icon-adornment"
          placeholder="Procurar CPF"
          onChange={handleChange}
          defaultValue={searchInput}
          value={searchInput}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <IconButton sx={{
              visibility: searchInput ? "visible" : "hidden"
            }}
              onClick={handleClearClick}>
              <ClearIcon />
            </IconButton>}
        />
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">CPF</TableCell>
              <TableCell align="center">Anexo</TableCell>
              <TableCell align="center">Médico</TableCell>
              <TableCell align="center">Aptidão</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center"> </TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              result.filter(post => {
                if (searchInput === '') {
                  return post;
                } else if (post.cpf.toLowerCase().includes(searchInput.toLowerCase())) {
                  return post;
                }
              }).map((post, index) => (


                <TableRow>
                  <TableCell>{post.nomePaciente}</TableCell>
                  <TableCell>{post.cpf}</TableCell>
                  <TableCell><Button onClick={() => handleDownload(post.anexo)}><DownloadForOfflineIcon /></Button></TableCell>
                  <TableCell>{post.nomeMedico}</TableCell>
                  <TableCell>{post.aptidao}</TableCell>
                  <TableCell>{post.Status}</TableCell>
                  <TableCell><CircleIcon status={post.Status} /></TableCell>
                  <TableCell><Button onClick={() => handleOpenModalEdit(post.cpf, post.Status)}><EditIcon /></Button></TableCell>
                  <TableCell><Button><DeleteIcon /> </Button></TableCell>
                </TableRow>


              ))
            }
          </TableBody>
        </Table>
      </TableContainer>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Alterar Status
          </Typography>
          <Box sx={{ minWidth: 120 }} component="form" onSubmit={handleSubmitAlterStatus}>
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChangeDropDownModalEdit}
              >
                <MenuItem value={'Em processamento'}>Em processamento</MenuItem>
                <MenuItem value={'Aprovado'}>Aprovado</MenuItem>
                <MenuItem value={'Reprovado'}>Reprovado</MenuItem>
              </Select>
              <Box marginTop={4}>
                <Button variant="contained" type='submit' endIcon={<SendIcon />}>
                  Alterar
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Modal>

    </Box>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};