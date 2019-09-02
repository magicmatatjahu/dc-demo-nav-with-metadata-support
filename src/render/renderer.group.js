import React from "react";
import { RenderedContent } from "@kyma-project/documentation-component";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { HeadersNavigation } from "./navigation";

export const GroupRenderer = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>AsyncAPI</Tab>
        <Tab>Markdown</Tab>
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
