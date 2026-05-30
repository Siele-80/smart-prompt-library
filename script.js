const prompts = [
  { category: "business", title: "Business Proposal Writer", text: "Write a compelling business proposal for [product/service] targeting [audience]. Include problem, solution, value proposition, pricing, and a strong call to action." },
  { category: "business", title: "SWOT Analysis Generator", text: "Conduct a detailed SWOT analysis for [company/idea]. Present strengths, weaknesses, opportunities, and threats in a structured, actionable format." },
  { category: "business", title: "Executive Summary", text: "Write a concise executive summary for [business/report]. Highlight the key objectives, findings, and recommendations in under 200 words." },
  { category: "content", title: "Blog Post Generator", text: "Write an engaging 800-word blog post about [topic] targeting [audience]. Use a compelling headline, subheadings, and end with a clear call to action." },
  { category: "content", title: "Content Repurposer", text: "Repurpose this content into 5 different formats: a tweet, a LinkedIn post, an email newsletter intro, a short video script, and a blog intro. Content: [paste content here]" },
  { category: "content", title: "SEO Article Outline", text: "Create a detailed SEO-optimized article outline for the keyword [keyword]. Include H1, H2s, H3s, key points per section, and a meta description." },
  { category: "social", title: "Instagram Caption Writer", text: "Write 5 creative Instagram captions for a post about [topic/product]. Include relevant hashtags and a call to action. Tone: [casual/professional/inspirational]." },
  { category: "social", title: "LinkedIn Post Generator", text: "Write a thought-leadership LinkedIn post about [topic] that positions me as an expert. Make it engaging, professional, and end with a question to drive comments." },
  { category: "social", title: "Twitter/X Thread Creator", text: "Create a compelling 7-tweet thread about [topic]. Start with a hook, build value in each tweet, and end with a strong conclusion and call to follow." },
  { category: "email", title: "Cold Outreach Email", text: "Write a concise, personalized cold outreach email to [recipient role] at [company type] offering [service/product]. Keep it under 150 words with a clear CTA." },
  { category: "email", title: "Follow-Up Email", text: "Write a professional follow-up email after [interview/meeting/proposal] with [name/company]. Be warm, confident, and reiterate value without being pushy." },
  { category: "email", title: "Apology & Resolution Email", text: "Write a professional apology email to [client/customer] regarding [issue]. Acknowledge the problem, take responsibility, and offer a clear resolution." },
  { category: "productivity", title: "Meeting Agenda Builder", text: "Create a structured meeting agenda for a [duration] meeting about [topic] with [number] attendees. Include time slots, objectives, and a section for action items." },
  { category: "productivity", title: "Task Prioritization Framework", text: "Help me prioritize this list of tasks using the Eisenhower Matrix: [paste tasks]. Categorize each as urgent/important, important/not urgent, urgent/not important, or neither." },
  { category: "productivity", title: "Weekly Plan Generator", text: "Create a structured weekly work plan for someone in [role] with these goals: [list goals]. Include daily priorities, focus blocks, and buffer time for unexpected tasks." },
];

let currentCategory = 'all';
let currentSearch = '';

function renderPrompts() {
  const grid = document.getElementById('promptGrid');
  const filtered = prompts.filter(p => {
    const matchCat = currentCategory === 'all' || p.category === currentCategory;
    const matchSearch = p.title.toLowerCase().includes(currentSearch) || p.text.toLowerCase().includes(currentSearch);
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map((p, i) => `
    <div class="prompt-card">
      <span class="prompt-tag">${p.category}</span>
      <div class="prompt-title">${p.title}</div>
      <div class="prompt-text">${p.text}</div>
      <button class="copy-btn" id="btn-${i}" onclick="copyPrompt(${i}, '${p.text.replace(/'/g, "\\'")}')">
        📋 Copy Prompt
      </button>
    </div>
  `).join('');
}

function filterPrompts(category) {
  currentCategory = category;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderPrompts();
}

function searchPrompts() {
  currentSearch = document.getElementById('searchInput').value.toLowerCase();
  renderPrompts();
}

function copyPrompt(index, text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById(`btn-${index}`);
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 Copy Prompt';
      btn.classList.remove('copied');
    }, 2000);
  });
}

renderPrompts();