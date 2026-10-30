// Թվային կոդի գուշակում (Mastermind): ▮ = ճիշտ տեղում, ▯ = սխալ տեղում
function startHack(cfg, box, done) {
  const code = cfg.code;
  let tries = cfg.tries || 6;
  box.hidden = false;
  box.innerHTML = '';
  const title = document.createElement('div');
  title.textContent = '> ' + cfg.title;
  const hint = document.createElement('div');
  hint.textContent = '> Հուշում: ' + cfg.hint;
  const log = document.createElement('div');
  log.className = 'log';
  const input = document.createElement('input');
  input.maxLength = code.length;
  input.inputMode = 'numeric';
  const btn = document.createElement('button');
  btn.textContent = 'Ուղարկել';
  btn.style.width = 'auto';
  box.append(title, hint, log, input, btn);
  input.focus();

  function finish(ok) {
    box.hidden = true;
    done(ok);
  }
  btn.onclick = () => {
    const g = input.value.trim();
    if (g.length !== code.length) return;
    let exact = 0, misplaced = 0;
    const rest = [];
    for (let i = 0; i < code.length; i++) {
      if (g[i] === code[i]) exact++;
      else rest.push(code[i]);
    }
    for (let i = 0; i < code.length; i++) {
      if (g[i] !== code[i] && rest.includes(g[i])) {
        misplaced++;
        rest.splice(rest.indexOf(g[i]), 1);
      }
    }
    tries--;
    log.textContent += `${g}  ${'▮'.repeat(exact)}${'▯'.repeat(misplaced)}  (մնաց ${tries})\n`;
    input.value = '';
    if (exact === code.length) setTimeout(() => finish(true), 600);
    else if (tries <= 0) setTimeout(() => finish(false), 600);
  };
  input.onkeydown = e => { if (e.key === 'Enter') btn.onclick(); };
}
