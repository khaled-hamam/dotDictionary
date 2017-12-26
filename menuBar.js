let main = require('./main.js');
const { remote, BrowserWindow, shell } = require('electron');

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add new word',
                click() {
                    BrowserWindow.getFocusedWindow().webContents.send('addWord');
                },
                accelerator: 'CmdOrCtrl+N'
            },
            process.platform == 'win32'
                ? {
                      label: 'Quit dotDictionary',
                      role: 'quit'
                  }
                : {
                      visible: false
                  }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                click() {
                    main.history.undo();
                    BrowserWindow.getFocusedWindow().webContents.send('reload');
                }
            },
            {
                label: 'Redo',
                accelerator: process.platform === 'darwin' ? 'Command+Shift+Z' : 'Ctrl+Y',
                click() {
                    main.history.redo();
                    BrowserWindow.getFocusedWindow().webContents.send('reload');
                }
            },
            {
                role: 'reload'
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: 'CmdOrCtrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                }
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() {
                    shell.openExternal('https://github.com/khaled-hamam/dotDictionary');
                }
            }
        ]
    }
];

module.exports = menuTemplate;
