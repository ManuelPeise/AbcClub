import { Grid, Tab } from "@material-ui/core";
import React from "react";
import TabContainer from "../../components/tab/TabContainer";
import TabPanel from "../../components/tab/TabPanel";

interface IProps {
  selectedTab: number;
  onTabChange: (e: React.ChangeEvent<{}>, value: number) => void;
}

const LandingPageContainer: React.FC<IProps> = (props) => {
  const { selectedTab, onTabChange } = props;

  const tabs = React.useMemo((): JSX.Element[] => {
    const tabs = [] as JSX.Element[];

    tabs.push(
      <Tab
        key={0}
        value={0}
        label="Home"
        selected={selectedTab === 0}
        fullWidth
      />
    );
    tabs.push(
      <Tab
        key={1}
        value={1}
        label="Eltern / Lehrer Login"
        selected={selectedTab === 1}
        fullWidth
      />
    );
    tabs.push(
      <Tab
        key={2}
        value={2}
        label="Statistiken"
        selected={selectedTab === 2}
        fullWidth
      />
    );

    return tabs;
  }, [selectedTab]);

  const tabContainers = React.useMemo(() => {
    const containers = [] as JSX.Element[];

    containers.push(
      <TabPanel value={0} selectedValue={selectedTab}>
        <div>Home</div>
      </TabPanel>
    );
    containers.push(
      <TabPanel value={1} selectedValue={selectedTab}>
        <div>Statistiken</div>
      </TabPanel>
    );
    containers.push(
      <TabPanel value={2} selectedValue={selectedTab}>
        <div>Login</div>
      </TabPanel>
    );

    return containers;
  }, [selectedTab]);

  return (
    <Grid container>
      <TabContainer
        selectedValue={selectedTab}
        tabs={tabs}
        tabPages={tabContainers}
        width="100vw"
        onChange={onTabChange}
      />
    </Grid>
  );
};

export default LandingPageContainer;
