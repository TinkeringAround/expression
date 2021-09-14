import React, { FC, useCallback, useState } from 'react';

import { usePhraser } from '../../../store/phraser';
import { selectSongChangeGroups } from '../../../store/phraser/selector';
import { SongChange } from '../../../store/phraser/types';
import { Dict } from '../../../lib/util';

import For from '../../../component/for';
import If from '../../../component/if';
import Icon from '../../../component/icon';

import Change from './change';
import { SChanges } from './styled';

const Changes: FC = () => {
  const changeGroups = usePhraser(selectSongChangeGroups);
  const hasNoChanges = Object.keys(changeGroups).length === 0;

  const collapseStateFrom = useCallback((songChanges: Dict<SongChange[]>) => {
    const changeGroups: Dict<boolean> = {};
    Object.keys(songChanges).forEach(key => {
      changeGroups[key] = false;
    });

    return changeGroups;
  }, []);

  const [collapsedChangeGroups, setCollapsedChangeGroups] = useState<Dict<boolean>>(
    collapseStateFrom(changeGroups)
  );

  const expandIsDisabled = Object.values(collapsedChangeGroups).every(value => value);
  const collapseIsDisabled = Object.values(collapsedChangeGroups).every(value => !value);

  const toggleCollapseStateForChangeGroup = useCallback(
    (key: string) => {
      const adjustedCollapseChangeGroups = { ...collapsedChangeGroups };
      adjustedCollapseChangeGroups[key] = !collapsedChangeGroups[key];
      setCollapsedChangeGroups(adjustedCollapseChangeGroups);
    },
    [collapsedChangeGroups, setCollapsedChangeGroups]
  );

  const setAllChangeGroupsTo = useCallback(
    (value: boolean) => {
      const adjustedCollapseChangeGroups = { ...collapsedChangeGroups };
      Object.keys(collapsedChangeGroups).forEach(key => {
        adjustedCollapseChangeGroups[key] = value;
      });

      setCollapsedChangeGroups(adjustedCollapseChangeGroups);
    },
    [collapsedChangeGroups, setCollapsedChangeGroups]
  );

  return (
    <SChanges>
      <h1>Changes</h1>
      <div className="controls">
        <button
          title="Collapse all Changes"
          disabled={collapseIsDisabled}
          onClick={() => setAllChangeGroupsTo(false)}
        >
          <Icon iconType="collapse" />
        </button>
        <button
          title="Expand all Changes"
          disabled={expandIsDisabled}
          onClick={() => setAllChangeGroupsTo(true)}
        >
          <Icon iconType="expand" />
        </button>
      </div>
      <If condition={hasNoChanges}>
        <p>
          No song selected.
          <br />
          Select a song of a collection in the left sidebar to start editing and see its changes.
        </p>
      </If>
      <If condition={!hasNoChanges}>
        <p>List of all changes made to the selected song.</p>
      </If>
      <div className="content">
        <For
          values={Object.keys(changeGroups)}
          projector={(key: string, index: number) => (
            <section key={`${index}-${collapsedChangeGroups[key]}`}>
              <h2
                title="Show/Hide Changes for this Date"
                onClick={() => toggleCollapseStateForChangeGroup(key)}
              >
                {key}
              </h2>
              <If condition={collapsedChangeGroups[key]}>
                <For
                  values={changeGroups[key]}
                  projector={(change, index) => <Change key={`change-${index}`} change={change} />}
                />
              </If>
              <hr />
            </section>
          )}
        />
      </div>
    </SChanges>
  );
};

export default Changes;
