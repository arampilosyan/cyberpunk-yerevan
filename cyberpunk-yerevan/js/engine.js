const CHAPTERS = ['ch01_kond', 'ch02_cascade'];
const state = { trust: { sevan: 0, nairi: 0, matyan: 0 }, moral: 0, flags: {} };
const story = {};
let endings = {};
const $ = id => document.getElementById(id);

async function load() {
  try {
    for (const c of CHAPTERS) story[c] = await (await fetch(`story/${c}.json`)).json();
    endings = await (await fetch('story/endings/endings.json')).json();
  } catch (e) {
    $('scene').textContent = 'Չհաջողվեց բեռնել պատմությունը։ Գործարկեք սերվեր՝ python3 -m http.server';
    return;
  }
  go(CHAPTERS[0] + ':start');
}

function applyEffects(fx = {}) {
  for (const [k, v] of Object.entries(fx)) {
    if (k === 'moral') state.moral += v;
    else if (k.startsWith('flag:')) state.flags[k.slice(5)] = v;
    else state.trust[k] = (state.trust[k] || 0) + v;
  }
}

function allowed(req) {
  if (!req) return true;
  if (req.flag && !state.flags[req.flag]) return false;
  if (req.trust) for (const [k, v] of Object.entries(req.trust)) if ((state.trust[k] || 0) < v) return false;
  return true;
}

function renderStats() {
  const t = state.trust;
  $('stats').textContent = `Սևան-Տեք ${t.sevan} | Նաիրի ${t.nairi} | Մատյան ${t.matyan} | Բարոյական ${state.moral}`;
}

function go(ref) {
  const [ch, id] = ref.includes(':') ? ref.split(':') : [state.chapter, ref];
  state.chapter = ch;
  const node = story[ch].nodes[id];
  if (!node) { $('scene').textContent = 'Սխալ՝ հանգույց չկա՝ ' + ref; return; }
  renderStats();
  const scene = $('scene'), choices = $('choices');
  scene.innerHTML = '';
  choices.innerHTML = '';
  if (node.speaker) {
    const s = document.createElement('div');
    s.className = 'speaker';
    s.textContent = node.speaker;
    scene.append(s);
  }
  scene.append(document.createTextNode(node.text));

  if (node.ending) return showEnding(node.ending);

  if (node.hack) {
    const h = node.hack;
    startHack(h, $('hack'), ok => { applyEffects(ok ? h.winFx : h.failFx); go(ok ? h.win : h.fail); });
    return;
  }
  for (const c of node.choices || []) {
    if (!allowed(c.requires)) continue;
    const b = document.createElement('button');
    b.textContent = c.text;
    b.onclick = () => { applyEffects(c.effects); go(c.next); };
    choices.append(b);
  }
}

function showEnding(id) {
  const e = endings[id];
  const box = $('scene');
  const h = document.createElement('h2');
  h.textContent = 'ԱՎԱՐՏ՝ ' + e.title;
  box.append('\n\n', h, e.text);
  const b = document.createElement('button');
  b.textContent = 'Սկսել նորից';
  b.onclick = () => location.reload();
  $('choices').append(b);
}

load();
