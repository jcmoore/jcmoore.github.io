import React from "react";
import styled from "styled-components";
import { useStyletron } from "baseui";
import { SIZE, scalarFrom } from "../utils/style";

export function Header(props) {
  const [css, $theme] = useStyletron();

  return (
    <Header.Presenter
      {...props}
      height={$theme.sizing.scale1600}
    ></Header.Presenter>
  );
}

Header.Presenter = styled.div`
  transition: height 0.5s ease-in-out;
  height: ${scalarFrom("height")};

  border-bottom: solid gray 1px;
  border-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      gray,
      gray,
      gray
    )
    1;
`;

export function Footer(props) {
  const [css, $theme] = useStyletron();

  return (
    <Footer.Presenter
      {...props}
      height={$theme.sizing.scale1400}
    ></Footer.Presenter>
  );
}

Footer.Presenter = styled.div`
  transition: height 0.5s ease-in-out;
  height: ${scalarFrom("height")};

  border-top: solid gray 1px;
  border-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      gray,
      gray,
      gray
    )
    1;
`;

function Body(props) {
  return <Body.Presenter {...props}></Body.Presenter>;
}

Body.Presenter = styled.div`
  flex: 1;
`;

function View(props) {
  return <View.Presenter {...props}></View.Presenter>;
}

View.Presenter = styled.div`
  min-height: 100%;

  display: flex;

  flex-direction: column;

  justify-content: space-between;
`;

function Overflow(props) {
  return <Overflow.Presenter {...props}></Overflow.Presenter>;
}

Overflow.Presenter = styled.div`
  flex: 1;

  overflow: auto;
`;

export function Content(props: typeof Content.defaultProps) {
  const { children } = props;

  const { header, body, footer } = {
    ...Content.defaultProps.children,
    ...children,
  };

  return (
    <Content.Presenter id="content">
      <Header id="header">
        {typeof header === "function" ? header() : header}
      </Header>
      <Overflow id="overflow">
        <View id="view">
          <Body id="body">{typeof body === "function" ? body() : body}</Body>
          <Footer id="footer">
            {typeof footer === "function" ? footer() : footer}
          </Footer>
        </View>
      </Overflow>
    </Content.Presenter>
  );
}

Content.defaultProps = {
  children: {
    header: undefined,
    body: () => <span></span>,
    footer: <span></span>,
  },
} as {
  children?: {
    header?: any | (() => any);
    body?: any | (() => any);
    footer?: any | (() => any);
  };
};

Content.Presenter = styled.div`
  flex: 1;

  display: flex;

  flex-direction: column;
`;
