// preload.js
const { contextBridge } = require('electron');

// اینجا می‌تونی APIهای امن برای رندرر تعریف کنی
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
});

console.log('Preload script loaded');