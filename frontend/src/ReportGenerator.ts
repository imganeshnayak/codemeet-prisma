/**
 * ReportGenerator.ts
 * Builds a beautifully formatted HTML report and opens it in a new window
 * using the browser's print dialog for PDF saving.
 * Neo-brutalist style: black borders, #d8f23c accent, clean monospace sections.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type EventReportData = {
  generatedAt: string
  generatedBy: string
  event: {
    id: string
    title: string
    category: string
    date: string
    time: string
    location: string
    description: string
    status: string
    organizer: string
    capacity: number
    skills: string
  }
  volunteers: {
    registered: number
    capacity: number
    fillRate: number
    list: { name: string; assignment: string; location: string; joinedAt: string }[]
  }
  tasks: {
    total: number
    submissionsReceived: number
    approved: number
    pending: number
    rejected: number
    list: { id: string; title: string; category: string; points: string; volunteers: number; status: string }[]
  }
  proofSubmissions: {
    volunteerName: string
    taskTitle: string
    gps: string
    capturedAt: string
    status: string
  }[]
  impact: {
    totalXpAwarded: number
    uniqueSkills: string[]
    completionRate: number
  }
}

export type CampaignReportData = {
  generatedAt: string
  campaign: {
    title: string
    category: string
    campaignId: string
    organizer: string
    location: string
    status: string
    currentStage: string
    description: string
    beneficiaryGroup: string
  }
  financial: {
    targetAmount: number
    raisedAmount: number
    targetUnits: number
    raisedUnits: number
    unitCost: number
    donationItem: string
    fundingProgress: number
  }
  donors: {
    total: number
    list: { donorName: string; units: number; amount: number; ticketId: string; timestamp: string }[]
  }
  expenses: {
    totalSpent: number
    budgetUtilization: number
    list: { item: string; vendor: string; amount: number; date: string }[]
  }
  stages: {
    stage: string
    title: string
    status: string
    gps: string
    location: string
    date: string
    photoUrl: string
    notes: string
  }[]
  impact: {
    unitsDistributed: number
    targetUnits: number
    netRaised: number
    totalSpent: number
    beneficiariesTargeted: string
  }
}

// ─── Shared CSS ───────────────────────────────────────────────────────────────

const BASE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Space Mono', monospace;
    background: #ffffff;
    color: #18151d;
    padding: 40px 48px;
    font-size: 13px;
    line-height: 1.6;
    max-width: 900px;
    margin: 0 auto;
  }

  .brand-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid #18151d;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }

  .brand-name {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .brand-accent {
    display: inline-block;
    background: #d8f23c;
    border: 2px solid #18151d;
    border-radius: 6px;
    padding: 2px 10px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .report-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -1px;
    line-height: 1.15;
    margin-bottom: 4px;
  }

  .report-meta {
    font-size: 11px;
    color: #5c5264;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .divider {
    border: none;
    border-top: 2px solid #18151d;
    margin: 28px 0;
  }

  .section {
    margin-bottom: 32px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #18151d;
    color: #d8f23c;
    padding: 8px 16px;
    border-radius: 8px 8px 0 0;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  .section-body {
    border: 2px solid #18151d;
    border-top: none;
    border-radius: 0 0 8px 8px;
    padding: 16px;
    background: #fafafa;
  }

  .kv-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 24px;
  }

  .kv-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .kv-label {
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #756c7b;
    font-weight: 700;
  }

  .kv-value {
    font-size: 13px;
    font-weight: 700;
    color: #18151d;
  }

  .badge {
    display: inline-block;
    background: #d8f23c;
    border: 1.5px solid #18151d;
    border-radius: 100px;
    padding: 2px 10px;
    font-size: 11px;
    font-weight: 700;
  }

  .badge-purple {
    background: #f0e4ff;
    color: #6f19d6;
    border-color: #6f19d6;
  }

  .badge-green {
    background: #dcfce7;
    color: #166534;
    border-color: #166534;
  }

  .badge-red {
    background: #fee2e2;
    color: #b91c1c;
    border-color: #b91c1c;
  }

  .badge-gray {
    background: #f1f1f1;
    color: #4b4b4b;
    border-color: #9ca3af;
  }

  .stat-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }

  .stat-box {
    border: 2px solid #18151d;
    border-radius: 8px;
    padding: 10px 16px;
    min-width: 110px;
    text-align: center;
    background: #fff;
  }

  .stat-num {
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
  }

  .stat-label {
    font-size: 10px;
    color: #756c7b;
    letter-spacing: 0.5px;
    margin-top: 3px;
  }

  .progress-bar-wrap {
    height: 12px;
    border: 1.5px solid #18151d;
    border-radius: 100px;
    overflow: hidden;
    background: #f0e7fa;
    margin: 8px 0;
  }

  .progress-bar-fill {
    height: 100%;
    background: #d8f23c;
    border-radius: 100px;
    transition: width 0.4s;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    margin-top: 10px;
  }

  th {
    background: #18151d;
    color: #d8f23c;
    padding: 8px 12px;
    text-align: left;
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  td {
    padding: 8px 12px;
    border-bottom: 1px solid #e5e7eb;
    color: #18151d;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) td {
    background: #f9f5ff;
  }

  .empty-note {
    color: #9ca3af;
    font-style: italic;
    font-size: 12px;
    padding: 8px 0;
  }

  .impact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 4px;
  }

  .impact-box {
    border: 2px solid #18151d;
    border-radius: 8px;
    padding: 14px;
    background: #fff;
    text-align: center;
  }

  .impact-num {
    font-size: 22px;
    font-weight: 700;
    color: #6f19d6;
  }

  .impact-label {
    font-size: 10px;
    color: #5c5264;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .footer {
    margin-top: 40px;
    padding-top: 16px;
    border-top: 2px solid #18151d;
    font-size: 10px;
    color: #9ca3af;
    display: flex;
    justify-content: space-between;
  }

  @media print {
    body { padding: 20px 28px; }
    .no-print { display: none !important; }
  }
`

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(dt: string): string {
  if (!dt) return '—'
  try {
    return new Date(dt).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return dt
  }
}

function fmtDate(d: string): string {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString('en-IN', { dateStyle: 'long' })
  } catch {
    return d
  }
}

function statusBadge(status: string): string {
  const lower = status?.toLowerCase() ?? ''
  const cls =
    lower === 'approved' || lower === 'completed' || lower === 'verified'
      ? 'badge-green'
      : lower === 'rejected'
        ? 'badge-red'
        : lower === 'submitted' || lower === 'pending'
          ? 'badge-purple'
          : 'badge-gray'
  return `<span class="badge ${cls}">${status}</span>`
}

function openPrintWindow(html: string) {
  const win = window.open('', '_blank', 'width=1000,height=800')
  if (!win) {
    alert('Please allow popups for this site to generate the report.')
    return
  }
  win.document.write(html)
  win.document.close()
  win.focus()
  setTimeout(() => win.print(), 800)
}

// ─── Event Report ─────────────────────────────────────────────────────────────

export function generateEventReportHTML(data: EventReportData): void {
  const { event, volunteers, tasks, proofSubmissions, impact, generatedAt, generatedBy } = data

  const volunteerRows = volunteers.list.length
    ? volunteers.list
        .map(
          (v) =>
            `<tr>
              <td>${v.name}</td>
              <td>${v.assignment}</td>
              <td>${v.location}</td>
              <td>${fmt(v.joinedAt)}</td>
            </tr>`,
        )
        .join('')
    : `<tr><td colspan="4" class="empty-note">No volunteers registered yet.</td></tr>`

  const taskRows = tasks.list.length
    ? tasks.list
        .map(
          (t) =>
            `<tr>
              <td>${t.title}</td>
              <td>${t.category}</td>
              <td>${t.points} XP</td>
              <td>${t.volunteers}</td>
              <td>${statusBadge(t.status)}</td>
            </tr>`,
        )
        .join('')
    : `<tr><td colspan="5" class="empty-note">No tasks created yet.</td></tr>`

  const proofRows = proofSubmissions.length
    ? proofSubmissions
        .map(
          (p) =>
            `<tr>
              <td>${p.volunteerName}</td>
              <td>${p.taskTitle}</td>
              <td style="font-family:monospace;font-size:11px">${p.gps}</td>
              <td>${p.capturedAt}</td>
              <td>${statusBadge(p.status)}</td>
            </tr>`,
        )
        .join('')
    : `<tr><td colspan="5" class="empty-note">No proof submissions yet.</td></tr>`

  const skillsText = impact.uniqueSkills.length ? impact.uniqueSkills.join(', ') : '—'

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>SevaSathi — Event Report: ${event.title}</title>
  <style>${BASE_CSS}</style>
</head>
<body>
  <div class="brand-bar">
    <div>
      <div class="brand-name">SevaSathi</div>
      <div style="font-size:10px;color:#756c7b;letter-spacing:1px;text-transform:uppercase;margin-top:2px">Volunteer Impact Platform</div>
    </div>
    <span class="brand-accent">Event Report</span>
  </div>

  <div class="report-title">${event.title}</div>
  <div class="report-meta">
    <span>📅 Report Generated: ${fmt(generatedAt)}</span>
    <span>👤 Generated By: ${generatedBy}</span>
    <span>🔖 Event ID: ${event.id}</span>
  </div>

  <!-- SECTION 1: EVENT OVERVIEW -->
  <div class="section">
    <div class="section-header">SECTION 1 — EVENT OVERVIEW</div>
    <div class="section-body">
      <div class="kv-grid">
        <div class="kv-item">
          <span class="kv-label">Event Title</span>
          <span class="kv-value">${event.title}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Category</span>
          <span class="kv-value">${event.category}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Date &amp; Time</span>
          <span class="kv-value">${fmtDate(event.date)}, ${event.time}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Location</span>
          <span class="kv-value">${event.location}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Status</span>
          <span class="kv-value">${statusBadge(event.status)}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Organizer</span>
          <span class="kv-value">${event.organizer}</span>
        </div>
        <div class="kv-item" style="grid-column:1/-1">
          <span class="kv-label">Skills Required</span>
          <span class="kv-value">${event.skills || 'No special skills needed'}</span>
        </div>
        <div class="kv-item" style="grid-column:1/-1">
          <span class="kv-label">Description</span>
          <span class="kv-value" style="font-weight:400;color:#3a3340">${event.description}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 2: VOLUNTEER METRICS -->
  <div class="section">
    <div class="section-header">SECTION 2 — VOLUNTEER METRICS</div>
    <div class="section-body">
      <div class="stat-row">
        <div class="stat-box">
          <div class="stat-num">${volunteers.registered}</div>
          <div class="stat-label">Registered</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${volunteers.capacity}</div>
          <div class="stat-label">Capacity</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${volunteers.fillRate}%</div>
          <div class="stat-label">Fill Rate</div>
        </div>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${Math.min(100, volunteers.fillRate)}%"></div>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Assignment</th><th>Location</th><th>Joined</th></tr></thead>
        <tbody>${volunteerRows}</tbody>
      </table>
    </div>
  </div>

  <!-- SECTION 3: TASK SUMMARY -->
  <div class="section">
    <div class="section-header">SECTION 3 — TASK SUMMARY</div>
    <div class="section-body">
      <div class="stat-row">
        <div class="stat-box">
          <div class="stat-num">${tasks.total}</div>
          <div class="stat-label">Total Tasks</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${tasks.submissionsReceived}</div>
          <div class="stat-label">Submissions</div>
        </div>
        <div class="stat-box" style="border-color:#166534">
          <div class="stat-num" style="color:#166534">${tasks.approved}</div>
          <div class="stat-label">Approved</div>
        </div>
        <div class="stat-box" style="border-color:#6f19d6">
          <div class="stat-num" style="color:#6f19d6">${tasks.pending}</div>
          <div class="stat-label">Pending</div>
        </div>
        <div class="stat-box" style="border-color:#b91c1c">
          <div class="stat-num" style="color:#b91c1c">${tasks.rejected}</div>
          <div class="stat-label">Rejected</div>
        </div>
      </div>
      <table>
        <thead><tr><th>Title</th><th>Category</th><th>Points</th><th>Volunteers</th><th>Status</th></tr></thead>
        <tbody>${taskRows}</tbody>
      </table>
    </div>
  </div>

  <!-- SECTION 4: PROOF SUBMISSIONS -->
  <div class="section">
    <div class="section-header">SECTION 4 — PROOF SUBMISSIONS</div>
    <div class="section-body">
      <table>
        <thead><tr><th>Volunteer</th><th>Task</th><th>GPS Coordinates</th><th>Captured At</th><th>Status</th></tr></thead>
        <tbody>${proofRows}</tbody>
      </table>
    </div>
  </div>

  <!-- SECTION 5: IMPACT SUMMARY -->
  <div class="section">
    <div class="section-header">SECTION 5 — IMPACT SUMMARY</div>
    <div class="section-body">
      <div class="impact-grid">
        <div class="impact-box">
          <div class="impact-num">${impact.totalXpAwarded.toLocaleString()}</div>
          <div class="impact-label">Total XP Awarded</div>
        </div>
        <div class="impact-box">
          <div class="impact-num">${impact.completionRate}%</div>
          <div class="impact-label">Completion Rate</div>
        </div>
        <div class="impact-box">
          <div class="impact-num">${impact.uniqueSkills.length}</div>
          <div class="impact-label">Unique Skills</div>
        </div>
      </div>
      <div style="margin-top:14px">
        <span class="kv-label">Skills Covered:</span>
        <span style="font-size:12px;margin-left:8px">${skillsText}</span>
      </div>
    </div>
  </div>

  <div class="footer">
    <span>SevaSathi Volunteer Platform · Confidential Report</span>
    <span>Generated ${fmt(generatedAt)}</span>
  </div>
</body>
</html>`

  openPrintWindow(html)
}

// ─── Campaign Report ──────────────────────────────────────────────────────────

export function generateCampaignReportHTML(data: CampaignReportData): void {
  const { campaign, financial, donors, expenses, stages, impact, generatedAt } = data

  const donorRows = donors.list.length
    ? donors.list
        .map(
          (d) =>
            `<tr>
              <td>${d.donorName}</td>
              <td>${d.units} ${financial.donationItem}s</td>
              <td>₹${d.amount.toLocaleString()}</td>
              <td style="font-family:monospace;font-size:11px">#${d.ticketId}</td>
            </tr>`,
        )
        .join('')
    : `<tr><td colspan="4" class="empty-note">No donors yet.</td></tr>`

  const expenseRows = expenses.list.length
    ? expenses.list
        .map(
          (e) =>
            `<tr>
              <td>${e.item}</td>
              <td>${e.vendor}</td>
              <td>₹${e.amount.toLocaleString()}</td>
              <td>${e.date}</td>
            </tr>`,
        )
        .join('')
    : `<tr><td colspan="4" class="empty-note">No expenses recorded.</td></tr>`

  const stageRows = stages.length
    ? stages
        .map(
          (s) =>
            `<tr>
              <td style="text-transform:capitalize;font-weight:700">${s.stage}: ${s.title}</td>
              <td>${statusBadge(s.status)}</td>
              <td style="font-family:monospace;font-size:11px">${s.gps}</td>
              <td>${fmt(s.date)}</td>
              <td style="font-size:11px;color:#5c5264">${s.notes || '—'}</td>
            </tr>`,
        )
        .join('')
    : `<tr><td colspan="5" class="empty-note">No stages recorded.</td></tr>`

  const netBalance = financial.raisedAmount - expenses.totalSpent

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>SevaSathi — Donation Campaign Report: ${campaign.title}</title>
  <style>${BASE_CSS}</style>
</head>
<body>
  <div class="brand-bar">
    <div>
      <div class="brand-name">SevaSathi</div>
      <div style="font-size:10px;color:#756c7b;letter-spacing:1px;text-transform:uppercase;margin-top:2px">Volunteer Impact Platform</div>
    </div>
    <span class="brand-accent">Donation Campaign Report</span>
  </div>

  <div class="report-title">${campaign.title}</div>
  <div class="report-meta">
    <span>📅 Report Generated: ${fmt(generatedAt)}</span>
    <span>👤 Organizer: ${campaign.organizer}</span>
    <span>🔖 Campaign ID: ${campaign.campaignId}</span>
  </div>

  <!-- SECTION 1: CAMPAIGN OVERVIEW -->
  <div class="section">
    <div class="section-header">SECTION 1 — CAMPAIGN OVERVIEW</div>
    <div class="section-body">
      <div class="kv-grid">
        <div class="kv-item">
          <span class="kv-label">Title</span>
          <span class="kv-value">${campaign.title}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Category</span>
          <span class="kv-value">${campaign.category}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Campaign ID</span>
          <span class="kv-value" style="font-family:monospace">${campaign.campaignId}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Organizer</span>
          <span class="kv-value">${campaign.organizer}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Location</span>
          <span class="kv-value">${campaign.location}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Status</span>
          <span class="kv-value">${statusBadge(campaign.status)}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Current Stage</span>
          <span class="kv-value" style="text-transform:capitalize">${campaign.currentStage}</span>
        </div>
        <div class="kv-item">
          <span class="kv-label">Beneficiary Group</span>
          <span class="kv-value">${campaign.beneficiaryGroup}</span>
        </div>
        <div class="kv-item" style="grid-column:1/-1">
          <span class="kv-label">Description</span>
          <span class="kv-value" style="font-weight:400;color:#3a3340">${campaign.description}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 2: FINANCIAL SUMMARY -->
  <div class="section">
    <div class="section-header">SECTION 2 — FINANCIAL SUMMARY</div>
    <div class="section-body">
      <div class="stat-row">
        <div class="stat-box">
          <div class="stat-num">₹${financial.raisedAmount.toLocaleString()}</div>
          <div class="stat-label">Raised</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">₹${financial.targetAmount.toLocaleString()}</div>
          <div class="stat-label">Target</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${financial.fundingProgress}%</div>
          <div class="stat-label">Funded</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${financial.raisedUnits}</div>
          <div class="stat-label">${financial.donationItem}s Sponsored</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${financial.targetUnits}</div>
          <div class="stat-label">Target Units</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">₹${financial.unitCost}</div>
          <div class="stat-label">Per Unit</div>
        </div>
      </div>
      <div style="margin-top:6px;font-size:11px;color:#756c7b">Funding Progress:</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${Math.min(100, financial.fundingProgress)}%"></div>
      </div>
      <div style="font-size:11px;color:#756c7b;text-align:right">${financial.fundingProgress}% of target reached</div>
    </div>
  </div>

  <!-- SECTION 3: DONOR LEDGER -->
  <div class="section">
    <div class="section-header">SECTION 3 — DONOR LEDGER</div>
    <div class="section-body">
      <div style="margin-bottom:10px">
        <span class="badge">${donors.total} Total Donors</span>
      </div>
      <table>
        <thead><tr><th>Donor Name</th><th>Units Sponsored</th><th>Amount</th><th>Ticket ID</th></tr></thead>
        <tbody>${donorRows}</tbody>
      </table>
    </div>
  </div>

  <!-- SECTION 4: EXPENSE LEDGER -->
  <div class="section">
    <div class="section-header">SECTION 4 — EXPENSE LEDGER</div>
    <div class="section-body">
      <div class="stat-row" style="margin-bottom:12px">
        <div class="stat-box">
          <div class="stat-num">₹${expenses.totalSpent.toLocaleString()}</div>
          <div class="stat-label">Total Spent</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${expenses.budgetUtilization}%</div>
          <div class="stat-label">Budget Used</div>
        </div>
        <div class="stat-box" style="${netBalance >= 0 ? 'border-color:#166534' : 'border-color:#b91c1c'}">
          <div class="stat-num" style="${netBalance >= 0 ? 'color:#166534' : 'color:#b91c1c'}">₹${Math.abs(netBalance).toLocaleString()}</div>
          <div class="stat-label">${netBalance >= 0 ? 'Surplus' : 'Deficit'}</div>
        </div>
      </div>
      <table>
        <thead><tr><th>Item / Service</th><th>Vendor</th><th>Amount</th><th>Date</th></tr></thead>
        <tbody>${expenseRows}</tbody>
      </table>
    </div>
  </div>

  <!-- SECTION 5: STAGE PROGRESS LOG -->
  <div class="section">
    <div class="section-header">SECTION 5 — STAGE PROGRESS LOG</div>
    <div class="section-body">
      <table>
        <thead><tr><th>Stage</th><th>Status</th><th>GPS</th><th>Date</th><th>Notes</th></tr></thead>
        <tbody>${stageRows}</tbody>
      </table>
    </div>
  </div>

  <!-- SECTION 6: IMPACT SUMMARY -->
  <div class="section">
    <div class="section-header">SECTION 6 — IMPACT SUMMARY</div>
    <div class="section-body">
      <div class="impact-grid">
        <div class="impact-box">
          <div class="impact-num">${impact.unitsDistributed}</div>
          <div class="impact-label">${financial.donationItem}s Distributed</div>
        </div>
        <div class="impact-box">
          <div class="impact-num">${impact.targetUnits}</div>
          <div class="impact-label">Target Units</div>
        </div>
        <div class="impact-box">
          <div class="impact-num">₹${impact.netRaised.toLocaleString()}</div>
          <div class="impact-label">Total Raised</div>
        </div>
        <div class="impact-box">
          <div class="impact-num">₹${impact.totalSpent.toLocaleString()}</div>
          <div class="impact-label">Total Spent</div>
        </div>
        <div class="impact-box" style="grid-column:span 2">
          <div class="impact-num" style="font-size:14px">${impact.beneficiariesTargeted}</div>
          <div class="impact-label">Beneficiaries Targeted</div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <span>SevaSathi Volunteer Platform · Confidential Report</span>
    <span>Generated ${fmt(generatedAt)}</span>
  </div>
</body>
</html>`

  openPrintWindow(html)
}

