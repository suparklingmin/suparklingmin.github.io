// ===== 논문 확정 수치 (표·plot.R) =====
const TASTE = [{n:'달다',c:125},{n:'맵다',c:51},{n:'쓰다',c:51},{n:'시다',c:35},{n:'짜다',c:33},{n:'떫다',c:7}];
const BYBOOK = [
  ['시의전서(下)',16],['윤씨음식법',12],['규합총셔 뎨일하편',11],['규합총셔 권지일',10],
  ['음식디미방',8],['보감록',8],['온주법',7],['음식책',5],['시의전서(上)',5],['주식시의',5],
  ['규합총서 동경대본',4],['주방문',4],['김승지댁 주방문',4],['우음제방',4],['음식방문',4],
  ['주방',3],['정일당잡지',3],['술 빚는 법',3],['이씨음식법',3],['술 만드는 법',3],['주식방문',3],['주식방',1]
];
const BYFOOD = [['술',46],['떡',20],['찬품',9],['한과',9],['기타',8],['음청류',5],['양념고명',2],['음식재료',2],['주식',2]];
const FOODTOTAL = BYFOOD.reduce((s,x)=>s+x[1],0);
const C={sweet:'#c8881f',sweetDeep:'#9a6510',sweetSoft:'#e8c987',celadon:'#6f8f80',ink:'#2a2420',inkSoft:'#5b5147',rule:'#d8ccb4',paper2:'#efe6d3'};
const EX = JSON.parse(document.getElementById('exData').textContent);

Chart.defaults.font.family = "'Noto Sans KR', sans-serif";
Chart.defaults.color = C.inkSoft;

// ===== taste chips =====
(function(){
  const wrap=document.getElementById('tasteChips');
  TASTE.forEach((t,i)=>{
    const s=document.createElement('span'); s.className='tchip'+(i===0?' on':'');
    s.innerHTML=t.n+'<span class="cnt">'+t.c+'회</span>'; wrap.appendChild(s);
  });
})();

// ===== charts (lazy, on reveal) =====
const charted={};
function makeTaste(){
  new Chart(document.getElementById('tasteChart'),{type:'bar',
    data:{labels:TASTE.map(t=>t.n),datasets:[{data:TASTE.map(t=>t.c),
      backgroundColor:TASTE.map((t,i)=>i===0?C.sweet:C.sweetSoft),borderRadius:6}]},
    options:{plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.parsed.y+'회'}}},
      scales:{y:{beginAtZero:true,grid:{color:'#eee2cc'},title:{display:true,text:'총 출현 횟수'}},x:{grid:{display:false},ticks:{font:{size:14,weight:'700'}}}},
      animation:{duration:1100}}});
}
function makeBook(){
  new Chart(document.getElementById('bookChart'),{type:'bar',
    data:{labels:BYBOOK.map(b=>b[0]),datasets:[{data:BYBOOK.map(b=>b[1]),
      backgroundColor:BYBOOK.map((b,i)=>i<4?C.sweet:C.sweetSoft),borderRadius:5}]},
    options:{indexAxis:'y',maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.parsed.x+'회'}}},
      scales:{x:{beginAtZero:true,grid:{color:'#eee2cc'},title:{display:true,text:'출현 횟수'}},y:{grid:{display:false},ticks:{autoSkip:false,font:{size:11}}}},
      animation:{duration:1100}}});
}
function makeFood(){
  new Chart(document.getElementById('foodChart'),{type:'doughnut',
    data:{labels:BYFOOD.map(f=>f[0]+' '+f[1]+'종'),datasets:[{data:BYFOOD.map(f=>f[1]),
      backgroundColor:[C.sweet,C.sweetDeep,C.celadon,'#8aa99b','#b9a06a','#d8b97e','#cbb99a','#bcae93','#a89c80'],borderColor:'#fff',borderWidth:2}]},
    options:{plugins:{legend:{position:'right',labels:{font:{size:13},padding:10}},
      tooltip:{callbacks:{label:c=>c.label+' ('+(c.parsed/FOODTOTAL*100).toFixed(2)+'%)'}}},
      cutout:'52%',animation:{duration:1100}}});
}
const chartMakers={tasteChart:makeTaste,bookChart:makeBook,foodChart:makeFood};

// ===== era × cat heatmap =====
const ERAS=['1600년대','1700년대','1800년대','1900년대','연대 미상'];
const CATS=['술','찬품','떡','한과','음청류','주식','음식재료','기타'];
function buildMatrix(){
  const m={}; EX.forEach(d=>{const k=d.era+'|'+d.cat1; m[k]=(m[k]||0)+1;}); return m;
}
const MATRIX=buildMatrix();
let activeEra='all';
function heatColor(v,max){
  if(v===0) return null;
  const t=Math.min(1, v/max);
  // amber scale
  const a=0.25+0.75*t;
  return `rgba(154,101,16,${a})`;
}
function renderHeat(){
  const max=Math.max(...Object.values(MATRIX));
  const eras = activeEra==='all'?ERAS:[activeEra];
  let html='<table class="heat-tbl"><thead><tr><th class="row"></th>';
  CATS.forEach(c=>html+='<th>'+c+'</th>'); html+='</tr></thead><tbody>';
  eras.forEach(e=>{
    html+='<tr><th class="row">'+e+'</th>';
    CATS.forEach(c=>{
      const v=MATRIX[e+'|'+c]||0;
      if(v===0){html+='<td class="zero">·</td>';}
      else{html+='<td style="background:'+heatColor(v,max)+'" title="'+e+' · '+c+' : '+v+'건">'+v+'</td>';}
    });
    html+='</tr>';
  });
  html+='</tbody></table>';
  document.getElementById('heatWrap').innerHTML=html;
}
(function(){
  const tabs=document.getElementById('eraTabs');
  const opts=[['all','전체'],['1600년대','1600년대'],['1700년대','1700년대'],['1800년대','1800년대'],['1900년대','1900년대']];
  opts.forEach(([v,l])=>{
    const b=document.createElement('button'); b.className='era-tab'+(v==='all'?' on':''); b.textContent=l;
    b.onclick=()=>{activeEra=v;[...tabs.children].forEach(c=>c.classList.remove('on'));b.classList.add('on');renderHeat();};
    tabs.appendChild(b);
  });
  renderHeat();
  // honey callout
  const byEra={}; EX.forEach(d=>{byEra[d.era]=byEra[d.era]||{t:0,h:0};byEra[d.era].t++;if(d.honey)byEra[d.era].h++;});
  document.getElementById('honeyCallout').innerHTML=
    "<b>'꿀'과의 공기</b> — '달다'가 꿀과 함께 쓰인 용례 비율: "+
    "1600년대 <b>"+(byEra['1600년대'].h)+"/"+byEra['1600년대'].t+"</b> → "+
    "1700년대 <b>"+(byEra['1700년대'].h)+"/"+byEra['1700년대'].t+"</b> → "+
    "1800년대 <b>"+(byEra['1800년대'].h)+"/"+byEra['1800년대'].t+"</b>. "+
    "처음엔 꿀과 거의 공기하지 않다가 19세기에 크게 늘어난다.";
})();

// ===== explorer =====
const PAGE=12; let shown=PAGE; let filtered=EX.slice();
function uniq(key){return [...new Set(EX.map(d=>d[key]))];}
function fillSelect(id,vals,allLabel){
  const s=document.getElementById(id);
  s.innerHTML='<option value="">'+allLabel+'</option>'+vals.map(v=>'<option>'+v+'</option>').join('');
}
fillSelect('fBook',uniq('bookShort').sort(),'전체 조리서');
fillSelect('fEra',ERAS.filter(e=>EX.some(d=>d.era===e)),'전체 시기');
fillSelect('fCat',uniq('cat1'),'전체 종류');
function hl(text){return (text||'').replace(/(달다|단맛|달게|달고|달아|달면|달거|다라|돌게|둘게|단 간장|꿀)/g,'<mark>$1</mark>');}
function escapeHTML(s){return (s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function applyFilters(){
  const b=fBook.value,e=fEra.value,c=fCat.value,q=fSearch.value.trim().toLowerCase(),h=fHoney.checked;
  filtered=EX.filter(d=>
    (!b||d.bookShort===b)&&(!e||d.era===e)&&(!c||d.cat1===c)&&(!h||d.honey)&&
    (!q||((d.recipe+d.translation+d.food+d.book).toLowerCase().includes(q)))
  );
  shown=PAGE; render();
}
function render(){
  const list=document.getElementById('exList');
  document.getElementById('count').innerHTML='총 <b>'+filtered.length+'</b>건'+(filtered.length>shown?' 중 '+shown+'건 표시':'');
  list.innerHTML=filtered.slice(0,shown).map(d=>{
    const yr=d.year?' · '+d.year:'';
    return '<div class="exrow"><div class="meta">'+
      '<span class="badge b-book">'+escapeHTML(d.bookShort)+'</span>'+
      '<span class="badge b-era">'+d.era+yr+'</span>'+
      '<span class="badge b-cat">'+d.cat1+(d.cat2?' · '+d.cat2:'')+'</span>'+
      (d.honey?'<span class="badge b-honey">꿀 공기</span>':'')+
      '<span class="food">'+escapeHTML(d.food)+'</span></div>'+
      '<div class="orig">'+hl(escapeHTML(d.recipe))+'</div>'+
      '<div class="trans">'+hl(escapeHTML(d.translation))+'</div></div>';
  }).join('');
  document.getElementById('moreBtn').style.display = filtered.length>shown?'block':'none';
}
['fBook','fEra','fCat','fHoney'].forEach(id=>document.getElementById(id).addEventListener('change',applyFilters));
document.getElementById('fSearch').addEventListener('input',applyFilters);
document.getElementById('moreBtn').addEventListener('click',()=>{shown+=PAGE;render();});
applyFilters();

// ===== scroll progress + reveal =====
const prog=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  prog.style.width=(window.scrollY/h*100)+'%';
},{passive:true});
const io=new IntersectionObserver((es)=>{
  es.forEach(e=>{if(e.isIntersecting){
    e.target.classList.add('in');
    const cv=e.target.querySelector&&e.target.querySelector('canvas');
    if(cv&&chartMakers[cv.id]&&!charted[cv.id]){charted[cv.id]=1;chartMakers[cv.id]();}
    io.unobserve(e.target);
  }});
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
