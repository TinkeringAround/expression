import React, { FC, useCallback, useEffect, useState } from 'react';

import { usePhraser } from '../../../store/phraser';
import { setKaraokeMode } from '../../../store/phraser/actions';

import Icon from '../../icon';

import { SKaraoke } from './styled';

export const KARAOKE_MODAL = 'karaoke-modal';

const Karaoke: FC = () => {
  const { selectedSong } = usePhraser();
  const [lines, setLines] = useState<string[]>([]);

  const closeKaraokeMode = useCallback(() => {
    setKaraokeMode(false);
  }, []);

  useEffect(() => {
    if (selectedSong) {
      const combinedLines: string[] = selectedSong.parts.reduce((lines, { rhymes }) => {
        lines.push(...rhymes.map(({ lines }) => lines).flat(1));
        return lines;
      }, [] as string[]);
      setLines(combinedLines);
    }
  }, [selectedSong, setLines]);

  return (
    <SKaraoke id={KARAOKE_MODAL}>
      <Icon iconType="cross" onClick={closeKaraokeMode} />
      {lines.map((line, index) => (
        <span key={index} className="line">
          {line}
        </span>
      ))}
    </SKaraoke>
  );
};

export default Karaoke;
