import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(3),
    },
}));

function Report() {
    const classes = useStyles();
    const {name} = useParams();
    return (
        <>
            <Typography variant="h5" className={classes.header}>
                {name}
            </Typography>
            <div>
                <iframe src={`http://localhost:5000/api/v1/reports/${name}`} width="100%" height="850px"></iframe>
            </div>
        </>
    )
}

export default Report;