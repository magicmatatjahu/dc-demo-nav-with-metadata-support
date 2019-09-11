import React from "react";
import ReactDOM from "react-dom";
import { DC, Content } from "@kyma-project/documentation-component";
import { asyncapiSpecMock } from "./mocks/asyncApiMock";
import { markdownMock1, markdownMock2 } from "./mocks/markdownMocks";
import {
  markdownRenderEngine,
  plugins as markdownPlugins
} from "@kyma-project/dc-markdown-render-engine";
import { asyncApiRenderEngine } from "@kyma-project/dc-async-api-render-engine";
import { GroupRenderer } from "./render/renderer.group";
import { MarkdownRenderer } from "./render/markdown.renderer";

import "@kyma-project/dc-markdown-render-engine/lib/styles.css";

import "./styles.css";
import "fiori-fundamentals/dist/fiori-fundamentals.css";
import "fiori-fundamentals/dist/fonts.min.css";

const SOURCES = [
  {
    sources: [
      {
        source: {
          type: "markdown",
          rawContent: markdownMock1,
          data: {
            frontmatter: {
              title: "Celery"
            }
          }
        }
      },
      {
        source: {
          type: "markdown",
          rawContent: markdownMock2,
          data: {
            frontmatter: {
              title: "Veggies"
            }
          }
        }
      },
      {
        source: {
          type: "asyncapi",
          rawContent: asyncapiSpecMock
        }
      }
    ]
  }
];

const RENDER_ENGINES = [markdownRenderEngine, asyncApiRenderEngine];
const PLUGINS = [
  markdownPlugins.frontmatterMutationPlugin,
  markdownPlugins.headersExtractorPlugin
];
const RENDERERS = {
  single: [MarkdownRenderer],
  group: GroupRenderer
};
const App = () => (
  <DC.Provider
    sources={SOURCES}
    renderEngines={RENDER_ENGINES}
    plugins={PLUGINS}
  >
    <Content renderers={RENDERERS} />
  </DC.Provider>
);
ReactDOM.render(<App />, document.getElementById("root"));
