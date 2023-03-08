import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Logo from "../Ubility-Dark-Logo.png"
import { Typography } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#4da8c4",
        color: theme.palette.common.white,
        fontWeight: "bold"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function TableUsers() {
    const [usersData, setUsersData] = useState([])


    useEffect(() => {
        getUsers()

    }, [])

    const getUsers = () => {

        var config = {
            method: "Get",
            url: process.env.REACT_APP_IP_ADDRESS + "/get_users_data",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer " + token,
            },
        };

        axios(config)
            .then((response) => {
                setUsersData(response.data)
            })
            .catch((error) => {
                console.log('checkValidateToken Faild', error);

            });
    };

    return (
        <div>
            <img style={{ width: "12%" }} src={Logo} alt="logo" />
            <div style={{ marginTop: "4%", textAlign: "center" }}>

                <Typography style={{ color: "#3A3A3A", fontWeight: "bold", fontSize: "27px", margin: "0px 0px 15px 7px" }}>
                    Table Users
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell >Email</StyledTableCell>
                                <StyledTableCell >Address</StyledTableCell>
                                <StyledTableCell >Phone</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersData.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell >{row.email}</StyledTableCell>
                                    <StyledTableCell >{row.address}</StyledTableCell>
                                    <StyledTableCell >{row.phone}</StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default TableUsers;
