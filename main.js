'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var ADODB = require('node-adodb');


require('crash-reporter').start();

var mainWindow = null;
var $ = null;


app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function () {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 1000,
        preload: "interactive.js"
    });
    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

});

var template = [
    {
        label: '趙',
        submenu: [{
            label: 'hi',
            accelerate: 'Command+Q',
            click: function () {
                var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=D:\\cyou\\Projects\\electron-readus\\A.mdb;');

                // console.log("run");

                connection.query("SELECT * FROM [Burdata];").on('done', function (data) {
                    // console.log(data);

                    var window = BrowserWindow.getFocusedWindow();
                    window.webContents.send('gotData', data);
                }).on('fail', function (data) {
                    console.log(data);
                });


            }
        }]
    }
];


var menu = Menu.buildFromTemplate(template);