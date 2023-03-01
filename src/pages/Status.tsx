import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, IconButton, Input, InputAdornment, TextField } from '@mui/material';
import { getAllRegistersAdmin } from '../services/getAllRegistersTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CircleIcon from '../components/CircleIcon'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


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

  const handleClearClick = () => {
    setSearchInput("");
    console.log(searchInput)
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
                  <TableCell><CircleIcon /></TableCell>
                  <TableCell><Button><EditIcon /></Button></TableCell>
                  <TableCell><Button><DeleteIcon /> </Button></TableCell>
                </TableRow>


              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
