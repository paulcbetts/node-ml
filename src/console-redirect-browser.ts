import { ipcMain } from 'electron';
import * as isString from 'lodash.isstring';

let warningFound = false;
Object.keys(console).forEach(k => {
  ipcMain.on(`console-${k}`, (_e: Event, argList: any[]) => {
    if (!warningFound && argList.find(x => isString(x) && x.indexOf('Electron Security Warning') >= 0)) {
      warningFound = true;
      return;
    }

    console[k](...argList);
  });
});