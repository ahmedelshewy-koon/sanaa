import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('ERP product opens its interactive preview', async () => {
  const [app, page, demo] = await Promise.all([
    readFile('app.js', 'utf8'),
    readFile('index.html', 'utf8'),
    readFile('erp-demo.html', 'utf8'),
  ]);
  assert.match(app, /erp-demo/);
  assert.match(page, /<dialog[^>]+id="erp-demo-dialog"/);
  assert.match(page, /<iframe[^>]+src="erp-demo\.html\?embed=1#dashboard"/);
  assert.match(demo, /id="demo-content"/);
  assert.match(demo, /data-view="sales"/);
  assert.match(demo, /data-view="inventory"/);
});

test('static build includes the ERP preview', async () => {
  const build = await readFile('scripts/build.mjs', 'utf8');
  for (const file of ['erp-demo.html', 'erp-demo.css', 'erp-demo.js']) {
    assert.ok(build.includes(file), `${file} missing from build`);
  }
});
