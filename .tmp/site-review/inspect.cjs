const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const out = path.resolve(__dirname);
const profile = path.join(out, 'browser-profile');
const base = 'http://localhost:3000';
const executable = 'C:/Users/lwj/AppData/Local/ms-playwright/chromium_headless_shell-1208/chrome-headless-shell-win64/chrome-headless-shell.exe';
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const proc = spawn(executable, ['--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  let ws;
  let call;
  try {
    const endpoint = await new Promise((resolve, reject) => {
      let stderr = '';
      const timer = setTimeout(() => reject(new Error('Browser startup timeout')), 12000);
      proc.stderr.on('data', b => {
        stderr += b.toString();
        const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) { clearTimeout(timer); resolve(match[1]); }
      });
      proc.on('error', reject);
      proc.on('exit', code => { clearTimeout(timer); reject(new Error(`Browser exited ${code}: ${stderr.slice(0,800)}`)); });
    });
    ws = new WebSocket(endpoint);
    await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
    let nextId = 0;
    const pending = new Map();
    const errors = [];
    ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id && pending.has(message.id)) {
        const p = pending.get(message.id); pending.delete(message.id); clearTimeout(p.timer);
        message.error ? p.reject(new Error(JSON.stringify(message.error))) : p.resolve(message.result);
      }
      if (message.method === 'Runtime.exceptionThrown') errors.push({ type: 'exception', detail: message.params.exceptionDetails.text, description: message.params.exceptionDetails.exception?.description });
      if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) errors.push({ type: 'http', status: message.params.response.status, url: message.params.response.url });
      if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push({ type: 'console', text: message.params.args.map(x => x.value || x.description).join(' ') });
    });
    call = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
      const id = ++nextId;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
      pending.set(id, { resolve, reject, timer });
      ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
    const { targetId } = await call('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await call('Target.attachToTarget', { targetId, flatten: true });
    const cdp = (method, params) => call(method, params, sessionId);
    await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Network.enable');
    const evaluate = async expression => (await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;
    await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
    const pages = [];
    async function capture(route, label, mobile = false) {
      const errorStart = errors.length;
      const nav = await cdp('Page.navigate', { url: base + route });
      if (nav.errorText) throw new Error(nav.errorText);
      for (let i = 0; i < 40; i++) {
        const ready = await evaluate(`document.readyState === 'complete' && location.pathname === ${JSON.stringify(route.split('?')[0])}`);
        if (ready) break;
        await pause(200);
      }
      await evaluate(`Promise.race([Promise.all([document.fonts.ready,...Array.from(document.images).map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=r;i.onerror=r}))]),new Promise(r=>setTimeout(r,3500))])`);
      await pause(400);
      const details = await evaluate(`({url:location.href,title:document.title,headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({tag:e.tagName,text:e.innerText})),text:document.body.innerText,links:[...document.querySelectorAll('a[href]')].map(e=>({text:e.innerText.trim()||e.getAttribute('aria-label')||'',href:e.href})),buttons:[...document.querySelectorAll('button')].map(e=>({text:e.innerText,aria:e.getAttribute('aria-label'),expanded:e.getAttribute('aria-expanded')})),forms:[...document.forms].map(f=>({action:f.action,fields:[...f.querySelectorAll('input,select,textarea')].map(e=>({tag:e.tagName,type:e.type,name:e.name,required:e.required,placeholder:e.placeholder}))})),images:[...document.images].map(i=>({src:i.currentSrc,alt:i.alt,width:i.naturalWidth,height:i.naturalHeight,broken:i.complete&&i.naturalWidth===0})),viewport:{width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:innerHeight},bodyHeight:document.documentElement.scrollHeight})`);
      const fold = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      fs.writeFileSync(path.join(out, label + '.png'), Buffer.from(fold.data, 'base64'));
      const height = Math.min(details.bodyHeight, 14000);
      const full = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: mobile ? 390 : 1440, height, scale: 1 } });
      fs.writeFileSync(path.join(out, label + '-full.png'), Buffer.from(full.data, 'base64'));
      details.screenshot = label + '.png'; details.errors = errors.slice(errorStart);
      pages.push(details);
      console.log(JSON.stringify({route,mobile,title:details.title,headings:details.headings,buttons:details.buttons,forms:details.forms,brokenImages:details.images.filter(i=>i.broken),viewport:details.viewport,errors:details.errors,screenshot:details.screenshot}));
      return details;
    }
    const home = await capture('/', 'home-desktop');
    console.log('HOME_LINKS', JSON.stringify(home.links));
    const routes = [...new Set(home.links.filter(l=>l.href.startsWith(base)).map(l=>new URL(l.href).pathname))].filter(p=>p!=='/'&&!/^\/(api|admin|_next)(\/|$)/.test(p)&&! /\.(pdf|zip|png|jpg)$/i.test(p)).slice(0,16);
    for (const route of routes) await capture(route, route.replace(/^\//,'').replace(/[^a-z0-9-]/gi,'-'));
    await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await cdp('Emulation.setTouchEmulationEnabled', { enabled: true });
    const mobile = await capture('/', 'home-mobile', true);
    const menuButton = await evaluate(`(()=>{const b=[...document.querySelectorAll('button')].find(e=>/메뉴|menu/i.test((e.getAttribute('aria-label')||'')+' '+e.innerText));if(!b)return null;const r=b.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
    if (menuButton) {
      await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', ...menuButton, button: 'left', clickCount: 1 });
      await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', ...menuButton, button: 'left', clickCount: 1 });
      await pause(300);
      const shot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      fs.writeFileSync(path.join(out,'mobile-menu-open.png'),Buffer.from(shot.data,'base64'));
      mobile.menuAfterClick = await evaluate(`({text:document.body.innerText,buttons:[...document.querySelectorAll('button')].map(e=>({text:e.innerText,aria:e.getAttribute('aria-label'),expanded:e.getAttribute('aria-expanded')}))})`);
      console.log('MOBILE_MENU',JSON.stringify(mobile.menuAfterClick));
    }
    fs.writeFileSync(path.join(out, 'inspection.json'), JSON.stringify({checkedAt:new Date().toISOString(),base,pages,errors},null,2));
    await call('Browser.close');
  } finally {
    if (ws) ws.close();
    if (proc.exitCode === null) proc.kill();
  }
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
