import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ReportList from "./components/ReportList";
import Report from "./components/Report";
import ReportNew from "./components/ReportNew";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function App() {
    const classes = useStyles();
    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Jupyter Reporter
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar/>
                    <div className={classes.drawerContainer}>
                        <List>
                            <ListItem button component={Link} to="/reports/new">
                                <ListItemIcon>
                                    <AddCircleOutlineIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Add report"/>
                            </ListItem>
                            <ListItem button component={Link} to="/reports">
                                <ListItemIcon>
                                    <AssessmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Browse reports"/>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Toolbar />
                    <Switch>
                        <Route exact path="/reports/new">
                            <ReportNew />
                        </Route>
                        <Route exact path="/reports">
                            <ReportList/>
                        </Route>
                        <Route exact path="/reports/:name">
                            <Report/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;
