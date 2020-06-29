import React from "react";
import styled from "styled-components";
import { Card, StyledBody } from "baseui/card";
import { DisplayLarge } from "baseui/typography";
import { Markdown } from "../components/Markdown";

const readme = ({ md }, state) => md/* md */ `
# Hello world
${null && <button>label</button>}
- ok
${null && <input value="words" onChange={Object}></input>}
`;

export default Home;
export function Home() {
  return null;
  // return (
  //   <DisplayLarge marginTop="scale500">
  //     <Markdown render={readme} />
  //   </DisplayLarge>
  // );
  return (
    <Home.Presenter id="home">
      <Card
        overrides={{
          Root: {
            style: ({ $theme }) => {
              return {
                backgroundColor: "initial",
                borderWidth: 0,
              };
            },
          },
        }}
      >
        <Markdown render={readme} />
      </Card>
    </Home.Presenter>
  );
}

Home.Presenter = styled.div`
  flex: 1;
`;
