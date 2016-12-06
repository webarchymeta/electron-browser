
const {BrowserWindow, app} = require('electron');

let mainWindow = null;

if (process.env.SOCKS5_ADDRESS) {
  app.commandLine.appendSwitch('proxy-server', 'socks5://' + process.env.SOCKS5_ADDRESS + ':' + process.env.SOCKS5_PORT);
  if (!process.env.SOCKS5_LOCAL_DNS) {
    app.commandLine.appendSwitch('host-resolver-rules', 'MAP * 0.0.0.0, EXCLUDE ' + process.env.SOCKS5_ADDRESS);
  }
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit()
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 1530, height: 920, frame: false });
  mainWindow.loadURL('file://' + require('path').join(__dirname, 'browser.html'));
  mainWindow.on('closed', function () {
    mainWindow = null
  });
});