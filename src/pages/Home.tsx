import React from "react";
import styled from "styled-components";
import { Card, StyledBody } from "baseui/card";
import { DisplayLarge } from "baseui/typography";
import { Markdown } from "../components/Markdown";
import { Content } from "../views/Content";

const readme = ({ md }, state) => md/* md */ `
# Hello world
${null && <button>label</button>}
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
- ok
${null && <input value="words" onChange={Object}></input>}
`;

export function Body() {
  return null;
  // return (
  //   <DisplayLarge marginTop="scale500">
  //     <Markdown render={readme} />
  //   </DisplayLarge>
  // );
  return (
    <Card
      overrides={{
        Root: {
          style: ({ $theme }) => {
            return {
              backgroundColor: "initial",
              borderTopStyle: "none",
              borderLeftStyle: "none",
              borderBottomStyle: "none",
              borderRightStyle: "none",
            };
          },
        },
      }}
    >
      <Markdown render={readme} />
    </Card>
  );
}
