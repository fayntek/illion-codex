const slider = document.getElementById('serialSlider');
const numInput = document.getElementById('serialInput');
const breakdownEl = document.getElementById('breakdown');
const outName = document.getElementById('outName');
const outPowers = document.getElementById('outPowers');
const outAbbr = document.getElementById('outAbbr');
const outAbbrLong = document.getElementById('outAbbrLong');
const nameBadge = document.getElementById('nameBadge');
const abbrBadge = document.getElementById('abbrBadge');

function chipHTML(cls, label, value, empty){
  if(empty) return `<div class="chip ${cls} empty-chip"><span class="k">${label}</span><span class="v">-</span></div>`;
  return `<div class="chip ${cls}"><span class="k">${label}</span><span class="v">${value}</span></div>`;
}

function commaFormat(bigOrNum){
  return BigInt(bigOrNum).toLocaleString('en-US');
}

let currentBig = 123n;

function render(nBig, opts){
  opts = opts || {};
  nBig = BigInt(nBig);
  if(nBig < 1n) nBig = 1n;
  currentBig = nBig;

  if(nBig <= 999n){
    slider.value = Number(nBig);
  }
  numInput.value = nBig.toString();				//that thing breaks too often f**kkkk

  const name = cwName(nBig);
  const abbr = cwAbbr(nBig);
  const usPow = 3n*nBig+3n, euPow = 6n*nBig;
  const pieces = cwPieces(nBig);

  let html = '';
  if(pieces.mode === 'irregular'){
    html += chipHTML('units', 'Irregular (1-9)', `${pieces.unit.name} → ${pieces.unit.abbr}`, false);
  } else if(pieces.mode === 'triplet'){
    html += chipHTML('units', 'Units', pieces.unit ? `${pieces.unit.val} ${pieces.unit.name} → ${pieces.unit.abbr}` : '', !pieces.unit);
    html += '<span class="plus">+</span>';
    html += chipHTML('tens', 'Tens', pieces.tens ? `${pieces.tens.val} ${pieces.tens.name} → ${pieces.tens.abbr}` : '', !pieces.tens);
    html += '<span class="plus">+</span>';
    html += chipHTML('hundreds', 'Hundreds', pieces.hundreds ? `${pieces.hundreds.val} ${pieces.hundreds.name} → ${pieces.hundreds.abbr}` : '', !pieces.hundreds);
  } else if(pieces.mode === 'groups'){
    html += `<div class="group-note">${pieces.groups.length} chiliads (blocks of 1000), most significant first - each linked with "-illi-" except the last, which closes with "-illion":</div>`;
    pieces.groups.forEach((g, i) => {
      const cls = 'group' + (g.isFinal ? ' final' : '') + (g.value===0 ? ' zero' : '');
      html += chipHTML(cls, g.isFinal ? 'final chiliad' : `chiliad ${i+1}`, `${g.value} → ${g.word} (${g.abbr})`, false);
      if(i < pieces.groups.length-1) html += '<span class="plus">+</span>';
    });
  }
  breakdownEl.innerHTML = html;

  outName.textContent = name;
  outPowers.textContent = `10^${usPow} (US)  ·  10^${euPow} (EU)`;
  outAbbr.textContent = abbr;
  outAbbrLong.textContent = `long scale (-illiard): ${abbr}d`;

  const extended = nBig >= 1000n;
  nameBadge.textContent = extended ? 'Extended' : 'verified';
  nameBadge.className = 'badge ' + (extended ? 'extended' : 'verified');
  abbrBadge.textContent = extended ? 'Extended' : 'verified';
  abbrBadge.className = 'badge ' + (extended ? 'extended' : 'verified');

  // candlelight pulse on the stamp when the value vhange
  outAbbr.classList.remove('pulse');
  void outAbbr.offsetWidth; // restart anim
  outAbbr.classList.add('pulse');
  setTimeout(() => outAbbr.classList.remove('pulse'), 400);

  // hareable permalink in  URL
  if(!opts.skipHash){
    const hash = '#n=' + nBig.toString();
    if(location.hash !== hash) history.replaceState(null, '', hash);
  }
}

slider.addEventListener('input', e => render(BigInt(e.target.value)));

numInput.addEventListener('input', e => {
  const digits = e.target.value.replace(/[^\d]/g,'');
  if(digits !== e.target.value.replace(/,/g,'')){
    numInput.classList.remove('shake'); void numInput.offsetWidth; numInput.classList.add('shake');
  }
  if(digits && digits.length < 30){
    try{ render(BigInt(digits)); }catch(err){}
  }
});
numInput.addEventListener('animationend', () => numInput.classList.remove('shake'));

document.getElementById('randomBtn').addEventListener('click', () => {
  render(BigInt(1 + Math.floor(Math.random()*999)));
});

function currentValue(){ return currentBig; }
document.getElementById('incBtn').addEventListener('click', () => render(currentValue() + 1n));
document.getElementById('decBtn').addEventListener('click', () => {
  const v = currentValue() - 1n;
  render(v < 1n ? 1n : v);
});
document.querySelectorAll('[data-jump]').forEach(btn => {
  btn.addEventListener('click', () => render(BigInt(btn.dataset.jump)));
});

// read permalinkon load
(function initFromHash(){
  const m = location.hash.match(/n=(\d+)/);
  if(m){
    try{ render(BigInt(m[1]), {skipHash:true}); return; }catch(e){}
  }
  render(123n, {skipHash:true});
})();
