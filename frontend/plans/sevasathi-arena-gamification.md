# SevaSathi Arena Gamification Plan

## Objective

Rename the existing non-functional **Impact** bottom-navigation destination to **Arena** and turn it into a polished, interactive, frontend-only gamification experience for volunteers.

The Arena should make volunteering feel motivating and social without trivializing real-world service. It will reward verified participation, consistency, teamwork, and meaningful progress rather than encouraging empty clicks or unhealthy competition.

## Confirmed Scope

- Gameplay model: **Balanced Arena**
  - Personal progression
  - Daily and weekly quests
  - Friendly weekly league
  - Shared team challenge
  - Streaks and badges
- Delivery level: **Frontend demo MVP**
  - Hardcoded seed data
  - In-memory React state and interactions
  - No backend, accounts, persistence, real verification, or cross-user synchronization
  - State resets when the page reloads
- Preserve the existing React + Vite + Tailwind implementation and current SevaSathi visual language.

## Existing Product Foundations

The current app already provides:

- A five-item bottom navigation with a non-functional **Impact** item.
- Hardcoded task cards that award 50–80 Impact Points.
- A profile showing 1.2K points, volunteer hours, event count, a badge, and level progress.
- An existing `Screen` union and state-based screen navigation.
- Reusable inline icons, `BottomNav`, Outfit typography, pastel surfaces, heavy dark outlines, and offset shadows.

Arena should consolidate and expand these existing progression concepts rather than creating a second, conflicting reward system.

## Core Product Decisions

### One reward economy

Use **Impact Points (IP)** everywhere. Do not add coins, gems, tickets, or another currency.

- Task cards continue to show their existing Impact Point rewards.
- Arena quests and milestones award Impact Points.
- Level progress is derived from Impact Points.
- Profile point totals and Arena totals use the same seeded value.

### Supportive competition

- The primary callout is personal progress and contribution.
- The leaderboard is called a **Weekly League**, not a global ranking.
- The user is always visibly highlighted.
- The top three positions form a promotion zone, but lower positions are not labeled as failures.
- Copy should emphasize encouragement such as “120 points to move up” rather than “you are losing.”
- Future production rankings should be based on verified activity; the demo should visibly label qualifying entries as verified where appropriate.

### Demo scoring model

Use the following understandable rules in the seeded UI:

- Complete a volunteer event: the event’s listed Impact Points, typically 50–100 IP.
- Finish a daily quest: 20–30 IP.
- Finish a weekly quest: 75–150 IP.
- Contribute to the team mission: progress toward a shared reward; no repeated click farming.
- Maintain a weekly activity streak: milestone badge/progress, not an endlessly multiplying point bonus.

The demo does not need to connect swiping a task to Arena scoring because swiping expresses interest, not completed volunteer work.

## Information Architecture

### Navigation changes

- Rename the bottom-nav label from **Impact** to **Arena**.
- Replace the current chart icon for that item with a trophy/award-style icon from the existing inline icon system.
- Extend navigation handling so:
  - Tasks opens the existing task screen.
  - Arena opens the new Arena screen.
  - Profile opens the existing profile screen.
- Extend `Screen` with `"arena"`.
- Extend `BottomNav` active-state and navigation types to include Arena.

### Arena screen structure

#### 1. Header

- Reuse the SevaSathi logo.
- Show a compact profile/initial button and notification indicator consistent with Tasks.
- Page heading: **Arena**
- Supporting line: “Turn every good deed into progress.”

#### 2. Player progression hero

Create a high-emphasis hero card containing:

- Current title: **Community Champion**
- Current level: **Level 8**
- Current progress: **780 / 1,000 IP**
- Remaining amount: **220 IP to Level 9**
- Animated-looking but CSS-only progress track.
- Current streak: **6 days**
- Weekly points: **320 IP**
- A prominent badge/trophy illustration made with the existing icon system and layered geometric shapes.

The hero should reuse the lime, purple, pink, teal, dark border, rounded card, and offset-shadow vocabulary already used in Tasks and Profile.

#### 3. Quest board

Add a **Today’s Quests** section with three seeded quests:

1. **Find your next cause**
   - Action: view three task cards
   - Progress: 2 / 3
   - Reward: 20 IP
2. **Show up for good**
   - Action: check in to one registered event
   - Progress: 0 / 1
   - Reward: 50 IP
3. **Bring a friend**
   - Action: invite one volunteer
   - Progress: complete
   - Reward: 25 IP

Interaction:

- Completed quests show a **Claim 25 IP** button.
- Claiming changes the quest to a claimed state, increments the displayed IP total and weekly score once, and shows a compact success toast.
- Incomplete quests have a disabled/progress action rather than pretending the real-world action can be completed in Arena.
- Claimed rewards cannot be claimed twice during the session.

#### 4. Weekly League

Create a friendly league card with:

- League name: **Purple League**
- Time remaining: **4 days left**
- Seeded top-five leaderboard with avatar initials, name, rank, and weekly IP.
- Aarav highlighted in the list at rank 4.
- Top-three promotion zone visually indicated.
- Context line: **120 IP to reach the promotion zone**.
- Optional segmented control for “Weekly” and “Friends”; in the MVP, switching changes between two seeded lists in local state.

Avoid a global/all-time leaderboard in this MVP.

#### 5. Team mission

Create a cooperative challenge card:

- Challenge: **Plant 500 Trees Together**
- Community progress: **342 / 500 trees**
- User contribution: **8 trees**
- Deadline: **12 days left**
- Shared reward: **Forest Guardian badge**
- Progress meter and a CTA linking back to Tasks: **Find an environment task**

This section should visually balance the competitive league by emphasizing shared achievement.

#### 6. Badge cabinet

Show a horizontal or responsive grid of four badges:

- Earth Keeper — unlocked
- Helping Hand — unlocked
- 7-Day Spark — 6 / 7 progress
- Community Builder — 2 / 5 progress

Interaction:

- Selecting a badge opens an inline detail panel or lightweight modal showing:
  - Badge name
  - Unlock condition
  - Current progress
  - Earned/locked status
- Locked badges remain colorful enough to be understandable but use reduced saturation/opacity and a lock indicator.

#### 7. Activity summary

Add a compact weekly summary:

- 6 volunteer hours
- 2 events completed
- 320 IP earned
- Short comparison: “24% more than last week”

This complements, rather than duplicates, the larger historical profile chart.

## State and Data Model

Keep all Arena data in `src/App.tsx` for consistency with the current small demo. Use typed constants plus local state.

### Proposed types

```ts
type ArenaQuest = {
  id: string
  title: string
  description: string
  progress: number
  goal: number
  reward: number
  claimed: boolean
}

type LeagueEntry = {
  id: string
  name: string
  initials: string
  points: number
  isCurrentUser?: boolean
}

type ArenaBadge = {
  id: string
  name: string
  description: string
  progress: number
  goal: number
  unlocked: boolean
}

type ArenaState = {
  totalPoints: number
  weeklyPoints: number
  level: number
  levelFloor: number
  nextLevelAt: number
  streakDays: number
  quests: ArenaQuest[]
}
```

### State behavior

- Seed `ArenaState` from hardcoded constants.
- Claiming a reward updates `totalPoints`, `weeklyPoints`, and the matching quest’s `claimed` flag.
- Derive level progress from the state rather than duplicating the percentage.
- Keep league lists hardcoded, but reflect claimed points in Aarav’s displayed weekly score and recalculate his rank if he crosses another seeded score.
- Keep team mission and badge progress seeded except for claimed quest updates.
- Share the Arena point total with the Profile screen by lifting the total into `App`.
- Replace the profile’s hardcoded `1.2K` point display with the shared formatted total so Arena and Profile never disagree.
- Do not persist to `localStorage` in this MVP; reload behavior should be predictable and documented as demo-only.

## Component Plan

Within `src/App.tsx`, add small local components to keep the Arena screen readable:

- `ArenaScreen`
- `ArenaHero`
- `QuestCard`
- `WeeklyLeague`
- `TeamMission`
- `BadgeCabinet`
- `BadgeDetail`
- Reuse `Logo`, `Icon`, and `BottomNav`.

Extend `IconName` only for icons genuinely needed by Arena, such as trophy, flame/streak, lock, and target. Continue using the existing stroked inline SVG conventions.

Do not introduce a router, global state library, chart library, icon package, or animation dependency.

## Visual and Responsive Behavior

### Mobile

- Single-column Arena feed.
- Hero stats arranged in a compact two-column row.
- Quest cards stack vertically.
- Leaderboard remains fully readable without horizontal scrolling.
- Badge cabinet uses a two-column grid.
- Bottom navigation remains fixed and marks Arena active.
- Include enough bottom padding that content never sits under the navigation.

### Tablet/Desktop

- Use a centered container consistent with existing 980–1100px screens.
- Progress hero spans the page.
- Quest board and league can form a two-column layout.
- Team mission and badge cabinet form the next responsive row.
- Preserve the same visual hierarchy rather than stretching mobile cards excessively.

### Motion

Use short CSS transitions only:

- Progress fill on Arena entry.
- Quest claim button press and claimed-state transition.
- Toast entrance/exit.
- Badge detail opening.

Respect `prefers-reduced-motion` by disabling nonessential transforms/transitions in CSS.

## Copy Updates Outside Arena

- Bottom navigation: **Impact** → **Arena**.
- Task reward copy remains **Impact Points**, because Arena is the destination and Impact Points are the reward currency.
- Profile:
  - Keep “Impact this month” as a real-world contribution metric, or revise it to **Your activity this month** if avoiding terminology ambiguity.
  - Keep badges and level progress, but source point totals from shared Arena state.
- Do not replace every use of the word “impact”; only rename the product section/tab.

## Accessibility

- Arena is reachable by keyboard from the bottom navigation.
- Progress elements include text values and appropriate `aria-label`/`aria-valuenow` attributes; do not rely on color alone.
- Disabled quest actions use the native disabled state.
- Toast uses `role="status"`.
- Badge detail has a clear close control and sensible focus behavior.
- League rank and promotion status are expressed in text, not only through color.
- Maintain visible focus styles matching the current UI.

## Edge Cases

- A claimed quest cannot increment points more than once.
- If claimed points move Aarav past another league member, sort the leaderboard deterministically by points, then stable seed order for ties.
- If total points cross the next-level threshold in the demo, show a level-up success state and carry excess points into the next level’s progress.
- If all quests are claimed, replace the section helper copy with “Today’s quests complete” while keeping completed cards visible.
- Long volunteer names and large point totals must truncate or format safely without breaking the leaderboard.
- Empty/locked badge progress always has explanatory copy.

## Files to Change

- `src/App.tsx`
  - Add Arena data/types, screen route, components, shared progression state, interactions, icon additions, and navigation wiring.
  - Connect Profile points to the shared Arena total.
- `src/index.css`
  - Add Arena surfaces, progress bars, leaderboard states, badge states, responsive rules, claim feedback, and reduced-motion handling.

No new dependencies or assets are required.

## Verification

1. Run the repository formatter on `src/App.tsx` and `src/index.css`.
2. Run `pnpm build`.
3. Manually verify:
   - Login/demo flow still reaches Tasks.
   - Bottom navigation displays Arena instead of Impact.
   - Tasks → Arena → Profile → Tasks navigation works.
   - Arena active navigation state is correct.
   - A completed quest reward can be claimed exactly once.
   - Claiming updates total IP, weekly IP, league position when applicable, and Profile points.
   - Weekly/Friends league toggle swaps seeded lists.
   - Team mission CTA returns to Tasks.
   - Badge details open and close correctly.
   - Settings, profile editing, task swiping, and sign-out remain functional.
   - Mobile layout works at 320–390px without clipping or content hidden by bottom navigation.
   - Desktop layout remains balanced at 768px and above.
   - Keyboard focus and reduced-motion behavior are usable.

## Out of Scope for This MVP

- Real accounts or authentication
- Persistent points or streaks
- Server-verified event completion
- Real multi-user leaderboards
- Push notifications
- Fraud/abuse prevention
- NGO challenge administration
- Prizes with monetary value
- Real-time updates

These require a backend and should be designed only after the frontend Arena concept is validated.
