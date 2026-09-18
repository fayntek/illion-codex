/*  table  */
const tableBody = document.getElementById('tableBody');
function renderTable(filter){
  const f = (filter||'').toLowerCase();
  let rows = FULL_TABLE;
  if(f){
    rows = FULL_TABLE.filter(r =>
      r.name.toLowerCase().includes(f) ||
      r.abbr.toLowerCase().includes(f) ||
      String(r.n) === f
    );
  }
  const slice = rows.slice(0, 300);
  tableBody.innerHTML = slice.map(r => `
    <tr data-n="${r.n}">
      <td class="num">${r.n}</td>
      <td>${r.name}</td>
      <td class="num">10^${r.usPow}</td>
      <td class="num">10^${r.euPow}</td>
      <td class="abbr-cell">${r.abbr}</td>
    </tr>
  `).join('') + (rows.length > 300 ? `<tr><td colspan="5" style="color:var(--text-dim);text-align:center;padding:14px;">… ${rows.length-300} more rows, narrow your search or download the CSV</td></tr>` : '');
  tableBody.querySelectorAll('tr[data-n]').forEach(tr => {
    tr.addEventListener('click', () => {
      render(BigInt(tr.dataset.n));
      document.querySelector('.panel').scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
}
renderTable('');
document.getElementById('tableSearch').addEventListener('input', e => renderTable(e.target.value));
