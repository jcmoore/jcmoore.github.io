import React from "react";
import { useStyletron } from "baseui";
import styled from "styled-components";
import { textFrom } from "../utils/style";
import { Md } from "../utils/Md";

const Cascade = styled.div`
  * {
    color: ${textFrom("color")};
  }
`;

export function Markdown(props) {
  const { options } = props;
  const [css, $theme] = useStyletron();

  const opts = React.useMemo(() => {
    return {
      ...options,
      createElement(type, props, children) {
        return (
          <div key={props.key} className="parent">
            {React.createElement(type, props, children)}
          </div>
        );
      },
    };
  }, [options]);

  return (
    <Cascade color={$theme.colors.rating200}>
      <Md {...props} />
    </Cascade>
  );
}

/*
!{
  ["react" || ""](node, output, state) {
    // <blockquote />
    return (
      <blockquote key={state.key}>{output(node.content, state)}</blockquote>
    );
  },
  ["react" || ""](_, __, state) {
    // <br />
    return <br key={state.key} />;
  },
  ["react" || ""](_, __, state) {
    // <hr />
    return <hr key={state.key} />;
  },
  ["react" || ""](node, output, state) {
    // <pre />
    // <code />
    return (
      <pre key={state.key}>
        <code className={node.lang ? `lang-${node.lang}` : ""}>
          {node.content}
        </code>
      </pre>
    );
  },
  ["react" || ""](node, output, state) {
    // <code />
    return <code key={state.key}>{node.content}</code>;
  },
  ["react" || ""](node, output, state) {
    // <a />
    // <sup />
    return (
      <a key={state.key} href={sanitizeUrl(node.target)}>
        <sup key={state.key}>{node.content}</sup>
      </a>
    );
  },
  ["react" || ""](node, output, state) {
    // <input />
    return (
      <input
        checked={node.completed}
        key={state.key}
        readOnly
        type="checkbox"
      />
    );
  },
  ["react" || ""](node, output, state) {
    // <h1 />
    // <h2 />
    // <h3 />
    // <h4 />
    // <h5 />
    // <h6 />
    const Tag = `h${node.level}`;
    return (
      <Tag id={node.id} key={state.key}>
        {output(node.content, state)}
      </Tag>
    );
  },
  ["react" || ""](node, output, state) {
    // <img />
    return (
      <img
        key={state.key}
        alt={node.alt || undefined}
        title={node.title || undefined}
        src={sanitizeUrl(node.target)}
      />
    );
  },
  ["react" || ""](node, output, state) {
    // <a />
    return (
      <a key={state.key} href={sanitizeUrl(node.target)} title={node.title}>
        {output(node.content, state)}
      </a>
    );
  },
  ["react" || ""](node, output, state) {
    // <ol />
    // <ul />
    const Tag = node.ordered ? "ol" : "ul";

    return (
      <Tag key={state.key} start={node.start}>
        {node.items.map(function generateListItem(item, i) {
          return <li key={i}>{output(item, state)}</li>;
        })}
      </Tag>
    );
  },
  ["react" || ""](node, output, state) {
    // <p />
    return <p key={state.key}>{output(node.content, state)}</p>;
  },
  ["react" || ""](node, output, state) {
    // <img />
    return (
      <img
        key={state.key}
        alt={node.alt}
        src={sanitizeUrl(refs[node.ref].target)}
        title={refs[node.ref].title}
      />
    );
  },
  ["react" || ""](node, output, state) {
    // <a />
    // <span />
    return refs[node.ref] ? (
      <a
        key={state.key}
        href={sanitizeUrl(refs[node.ref].target)}
        title={refs[node.ref].title}
      >
        {output(node.content, state)}
      </a>
    ) : (
      <span key={state.key}>{output(node.fallbackContent, state)}</span>
    );
  },
  ["react" || ""](node, output, state) {
    // <table />
    // <thead />
    // <tr />
    // <th />
    // <tbody />
    // <td />
    return (
      <table key={state.key}>
        <thead>
          <tr>
            {node.header.map(function generateHeaderCell(content, i) {
              return (
                <th key={i} style={getTableStyle(node, i)}>
                  {output(content, state)}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {node.cells.map(function generateTableRow(row, i) {
            return (
              <tr key={i}>
                {row.map(function generateTableCell(content, c) {
                  return (
                    <td key={c} style={getTableStyle(node, c)}>
                      {output(content, state)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
  ["react" || ""](node, output, state) {
    // <strong />
    return <strong key={state.key}>{output(node.content, state)}</strong>;
  },
  ["react" || ""](node, output, state) {
    // <em />
    return <em key={state.key}>{output(node.content, state)}</em>;
  },
  ["react" || ""](node, output, state) {
    // <del />
    return <del key={state.key}>{output(node.content, state)}</del>;
  },
  ["react" || ""](node, output, state) {
    // </>
    return (
      <node.tag key={state.key} {...node.attrs}>
        {node.noInnerParse ? node.content : output(node.content, state)}
      </node.tag>
    );
  },
  ["react" || ""](node, output, state) {
    // </>
    return <node.tag {...node.attrs} key={state.key} />;
  },
};
// */

// <blockquote />
// <br />
// <hr />
// <pre />
// <code />
// <code />
// <a />
// <sup />
// <input />
// <h1 />
// <h2 />
// <h3 />
// <h4 />
// <h5 />
// <h6 />
// <img />
// <a />
// <ol />
// <ul />
// <p />
// <img />
// <a />
// <span />
// <table />
// <thead />
// <tr />
// <th />
// <tbody />
// <td />
// <strong />
// <em />
// <del />
// </>
// </>
