const root=document.documentElement;
const stage=document.querySelector('[data-stage]');
const progress=document.querySelector('[data-progress]');
let pointerX=0,pointerY=0;

function update(){
  const max=document.documentElement.scrollHeight-innerHeight;
  const p=max>0?scrollY/max:0;
  root.style.setProperty('--scroll',p.toFixed(4));
  progress.style.transform='scaleX('+p+')';
  stage?.style.setProperty('--rx',(pointerY*5).toFixed(2)+'deg');
  stage?.style.setProperty('--ry',(pointerX*7).toFixed(2)+'deg');
}
addEventListener('scroll',update,{passive:true});
addEventListener('pointermove',event=>{
  pointerX=(event.clientX/innerWidth-.5)*2;
  pointerY=(event.clientY/innerHeight-.5)*-2;
  update();
},{passive:true});
document.querySelectorAll('[data-reveal]').forEach(el=>{
  new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible')}
  }),{threshold:.2}).observe(el);
});
update();

// portfolio-polish-2026-09-29
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer=matchMedia('(pointer: coarse)').matches;
if(reduceMotion||coarsePointer){stage?.style.setProperty('--rx','0deg');stage?.style.setProperty('--ry','0deg')}
