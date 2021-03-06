import { remote } from 'electron';

import './console-redirect-renderer';

export async function run(file: string, shouldDebug: boolean, args: string[]) {
  if (shouldDebug) {
    const wnd = remote.getCurrentWindow();

    wnd.setSize(1024, 768);
    wnd.show();
    wnd.webContents.openDevTools();

    // NB: We need to wait a tick or else 'debugger;' on the opening line will
    // be missed
    await new Promise((res) => setTimeout(res, 1500));
  }

  try {
    const mod = require(file);

    if (mod && 'main' in mod) {
      await mod.main(args);
    }

    if (shouldDebug) { console.log('(Module exited successfully)'); }
  } catch (e) {
    console.error(e.message);
    console.error(e.stack);
    debugger;
  }
}