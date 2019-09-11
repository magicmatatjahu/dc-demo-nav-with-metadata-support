import React from "react";
import { RenderedContent } from "@kyma-project/documentation-component";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { HeadersNavigation } from "./navigation";

const renderers = ["AsyncAPI", "Markdown"];

export const GroupRenderer = () => {
  return (
    <Tabs>
      <TabList>
        {renderers.map(el => (
          <Tab key={el} className="tab">
            {el}
          </Tab>
        ))}
      </TabList>

      <TabPanel>
        <RenderedContent sourceTypes={["asyncapi"]} />
      </TabPanel>
      <TabPanel>
        <hr />
        <HeadersNavigation />
        <hr />
        <RenderedContent sourceTypes={["markdown"]} />
      </TabPanel>
    </Tabs>
  );
};
