const { contextBridge, ipcRenderer } = require('electron');

const validChannels = ['increase-window-size', 'decrease-window-size'];

const invoke = (channel, ...data) =>
  validChannels.includes(channel) ? ipcRenderer.invoke(channel, data) : Promise.reject();

contextBridge.exposeInMainWorld('api', {
  invoke,
});
