// S3 Studios interactions
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('done'),600));
setTimeout(()=>document.getElementById('loader').classList.add('done'),2500);

const nav=document.getElementById('nav');
addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>40);
  // hero parallax
  const img=document.getElementById('heroImg');
  if(img&&scrollY<innerHeight) img.style.transform=`translateY(${scrollY*.22}px) scale(1.08)`;
},{passive:true});

// mobile menu
const menuBtn=document.getElementById('menuBtn'),mMenu=document.getElementById('mobileMenu');
menuBtn.onclick=()=>mMenu.classList.toggle('open');
mMenu.querySelectorAll('a').forEach(a=>a.onclick=()=>mMenu.classList.remove('open'));

// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// active nav
const secs=[...document.querySelectorAll('section[id]')];
const navLinks=[...document.querySelectorAll('.links a')];
addEventListener('scroll',()=>{
  let cur='home';
  secs.forEach(s=>{if(scrollY>=s.offsetTop-200)cur=s.id});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

// service cards -> portfolio
document.querySelectorAll('.svc').forEach(c=>c.addEventListener('click',()=>{
  document.querySelector('#portfolio').scrollIntoView({behavior:'smooth'});
}));

// portfolio filter
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  const f=b.dataset.f;
  document.querySelectorAll('.ph').forEach(p=>{
    const show=f==='all'||p.dataset.cat===f;
    p.classList.toggle('hide',!show);
    if(show){p.classList.remove('visible');requestAnimationFrame(()=>requestAnimationFrame(()=>p.classList.add('visible')))}
  });
});

// lightbox
const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lbImg'),lbCap=document.getElementById('lbCap');
let gallery=[],gi=0;
function openLb(list,idx,cap){
  gallery=list;gi=idx;lbImg.src=list[idx];lbCap.textContent=cap||'';
  lb.classList.add('open');document.body.style.overflow='hidden';
}
function closeLb(){lb.classList.remove('open');document.body.style.overflow=''}
function step(d){if(!gallery.length)return;gi=(gi+d+gallery.length)%gallery.length;lbImg.src=gallery[gi]}
document.querySelectorAll('.ph').forEach(p=>{
  p.addEventListener('click',()=>{
    const vis=[...document.querySelectorAll('.ph:not(.hide)')];
    const srcs=vis.map(v=>v.querySelector('img').src);
    openLb(srcs,vis.indexOf(p),p.querySelector('span').textContent+' — S3 Studios');
  });
});
document.getElementById('lbClose').onclick=closeLb;
document.getElementById('lbPrev').onclick=e=>{e.stopPropagation();step(-1)};
document.getElementById('lbNext').onclick=e=>{e.stopPropagation();step(1)};
lb.onclick=e=>{if(e.target===lb)closeLb()};
addEventListener('keydown',e=>{if(e.key==='Escape')closeLb();if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)});

// gold particles
const cv=document.getElementById('goldDust'),ctx=cv.getContext('2d');
let P=[];
function sizeCv(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight}
sizeCv();addEventListener('resize',sizeCv);
for(let i=0;i<70;i++)P.push({x:Math.random(),y:Math.random(),r:Math.random()*2+.4,s:Math.random()*.0006+.0002,o:Math.random()*.7+.2,ph:Math.random()*6.28});
(function tick(t){
  ctx.clearRect(0,0,cv.width,cv.height);
  P.forEach(p=>{
    p.y-=p.s;if(p.y<0)p.y=1;
    const tw=.5+.5*Math.sin(t*.001+p.ph);
    ctx.beginPath();ctx.arc(p.x*cv.width,p.y*cv.height,p.r,0,6.28);
    ctx.fillStyle=`rgba(200,165,90,${(p.o*tw).toFixed(3)})`;ctx.fill();
  });
  requestAnimationFrame(tick);
})(0);

// form demo
document.getElementById('enquiryForm').addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target;
  if(!f.name.value.trim()||!f.phone.value.trim()){f.name.focus();f.reportValidity&&f.reportValidity();return}
  document.getElementById('formSuccess').classList.add('show');
  f.querySelector('button').textContent='Enquiry Received ✓';
  setTimeout(()=>{f.reset();},800);
});
