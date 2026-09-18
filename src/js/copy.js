/*copy */
function wireCopy(btnId, getText){
  const btn = document.getElementById(btnId);
  btn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(getText());
      btn.textContent = 'Copied';
      btn.classList.add('copied');
    }catch(e){
      btn.textContent = 'Failed';
    }
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1200);
  });
}
wireCopy('copyNameBtn', () => outName.textContent);
wireCopy('copyAbbrBtn', () => outAbbr.textContent);
