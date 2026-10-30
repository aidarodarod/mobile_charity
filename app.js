const A='assets/';
const image=(file,alt='',w,h)=>`<img src="${A+file}" alt="${alt}" ${w?`width="${w}" height="${h}"`:''} draggable="false">`;
const teamRows=[
  [[0,'Толченикова Марина Викторовна'],[1,'Окладников Илья Викторович'],[2,'Корнилова Мария Юрьевна']],
  [[3,'Прохоров Георгий Вячеславович'],[4,'Лыкова Мария Николаевна'],[5,'Плетнев Олег Станиславович'],[6,'Венглюк Богдан Валериевич']],
  [[7,'Ефремов Александр Викторович'],[8,'Карташова Юлия Владиславовна'],[9,'Ефимов Михаил Ефимович']],
  [[10,'Сотрудник ФПА'],[11,'Сотрудник ФПА'],[12,'Сотрудник ФПА'],[13,'Сотрудник ФПА']],
  [[14,'Иванова Ольга Степановна'],[15,'Сотрудник ФПА'],[16,'Боднар Евгения Ивановна']]
];
const staffFile=n=>`imgImage${n||''}.png`;
document.querySelector('#team-grid').innerHTML=teamRows.map((row,i)=>`<div class="team-row"><div class="team-track" data-row="${i}" data-count="${row.length}">${[...row,...row,...row].map(([n,name],j)=>`<div class="person" ${j>=row.length?'aria-hidden="true"':''}>${image(staffFile(n),j<row.length?name:'',120,65)}</div>`).join('')}</div></div>`).join('');
const managers=[
  {name:'Иванова Ольга Степановна',title:'Руководитель отдела юридического сопровождения',file:'imgImage17.png',height:169},
  {name:'Корнилова Мария Юрьевна',title:'Руководитель отдела клиентского сопровождения',file:'imgImage18.png',height:182},
  {name:'Боднар Евгения Ивановна',title:'Руководитель отдела послебанкротного сопровождения, автор Telegram-канала',file:'imgImage19.png',height:154}
];
document.querySelector('#managers').innerHTML=managers.map(m=>`<article class="manager"><div class="manager-picture">${image(m.file,m.name,122,m.height)}</div><div class="manager-copy"><p class="manager-name">${m.name}</p><p class="manager-title">${m.title}</p></div></article>`).join('');
const card={
  boxes:{type:'photo',file:'imgImage23.png',name:'Помощь благотворительному фонду'},
  rus:{type:'logo rusfond',file:'imgGroup513420.svg',name:'Русфонд',w:210.955,h:53.5447},
  child:{type:'photo photo-child',file:'imgImage24.png',name:'Поддержка детей и их семей'},
  khab:{type:'logo khab',file:'imgImage1346.png',name:'Фонд Хабенского',w:226,h:70},
  starost:{type:'logo',file:'imgStarostVRadost1.png',name:'Старость в радость',w:132.741,h:70},
  noch:{type:'logo',file:'imgFrame427318242.svg',name:'Ночлежка',w:224,h:31},
  balloons:{type:'photo',file:'imgImage25.png',name:'Благотворительная помощь'},
  world:{type:'logo',file:'imgGroup513257.svg',name:'WorldVita',w:194.634,h:57.4501},
  children:{type:'photo',file:'imgImage26.png',name:'Помощь детям'},
  alesha:{type:'logo alesha',file:'imgImage1345.png',name:'Алёша, благотворительный фонд',w:183,h:88},
  cats:{type:'photo photo-cats',file:'charity-new-3.png',name:'Благотворительная помощь'},
  gift:{type:'photo photo-gift',file:'charity-new-1.png',name:'Благотворительная помощь'},
  event:{type:'photo photo-event',file:'charity-new-2.png',name:'Благотворительное мероприятие'},
  volunteers:{type:'photo photo-volunteers',file:'charity-new-4.png',name:'Благотворительная помощь'},
  anton:{type:'logo anton',file:'imgGroup513421.svg',name:'Антон тут рядом',w:97.638,h:96.691},
  street:{type:'photo',file:'imgImage28.png',name:'Помощь Ночлежке'},
  podari:{type:'logo podari',file:'imgImage1347.png',name:'Подари жизнь'},
  mayak:{type:'logo',file:'imgGroup.svg',name:'Дом с маяком',w:106.32,h:125.25}
};
const charityRows=[['boxes','rus','child','khab','gift','starost'],['noch','balloons','world','children','alesha','event'],['cats','anton','street','podari','volunteers','mayak']];
document.querySelector('#charity-gallery').innerHTML=charityRows.map((row,i)=>`<div class="charity-row" role="region" aria-roledescription="карусель" aria-label="Благотворительность, ряд ${i+1}. Листайте влево и вправо" tabindex="0" data-row="${i}"><div class="charity-track">${row.map((key,j)=>{const c=card[key];const img=image(c.file,c.name,c.w,c.h);return `<div class="charity-card ${c.type}" role="group" aria-roledescription="слайд" aria-label="${j+1} из ${row.length}">${key==='podari'?`<div class="logo-crop">${img}</div>`:img}</div>`;}).join('')}</div></div>`).join('');
const media=[['imgImage29.png','Forbes',122],['imgImage30.png','Россия 24',139],['imgImage31.png','РБК',117],['imgImage32.png','Фонтанка',136]];
document.querySelector('#media-list').innerHTML=media.map(([file,name,w])=>`<a class="media-link" href="https://fpa.ru/news/smi/" target="_blank" rel="noopener noreferrer" aria-label="${name} — публикации о ФПА">${image(file,name,w,32)}<span class="external-icon" aria-hidden="true">${image('imgGroup2.svg','',14.59,14.59)}</span></a>`).join('');

// Each row owns its native scroll position: touch momentum and vertical page scrolling remain native.
const sliders=[...document.querySelectorAll('.charity-row')];
let initialized=false;
function sizeSliders(){
  sliders.forEach(row=>{const width=row.querySelector('.charity-card').getBoundingClientRect().width;const edge=(row.clientWidth-width)/2;row.style.setProperty('--edge',`${edge}px`);if(!initialized)row.scrollLeft=2*(width+6);});
  initialized=true;
}
sizeSliders();new ResizeObserver(sizeSliders).observe(document.querySelector('.charity-panel'));
sliders.forEach(row=>{
  let drag=null;
  const step=()=>row.querySelector('.charity-card').getBoundingClientRect().width+6;
  row.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();row.scrollBy({left:step()*(e.key==='ArrowRight'?1:-1),behavior:reducedMotion.matches?'instant':'smooth'});}if(e.key==='Home'||e.key==='End'){e.preventDefault();row.scrollTo({left:e.key==='Home'?0:row.scrollWidth,behavior:reducedMotion.matches?'instant':'smooth'});}});
  row.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;e.preventDefault();drag={x:e.clientX,left:row.scrollLeft};row.classList.add('dragging');row.setPointerCapture(e.pointerId);});
  row.addEventListener('pointermove',e=>{if(drag)row.scrollLeft=drag.left+drag.x-e.clientX;});
  const end=()=>{if(!drag)return;drag=null;const index=Math.round(row.scrollLeft/step());row.classList.remove('dragging');row.scrollTo({left:index*step(),behavior:reducedMotion.matches?'instant':'smooth'});};
  row.addEventListener('pointerup',end);row.addEventListener('pointercancel',end);
});

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const tracks=[...document.querySelectorAll('.team-track')];
let raf=0;
function renderTeam(){
  raf=0;
  const top=document.querySelector('#team').getBoundingClientRect().top;
  const displacement=reducedMotion.matches?0:Math.max(-180,Math.min(180,-top*.23));
  tracks.forEach((track,i)=>{const count=Number(track.dataset.count);const children=[...track.children];const cycle=children[count].offsetLeft-children[0].offsetLeft;const stagger=i%2?-61:0;const x=-cycle+stagger+displacement*(i%2?1:-1);track.style.transform=`translate3d(${x}px,0,0)`;});
}
function requestTeam(){if(!raf)raf=requestAnimationFrame(renderTeam);}
addEventListener('scroll',requestTeam,{passive:true});addEventListener('resize',requestTeam,{passive:true});reducedMotion.addEventListener('change',requestTeam);renderTeam();
// Expose a small, read-only QA snapshot for local verification.
window.demoState=()=>({rows:sliders.map(r=>({position:Math.round(r.scrollLeft),cards:r.querySelectorAll('.charity-card').length})),teamTransforms:tracks.map(t=>t.style.transform),images:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src'))});
