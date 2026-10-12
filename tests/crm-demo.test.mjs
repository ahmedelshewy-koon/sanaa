import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('CRM product opens its interactive preview', async () => {
  const [app, page, demo] = await Promise.all([
    readFile('app.js', 'utf8'),
    readFile('index.html', 'utf8'),
    readFile('crm-demo.html', 'utf8'),
  ]);
  assert.match(app, /CRM:'crm-demo'/);
  assert.match(app, /data-dialog="\$\{productDemos\[p\.id\]\}-dialog"/);
  assert.match(page, /<dialog[^>]+id="crm-demo-dialog"/);
  assert.match(page, /<iframe[^>]+src="crm-demo\.html\?embed=1#dashboard"/);
  assert.match(demo, /id="demo-content"/);
  assert.match(demo, /data-view="contacts"/);
  assert.match(demo, /data-view="opportunities"/);
});

test('static build includes the CRM preview', async () => {
  const build = await readFile('scripts/build.mjs', 'utf8');
  for (const file of ['crm-demo.html', 'crm-demo.css', 'crm-demo.js']) {
    assert.ok(build.includes(file), `${file} missing from build`);
  }
});
