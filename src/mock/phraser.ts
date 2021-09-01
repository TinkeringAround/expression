import { MusicCollection, Part, Rhyme, Song, SongChange } from '../store/phraser/types';
import { toSnapshot } from '../lib/util';
import { PhraserState, usePhraser } from '../store/phraser';

export const getSongChangeMock = (songChange?: Partial<SongChange>): SongChange => ({
  date: '01. Jan 1970',
  action: 'update',
  kind: 'title',
  snapshot: toSnapshot(getSongMock()),
  ...songChange
});

export const getRhymeMock = (rhyme?: Partial<Rhyme>): Rhyme => ({
  id: '1111',
  lines: [
    "Ey, sorry, ne, aber ich feier' das so krank, wenn du diese geilen lustigen Texte machst",
    'Weißt du? Dieses Geile, Lustige einfach, du weißt schon',
    'Auch mal sowas wie „Digimon“ sagen oder so kaputte Schuhe.',
    "Es ist so, hahaha, es ist so geil, also ich feier' das so geisteskrank, sorry, ne"
  ],
  ...rhyme
});

export const getPartMock = (part?: Partial<Part>): Part => ({
  id: '111',
  name: 'Intro',
  rhymes: [getRhymeMock()],
  ...part
});

export const getSongMock = (song?: Partial<Song>): Song => ({
  id: '11',
  title: 'WEREGARURUMON',
  parts: [
    getPartMock(),
    {
      id: '112',
      name: 'Refrain',
      rhymes: [
        getRhymeMock({
          id: '1121',
          lines: [
            "Ey, sorry, ne, aber ich feier' das so krank, wenn du diese geilen lustigen Texte machst",
            'Weißt du? Dieses Geile, Lustige einfach, du weißt schon',
            'Auch mal sowas wie „Digimon“ sagen oder so kaputte Schuhe.',
            "Es ist so, hahaha, es ist so geil, also ich feier' das so geisteskrank, sorry, ne"
          ]
        }),
        getRhymeMock({
          id: '1122',
          lines: [
            "Ich komm' mit Fucked-up Chucks, während du mit dein'n Schuhen protzt (Beastboy, oh, yeah)",
            "Ich komm' mit Löchern in den Jeans, so wie Wеregarurumon (Swag, woah, yeah, yeah)",
            "Ich komm' mit Fuckеd-up Chucks, während du mit dein'n Schuhen protzt (Yeah, protzt, yeah, protzt, yeah, protzt, yeah)",
            "Ich komm' mit Löchern in den Jeans, so wie Weregarurumon (Yeah, -mon, yeah, -mon, yeah, -mon, yeah) (Yeah, let's go)"
          ]
        })
      ]
    }
  ],
  changes: [],
  ...song
});

export const getCollectionMock = (collection?: Partial<MusicCollection>): MusicCollection => ({
  id: '1',
  title: 'SUPERSONIC-WORKAHOLIC',
  songs: [
    getSongMock(),
    getSongMock({
      id: '12',
      title: 'BiG BRAiNS',
      parts: []
    }),
    getSongMock({
      id: '13',
      title: 'MARiO KART',
      parts: []
    })
  ],
  ...collection
});

export const getCompleteCollectionsMock = (): MusicCollection[] => [
  {
    id: '1',
    title: 'SUPERSONIC-WORKAHOLIC',
    songs: [
      {
        id: '11',
        title: 'WEREGARURUMON',
        parts: [
          {
            id: '111',
            name: 'Intro',
            rhymes: [
              {
                id: '1111',
                lines: ['Ich habe ein geiles Haus', 'und du bist eine Maus.']
              },
              {
                id: '1112',
                lines: [
                  'Ich will Rapper sein, das ist mein Traum',
                  'Jeder pinkelt mit eleganz an einen Baum',
                  'Das ist ein Beispieltext, reimen tut nicht weh',
                  'doch Reimen tut sich der Wumps trotzdem nicht.'
                ]
              }
            ]
          },
          {
            id: '112',
            name: 'Refrain',
            rhymes: [
              {
                id: '1121',
                lines: [
                  "Ey, sorry, ne, aber ich feier' das so krank, wenn du diese geilen lustigen Texte machst",
                  'Weißt du? Dieses Geile, Lustige einfach, du weißt schon',
                  'Auch mal sowas wie „Digimon“ sagen oder so kaputte Schuhe.',
                  "Es ist so, hahaha, es ist so geil, also ich feier' das so geisteskrank, sorry, ne"
                ]
              },
              {
                id: '1122',
                lines: [
                  "Ich komm' mit Fucked-up Chucks, während du mit dein'n Schuhen protzt (Beastboy, oh, yeah)",
                  "Ich komm' mit Löchern in den Jeans, so wie Wеregarurumon (Swag, woah, yeah, yeah)",
                  "Ich komm' mit Fuckеd-up Chucks, während du mit dein'n Schuhen protzt (Yeah, protzt, yeah, protzt, yeah, protzt, yeah)",
                  "Ich komm' mit Löchern in den Jeans, so wie Weregarurumon (Yeah, -mon, yeah, -mon, yeah, -mon, yeah) (Yeah, let's go)"
                ]
              }
            ]
          }
        ],
        changes: []
      },
      {
        id: '12',
        title: 'BiG BRAiNS',
        parts: [],
        changes: []
      },
      {
        id: '13',
        title: 'MARiO KART',
        parts: [],
        changes: []
      },
      {
        id: '14',
        title: 'HELLA SEXY',
        parts: [],
        changes: []
      },
      {
        id: '15',
        title: 'YOUNG, WiLD & TRiLL',
        parts: [],
        changes: []
      },
      {
        id: '16',
        title: 'ACH KOMM',
        parts: [],
        changes: []
      },
      {
        id: '17',
        title: 'FRiDAY NiGHT',
        parts: [],
        changes: []
      },
      {
        id: '18',
        title: 'SATELLiT',
        parts: [],
        changes: []
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
        parts: [],
        changes: []
      },
      {
        id: '22',
        title: 'PULL UP',
        parts: [],
        changes: []
      },
      {
        id: '23',
        title: '300 Words In A Minute',
        parts: [],
        changes: []
      },
      {
        id: '24',
        title: '$WAG',
        parts: [],
        changes: []
      }
    ]
  },
  {
    id: '3',
    title: 'Single',
    songs: []
  }
];
export const getPhraserMock = (phraserState?: Partial<PhraserState>): PhraserState => {
  const { update } = usePhraser.getState();

  return {
    collections: [getCollectionMock()],
    selectedSong: null,
    update,
    ...phraserState
  } as PhraserState;
};
