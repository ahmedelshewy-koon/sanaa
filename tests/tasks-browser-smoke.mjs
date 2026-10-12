import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const profile = await mkdtemp(join(tmpdir(), 'sanaa-tasks-'));
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' });
let socket;
try {
  let port;
  for (let i = 0; i < 80; i++) {
    try { port = Number((await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]); break; }
    catch { await delay(100); }
  }
  assert.ok(port, 'Chrome did not start');
  const targets = await (await fetch(`http://localhost:${port}/json`)).json();
  socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once:true }); socket.addEventListener('error', reject, { once:true }); });
  let nextId = 0;
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(Error(message.error.message)) : resolve(message.result);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, {resolve, reject});
    socket.send(JSON.stringify({id, method, params}));
  });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true});
    if (result.exceptionDetails) throw Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const until = async expression => {
    for (let i = 0; i < 80; i++) { const value = await evaluate(expression); if (value) return value; await delay(100); }
    throw Error(`Timed out waiting for ${expression}`);
  };
  await send('Page.navigate', {url:'http://localhost:5173/'});
  await until('document.querySelector(".product-card[data-dialog=tasks-demo-dialog]") !== null');
  await evaluate('document.querySelector(".product-card[data-dialog=tasks-demo-dialog]").click()');
  assert.equal(await until('document.querySelector("#tasks-demo-dialog").open'), true);
  assert.equal(await until('document.querySelector("#tasks-demo-dialog iframe")?.contentDocument?.querySelector("#demo-content h1")?.textContent'), 'لوحة التحكم');
  await evaluate('document.querySelector("#tasks-demo-dialog iframe").contentWindow.location.hash = "#tasks"');
  assert.equal(await until('document.querySelector("#tasks-demo-dialog iframe")?.contentDocument?.querySelector("#demo-content h1")?.textContent === "كل المهام"'), true);
  await evaluate('document.querySelector("#tasks-demo-dialog iframe").contentDocument.querySelector("#task-search").value = "تسجيل"; document.querySelector("#tasks-demo-dialog iframe").contentDocument.querySelector("#task-search").dispatchEvent(new Event("input", {bubbles:true}))');
  assert.equal(await evaluate('document.querySelectorAll("#tasks-demo-dialog iframe")[0].contentDocument.querySelectorAll("#tasks-table tbody tr").length'), 1);
  await evaluate('document.querySelector("#tasks-demo-dialog iframe").contentDocument.querySelector("#task-search").value = ""; document.querySelector("#tasks-demo-dialog iframe").contentDocument.querySelector("#task-search").dispatchEvent(new Event("input", {bubbles:true})); document.querySelector("#tasks-demo-dialog iframe").contentDocument.querySelector("#task-state").value = "للمراجعة"; document.querySelector("#tasks-demo-dialog iframe").contentDocument.querySelector("#task-state").dispatchEvent(new Event("change", {bubbles:true}))');
  assert.equal(await evaluate('document.querySelector("#tasks-demo-dialog iframe").contentDocument.querySelectorAll("#tasks-table tbody tr").length'), 1);
  await evaluate('document.querySelector("#tasks-demo-dialog .hr-demo-close").click()');
  assert.equal(await evaluate('document.querySelector("#tasks-demo-dialog").open'), false);
  console.log('Tasks modal, navigation, search, filtering, and close passed.');
} finally {
  socket?.close();
  chrome.kill();
  await rm(profile, {recursive:true, force:true, maxRetries:5, retryDelay:100});
}
