# SevaSathi My Events Dashboard Plan

## Goal

Add a complete, mobile-first **My Events** dashboard that combines the volunteer/attendee and organizer experiences, follows the existing SevaSathi visual language, and works as a session-linked prototype. Users can find their joined and organized events, search and filter them, create a new event, and enter the existing event-management flows. Data remains in React state for the current page session and resets on refresh; no backend or browser persistence is introduced.

## Confirmed Product Decisions

- Use a **session-linked prototype** rather than static-only cards or a backend.
- Match the **existing app style**: Outfit typography, purple/lime/pink palette, rounded cards, dark outlined controls, playful shadows, and the shared five-item bottom navigation.
- Provide two primary tabs:
  - **Attending** for events where the current user is a volunteer.
  - **Organizing** for events created or managed by the current user.
- Seed both tabs with realistic examples so the first view is useful, then append newly created events to the organizing list.
- A newly created event starts with `Upcoming` status, becomes the selected management event, and opens the existing volunteers screen, preserving the current create-event journey.
- Keep all data in memory only. Refreshing the app resets events to the seed data.

## Data Model and State Flow

### Shared event shape

Create a small shared module, `src/events.ts`, containing:

- `EventRole`: `"attending" | "organizing"`.
- `EventStatus`: `"Upcoming" | "Ongoing" | "Completed"`.
- `SevaEvent` with:
  - `id`
  - `role`
  - `title`
  - `description`
  - `category`
  - `date`
  - `time`
  - `location`
  - `capacity`
  - `skills`
  - `image`
  - `status`
  - attendee-facing metadata such as organizer name and joined/assignment state
  - organizer-facing counts such as accepted volunteers and assigned tasks
- `CreateEventInput`, containing the form-owned fields before the app assigns ID, role, status, and default counts.
- Seed attendee and organizer records that reuse suitable existing files under `public/assets/` (for example the tree planting and task photography) rather than adding remote images.
- Small presentation helpers where useful, such as a safe display date formatter. Do not derive seed statuses from the current clock; store explicit statuses so the prototype remains stable.

### App-owned session state

Update `src/App.tsx` to:

- Add `"my-events"` to both the full `Screen` union and the app navigation destination union.
- Initialize `events` state from the seed records.
- Track `selectedEventId` so organizer quick actions and create completion can open management for the correct event.
- Handle creation by converting `CreateEventInput` into a `SevaEvent`, assigning a unique session ID, organizer role, `Upcoming` status, default management counts, and the chosen/default image.
- Pass events and callbacks into the new dashboard.
- Resolve the selected event before rendering `EventVolunteers` or `TaskAssignments`; use the seeded organizer event as a safe fallback if a management screen is entered without a selection.
- Change management-screen back behavior to return to **My Events**, not to the create form. Internal volunteers ↔ assignments navigation remains intact.

## UI Implementation

### New `src/MyEvents.tsx`

Build a dedicated responsive screen with these sections:

1. **Header**
   - SevaSathi brand, notification control, and profile avatar treatment consistent with the current app.
   - Page heading, short supporting copy, and a prominent **Create event** button.

2. **Role tabs**
   - Segmented Attending / Organizing controls with counts.
   - Clear active state, keyboard-operable buttons, and `aria` tab semantics.
   - Preserve the search query and status filter when switching tabs unless they no longer produce results; the empty state then offers reset.

3. **Search and status filters**
   - Search input filters title, category, and location case-insensitively.
   - Status chips/select for `All`, `Upcoming`, `Ongoing`, and `Completed`.
   - Show a concise result count.

4. **Event cards**
   - Shared card layout with cover image, role/category label, status badge, title, location, date/time, and contextual metadata.
   - Status colors remain accessible and consistent:
     - Upcoming: purple/lavender.
     - Ongoing: green/lime.
     - Completed: neutral/pink accent.
   - Attending cards show organizer plus assignment/joined context.
   - Organizer cards show accepted-volunteer and task counts.
   - Responsive layout: single column on narrow mobile widths and a two-column card grid when space allows, while staying visually aligned with the existing max-width app shell.

5. **Quick actions**
   - Attending:
     - **View details** opens an accessible in-page detail panel/dialog populated from the selected event.
     - Ongoing events also expose **Upload proof**, navigating to the existing geo-tag proof screen.
   - Organizing:
     - **Manage volunteers** selects the event and opens `EventVolunteers`.
     - **Task assignments** selects the event and opens `TaskAssignments`.
   - The top **Create event** action opens the existing create-event screen.

6. **Empty states**
   - A role-level empty state when a tab has no records, with a context-specific action:
     - Attending: return to Tasks to discover opportunities.
     - Organizing: create an event.
   - A separate no-results state for search/filter combinations, with a **Clear filters** action.
   - Use existing icons/decorative patterns; do not introduce emoji.

7. **Bottom navigation**
   - Render the shared five-item navigation with **My Events** active.
   - Wire Tasks, My Events, Memories, and Profile consistently.

### Existing navigation updates

- In the shared `BottomNav` inside `src/App.tsx`:
  - Allow `"My Events"` as an active value.
  - Route the item to `"my-events"`.
- In `src/MemoryReel.tsx`:
  - Expand its navigation callback type to include `"my-events"`.
  - Give its existing My Events item a destination so it is no longer inert.
- Leave the currently inert Home item unchanged because this scope is specifically My Events and the app has no dedicated home screen.

## Create Event Integration

Refactor `src/CreateEvent.tsx` from placeholder-only uncontrolled inputs into a functional session form:

- Change `onCreated` to receive `CreateEventInput`.
- Give each field a controlled value and change handler.
- Use appropriate input types where practical:
  - text for title/location/skills
  - textarea for description with a live character count
  - select for category
  - date and time inputs for schedule
  - numeric input for capacity
- Keep required fields aligned with the current visual asterisks: title, description, category, date, time, location, capacity, and cover image.
- Add client-side required validation and prevent submission until required values are present; use native constraints plus an inline, accessible error summary for invalid submission.
- Preview the selected cover image. Read it into a data URL for session use so the created card and management summary can display it without relying on a temporary remote resource.
- Submit normalized values to `App`, which appends the event and navigates into volunteer management.
- Preserve the existing visual layout and back action; back returns to the screen that launched creation (My Events when launched there, Swipe Donation when launched there). Track this origin in `App` rather than hard-coding one destination.

## Existing Management Screen Integration

Update `src/EventVolunteers.tsx` and `src/TaskAssignments.tsx` to accept a selected `SevaEvent` prop and replace their hard-coded summary values with:

- event image
- category
- status where the design includes it
- title
- location
- date/time
- count labels where supported by the event record

Keep the detailed volunteer and assignment prototype lists as they are; this task only makes their event context dynamic. Existing volunteers ↔ assignments callbacks remain unchanged.

## Styling

- Prefer Tailwind utilities in `MyEvents.tsx`.
- Add narrowly scoped styles to `src/index.css` only for repeated or stateful patterns that become unreadable as inline utility strings, such as the detail dialog transition or event-specific card treatment.
- Reuse existing font classes and design tokens/colors already present in the repository.
- Maintain bottom padding for the fixed navigation and safe touch targets of roughly 44px.
- Ensure focus-visible styles, descriptive button labels, dialog close behavior, and meaningful image alt text.

## Files to Add or Change

- Add `src/events.ts` — shared event types, seed data, and display helpers.
- Add `src/MyEvents.tsx` — combined attendee/organizer dashboard.
- Update `src/App.tsx` — route union, session state, navigation, create origin, selected-event flow, and My Events rendering.
- Update `src/CreateEvent.tsx` — controlled form and typed event submission.
- Update `src/EventVolunteers.tsx` — dynamic selected-event summary.
- Update `src/TaskAssignments.tsx` — dynamic selected-event summary.
- Update `src/MemoryReel.tsx` — activate its My Events nav destination.
- Update `src/index.css` only if the new dashboard needs a small amount of reusable custom styling.

## Edge Cases and Failure Behavior

- Search input containing only whitespace behaves as an empty query.
- A filter that matches no records shows the no-results state without mutating source data.
- Clearing filters restores all records in the active role tab.
- Missing or invalid uploaded cover files produce an inline message and do not create an event; accept JPG/PNG and enforce the existing 5 MB copy.
- If a created event has an unreadable image, fall back to a bundled event image rather than rendering a broken card.
- Management screens always receive an event through selected-ID lookup plus a seeded fallback.
- Closing the attendee details panel returns focus to the triggering control; Escape closes it.
- Navigation does not lose in-memory event records, but a full browser refresh intentionally resets them.

## Verification

1. Run `pnpm run build` to verify TypeScript and Vite production compilation.
2. Use the already-running preview server; do not start another development server.
3. Manually verify the main paths at mobile width and one wider responsive width:
   - Open My Events from shared bottom navigation and from Memories.
   - Switch Attending / Organizing tabs and confirm counts.
   - Search by title/location/category and apply each status filter.
   - Trigger and clear the no-results state.
   - Open and keyboard-close attendee event details.
   - Navigate from an ongoing attendee event to geo proof and back.
   - Open volunteers and assignments from an organizer card; confirm the selected event summary is carried through and back returns to My Events.
   - Create a valid event with an image; confirm it appears in Organizing and is immediately used by the management screen.
   - Attempt invalid/missing required fields and an oversized/non-image upload; confirm accessible inline feedback.
   - Confirm Tasks, Memories, Profile, and My Events navigation still works and My Events displays its active state.
4. Confirm no new console/runtime errors during those flows; inspect logs only if an actual failure is observed.
