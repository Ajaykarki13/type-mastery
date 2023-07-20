
import {Table, TableContainer,TableBody,TableHead, TableRow, TableCell} from '@mui/material'
import React from 'react'
import Paper from '@mui/material/Paper';

const styles = {
    color:'green',
    fontSize:'1rem'
}
const TableUserData = ({data}) => {

  return (
    <div className='table'>
 <TableContainer component={Paper}>
    <h1> Your Scorecard </h1>
 <Table sx={{ minWidth: 650 }}>
    <TableHead>
    <TableRow>
       <TableCell style={styles}>S.No</TableCell>
        <TableCell style={styles}>WPM</TableCell>
        <TableCell style={styles}>Accuracy</TableCell>
        <TableCell style={styles}>Characters</TableCell>
        <TableCell style={styles}>Date</TableCell>
    </TableRow>
</TableHead>

        <TableBody>
 {
 data.map((t,i)=>(
    <TableRow>
        <TableCell style={styles}>{i+1}</TableCell>
        <TableCell key= {i} style={styles}>{t.wpm}</TableCell>
        <TableCell key= {i} style={styles}>{t.accuracy}</TableCell>
        <TableCell key= {i} style={styles}>{t.characters}</TableCell>
        <TableCell key= {i} style={styles}>{t.timeStamp.toDate().toLocaleString()}</TableCell>
    </TableRow>


 ))
}

        </TableBody>



</Table>
</TableContainer>

    </div>
  )
}

export default TableUserData