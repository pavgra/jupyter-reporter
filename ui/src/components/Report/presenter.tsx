import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { sendGet } from 'services/Api';

const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(3),
    },
}));

function Report() {
    const classes = useStyles();
    const {name} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState('');

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await sendGet(`/api/v1/reports/${name}`);
                setData(escape(res));
            } catch (e) {
                alert(`Failed to load report: ${e}`)
            }
            setIsLoading(false);
        })();
    }, [name]);

    return (
        <>
            <Typography variant="h5" className={classes.header}>
                {name}
            </Typography>
            <div>
                {isLoading && (
                    <>Loading...</>
                )}
                {!isLoading && (
                    <iframe src={`data:text/html;charset=utf-8,${data}`} width="100%" height="850px"></iframe>
                )}
            </div>
        </>
    )
}

export default Report;