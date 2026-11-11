/* ================= EDIT YOUR CONTENT HERE ================= */
const birthdayPerson = "babyyy Gwen";
const senderName     = "Sean";

const birthdayMessage = `
Happy 21st birthdayyyyy, my babyyyyy!! 🎂🥳

Actually, I don't know where to start since there are a lot of things I want to say to you. And no matter how long the words I write, it still won't be enough to explain how amazing you are, and how much you really mean to me. I'm really happy that I get to be a part of your 21st birthday. I really hope that this won't be the only birthday I get to spend with you. I hope that in many years to come, I'll be still part of your more birthdays.

You have become such an important part of my life. You're someone that I always look forward to talking to, someone I want to share random things that happens with my life, someone I want beside me when I'm having a bad day, and someone I want to share my happiness with when something good happens.

I love all the little things about you po babyy, I love the way you talk about the things that you like which is yung pag gastos mo sa ml, calculated ba naman lahat HASHHWHS, I love the side of you that not everyone gets to see, and what i really love the most is when you're being completely yourself. And also remember this po babyy, I don't love you because I think you're perfect, I love you because you're you, I love the real you, The version of you po babyy that gets tired. The version that overthinks. The version that gets annoyed. The version of you that doesn't always know what to say. The version that laughs at things that aren't even funny pero napapatawa mo pa rin ako HAHAHA. The version that sometimes doubt herself. And the version that gets excited over little things. Actually, madami pa akong gustong sabihin babyyy, kaso nawala yung una kong gawa haup, napa rush tuloy ako, anywayssss, I will always be grateful to you babyyy for always choosing me everyday po, and always remember babyyy that I will always choose you during our good times and even bad times, I won't give up on you. And like I said po babyyy, I won't promise na I'll never get tired, but what I can promise is that I will always be choosing you no matter what situations we currently are. You don't ever need to hide anything from me po babyyy. I will always accept you for who you are, no matter what. And again, I want to wish you the happiest birthday po babyyyy, you deserve only the best hehe, enjoyyy your day my beautiful, gorgeous, pretty, cute, and kind babyyyyyy.

`;

const finalMessage = `
I love you so muchhh my beautiful babyyy
`;
/* Image paths are set in index.html: images/cake.png, images/penguin.png, images/envelope.png, images/background.jpg */
/* ========================================================== */

const $ = id => document.getElementById(id);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
const rand = (a, b) => a + Math.random() * (b - a);

$('dear').textContent = `Dear ${birthdayPerson},`;
$('letterBody').textContent = birthdayMessage.trim();
$('finalBody').textContent = finalMessage.trim();
$('from').textContent = `— ${senderName}`;

const fx = $('fx'), floaters = $('floaters');
const PINKS = ['#ffb3cf', '#ff8fb8', '#ffd6e5', '#fff', '#f2c879', '#ffc0d9'];

function addTo(parent, text, css, life) {
  const el = document.createElement('span');
  el.textContent = text; el.style.cssText = css;
  parent.appendChild(el); setTimeout(() => el.remove(), life); return el;
}
function sparkleAt(x, y) {
  const e = addTo(fx, ['✦', '✧', '✨', '⋆'][Math.floor(rand(0, 4))],
    `left:${x}px;top:${y}px;font-size:${rand(12, 24)}px`, 1100);
  e.className = 'spark';
}
function burstAt(el, chars, n = 8) {
  const r = el.getBoundingClientRect();
  for (let i = 0; i < n; i++) {
    const e = addTo(fx, chars[Math.floor(rand(0, chars.length))],
      `left:${r.left + rand(0, r.width)}px;top:${r.top + rand(0, r.height * .6)}px;font-size:${rand(16, 28)}px;--dx:${rand(-40, 40)}px;--r:${rand(-30, 30)}deg;bottom:auto;position:absolute`, 2600);
    e.className = 'float'; e.style.animationDuration = rand(1.6, 2.4) + 's';
    e.style.top = (r.top + rand(0, r.height * .6)) + 'px'; e.style.bottom = 'auto';
    e.style.animationName = 'rise';
  }
}
function confetti(n = 70) {
  if (reduce) return;
  for (let i = 0; i < n; i++) {
    const c = document.createElement('i');
    c.className = 'conf';
    c.style.cssText = `left:${rand(0, 100)}vw;background:${PINKS[i % PINKS.length]};--dx:${rand(-80, 80)}px;animation-duration:${rand(2.2, 3.8)}s;animation-delay:${rand(0, .5)}s;border-radius:${i % 3 ? '2px' : '50%'}`;
    fx.appendChild(c); setTimeout(() => c.remove(), 4600);
  }
}
function floatingHeart() {
  const e = addTo(floaters, ['♡', '♥', '✦', '✿', '⋆'][Math.floor(rand(0, 5))],
    `left:${rand(2, 96)}vw;font-size:${rand(14, 30)}px;color:${PINKS[Math.floor(rand(0, 3))]};--dx:${rand(-40, 40)}px;--r:${rand(-40, 40)}deg;animation-duration:${rand(9, 16)}s`, 17000);
  e.className = 'float';
}
let floatTimer = setInterval(floatingHeart, reduce ? 4000 : 1400);
for (let i = 0; i < 6; i++) setTimeout(floatingHeart, i * 250);

// ambient sparkles near cake & letter
setInterval(() => {
  const t = document.querySelector('#letterOverlay.show .letter') || $('cake');
  const r = t.getBoundingClientRect();
  if (r.bottom > 0 && r.top < innerHeight) sparkleAt(r.left + rand(-20, r.width + 20), r.top + rand(-20, Math.min(r.height, innerHeight - r.top)));
}, 700);

// mouse glow
const glow = $('mouseGlow');
addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; } });

// ---------- Penguin ----------
let pCool = false;
const lines = ['Happy Birthday! ♡', "You're 21!!", 'Yay, cake!! 🎂', '21 looks great on you ♡'];
let li = 0;
function penguinSay(el, wrapEl, text) {
  const b = $('bubble'); b.textContent = text || lines[li++ % lines.length];
  b.classList.add('show'); setTimeout(() => b.classList.remove('show'), 2600);
}
function penguinReact(img, cls = 'wiggle') {
  img.classList.remove('jump', 'wiggle'); void img.offsetWidth; img.classList.add(cls);
  burstAt(img, ['♡', '♥'], 5);
}
function penguinClick() {
  if (pCool) return; pCool = true; setTimeout(() => pCool = false, 1800);
  penguinReact($('penguin')); penguinSay();
}
$('penguin').onclick = penguinClick;
$('penguin2').onclick = () => { if (pCool) return; pCool = true; setTimeout(() => pCool = false, 1500); penguinReact($('penguin2'), 'jump'); };
document.querySelectorAll('[role=button]').forEach(el => el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } }));

// ---------- Cake sequence ----------
let started = false;
$('cake').onclick = async () => {
  if (started) return; started = true;
  const cake = $('cake'); $('hint').classList.add('hidden');
  cake.style.cursor = 'default';
  // 1. cake reacts
  cake.classList.add('bounce'); $('flames').classList.add('on'); $('big21').classList.add('glow');
  const r = cake.getBoundingClientRect();
  for (let i = 0; i < 10; i++) setTimeout(() => sparkleAt(r.left + rand(0, r.width), r.top + rand(0, r.height)), i * 90);
  // 2. penguin reacts
  penguinReact($('penguin'), 'jump'); penguinSay(0, 0, "You're 21!!");
  await wait(900);
  // 3. celebration
  confetti(); burstAt(cake, ['♡', '♥', '★', '✦'], 14);
  await wait(1800);
  // 4. envelope rises from behind the cake
  const env = $('envelope'); env.classList.add('up');
  await wait(2300); env.classList.add('front');
  $('hint2').classList.remove('hidden');
  $('big21').classList.remove('glow');
};

// ---------- Envelope -> letter ----------
$('envelope').onclick = async () => {
  if (!started || $('envelope').classList.contains('open')) return;
  $('envelope').classList.add('open'); $('hint2').classList.add('hidden');
  const r = $('envelope').getBoundingClientRect();
  for (let i = 0; i < 12; i++) setTimeout(() => sparkleAt(r.left + rand(0, r.width), r.top + rand(0, r.height)), i * 70);
  await wait(1000);
  const o = $('letterOverlay'); o.classList.add('show'); o.setAttribute('aria-hidden', 'false');
  o.scrollTop = 0;
};

// ---------- One more thing ----------
$('moreBtn').onclick = () => {
  $('moreBtn').parentElement.classList.add('hidden');
  const card = $('finalCard'); card.classList.remove('hidden');
  card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  setTimeout(() => { penguinReact($('penguin2'), 'jump'); confetti(50); burstAt(card, ['★', '♡', '✦', '♥'], 14); }, 500);
  clearInterval(floatTimer); floatTimer = setInterval(floatingHeart, 500); // more hearts & stars for the finale
};

