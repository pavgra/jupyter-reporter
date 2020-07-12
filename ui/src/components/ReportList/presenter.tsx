import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import {sendGet, sendDelete} from 'services/Api';

const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(3),
    },
    table: {
        minWidth: 650,
    },
}));

function ReportList() {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [reportList, setReportList] = useState([]);

    const loadReports = async () => {
        const {reports}: any = await sendGet('/api/v1/reports');
        setReportList(Object.values(reports));
    };

    const removeReport = async (name: string) => {
        setIsLoading(true);
        await sendDelete(`/api/v1/reports/${name}`);
        await loadReports();
        setIsLoading(false);
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                await loadReports();
            } catch (e) {
                alert(`Failed to load reports: ${e}`)
            }
            setIsLoading(false);
        })();
    }, []);

    return (
        <>
            <Typography variant="h5" className={classes.header}>
                Reports
            </Typography>
            {(!isLoading && reportList.length > 0) && (
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportList.map((report, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        <Link to={`/reports/${report}`}>
                                            {report}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">
                                        <DeleteIcon onClick={() => removeReport(report)}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {(!isLoading && reportList.length === 0) && (
                <div>No reports found</div>
            )}
            {isLoading && (
                <>Loading...</>
            )}
        </>
    )
}

export default ReportList;
