import React from "react";
import Markdown from "markdown-to-jsx";

const Substitutes = React.createContext([]);

function Placeholder(props: typeof Placeholder.defaultProps) {
  const { index } = props;
  // var [texts, ...exprs] = args;
  const args = React.useContext(Substitutes);

  return Array.isArray(args) && args.length > index && index > 0
    ? args[index]
    : null;
}

Placeholder.defaultProps = { index: 0 };

function params() {
  const args =
    arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);

  return [args, this];
}

export function Md(props: typeof Md.defaultProps) {
  const { options, render, state, setState } = props;

  // var exprs = args.slice(1);
  const args = render({ md: params }, state, setState)[0];
  const texts = args[0] as string[];

  const raw = texts.reduce(
    (joined, part, index) =>
      `${joined}<JSX index={${index}}></JSX>${part}`
  );

  const clipped = raw.replace(/^\w*\n/, "");
  const trimmed = clipped.replace(/^\w*/, "");
  const delta = clipped.length - trimmed.length;
  const normalized =
    delta > 0
      ? trimmed.replace(new RegExp(`\n\w{${delta}}`, "g"), "\n")
      : trimmed;

  return (
    <Substitutes.Provider value={args}>
      {React.useMemo(() => {
        return (
          <Markdown
            options={{
              ...options,
              overrides: {
                ...options && options.overrides,
                JSX: Placeholder
              }
            }}
            children={normalized}
          />
        );
      }, [normalized, options])}
    </Substitutes.Provider>
  );
}

Md.defaultProps = {
  options: {} as any,
  render: ({ md = params }, state = {}, setState = () => {}) => [],
  state: {},
  setState: () => {},
};

// const readme = ({ md }, state) => md/* md */ `
// # Hello world
// ${<button>label</button>}
// - ok
// ${<input value="words"></input>}
// `;

// <Md render={readme} />
