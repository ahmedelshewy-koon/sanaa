import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Tasks product opens its own interactive preview', async () => {
  const [app, page, demo] = await Promise.all([
    readFile('app.js', 'utf8'),
    readFile('index.html', 'utf8'),
    readFile('tasks-demo.html', 'utf8'),
  ]);
  assert.match(app, /TASKS:'tasks-demo'/);
  assert.match(app, /data-dialog="\$\{productDemos\[p\.id\]\}-dialog"/);
  assert.match(page, /<dialog[^>]+id="tasks-demo-dialog"/);
  assert.match(page, /<iframe[^>]+src="tasks-demo\.html\?embed=1#dashboard"/);
  assert.match(demo, /id="demo-content"/);
  assert.match(demo, /data-view="tasks"/);
});

test('static build includes the Tasks preview', async () => {
  const build = await readFile('scripts/build.mjs', 'utf8');
  for (const file of ['tasks-demo.html', 'tasks-demo.css', 'tasks-demo.js']) {
    assert.ok(build.includes(file), `${file} missing from build`);
  }
});
