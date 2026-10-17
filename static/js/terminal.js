/**
 * Interactive Terminal CLI Controller (NEEL.ENV CLI)
 * Features command history, autocomplete chips, rich HTML responses, and API fallback
 */

(function () {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.getElementById('terminalBody');
  const cmdChips = document.querySelectorAll('.cmd-chip');

  if (!terminalInput || !terminalOutput) return;

  const history = [];
  let historyIndex = -1;

  // Execute Command
  window.executeCommand = async function (cmdText) {
    const rawCmd = (cmdText || '').trim();
    if (!rawCmd) return;

    // Record history
    history.push(rawCmd);
    historyIndex = history.length;

    // Append prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'flex items-center gap-2 text-xs font-mono mb-2';
    promptLine.innerHTML = `
      <span class="text-emerald-400 font-semibold">neel@automation-core:~$</span>
      <span class="text-slate-100">${escapeHtml(rawCmd)}</span>
    `;
    terminalOutput.appendChild(promptLine);

    // Handle clear locally
    if (rawCmd.toLowerCase() === 'clear') {
      terminalOutput.innerHTML = '';
      terminalInput.value = '';
      return;
    }

    // Call terminal API
    try {
      const res = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: rawCmd })
      });
      const data = await res.json();

      const responseLine = document.createElement('div');
      responseLine.className = 'font-mono text-xs text-slate-300 mb-4 pl-3 border-l-2 border-emerald-500/30';
      responseLine.innerHTML = data.output || '';
      terminalOutput.appendChild(responseLine);
    } catch (err) {
      const errLine = document.createElement('div');
      errLine.className = 'font-mono text-xs text-red-400 mb-3';
      errLine.textContent = 'Error connecting to terminal server.';
      terminalOutput.appendChild(errLine);
    }

    terminalInput.value = '';
    // Scroll to bottom
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  };

  // Keyboard Navigation
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    }
  });

  // Clickable Chips
  cmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd || chip.textContent.trim();
      terminalInput.value = cmd;
      executeCommand(cmd);
      terminalInput.focus();
    });
  });

  // Listen for external focus request
  window.addEventListener('focus-terminal', () => {
    if (terminalInput) {
      terminalInput.focus();
    }
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
