import React, { FC } from 'react';

import { usePhraser } from '../../../store/phraser';
import { selectSongChangeGroups } from '../../../store/phraser/selector';

import For from '../../../component/for';
import If from '../../../component/if';

import Change from './change';
import { SChanges } from './styled';

const Changes: FC = () => {
  const songChangeGroups = usePhraser(selectSongChangeGroups);
  const hasChanges = Object.keys(songChangeGroups).length === 0;

  return (
    <SChanges>
      <h1>Changes</h1>
      <If condition={hasChanges}>
        <p>No changes yet, start working.</p>
      </If>
      <For
        values={Object.keys(songChangeGroups)}
        projector={(key: string, index: number) => (
          <section key={index}>
            <h2>{key}</h2>
            <For
              values={songChangeGroups[key]}
              projector={(change, index) => <Change key={`change-${index}`} change={change} />}
            />
          </section>
        )}
      />
    </SChanges>
  );
};

export default Changes;
