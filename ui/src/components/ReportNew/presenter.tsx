import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {DropzoneArea} from 'material-ui-dropzone'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(3),
    },
    form: {
        maxWidth: '650px',
    },
    formElement: {
        marginTop: theme.spacing(2),
    },
    nameInput: {
        width: '100%',
    }
}));

function Report() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [files, setFiles] = useState([]);

    const setReportName = (e: React.FormEvent<EventTarget>) => {
        setName((e.target as HTMLInputElement).value)
    }

    const selectReportFiles = (inputFiles: any) => {
        setFiles(Object.values(inputFiles));
    }

    useEffect(() => console.log('Selected files: ', files), [files]);

    const upload = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const url = '/api/v1/reports';
            const formData = new FormData();
            formData.append('name', name)
            files.forEach(f => formData.append('file', f))
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            await axios.post(url, formData, config);
            setName('');
            setFiles([]);
            alert('Report has been successfully uploaded')
        } catch (e) {
            alert(e);
        }
        setIsLoading(false);
    }

    return (
        <>
            <Typography variant="h5" className={classes.header}>
                Create report
            </Typography>
            <div>
                {isLoading && (
                    <>
                        Uploading...
                    </>
                )}
                {!isLoading && (
                    <form className={classes.form} onSubmit={upload}>
                        <div className={classes.formElement}>
                            <TextField className={classes.nameInput} label="Name" onChange={setReportName}/>
                        </div>
                        <div className={classes.formElement}>
                            <DropzoneArea acceptedFiles={['']} onChange={selectReportFiles}/>
                        </div>
                        <div className={classes.formElement}>
                            <Button variant="contained" color="primary" type="submit">Upload</Button>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}

export default Report;