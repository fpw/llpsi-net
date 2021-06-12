/*
 *   LLPSI.net - Learning platform for Lingua Latina per se illustrata
 *   Copyright (C) 2020 Folke Will <folko@solhost.org>
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Affero General Public License for more details.
 *
 *   You should have received a copy of the GNU Affero General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Link as RouterLink, Switch, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import SportsEsports from '@material-ui/icons/SportsEsports';
import Compare from '@material-ui/icons/Compare';
import People from '@material-ui/icons/People';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { WordDB } from '../models/WordDB';
import { About } from './About';
import { ParticleList } from './words/ParticleList';
import { WordList } from './words/WordList';
import { DeclensionGameView } from './games/DeclensionGame/DeclensionGameView';
import { FlashCardGameView } from './games/FlashCardGame/FlashCardGameView';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { createMuiTheme, Divider, Paper, ThemeProvider } from '@material-ui/core';
import { MenuBook } from '@material-ui/icons';
import { ChapterList } from './book/ChapterList';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ed6b21',
            contrastText: '#F5F5F5'
        }
    }
});

export function App(props: {db: WordDB}) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <Router>
                    <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton edge='start' color='inherit' onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                                <MenuIcon />
                            </IconButton>
                            <Typography component='h1' variant='h6' noWrap>
                                <RouterLink to='/' style={{textDecoration: 'none', color: 'inherit'}}>Lingua Latina</RouterLink>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant='permanent' open={open}
                        classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}>
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button component={RouterLink} to='/words/nouns'>
                                <ListItemIcon title='Nouns'><LocalFloristIcon /></ListItemIcon>
                                <ListItemText primary='Nouns' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/words/adjectives'>
                                <ListItemIcon title='Adjectives'><FitnessCenterIcon /></ListItemIcon>
                                <ListItemText primary='Adjectives' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/words/pronouns'>
                                <ListItemIcon title='Pronouns'><People /></ListItemIcon>
                                <ListItemText primary='Pronouns' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/words/verbs'>
                                <ListItemIcon title='Verbs'><DirectionsRun /></ListItemIcon>
                                <ListItemText primary='Verbs' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/words/particles'>
                                <ListItemIcon title='Particles'><PlaylistAddCheckIcon /></ListItemIcon>
                                <ListItemText primary='Particles' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/book/chapters'>
                                <ListItemIcon title='Chapters'><MenuBook /></ListItemIcon>
                                <ListItemText primary='Chapters' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/games/declension'>
                                <ListItemIcon title='Games'><SportsEsports /></ListItemIcon>
                                <ListItemText primary='Games' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/games/flashcard'>
                                <ListItemIcon title='Games'><Compare /></ListItemIcon>
                                <ListItemText primary='Games' />
                            </ListItem>
                            <ListItem button component={RouterLink} to='/about'>
                                <ListItemIcon title='About'><InfoIcon /></ListItemIcon>
                                <ListItemText primary='About' />
                            </ListItem>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth='lg' className={classes.container}>
                            <Paper className={classes.paper}>
                                <Switch>
                                    <Route exact path="/">
                                        <Redirect to="/games/declension" />
                                    </Route>

                                    <Route path="/words/nouns">
                                        <WordList words={props.db.words.nouns} caption='Nouns' />
                                    </Route>

                                    <Route path="/words/adjectives">
                                        <WordList words={props.db.words.adjectives} caption='Adjectives' />
                                    </Route>

                                    <Route path="/words/pronouns">
                                        <WordList words={props.db.words.pronouns} caption='Pronouns' />
                                    </Route>

                                    <Route path="/words/verbs">
                                        <WordList words={props.db.words.verbs} caption='Verbs' />
                                    </Route>

                                    <Route path="/words/particles">
                                        <ParticleList db={props.db} />
                                    </Route>

                                    <Route path="/book/chapters">
                                        <ChapterList db={props.db} />
                                    </Route>

                                    <Route path="/games/declension">
                                        <DeclensionGameView db={props.db} />
                                    </Route>

                                    <Route path="/games/flashcard">
                                        <FlashCardGameView db={props.db} />
                                    </Route>

                                    <Route path="/about">
                                        <About db={props.db} />
                                    </Route>
                                </Switch>
                            </Paper>
                            <Copyright />
                        </Container>
                    </main>
                </Router>
            </div>
        </ThemeProvider>
    );
}

function Copyright() {
    return (
        <Box pt={4}>
            <Typography variant='body2' color='textSecondary' align='center'>
                Copyright © <a href='https://github.com/fpw/'>Folke Will</a>, 2021                
            </Typography>
            <Typography variant='body2' color='textSecondary' align='center'>
                whip sound Mike Koenig,  <a href='https://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>, via Wikimedia Commons
            </Typography>

        </Box>
    );
}
