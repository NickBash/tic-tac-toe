import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Board from "./Board/Board";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '30px 0'
    }
}));

function Game() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Board />
        </Grid>
    )
}

export default Game
