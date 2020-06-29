import React from "react";
import styled from "styled-components";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider } from "baseui";
import { BrowserRouter as Router } from "react-router-dom";
import { SIZE, textFrom } from "./utils/style";

import { Nav } from "./views/Nav";

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
  min-height: ${2 * SIZE.mobileS}px;

  position: absolute;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;

  background-color: black;
`;
