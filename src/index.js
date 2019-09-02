import React from "react";
import ReactDOM from "react-dom";
import {
  DC,
  RenderedContent,
  GroupRendererComponent
} from "@kyma-project/documentation-component";
import { asyncapiSpecMock } from "./asyncApiMock";
import { markdownMock1, markdownMock2 } from "./markdownMocks";
import {
  markdownRenderEngine,
  plugins as markdownPlugins
} from "@kyma-project/dc-markdown-render-engine";
import { asyncApiRenderEngine } from "@kyma-project/dc-async-api-render-engine";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
const SOURCES = [
  {
    sources: [
      {
        source: {
          type: "markdown",
          rawContent: markdownMock1
        }
      },
      {
        source: {
          type: "markdown",
          rawContent: markdownMock2
        }
      }
    ]
  },
  {
    source: {
      type: "asyncapi",
      rawContent: asyncapiSpecMock
    }
  }
];

const RENDER_ENGINES = [markdownRenderEngine, asyncApiRenderEngine];
const PLUGINS = [markdownPlugins.frontmatterMutationPlugin];
const App = () => (
  <DC.Provider
    sources={SOURCES}
    renderEngines={RENDER_ENGINES}
    plugins={PLUGINS}
  >
    <Tabs>
      <TabList>
        <Tab>Markdown</Tab>
        <Tab>AsyncAPI</Tab>
      </TabList>

      <TabPanel>
        <RenderedContent sourceTypes={["markdown"]} />
      </TabPanel>
      <TabPanel>
        <RenderedContent sourceTypes={["asyncapi"]} />
      </TabPanel>
    </Tabs>
  </DC.Provider>
);
ReactDOM.render(<App />, document.getElementById("root"));
