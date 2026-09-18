/* Conway wechsler system name generator (recursive, unlimited) andd swarm sim style abbreviation (verified 1-999 and extended beyond) */

   
const UNITS = {0:'',1:'un',2:'duo',3:'tre',4:'quattuor',5:'quinqua',6:'se',7:'septe',8:'octo',9:'nove'};
const TENS = {0:'',1:'deci',2:'viginti',3:'triginta',4:'quadraginta',5:'quinquaginta',6:'sexaginta',7:'septuaginta',8:'octoginta',9:'nonaginta'};
const HUNDREDS = {0:'',1:'centi',2:'ducenti',3:'trecenti',4:'quadringenti',5:'quingenti',6:'sescenti',7:'septingenti',8:'octingenti',9:'nongenti'};
const IRR_FINAL = {1:'million',2:'billion',3:'trillion',4:'quadrillion',5:'quintillion',6:'sextillion',7:'septillion',8:'octillion',9:'nonillion'};
const IRR_LINK  = {1:'milli',2:'billi',3:'trilli',4:'quadrilli',5:'quintilli',6:'sextilli',7:'septilli',8:'octilli',9:'nonilli'};

const UNITS_STANDALONE_ABBR = {1:'M',2:'B',3:'T',4:'Qa',5:'Qi',6:'Sx',7:'Sp',8:'Oc',9:'No'};
const UNITS_PREFIX_ABBR = {0:'',1:'U',2:'D',3:'T',4:'Qa',5:'Qi',6:'Sx',7:'Sp',8:'O',9:'N'};
const TENS_ABBR = {0:'',1:'Dc',2:'Vi',3:'Tg',4:'Qd',5:'Qq',6:'Sg',7:'St',8:'Og',9:'Ng'};
const HUNDREDS_ABBR = {0:'',1:'C',2:'DC',3:'TC',4:'QaC',5:'QiC',6:'SxC',7:'SpC',8:'OC',9:'NC'};

function unitsWord(u, remaining){
  const fl = remaining ? remaining[0] : '';
  if(u===3) return 'coqtv'.includes(fl) ? 'tres' : 'tre';
  if(u===6){ if('qtv'.includes(fl)) return 'ses'; if('co'.includes(fl)) return 'sex'; return 'se'; }
  if(u===7){ if('cdqst'.includes(fl)) return 'septen'; if('ov'.includes(fl)) return 'septem'; return 'septe'; }
  if(u===9){ if('cdqst'.includes(fl)) return 'noven'; if('ov'.includes(fl)) return 'novem'; return 'nove'; }
  return UNITS[u];
}

function cwParts(n){ return {H:Math.floor(n/100), T:Math.floor(n/10)%10, U:n%10}; }

function groupWord(v, isFinal){
  if(v === 0) return isFinal ? 'nillion' : 'nilli';
  if(v < 10) return isFinal ? IRR_FINAL[v] : IRR_LINK[v];
  const {H,T,U} = cwParts(v);
  const tensW = TENS[T], hundW = HUNDREDS[H];
  const remaining = tensW || hundW;
  const unitsW = U ? unitsWord(U, remaining) : '';
  const combined = unitsW + tensW + hundW;
  return combined.slice(0,-1) + (isFinal ? 'illion' : 'illi');
}

function groupAbbr(v){
  if(v === 0) return 'Ni';
  if(v < 10) return UNITS_STANDALONE_ABBR[v];
  const {H,T,U} = cwParts(v);
  return UNITS_PREFIX_ABBR[U] + TENS_ABBR[T] + HUNDREDS_ABBR[H];
}

function toGroups(nBig){
  const groups = [];
  let x = nBig;
  while(x > 0n){ groups.push(Number(x % 1000n)); x /= 1000n; }
  groups.reverse();
  return groups.length ? groups : [0];
}

function cwName(nBig){
  nBig = BigInt(nBig);
  if(nBig < 1000n) return groupWord(Number(nBig), true);
  const groups = toGroups(nBig);
  return groups.map((g,i)=>groupWord(g, i===groups.length-1)).join('');
}

function cwAbbr(nBig){
  nBig = BigInt(nBig);
  if(nBig < 1000n) return groupAbbr(Number(nBig));
  const groups = toGroups(nBig);
  return groups.map(groupAbbr).join('-');
}

function cwPieces(nBig){
  nBig = BigInt(nBig);
  if(nBig < 1000n){
    const n = Number(nBig);
    if(n < 10) return {mode:'irregular', unit:{val:n, name:IRR_FINAL[n], abbr:UNITS_STANDALONE_ABBR[n]}};
    const {H,T,U} = cwParts(n);
    const tensW = TENS[T], hundW = HUNDREDS[H];
    const remaining = tensW || hundW;
    const unitsW = U ? unitsWord(U, remaining) : '';
    return {
      mode:'triplet',
      unit: U ? {val:U, name:unitsW, abbr:UNITS_PREFIX_ABBR[U]} : null,
      tens: T ? {val:T*10, name:tensW, abbr:TENS_ABBR[T]} : null,
      hundreds: H ? {val:H*100, name:hundW, abbr:HUNDREDS_ABBR[H]} : null
    };
  }
  const groups = toGroups(nBig);
  return {
    mode:'groups',
    groups: groups.map((g,i) => ({
      value:g, isFinal:i===groups.length-1,
      word: groupWord(g, i===groups.length-1),
      abbr: groupAbbr(g)
    }))
  };
}
