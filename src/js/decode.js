/* decode */
const decodeInput = document.getElementById('decodeInput');
const decodeBtn = document.getElementById('decodeBtn');
const decodeResult = document.getElementById('decodeResult');

function lookupGroupToken(tok){
  if(tok === 'Ni') return {value:0};
  const hit = FULL_TABLE.find(r => r.abbr === tok);
  return hit ? {value:hit.n} : null;
}

function decode(){
  const raw = decodeInput.value.trim();
  decodeResult.classList.remove('ok','err');
  if(!raw){ decodeResult.textContent=''; return; }

  if(raw.includes('-')){
    const tokens = raw.split('-');
    const values = [];
    for(const tok of tokens){
      const r = lookupGroupToken(tok);
      if(!r){
        decodeResult.classList.add('err');
        decodeResult.textContent = `✗ "${tok}" inside "${raw}" is not a valid group code.`;
        return;
      }
      values.push(r.value);
    }
    let nBig = 0n;
    for(const v of values){ nBig = nBig*1000n + BigInt(v); }
    const name = cwName(nBig);
    decodeResult.classList.add('ok');
    decodeResult.textContent = `✓ "${raw}" = serial no ${commaFormat(nBig)} → ${name}  (10^${3n*nBig+3n} US / 10^${6n*nBig} EU)`;
    render(nBig);
    return;
  }

  const match = ABBR_LOOKUP[raw];
  if(match){
    decodeResult.classList.add('ok');
    decodeResult.textContent = `✓ "${raw}" = serial no ${match.n} → ${match.name}  (10^${match.usPow} US / 10^${match.euPow} EU)`;
    render(BigInt(match.n));
  } else {
    decodeResult.classList.add('err');
    decodeResult.textContent = `✗ "${raw}" is not a valid abbreviation in this scheme.`;
  }
}
decodeBtn.addEventListener('click', decode);
decodeInput.addEventListener('keydown', e => { if(e.key==='Enter') decode(); });
