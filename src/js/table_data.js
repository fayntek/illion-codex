const FULL_TABLE = [];
const ABBR_LOOKUP = {};
for(let n=1;n<=999;n++){
  const name = cwName(BigInt(n));
  const abbr = cwAbbr(BigInt(n));
  const usPow = 3*n+3, euPow = 6*n;
  FULL_TABLE.push({n,name,abbr,usPow,euPow});
  ABBR_LOOKUP[abbr] = {n,name,abbr,usPow,euPow};
}
