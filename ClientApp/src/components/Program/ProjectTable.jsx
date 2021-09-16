import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export const ProjectTable = (props) => {
    return <Table aria-label="simple table">
        <TableHead>
            <StyledTableRow>
                <StyledTableCell>No.</StyledTableCell>
                <StyledTableCell>Project</StyledTableCell>
                <StyledTableCell>Project Path</StyledTableCell>
                <StyledTableCell>branch</StyledTableCell>
                <StyledTableCell>Comments</StyledTableCell>
                <StyledTableCell></StyledTableCell>
            </StyledTableRow>
        </TableHead>
        <TableBody>
            {
                props.result.map((item, index) => {
                    return <StyledTableRow key={index + 1}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{item.name}</StyledTableCell>
                        <StyledTableCell>{item.path}</StyledTableCell>
                        <StyledTableCell>{item.branch}</StyledTableCell>
                        <StyledTableCell>{item.comment}</StyledTableCell>
                        <StyledTableCell>
                            <Button variant="outlined" color="secondary" onClick={props.hendleDelete.bind(this, index)}>Remove</Button>
                        </StyledTableCell>
                    </StyledTableRow>
                })
            }
        </TableBody>
    </Table>;
}