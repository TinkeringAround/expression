import React, { FC } from 'react';

import { usePhraser } from '../../../store/phraser';
import { selectSongChangeGroups } from '../../../store/phraser/selector';

import For from '../../../component/for';

import Change from './change';
import { SChanges } from './styled';

const Changes: FC = () => {
  const songChangeGroups = usePhraser(selectSongChangeGroups);

  return (
    <SChanges>
      <h1>Changes</h1>
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
