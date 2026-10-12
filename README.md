# Banana Clicker One Line

Simple clicker game designed to fit in under 3KiB and one line of HTML. Done as a very simple and quick exploratory project.

## Running the Game
Simply copy and paste the following text file into a new browser tab on most modern browsers.
[Latest build](dist/uri.txt)

<!-- URI_START -->
```html
data:text/html,<!DOCTYPE html><html lang=""><head><title>Banana Clicker</title><meta charset="utf-8"><style>body{background:%23a69805;color:%23ffffff;font-family:sans-serif;text-align:center;user-select:none;-webkit-user-select:none}h1{font-size:5vh}h2{margin:3vh}button{padding:1vh;cursor:pointer;color:white;background:%23d16f0d;border:none;outline:none;border-radius:10px;white-space:pre-line}button:active{transform:scale(.98)}button:disabled{background:%239f550a;opacity:0.5;cursor:not-allowed;transform:none}.cent-div{display:flex;justify-content:center;gap:10vh}.float{position:fixed;pointer-events:none;animation:floatUp .7s ease-out forwards}@keyframes floatUp{0%25{transform:translateY(0);opacity:1}100%25{transform:translateY(-40px);opacity:0}}%23click-item{font-size:30vh;cursor:pointer;display:inline-block}%23click-item:active{transform:scale(.95)}.vertical-container{display:flex;flex-direction:column;gap:3vh;width:30vh}</style></head><body><h1>Bananas: <span id="score-display">0</span></h1><div id="click-item">🍌</div><div class="cent-div"><div id="click-power-upgrade" class="vertical-container"><h2>Click Power: <span id="click-power">1</span></h2></div><div id="increment-upgrade" class="vertical-container"><h2>Increment: <span id="increment-per-second">0</span></h2></div></div><script>const e=document.getElementById("click-power-upgrade"),t=document.getElementById("increment-upgrade");let n=[[25,1.2,1,0],[2e3,1.2,5,0],[50,1.4,0,1],[5e3,1.2,0,5]],c={score:0,clickPower:1,scorePerSecond:0},o=[];for(let r=0;r<n.length;r++){const l=document.createElement("button");let d;n[r][2]>0?(d="Click Power "+n[r][2],e.appendChild(l)):(d="Increment per Second "+n[r][3],t.appendChild(l)),d+="\nCost: ",l.textContent=`${d}${n[r][0]}`,l.addEventListener("click",()=>{var e;e=r,c.score>=n[e][0]&&(c.score-=n[e][0],n[e][0]*=n[e][1],c.clickPower+=n[e][2],c.scorePerSecond+=n[e][3],s())}),o.push({element:l,baseText:d})}let r=0;const l=document.getElementById("score-display"),d=document.getElementById("click-power"),i=document.getElementById("increment-per-second");function s(){l.innerHTML=c.score.toFixed(0),d.innerHTML=c.clickPower,i.innerHTML=c.scorePerSecond;for(let e=0;e<n.length;e++){let t=n[e][0],r=o[e];r.element.textContent=`${r.baseText}${Math.ceil(t)}`,r.element.disabled=c.score<t}}document.getElementById("click-item").addEventListener("click",e=>{c.score+=c.clickPower,s();const t=e.clientX+(20*Math.random()-15),n=e.clientY-15;!function(e,t,n){const c=document.createElement("span");c.className="float",c.textContent=e,c.style.cssText=`left:${t}px;top:${n}px`,c.style.fontSize="2rem",document.body.appendChild(c),setTimeout(()=>c.remove(),700)}(`+${c.clickPower}`,t,n)}),requestAnimationFrame(function e(t){r||(r=t);const n=(t-r)/1e3;r=t,c.score+=c.scorePerSecond*n,s(),requestAnimationFrame(e)});</script></body></html>
```
<!-- URI_END -->

## Building
After downloading this repo, run

```
npm install
npm build.mjs
```

Source code pre compiling under `/src`