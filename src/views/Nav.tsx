import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import {
  useHistory,
  useLocation,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useStyletron } from "baseui";
import { StyledLink } from "baseui/link";
import { Paragraph2 } from "baseui/typography";
import { FiGithub, FiTwitter } from "react-icons/fi";
import { Navigation } from "baseui/side-navigation";
import { Content } from "../views/Content";
import { SIZE, textFrom } from "../utils/style";

// TODO: shrink this image
import headshotURL from "url:/../asset/image/headshot.jpg";

function Fader(props) {
  return <Fader.Presenter {...props}></Fader.Presenter>;
}

Fader.Presenter = styled.div`
  transition: opacity 1.5s ease-in;

  opacity: ${textFrom("opacity")};

  width: 100%;
  max-height: 100%;
`;

function Clip(props) {
  return <Clip.Presenter {...props}></Clip.Presenter>;
}

Clip.Presenter = styled.div`
  width: 100%;
  max-height: 100%;

  overflow: hidden;
`;

function Headshot(props: typeof Headshot.defaultProps) {
  const headshotRef = React.useRef();
  const [state, setState] = React.useState({ opacity: 0 });
  const { opacity } = state;

  React.useEffect(() => {
    const { current } = headshotRef as any; // TODO: improve types

    if (current) {
      if (current.complete) {
        setState({ opacity: 1 });
      } else {
        current.onload = () => {
          setState({ opacity: 1 });
        };

        return () => (current.onload = null);
      }
    }
  }, [headshotRef.current, setState]);

  return (
    <Fader id="fader" opacity={opacity}>
      <Clip id="clip">
        <Headshot.Presenter
          id="headshot"
          {...props}
          ref={headshotRef}
        ></Headshot.Presenter>
      </Clip>
    </Fader>
  );
}

Headshot.defaultProps = {} as {
  src?: string;
  className?: string;
};

Headshot.Presenter = styled.img`
  position: absolute;
  position: static;

  background-image: url(${textFrom("src")});
  background-image: none;

  width: 100%;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
`;

function BottomBar() {
  const [css, $theme] = useStyletron();

  return (
    <BottomBar.Presenter>
      <span className="padded">
        <StyledLink target="_blank" href="https://github.com/jfinity">
          <FiGithub
            size={$theme.sizing.scale800}
            color={$theme.colors.accent300}
          ></FiGithub>
        </StyledLink>
        <StyledLink target="_blank" href="https://twitter.com/jfinity_moore">
          <FiTwitter
            size={$theme.sizing.scale800}
            color={$theme.colors.accent300}
          ></FiTwitter>
        </StyledLink>
      </span>
      <span className="padded">
        <Paragraph2 color={$theme.colors.accent100} marginBottom={0}>
          Copyright © 2020 Justin C. Moore
        </Paragraph2>
      </span>
    </BottomBar.Presenter>
  );
}

BottomBar.Presenter = styled.div`
  height: 100%;

  display: flex;

  align-items: center;

  justify-content: space-between;

  .padded {
    padding: 0 20px;

    display: flex;

    align-items: center;

    svg {
      margin-right: 16px;
    }
  }
`;

const page = ((mods) => {
  const result = {} as {
    [key in keyof typeof mods]: {
      Header: any;
      Body: any;
    };
  };

  const keys = Object.keys(mods);

  function Nothing() {
    return null;
  }

  for (let index = 0; index < keys.length; index += 1) {
    result[keys[index]] = {
      Header: lazy(() =>
        mods[keys[index]].then(({ Header }) => ({ default: Header || Nothing }))
      ),
      Body: lazy(() =>
        mods[keys[index]].then(({ Body }) => ({ default: Body || Nothing }))
      ),
    };
  }

  return result;
})({
  Home: import("../pages/Home"),
  Slides: import("../pages/Home"),
  Tech: import("../pages/Home"),
  Profile: import("../pages/Home"),
  Founder: import("../pages/Home"),
  Leisure: import("../pages/Home"),
  Musings: import("../pages/Home"),
});

export function Pages() {
  return (
    <Content>
      {{
        header: (
          <Suspense fallback={null}>
            <Switch>
              <Route path="/home" component={page.Home.Header} />
              <Route path="/slides" component={page.Slides.Header} />
              <Route path="/tech" component={page.Tech.Header} />
              <Route path="/profile" component={page.Profile.Header} />
              <Route path="/founder" component={page.Founder.Header} />
              <Route path="/leisure" component={page.Leisure.Header} />
              <Route path="/musings" component={page.Musings.Header} />
            </Switch>
          </Suspense>
        ),
        body: (
          <Suspense fallback={null}>
            <Switch>
              <Route path="/home" component={page.Home.Body} />
              <Route path="/slides" component={page.Slides.Body} />
              <Route path="/tech" component={page.Tech.Body} />
              <Route path="/profile" component={page.Profile.Body} />
              <Route path="/founder" component={page.Founder.Body} />
              <Route path="/leisure" component={page.Leisure.Body} />
              <Route path="/musings" component={page.Musings.Body} />
              <Route render={() => <Redirect to="/home" />} />
            </Switch>
          </Suspense>
        ),
        footer: <BottomBar></BottomBar>
      }}
    </Content>
  );
}

const tabMatch = /^\/(home|slides|tech|profile|founder|leisure|musings)$/;

export function Nav(props: typeof Nav.defaultProps) {
  const location = useLocation();
  const history = useHistory();

  const onChange = React.useCallback(
    ({ event, item }) => {
      event.preventDefault();
      history.push(item.itemId);
    },
    [history]
  );

  const [activeItemId] = location.pathname.match(tabMatch) || [];

  return (
    <>
      <Nav.Presenter id="nav" {...props}>
        <Headshot className="grayscaling" src={headshotURL}></Headshot>
        <div id="flex" className="flex">
          <div id="ceiling" className="ceiling" />
          <div id="overlay" className="overlay">
            <Navigation
              overrides={{
                NavItem: {
                  style: ({ $theme, $active }) => {
                    return {
                      ...$theme.typography.ParagraphLarge,
                      ...($active && {
                        borderLeftColor: $theme.colors.rating400,
                      }),
                      color: $theme.colors.rating400,
                      ":hover": {
                        color: $theme.colors.accent200,
                      },
                    };
                  },
                },
              }}
              items={[
                {
                  title: "Justin C. Moore",
                  itemId: "/home",
                  subNav: [
                    { title: "The Speaker", itemId: "/slides" },
                    { title: "The Technologist", itemId: "/tech" },
                    { title: "The Professional", itemId: "/profile" },
                    { title: "The Founder", itemId: "/founder" },
                    { title: "The Hobbyist", itemId: "/leisure" },
                    // { title: "The Muser", itemId: "/musings" },
                  ],
                },
              ]}
              activeItemId={activeItemId}
              onChange={onChange}
            />
          </div>
          <div id="counterweight" />
          <div />
          <div id="floor" className="floor" />
        </div>
      </Nav.Presenter>
      <Pages></Pages>
    </>
  );
}

Nav.defaultProps = {};

Nav.Presenter = styled.div`
  position: relative;
  border-right: solid gray 1px;
  border-image: linear-gradient(
      to bottom,
      gray,
      gray,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      gray,
      gray
    )
    1 100%;

  width: ${SIZE.mobileS}px;
  height: 100%;
  max-width: 25%;
  min-width: 240px;
  align-self: flex-start;

  .flex {
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .ceiling {
    width: 100%;
    padding-top: 75%;
  }

  .floor {
    width: 100%;
    padding-top: 5%;
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .grayscaling {
    filter: grayscale(100%);
    transition: filter 0.5s;
  }

  :hover .grayscaling {
    filter: grayscale(0%);
  }
`;
