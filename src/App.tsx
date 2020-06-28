import React from "react";
import styled from "styled-components";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider } from "baseui";
import { BrowserRouter as Router } from "react-router-dom";

import { Nav } from "./views/Nav";
import { Content } from "./views/Content";

const engine = new Styletron();

export function App(props: typeof App.defaultProps) {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <Router>
          <App.Presenter id="app" {...props}>
            <Nav></Nav>
          </App.Presenter>
        </Router>
      </BaseProvider>
    </StyletronProvider>
  );
}

App.defaultProps = {};

App.Presenter = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;

  background-color: black;
`;
