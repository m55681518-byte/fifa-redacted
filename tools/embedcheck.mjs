/**
 * Ground-truth YouTube embeddability tester.
 *
 * The watch page's `playableInEmbed` flag is unreliable: FIFA/VEVO uploads
 * frequently report true and then fail with error 150 ("owner disallows
 * embedding") once actually embedded on a third-party origin. The only
 * trustworthy check is to instantiate the IFrame API player on a non-YouTube
 * origin and read the resulting event.
 *
 * Usage: node embedcheck.mjs <id> [<id> ...]
 * Prints: OK | ERR <code> | TIMEOUT per id.
 */
import { chromium } from 'playwright';
import http from 'http';

const ids = process.argv.slice(2);
if (!ids.length) { console.error('no ids'); process.exit(1); }

// Serve a blank page from localhost so the embed sees a real third-party origin.
const srv = http.createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<!doctype html><html><body><div id="host"></div></body></html>');
}).listen(8099);

const ERRS = {
  2: 'invalid id', 5: 'html5 player error', 100: 'video removed/private',
  101: 'embedding disabled by owner', 150: 'embedding disabled by owner',
};

const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required','--mute-audio'] });
const page = await b.newPage();
await page.goto('http://localhost:8099/', { waitUntil: 'domcontentloaded' });
await page.addScriptTag({ url: 'https://www.youtube.com/iframe_api' });
await page.waitForFunction(() => !!window.YT?.Player, null, { timeout: 30000 });

const results = [];
for (const id of ids) {
  const r = await page.evaluate((vid) => new Promise((resolve) => {
    document.getElementById('host').innerHTML = '<div id="slot"></div>';
    let done = false;
    const finish = (v) => { if (!done) { done = true; resolve(v); } };
    const pl = new window.YT.Player('slot', {
      height: '200', width: '200', videoId: vid,
      playerVars: { autoplay: 1, controls: 0, enablejsapi: 1, playsinline: 1 },
      events: {
        onError: (e) => finish({ ok: false, code: e.data }),
        onStateChange: (e) => { if ([1, 3, 5].includes(e.data)) finish({ ok: true, state: e.data }); },
        onReady: (e) => { try { e.target.playVideo(); } catch {} },
      },
    });
    setTimeout(() => { try { pl.destroy(); } catch {} finish({ ok: false, code: 'TIMEOUT' }); }, 12000);
  }), id);

  const verdict = r.ok ? 'OK' : (typeof r.code === 'number' ? `ERR ${r.code} (${ERRS[r.code] || '?'})` : r.code);
  console.log(`${id.padEnd(13)} ${verdict}`);
  results.push({ id, ...r });
}

console.log('\nEMBEDDABLE: ' + results.filter(r => r.ok).map(r => r.id).join(' '));
console.log('BLOCKED   : ' + results.filter(r => !r.ok).map(r => r.id).join(' '));
await b.close();
srv.close();
