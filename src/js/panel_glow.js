// uis -------------------------------------------------------------------------------------------------------------------------------
// mouse glow script
   document.querySelectorAll('.panel').forEach(panel => {
  panel.addEventListener('mousemove', (e) => {
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    panel.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  });
});
