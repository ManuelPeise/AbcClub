import React from "react";
import LandingPageContainer from "./LandingPageContainer";

const LandingPageDataService: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const onTabChange = React.useCallback(
    (e: React.ChangeEvent<{}>, value: number) => {
      setSelectedTab(value);
    },
    []
  );

  return (
    <LandingPageContainer selectedTab={selectedTab} onTabChange={onTabChange} />
  );
};

export default LandingPageDataService;
