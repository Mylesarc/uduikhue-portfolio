// Educational heuristics, not an entropy model or breach database.
(() => {
  function assessPassword(value) {
    const length = Array.from(value).length;
    const normal = value.toLowerCase();
    const common = /^(password|letmein|welcome|admin|qwerty|iloveyou|123456|monkey|dragon|football)[\d!@#$%]*$/i.test(value);
    const repeated = /(.{1,4})\1{2,}/u.test(normal);
    const sequence = ['123456', '654321', 'abcdef', 'qwerty', 'asdfgh'].some(s => normal.includes(s));
    let score = length === 0 ? 0 : length < 8 ? 1 : length < 15 ? 2 : length < 20 ? 3 : 4;
    if (common || repeated || sequence) score = Math.min(score, 1);
    const tips = [];
    if (length < 15) tips.push('Try a longer example: at least 15 characters is a useful starting point.');
    if (common) tips.push('This resembles an entry in this demo’s small common-password list.');
    if (repeated) tips.push('Repeated characters or short repeated blocks are predictable.');
    if (sequence) tips.push('Keyboard or alphabet/number sequences are easy to guess.');
    if (!tips.length) tips.push('No obvious pattern was found by these limited checks. That does not prove this example is secure.');
    tips.push('For real accounts, use a unique password from a password manager and enable MFA or a passkey.');
    return {length, score, tips};
  }
  const scenarios = [
    {from:'Campus Support <help@campus-access.example>', subject:'Final warning: mailbox closes in 20 minutes', body:'Your mailbox will be deleted. Open https://campus-access.example/verify and enter your password and one-time code immediately.', answer:'report', explanation:'Urgency plus a request for a password and one-time code are warning signs. Do not use the message’s link. Report it through your institution’s known channel and open the official portal independently.'},
    {from:'Course Office <office@university.example>', subject:'Your weekly course timetable', body:'Your timetable has been updated. No reply is needed. Open your usual course portal using your saved bookmark to review it.', answer:'verify', explanation:'There is no credential request or unexpected attachment here. Still, sender text alone cannot prove authenticity. Opening your known portal independently is the safer action.'},
    {from:'IT Desk <desk@university.example>', subject:'Unexpected sign-in approval', body:'We need your help testing access. Approve the sign-in notification arriving on your phone, even if you did not initiate it.', answer:'report', explanation:'Never approve an authentication request you did not initiate. A familiar-looking sender can be spoofed or compromised. Deny the request and contact IT using a trusted channel.'},
    {from:'Student Society <events@students.example>', subject:'Changed bank details for your event ticket', body:'Our payment account changed today. Please transfer the ticket fee to the new account in this message. Reply once you have paid.', answer:'verify', explanation:'An unexpected change in payment details needs independent verification before paying. Contact the organiser through a number or account you already trust, not the details in this message. Report it if they cannot verify it.'}
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = {assessPassword, scenarios};
  if (typeof document === 'undefined') return;

  const input = document.getElementById('password-example');
  if (!input) return;
  const output = document.getElementById('password-result');
  const meter = document.getElementById('password-meter');
  const hints = document.getElementById('password-tips');
  const toggle = document.getElementById('password-toggle');
  const labels = ['Enter a sample to begin', 'Predictable or too short', 'More length recommended', 'Longer sample', 'Long sample; limited checks passed'];
  function updatePassword() {
    const result = assessPassword(input.value);
    meter.value = result.score;
    output.textContent = `${labels[result.score]} · ${result.length} characters`;
    hints.replaceChildren(...result.tips.map(tip => { const li = document.createElement('li'); li.textContent = tip; return li; }));
  }
  input.addEventListener('input', updatePassword);
  document.getElementById('password-form').addEventListener('submit', event => event.preventDefault());
  toggle.addEventListener('click', () => {
    const show = input.type === 'password'; input.type = show ? 'text' : 'password';
    toggle.textContent = show ? 'Hide sample' : 'Show sample'; toggle.setAttribute('aria-pressed', String(show));
  });
  document.getElementById('password-clear').addEventListener('click', () => {
    input.value = ''; input.type = 'password'; toggle.textContent = 'Show sample'; toggle.setAttribute('aria-pressed', 'false'); updatePassword(); input.focus();
  });
  // Also discard the sample when leaving, including browser back/forward caching.
  window.addEventListener('pagehide', () => { input.value = ''; updatePassword(); });
  updatePassword();

  let index = 0, correct = 0, answered = false;
  const quizTitle = document.getElementById('quiz-subject');
  const feedback = document.getElementById('quiz-feedback');
  const next = document.getElementById('quiz-next');
  const choices = [...document.querySelectorAll('[data-quiz-answer]')];
  function render() {
    const scenario = scenarios[index]; answered = false;
    document.getElementById('quiz-progress').textContent = `Scenario ${index + 1} of ${scenarios.length} · ${correct} correct`;
    document.getElementById('quiz-from').textContent = scenario.from;
    quizTitle.textContent = scenario.subject;
    document.getElementById('quiz-body').textContent = scenario.body;
    feedback.textContent = ''; next.hidden = true;
    choices.forEach(button => { button.disabled = false; });
  }
  choices.forEach(button => button.addEventListener('click', () => {
    if (answered) return;
    answered = true;
    const match = button.dataset.quizAnswer === scenarios[index].answer;
    if (match) correct++;
    feedback.textContent = `${match ? 'Good choice.' : 'A safer choice is ' + (scenarios[index].answer === 'report' ? 'to report and avoid interacting.' : 'to verify independently first.')} ${scenarios[index].explanation}`;
    choices.forEach(choice => { choice.disabled = true; });
    document.getElementById('quiz-progress').textContent = `Scenario ${index + 1} of ${scenarios.length} · ${correct} correct`;
    next.textContent = index === scenarios.length - 1 ? 'See results' : 'Next scenario →'; next.hidden = false;
  }));
  next.addEventListener('click', () => {
    if (!answered) return;
    if (index < scenarios.length - 1) { index++; render(); quizTitle.focus(); }
    else {
      document.getElementById('quiz-progress').textContent = `Complete · ${correct} of ${scenarios.length} correct`;
      feedback.textContent = `You completed all four scenarios. Review unexpected requests through a trusted channel, avoid sharing passwords or codes, and report suspicious messages. This exercise does not certify that a real message is safe.`;
      next.hidden = true; feedback.focus();
    }
  });
  document.getElementById('quiz-restart').addEventListener('click', () => { index = 0; correct = 0; render(); quizTitle.focus(); });
  render();
})();
