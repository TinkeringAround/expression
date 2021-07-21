import React, { FC, useCallback, useState } from 'react';

import For from '../../for';
import If from '../../if';

import { SGridTab, SGridTabContent, SGridTabs } from './styled';

export interface GridTab {
  name: string;
  component: any;
}

interface Props {
  tabs: GridTab[];
  initialTab?: number;
}

const NO_TAB = -1;

const GridTabs: FC<Props> = ({ tabs, initialTab = NO_TAB }) => {
  const [selectedTab, setSelectedTab] = useState<number>(initialTab);

  const toggleTab = useCallback(
    (tabIndex: number) => {
      if (selectedTab === tabIndex) setSelectedTab(NO_TAB);
      else setSelectedTab(tabIndex);
    },
    [selectedTab, setSelectedTab]
  );

  const expanded = selectedTab >= 0;

  return (
    <SGridTabs expanded={expanded}>
      <div className="tabs">
        <For
          values={tabs}
          projector={({ name }, index) => (
            <SGridTab
              key={`tab-${name}`}
              active={selectedTab === index}
              onClick={() => toggleTab(index)}
            >
              {name}
            </SGridTab>
          )}
        />
      </div>
      <If condition={expanded}>
        <SGridTabContent className="tab">{tabs[selectedTab]?.component}</SGridTabContent>
      </If>
    </SGridTabs>
  );
};

export default GridTabs;
