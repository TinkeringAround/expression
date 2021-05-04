const { app, Menu, shell } = require('electron');

// ==========================================================
const { isDev, isMac } = require('./consts');

// ==========================================================
const template = [
  // App Menu
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ role: 'hide' }, { role: 'unhide' }, { type: 'separator' }, { role: 'quit' }]
        }
      ]
    : []),
  // File
  {
    label: 'File',
    submenu: [isMac ? { role: 'close' } : { role: 'quit' }]
  },
  // Edit
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
    ]
  },
  // View Menu
  ...(isDev
    ? [
        {
          label: 'View',
          submenu: [{ role: 'toggledevtools' }, { type: 'separator' }]
        }
      ]
    : []),
  // Window Menu
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      ...(isMac
        ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
        : [{ role: 'close' }])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Documentation',
        click: async () => {
          await shell.openExternal('https://github.com/TinkeringAround/kadenz');
        }
      }
    ]
  }
];
// ==========================================================

try {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
} catch (error) {
  require('./logger').logError(error);
}
