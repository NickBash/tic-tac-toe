import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Square from "../Square/Square";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
    my: {
        margin: '20px 0'
    },
    mxbtn: {
        margin: '0 10px'
    }
}))

function Board() {
    const classes = useStyles();

    const [field, setField] = useState([{squares: Array(9).fill(null)}])
    const [player, setPlayer] = useState(true)
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
    const [step, setStep] = useState(0)
    const [btn, setBtn] = useState({btnPrev: true, btnNext: true})


    const handlerClick = (i) => {
        const store = field.slice()
        const storage = store[store.length - 1]
        const sq = storage.squares.slice()
        const pX = player
        if (calculateWinner(sq) || sq[i]) {
             return
        }
        sq[i] = pX ? 'X' : '0'
        const hist = history.slice(0, step + 1)
        hist.push({squares: sq})
        setField([{squares: sq}])
        setPlayer(!pX)
        setHistory(hist)
        setStep((step + 1))
        setBtn((step + 1) === 0 ? {btnPrev: true, btnNext: true} : {btnPrev: false, btnNext: true} )
    }

    const renderSquare = (i) => {
        return <Square value={field[field.length - 1].squares[i]} onClick={() => handlerClick(i)}/>
    }

    const winner = calculateWinner((field.length === 1) ? field[field.length - 1].squares : null)

    let status
    if (winner) {
        status = 'Выиграл ' + winner
    } else {
        status = 'Ходит ' + (player ? 'X' : '0')
    }

    const newStart = () => {
        setField([{squares: Array(9).fill(null)}])
        setPlayer(true)
        setStep(0)
        setBtn({btnPrev: true, btnNext: true})
    }

    const prevTime = () => {
        const storage = history.slice()
        if ((step - 1) >= 0) {
            setStep(step - 1)
            setField([storage[step - 1]])
            if ((step - 1) === 0 && storage.length === 1) {
                setBtn({btnPrev: true, btnNext: true})
            } else if((step - 1) === 0 && storage.length > 1) {
                setBtn({btnPrev: true, btnNext: false})
            } else {
                setBtn({btnPrev: false, btnNext: false})
            }
        }
    }

    const nextTime = () => {
        const storage = history.slice()
        if (step <= (storage.length - 2)) {
            setField([storage[step + 1]])
            setStep(step + 1)
            if ((step + 2) === storage.length) {
                setBtn({btnPrev: false, btnNext: true})
            }
        }
    }

    return (
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <h1>{status}</h1>
                </Grid>

                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        {renderSquare(0)}
                    </Grid>
                    <Grid item>
                        {renderSquare(1)}
                    </Grid>
                    <Grid item>
                        {renderSquare(2)}
                    </Grid>
                </Grid>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        {renderSquare(3)}
                    </Grid>
                    <Grid item>
                        {renderSquare(4)}
                    </Grid>
                    <Grid item>
                        {renderSquare(5)}
                    </Grid>
                </Grid>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        {renderSquare(6)}
                    </Grid>
                    <Grid item>
                        {renderSquare(7)}
                    </Grid>
                    <Grid item>
                        {renderSquare(8)}
                    </Grid>
                </Grid>
                <Grid className={classes.my} container justify="center" spacing={2}>
                    <Button disabled={btn.btnPrev} variant="contained" color='primary' className={classes.mxbtn} onClick={() => prevTime()}>Назад</Button>
                    <Button disabled={btn.btnNext} variant="contained" color='primary' className={classes.mxbtn} onClick={() => nextTime()}>Вперед</Button>
                </Grid>
                <Grid className={classes.my} container justify="center">
                    <Grid item>
                        <Button onClick={() => newStart()}>Начать сначала</Button>
                    </Grid>
                </Grid>
            </Grid>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

export default Board
