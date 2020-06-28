import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import {
  useHistory,
  useLocation,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navigation } from "baseui/side-navigation";
import { SIZE, textFrom } from "../utils/style";

// TODO: shrink this image
import headshotURL from "url:/../asset/image/headshot.jpg";

function Fader() {}

Fader.Presenter = styled.div`
  transition: opacity 1s ease-in-out;

  opacity: ${textFrom("opacity")};
`;

function Headshot(props: typeof Headshot.defaultProps) {
  const headshotRef = React.useRef();
  const [state, setState] = React.useState({ opacity: 0 });

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
    <Fader.Presenter {...state}>
      <Headshot.Presenter {...props} ref={headshotRef}></Headshot.Presenter>
    </Fader.Presenter>
  );
}

Headshot.defaultProps = {} as {
  src?: string;
  className?: string;
};

Headshot.Presenter = styled.img`
  position: absolute;
  background-image: url(${textFrom("src")});

  width: 100%;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
`;

const Home = lazy(() => import("../pages/Home"));
const Slides = lazy(() => import("../pages/Home"));
const Tech = lazy(() => import("../pages/Home"));
const Portfolio = lazy(() => import("../pages/Home"));
const Founder = lazy(() => import("../pages/Home"));
const Leisure = lazy(() => import("../pages/Home"));

export function Pages() {
  return (
    <Suspense fallback={"..."}>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/slides" component={Slides} />
        <Route path="/tech" component={Tech} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/founder" component={Founder} />
        <Route path="/leisure" component={Leisure} />
        <Route render={() => <Redirect to="/home" />} />
      </Switch>
    </Suspense>
  );
}

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

  const [activeItemId] =
    location.pathname.match(
      /^\/(home|slides|tech|portfolio|founder|leisure)$/
    ) || [];

  return (
    <>
      <Nav.Presenter id="Nav" {...props}>
        <Headshot className="grayscaling" src={headshotURL}></Headshot>
        <div className="flex">
          <div className="overlay">
            <Navigation
              overrides={{
                NavItem: {
                  style: ({ $theme, $active }) => {
                    return {
                      ...$theme.typography.ParagraphLarge,
                      ...($active && {
                        borderLeftColor: $theme.colors.rating200,
                      }),
                      color: $theme.colors.rating200,
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
                    { title: "The Professional", itemId: "/portfolio" },
                    { title: "The Founder", itemId: "/founder" },
                    { title: "The Hobbyist", itemId: "/leisure" },
                  ],
                },
              ]}
              activeItemId={activeItemId}
              onChange={onChange}
            />
          </div>
        </div>
      </Nav.Presenter>
      <Pages></Pages>
    </>
  );
}

Nav.defaultProps = {};

Nav.Presenter = styled.div`
  position: relative;

  width: ${SIZE.mobileS}px;
  height: 100%;

  .flex {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
