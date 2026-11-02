// Focused storage-failure checks; browser interactions are tested separately.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
class Element {
  constructor() { this.children=[]; this.events={}; this.attributes={}; this.value=''; this.textContent=''; this.classList={toggle(){}}; }
  addEventListener(name, callback) { this.events[name]=callback; }
  setAttribute(name, value) { this.attributes[name]=value; }
  removeAttribute(name) { delete this.attributes[name]; }
  append(...children) { this.children.push(...children); }
  replaceChildren() { this.children=[]; }
  focus() {}
  querySelectorAll() { return []; }
  querySelector() { return new Element(); }
}
function boot({stored=null,readFails=false,writeFails=false}={}) {
  const elements=new Map(); let saved;
  const get=selector=>{ if(!elements.has(selector)) elements.set(selector,new Element()); return elements.get(selector); };
  get('#task-form').reset=()=>{get('#task-title').value='';};
  const localStorage={getItem(){if(readFails) throw Error('blocked');return stored;},setItem(key,value){if(writeFails) throw Error('quota');saved=value;}};
  vm.runInNewContext(fs.readFileSync('js/planner.js','utf8'),{document:{querySelector:get,createElement:()=>new Element()},localStorage,console,Date,Math});
  return {get,saved:()=>saved,add(title){get('#task-title').value=title; get('#task-form').events.submit({preventDefault(){}});}};
}
for (const stored of ['{broken','{}','[{"id":"one","title":" ","completed":false}]','[{"id":"one","title":"A","completed":false},{"id":"one","title":"B","completed":false}]']) {
 const app=boot({stored}); assert.match(app.get('#storage-notice').textContent,/could not be read/); app.add('Recovered task'); assert.equal(JSON.parse(app.saved())[0].title,'Recovered task');
}
let app=boot({readFails:true,writeFails:true}); app.add('Still works in memory'); assert.equal(app.get('#task-list').children.length,1); assert.match(app.get('#storage-notice').textContent,/storage is unavailable/);
app=boot({writeFails:true}); app.add('Unsaved task'); assert.match(app.get('#storage-notice').textContent,/lost/);
app=boot({stored:'[{"id":"kept","title":"Saved task","completed":true}]'}); assert.equal(app.get('#task-list').children.length,1); assert.match(app.get('#task-summary').textContent,/1 completed/);
console.log('PASS: malformed JSON, invalid schema, blank stored titles, duplicate IDs, read/write failures, quota failure, recovery, and valid completed-task load.');

// Contact values remain strings; validation does not discard leading phone zeros.
const contactElements=new Map();
function contactGet(selector) { if(!contactElements.has(selector)) contactElements.set(selector,new Element()); return contactElements.get(selector); }
for (const [id,value] of Object.entries({name:'  Test Student  ',email:'student@example.com',phone:'09064351861',message:'  Local test  '})) {
 const field=contactGet('#'+id); field.id=id; field.value=value; field.maxLength=id==='message'?3000:254;
}
vm.runInNewContext(fs.readFileSync('js/contact.js','utf8'),{document:{querySelector:contactGet,getElementById:id=>contactGet('#'+id)}});
const submit=()=>contactGet('#contact-form').events.submit({preventDefault(){}});
submit(); assert.equal(contactGet('#phone').value,'09064351861'); assert.equal(contactGet('#name').value,'Test Student'); assert.match(contactGet('#contact-status').textContent,/no message has been sent/);
for (const value of ['+234123','123-456','12abc','123 456']) { contactGet('#phone').value=value;submit();assert.match(contactGet('#phone-error').textContent,/digits only/); }
contactGet('#phone').value='000123'; submit(); assert.equal(contactGet('#phone-error').textContent,''); assert.equal(contactGet('#phone').value,'000123');
console.log('PASS: leading phone zeros, trimmed values, local-only success, and rejection of non-digit phone formats.');
