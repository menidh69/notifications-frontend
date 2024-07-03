import NotificationRowData from "../interfaces/NotificationRowData"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const NotificationsTable = ({data}: {data: NotificationRowData[]}) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>

            <TableCell>ID</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Notification Type</TableCell>
            <TableCell align="right">Message</TableCell>
            <TableCell align="right">Sent To</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((i) => (
                    
        <TableRow
        key={i.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row">
          {i.id}
        </TableCell>
        <TableCell align="right">{i.messageCategory}</TableCell>
        <TableCell align="right">{i.notificationType}</TableCell>
        <TableCell align="right">{i.message}</TableCell>
        <TableCell align="right">{i.recipient}</TableCell>
        <TableCell align="right">{i.createdAt}</TableCell>

        </TableRow> 
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  )
}