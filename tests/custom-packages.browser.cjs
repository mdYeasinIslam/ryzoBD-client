// Start the client on localhost:3100 and Chrome with --remote-debugging-port=9224.
// All API requests are mocked; this test never creates real packages or orders.
const assert = require('node:assert/strict');
(async () => {
 const target = await (await fetch('http://127.0.0.1:9224/json/new?about:blank', {method:'PUT'})).json();
 const ws = new WebSocket(target.webSocketDebuggerUrl);
 await new Promise(resolve => ws.addEventListener('open', resolve, {once:true}));
 let sequence=0; const pending=new Map(); let authenticated=false; let saved=null; let savedBody=null; let submitted=null;
 const owner='111111111111111111111111';
 const product={_id:'222222222222222222222222',name:'Browser Test Tea',salePrice:100,price:120,featuredImage:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',sellUnit:'1 box',status:'published',slug:'test-tea'};
 const errors=[];
 function send(method,params={}){return new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
 async function fulfill(id, value, status=200){await send('Fetch.fulfillRequest',{requestId:id,responseCode:status,responseHeaders:[{name:'Content-Type',value:'application/json'},{name:'Access-Control-Allow-Origin',value:'http://localhost:3100'},{name:'Access-Control-Allow-Credentials',value:'true'},{name:'Access-Control-Allow-Headers',value:'authorization,content-type'},{name:'Access-Control-Allow-Methods',value:'GET,POST,PATCH,DELETE,OPTIONS'}],body:Buffer.from(JSON.stringify(value)).toString('base64')});}
 ws.addEventListener('message', async event=>{
  const message=JSON.parse(event.data);
  if(message.id){const p=pending.get(message.id);pending.delete(message.id);if(message.error)p?.reject(message.error);else p?.resolve(message.result);return;}
  if(message.method==='Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text+' '+(message.params.exceptionDetails.exception?.description||''));
  if(message.method!=='Fetch.requestPaused')return;
  const {requestId,request}=message.params; const url=new URL(request.url);
  try {
   if(url.pathname==='/api/auth/session')return fulfill(requestId,authenticated?{user:{_id:owner,name:'Browser Tester',email:'browser@example.test',roles:['customer']},accessToken:'mock-token',expires:'2099-01-01T00:00:00.000Z'}:{});
   if((url.hostname==='localhost'||url.hostname==='127.0.0.1')&&url.port==='3100')return send('Fetch.continueRequest',{requestId});
   if(request.method==='OPTIONS')return fulfill(requestId,{});
   if(url.pathname.endsWith('/products'))return fulfill(requestId,{data:{products:[product]},pagination:{totalPages:1}});
   if(url.pathname.endsWith('/packages/mine')&&request.method==='POST'){
    savedBody=JSON.parse(request.postData);
    saved={_id:'333333333333333333333333',name:savedBody.name+' #333333333333333333333333',description:savedBody.description,products:savedBody.products.map(i=>({product,quantity:i.quantity})),price:240,salePrice:200,featuredImage:product.featuredImage,available:true,quote:'a'.repeat(64),createdByCustomer:owner,status:'published',source:'customer',visibility:'private'};
    return fulfill(requestId,{data:{package:saved}});
   }
   if(url.pathname.endsWith('/packages/mine'))return fulfill(requestId,{data:{packages:saved?[saved]:[]},pagination:{totalPages:1}});
   if(url.pathname.includes('/packages/mine/'))return fulfill(requestId,{data:{package:saved}});
   if(url.pathname.endsWith('/customers/addresses'))return fulfill(requestId,{data:{addresses:[{_id:'444444444444444444444444',name:'Browser Tester',contactNumber:'01712345678',address:'Test delivery address',isDefault:true}]}});
   if(url.pathname.endsWith('/orders')&&request.method==='POST'){submitted=JSON.parse(request.postData);return fulfill(requestId,{message:'Mock checkout payload verified'},400);}
   if(url.pathname.endsWith('/categories'))return fulfill(requestId,{data:{categories:[]}});
   return fulfill(requestId,{},404);
  } catch(error){errors.push(String(error));}
 });
 await send('Storage.clearDataForOrigin',{origin:'http://localhost:3100',storageTypes:'all'}); await send('Runtime.enable'); await send('Page.enable'); await send('Fetch.enable',{patterns:[{urlPattern:'*'}]});
 const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.exception?.description);return result.result.value;};
 async function wait(expression){for(let i=0;i<400;i++){if(errors.length)throw new Error(errors.join('\n'));if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw new Error('Timed out: '+expression+'\n'+await evaluate('document.body?.innerText'));}
 const click=label=>evaluate(`Array.from(document.querySelectorAll('button')).find(b=>b.textContent.trim()===${JSON.stringify(label)}).click()`);
 const input=(selector,value)=>evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,${JSON.stringify(value)});e.dispatchEvent(new Event('input',{bubbles:true}));})()`);
 await send('Page.navigate',{url:'http://localhost:3100/packages/create'});
 await wait(`document.body?.innerText.includes('Browser Test Tea') && !document.querySelector('fieldset').disabled`);
 await input('input[placeholder="My weekly essentials"]','Weekend bundle');
 await click('Add'); await input('input[type="number"]','2');
 await wait(`document.body?.innerText.includes('Estimated total: ৳200.00')`);
 await click('Save Package'); await wait(`location.pathname==='/login'`);
 authenticated=true;
 await send('Page.navigate',{url:'http://localhost:3100/packages/create'});
 await wait(`document.querySelector('input[placeholder="My weekly essentials"]')?.value==='Weekend bundle' && !document.querySelector('fieldset').disabled`);
 assert.equal(await evaluate(`document.querySelector('input[type="number"]').value`),'2');
 await click('Save Package'); await wait(`location.pathname==='/my-packages' && document.body?.innerText.includes('Weekend bundle')`);
 assert.equal(savedBody.products[0].quantity,2);assert.ok(savedBody.creationKey);
 assert.equal(await evaluate(`JSON.parse(localStorage.getItem('cart')||'[]').length`),0);
 await click('Add to Cart');await wait(`location.pathname==='/cart' && document.body?.innerText.includes('Proceed to Checkout')`);
 assert.equal(await evaluate(`JSON.parse(localStorage.getItem('cart'))[0].price`),200);
 saved={...saved,salePrice:220,quote:'b'.repeat(64)};
 await send('Page.reload');
 await wait(`document.body?.innerText.includes('Accept updated package')`);
 await click('Accept updated package');
 await wait(`document.body?.innerText.includes('Subtotal: ৳220.00') && document.body?.innerText.includes('Proceed to Checkout')`);
 await send('Page.navigate',{url:'http://localhost:3100/checkout'});
 await wait(`document.body?.innerText.includes('Test delivery address') && Array.from(document.querySelectorAll('button')).some(b=>b.textContent.trim()==='Confirm Order'&&!b.disabled)`);
 await evaluate(`document.getElementById('IDC').click()`);
 await click('Confirm Order');
 for(let i=0;i<100&&!submitted;i++)await new Promise(r=>setTimeout(r,100));
 assert.equal(submitted?.cart[0].packageQuote,'b'.repeat(64));
 assert.equal(submitted?.cart[0].productType,'package');
 await send('Page.navigate',{url:'http://localhost:3100/packages/create'});
 await wait(`document.body?.innerText.includes('Browser Test Tea') && !document.querySelector('fieldset').disabled`);
 await input('input[placeholder="My weekly essentials"]','Second package');await click('Add');await click('Continue to Cart');
 await wait(`location.pathname==='/cart'`);
 if(errors.length)throw new Error(errors.join('\n'));
 console.log('PASS: guest draft survives login; save-only keeps cart empty; My Packages add-to-cart; price-change review and acceptance; Continue to Cart; checkout sends the accepted quote; no browser runtime errors. API responses were mocked; no shop data changed.');
 await send('Page.close');ws.close();
})().catch(error=>{console.error(error);process.exit(1)});
