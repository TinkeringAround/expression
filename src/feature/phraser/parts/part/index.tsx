import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Part } from '../../../../store/phraser/types';
import {
  deletePhraserSongPart,
  updatePhraserSongPartName
} from '../../../../store/phraser/actions';

import For from '../../../../component/for';
import If from '../../../../component/if';
import Icon, { IconType } from '../../../../component/icon';

import PartRhyme, { RHYME_HEIGHT } from './part-rhyme';
import { SPart } from './styled';

interface Props {
  part: Part;
}

const BASE_HEIGHT = 'calc(6px + 6.5rem)';

const SongPart: FC<Props> = ({ part }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [partName, setPartName] = useState<string>(part.name);

  const toggle = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded, setExpanded]);

  const deletePart = useCallback(() => {
    deletePhraserSongPart(part.id);
  }, [part]);

  const onChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setPartName(value);
    },
    [setPartName]
  );

  const updatePartName = useCallback(() => {
    if (part.name !== partName) {
      updatePhraserSongPartName(part.id, partName);
    }
  }, [part, partName]);

  const icon: IconType = expanded ? 'arrow-double-up' : 'arrow-double-down';
  const height = expanded
    ? `calc(${BASE_HEIGHT} + ${part.rhymes.length} * ${RHYME_HEIGHT} + ${part.rhymes.length} * 1rem)`
    : BASE_HEIGHT;

  return (
    <Droppable key={part.id} droppableId={part.id}>
      {({ placeholder, innerRef, droppableProps }) => (
        <SPart
          className={`${expanded && 'expanded'}`}
          ref={innerRef}
          style={{ height }}
          {...droppableProps}
        >
          <div className="controls">
            <Icon title="Delete Part" iconType="trash" onClick={deletePart} />
            <Icon iconType={icon} onClick={toggle} />
          </div>
          <input
            className="part-name"
            title={partName}
            value={partName}
            onChange={onChange}
            onBlur={updatePartName}
          />
          <If condition={expanded}>
            <For
              values={part.rhymes}
              projector={(rhyme, index) => <PartRhyme key={rhyme.id} rhyme={rhyme} index={index} />}
            />
          </If>
          {placeholder}
        </SPart>
      )}
    </Droppable>
  );
};

export default SongPart;
