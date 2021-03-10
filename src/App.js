import React from "react";
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Game from "./components/Game";

function App() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="lg">
                    <Game />
            </Container>
        </React.Fragment>
    );
}

export default App;
