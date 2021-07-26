import create, { State } from 'zustand';

import { MusicCollection, Song } from './types';

export interface PhraserState extends State {
  readonly collections: MusicCollection[];
  readonly selectedSong: Song | null;
  readonly update: (partial: Partial<PhraserState>) => void;
}

export const usePhraser = create<PhraserState>(set => ({
  collections: [
    {
      id: '1',
      title: 'SUPERSONIC-WORKAHOLIC',
      songs: [
        {
          id: '11',
          title: 'WEREGARURUMON',
          parts: []
        },
        {
          id: '12',
          title: 'BiG BRAiNS',
          parts: []
        },
        {
          id: '13',
          title: 'MARiO KART',
          parts: []
        },
        {
          id: '14',
          title: 'HELLA SEXY',
          parts: []
        },
        {
          id: '15',
          title: 'YOUNG, WiLD & TRiLL',
          parts: []
        },
        {
          id: '16',
          title: 'ACH KOMM',
          parts: []
        },
        {
          id: '17',
          title: 'FRiDAY NiGHT',
          parts: []
        },
        {
          id: '18',
          title: 'SATELLiT',
          parts: []
        }
      ]
    },
    {
      id: '2',
      title: 'PARANORMAL-FLOWMACHINE',
      songs: [
        {
          id: '21',
          title: 'Alarm Code Red',
          parts: []
        },
        {
          id: '22',
          title: 'PULL UP',
          parts: []
        },
        {
          id: '23',
          title: '300 Words In A Minute',
          parts: []
        },
        {
          id: '24',
          title: '$WAG',
          parts: []
        }
      ]
    },
    {
      id: '3',
      title: 'Single',
      songs: []
    }
  ],
  selectedSong: null,
  //@ts-ignore
  update: (partial: Partial<PhraserState>) => set(partial)
}));
