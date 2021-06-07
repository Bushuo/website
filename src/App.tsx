import React from "react";
import styled from "styled-components";
import Intro from "./sections/Intro";

import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";

function App() {
    return (
        <>
            <Navbar />
            <Main>
                <Intro />
                <Projects />
            </Main>
        </>
    );
}

const Main = styled.main`
    height: calc(100% - 60px);
`;

export default App;
