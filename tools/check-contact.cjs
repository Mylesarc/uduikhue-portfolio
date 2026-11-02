// Mock transport only: no messages are sent by this test.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('js/contact.js', 'utf8');
function boot(endpoint = 'https://formspree.io/f/test', transport) {
  const elements = new Map();
  function get(id) {
    if (!elements.has(id)) elements.set(id, {
      id, value: '', textContent: '', maxLength: 3000, events: {}, attrs: {},
      addEventListener(k, fn) { this.events[k] = fn; },
      setAttribute(k, v) { this.attrs[k] = v; },
      getAttribute(k) { return this.attrs[k] || null; },
      removeAttribute(k) { delete this.attrs[k]; },
      hasAttribute(k) { return k in this.attrs; },
      focus() { this.focused = true; },
      querySelector() { return get('button'); }
    });
    return elements.get(id);
  }
  const form = get('contact-form'); form.attrs['data-endpoint'] = endpoint;
  form.reset = () => ['name', 'email', 'phone', 'message'].forEach(id => { get(id).value = ''; });
  for (const [id, value] of Object.entries({name:' Test Student ', email:'test@example.com', phone:'000123', message:' Hello '})) get(id).value = value;
  let calls = 0; let sent;
  vm.runInNewContext(source, {
    document: { querySelector: s => get(s.slice(1)), getElementById: get },
    fetch: async (url, options) => { calls++; sent = JSON.parse(options.body); return transport(url, options); },
    AbortController, setTimeout, clearTimeout
  });
  return {get, calls:()=>calls, sent:()=>sent, submit:()=>form.events.submit({preventDefault(){}})};
}
(async () => {
  let app = boot('', () => { throw Error('Must not send'); });
  await app.submit(); assert.equal(app.calls(), 0); assert.match(app.get('contact-status').textContent, /No message has been sent/);
  app = boot(undefined, () => { throw Error('Must not send'); });
  app.get('email').value = 'invalid'; await app.submit(); assert.equal(app.calls(), 0); assert.equal(app.get('email').focused, true);
  let resolve;
  app = boot(undefined, () => new Promise(r => { resolve = r; }));
  const pending = app.submit(); await app.submit();
  assert.equal(app.calls(), 1); assert.equal(app.get('button').disabled, true); assert.equal(app.get('message').readOnly, true);
  resolve({ok:true, json:async()=>({ok:true})}); await pending;
  assert.equal(app.sent().phone, '000123'); assert.equal(app.sent().name, 'Test Student');
  assert.match(app.get('contact-status').textContent, /accepted for delivery/); assert.equal(app.get('message').value, '');
  assert.equal(app.get('button').disabled, false); assert.equal(app.get('message').readOnly, false);
  for (const [status, body] of [[422,{errors:[]}], [429,{}], [200,{ok:false}], [200,null]]) {
    app = boot(undefined, async()=>({ok:status===200,status,json:async()=>body}));
    await app.submit(); assert.equal(app.get('message').value, 'Hello'); assert.doesNotMatch(app.get('contact-status').textContent, /accepted/); assert.equal(app.get('button').disabled, false);
  }
  for (const name of ['TypeError', 'AbortError']) {
    app = boot(undefined, async()=>{ const error = Error('network'); error.name = name; throw error; });
    await app.submit(); assert.equal(app.get('message').value, 'Hello'); assert.match(app.get('contact-status').textContent, /confirm|timed out/);
  }
  console.log('PASS: validation, missing endpoint, duplicate prevention, accepted delivery, malformed/rejected responses, rate limits, network failure, timeout, and preserved text.');
})().catch(error=>{console.error(error);process.exitCode=1;});
