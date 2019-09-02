import React from "react";

const Component = ({ source }) => {
  const {
    renderedContent,
    frontmatter: { title }
  } = source.data;

  return (
    <article>
      <header>
        <h2>{title}</h2>
      </header>
      <section>{renderedContent}</section>
    </article>
  );
};

export const MarkdownRenderer = {
  component: Component,
  sourceType: ["markdown"]
};
