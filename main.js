const { app, BrowserWindow, Menu } = require('electron');
const Trie = require('./src/js/Trie.js');
const fs = require('fs');
const History = require('./src/js/History.js');
const menuTemplate = require('./menuBar.js');

let dictionary = new Trie();
let dictionaryDB;
let history = new History();
let mainWindow;

try {
    dictionaryDB = require(`${__dirname}/dotDictionaryData.json`);
} catch (err) {
    dictionaryDB = {
        data: []
    };
    fs.writeFile(`${__dirname}/dotDictionaryData.json`, JSON.stringify(dictionaryDB), 'utf8', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('The Dictionary Data File was created successfully.');
        }
    });
}

loadTrieData(dictionaryDB.data);

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    if (process.platform === 'darwin') {
        menuTemplate.unshift({
            label: app.getName(),
            submenu: [
                {
                    label: 'Quit dotDictionary',
                    role: 'quit'
                }
            ]
        });
    }
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

app.on('before-quit', () => {
    dictionaryDB.data = dictionary.getAll();
    fs.writeFile(`${__dirname}/dotDictionaryData.json`, JSON.stringify(dictionaryDB), 'utf8', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('The Dictionary Data File was saved successfully.');
        }
    });
});

async function loadTrieData(dictionaryDB) {
    for (let word of dictionaryDB) {
        dictionary.insert(word.word, word.type, word.definition);
    }
}

exports.dictionary = dictionary;
exports.history = history;
