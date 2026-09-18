/* csv export  */
document.getElementById('csvBtn').addEventListener('click', () => {
  const header = 'Serial No,Name,10^US,10^EU,Abbreviation,Abbreviation_long_scale\n';
  const body = FULL_TABLE.map(r => `${r.n},${r.name},10^${r.usPow},10^${r.euPow},${r.abbr},${r.abbr}d`).join('\n');
  const blob = new Blob([header+body], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'illion_names_and_abbreviations.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
