import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    square: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100px',
        height: '100px',
        border: '1px solid #3f51b5',
        borderRadius: '5px',
        marginBottom: theme.spacing(1),
        fontSize: '62px',
        verticalAlign: 'middle',
        fontWeight: 700,
        [theme.breakpoints.between('xs', 'sm')]: {
            width: '80px',
            height: '80px',
            fontSize: '46px',
        },
    }
}));

function Square(props) {
    const classes = useStyles();

    return (
        <div
            className={classes.square}
            onClick={props.onClick}
        >
            {props.value}
        </div>
    )
}

export default Square
