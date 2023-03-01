import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { getAllRegistersAdmin } from '../services/getAllRegistersTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CircleIcon from '../components/CircleIcon'

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


  //Get all registers
  const [result, setResult] = useState<resultProps[]>([]);
  const getAllRegisters = async () => {
    const data = await getAllRegistersAdmin()
    setResult(data)
  }
  useEffect(() => {
    getAllRegisters()
  }, [])

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

  return (
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
                  <TableCell><Button ><DownloadForOfflineIcon /></Button></TableCell>
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
  );
}
