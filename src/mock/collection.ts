import { MusicCollection, Part, Pattern, Rhyme, Song } from '../store/phraser/types';

export const getRhymeMock = (rhyme?: Partial<Rhyme>): Rhyme => ({
  id: '1111',
  lines: [
    "Ey, sorry, ne, aber ich feier' das so krank, wenn du diese geilen lustigen Texte machst",
    'Weißt du? Dieses Geile, Lustige einfach, du weißt schon',
    'Auch mal sowas wie „Digimon“ sagen oder so kaputte Schuhe.',
    "Es ist so, hahaha, es ist so geil, also ich feier' das so geisteskrank, sorry, ne"
  ],
  pattern: Pattern.NONE,
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
                pattern: Pattern.NONE,
                lines: ['Ich habe ein geiles Haus', 'und du bist eine Maus.']
              },
              {
                id: '1112',
                pattern: Pattern.KREUZ,
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
                pattern: Pattern.NONE,
                lines: [
                  "Ey, sorry, ne, aber ich feier' das so krank, wenn du diese geilen lustigen Texte machst",
                  'Weißt du? Dieses Geile, Lustige einfach, du weißt schon',
                  'Auch mal sowas wie „Digimon“ sagen oder so kaputte Schuhe.',
                  "Es ist so, hahaha, es ist so geil, also ich feier' das so geisteskrank, sorry, ne"
                ]
              },
              {
                id: '1122',
                pattern: Pattern.KREUZ,
                lines: [
                  "Ich komm' mit Fucked-up Chucks, während du mit dein'n Schuhen protzt (Beastboy, oh, yeah)",
                  "Ich komm' mit Löchern in den Jeans, so wie Wеregarurumon (Swag, woah, yeah, yeah)",
                  "Ich komm' mit Fuckеd-up Chucks, während du mit dein'n Schuhen protzt (Yeah, protzt, yeah, protzt, yeah, protzt, yeah)",
                  "Ich komm' mit Löchern in den Jeans, so wie Weregarurumon (Yeah, -mon, yeah, -mon, yeah, -mon, yeah) (Yeah, let's go)"
                ]
              }
            ]
          }
        ]
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
];
