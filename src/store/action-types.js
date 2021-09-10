const ACTION = Object.freeze({
  updateRoute: '[ROUTE] Update',

  addSlicerFiles: '[SLICER] Add Files',
  removeSlicerFile: '[SLICER] Remove File',
  loadSlicerFile: '[SLICER] Load File',
  slicerFileLoaded: '[SLICER] File Loaded',
  updateSlicerSelection: '[SLICER] Update Slicer Selection',
  exportSlicerFile: '[SLICER] Export Slicer File',
  updateSlicerIsPlaying: '[SLICER] Update Slicer IsPlaying',
  updateSlicerProgression: '[SLICER] Update Slicer Progression',
  slicerFileExported: '[SLICER] Slicer File Exported',
  slicerFileExportCancelled: '[SLICER] Slicer File Export Cancelled',

  loadPhraser: '[PHRASER] Load',
  phraserLoaded: '[PHRASER] Loaded',
  updatePhraser: '[PHRASER] Update',
  addPhraserCollection: '[PHRASER] Add Music Collection',
  reorderPhraserCollection: '[PHRASER] Reorder Collection',
  deletePhraserCollection: '[PHRASER] Delete Music Collection',
  updatePhraserCollectionTitle: '[PHRASER] Update Music Collection Title',
  reorderPhraserCollectionSongs: '[PHRASER] Update Music Collection Songs',
  movePhraserCollectionSong: '[PHRASER] Move Music Collection Song',
  addPhraserCollectionSong: '[PHRASER] Add Music Collection Song',
  deletePhraserCollectionSong: '[PHRASER] Delete Music Collection Song',
  selectPhraserSong: '[PHRASER] Select Song',
  deletePhraserSong: '[PHRASER] Delete Song',
  updatePhraserSongTitle: '[PHRASER] Update Song Title',
  addPhraserSongPart: '[PHRASER] Add Song Part',
  deletePhraserSongPart: '[PHRASER] Delete Song Part',
  updatePhraserSongPartName: '[PHRASER] Update Song Part Name',
  addPhraserSongPartRhyme: '[PHRASER] Add Song Part Rhyme',
  updatePhraserSongPartRhyme: '[PHRASER] Update Song Part Rhyme',
  deletePhraserSongPartRhyme: '[PHRASER] Delete Song Part Rhyme',
  reorderPhraserSongPartRhyme: '[PHRASER] Reorder Song Part Rhyme',
  movePhraserSongPartRhyme: '[PHRASER] Move Song Part Rhyme',

  addNotification: '[NOTIFICATION] Add Notification',
  resetNotifications: '[NOTIFICATION] Reset Notifications',

  loadSnippets: '[SNIPPETS] Load Snippets',
  snippetsLoaded: '[SNIPPETS] Snippets Loaded',
  updateSnippets: '[SNIPPETS] Update Snippets',
  addSnippet: '[SNIPPET] Add Snippet',
  deleteSnippet: '[SNIPPET] Delete Snippet',
  reorderSnippet: '[SNIPPET] Reorder Snippet'
});

module.exports = {
  ACTION
};
