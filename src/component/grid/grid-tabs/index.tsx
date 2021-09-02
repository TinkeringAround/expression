import React, { FC, useCallback, useState } from 'react';

import For from '../../for';
import If from '../../if';

import { SGridTabIndicator, SGridTabContent, SGridTabs } from './styled';

export interface GridTab {
  name: string;
  component: JSX.Element;
  count?: number;
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
          projector={({ name, count }, index) => (
            <SGridTabIndicator
              key={`tab-${name}`}
              active={selectedTab === index}
              onClick={() => toggleTab(index)}
            >
              {name}
              <If condition={selectedTab !== index && !!count && count > 0}>
                <span className="count">{count}</span>
              </If>
            </SGridTabIndicator>
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
