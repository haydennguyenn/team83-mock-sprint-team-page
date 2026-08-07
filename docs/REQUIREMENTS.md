# Team Page Requirements and Login Screen Restyling

**Team:** 83
**Course:** COSC2408 Programming Project 1 (2650)
**Sprint:** Mock Sprint (Week 4)
**Planner Card:** Requirements - Team Page Fields and Login Styling Scope
**Prepared By:** Requirements / Business Analyst
**Status:** Draft for PM and UX Review
**Last Updated:** 7 August 2026

---

## 1. Overview

This sprint includes two related pieces of work:

1. Building a new Team Page that introduces the project team members.
2. Updating the visual design of the existing login screen so it feels consistent with the rest of the application.

---

## 2. Scope

### 2.1 Included in this Sprint

**Team Page**

- A dedicated Team Page and its layout.
- Displaying team member information using the fields defined in this document.
- Reading team member records from the project's data store when the page loads.

**Login Screen**

Visual updates only, including:

- Layout and spacing
- Colours and typography
- Button and form input styling
- Logo placement
- Responsive behaviour
- Focus and error-state presentation

### 2.2 Not Included

**Login Functionality**

No changes are to be made to:

- Authentication logic
- Session management
- Routing and redirects
- Validation behaviour

Further details are provided in Section 4.

**Team Management Features**

The following are intentionally out of scope:

- Editing member information within the application
- Admin management screens
- Profile image uploads
- Individual team member profile pages
- Contact forms or social media links
- Search, filtering, or pagination functionality

The team list is expected to remain small enough to display all members at once.

---

## 3. Team Member Information

Each team member record contains four visible fields.

### 3.1 Displayed Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | Yes | Displayed exactly as stored. No automatic title-casing. |
| `photo` | URL/String | No | Profile image displayed as a circular avatar. |
| `role` | String | Yes | Must be selected from the approved role list. |
| `blurb` | String | No | Short personal description displayed beneath the role. |

### 3.2 Validation Rules

#### Name

- Required
- Between 2 and 60 characters
- Trimmed before validation
- Cannot be empty after trimming

Display behaviour:

- Used as the card heading
- May wrap onto a second line
- Should not be truncated unless it exceeds the limits described in Edge Case E5

#### Photo

- Optional
- Must either:
  - Use a valid `https://` URL, or
  - Reference an image stored within the application's assets

Display behaviour:

- Displayed as a circular avatar
- All avatars must be the same size
- Missing or broken images follow Edge Case E1

#### Role

- Required
- Between 2 and 40 characters
- Must match one of the approved roles:
  - Project Manager
  - Requirements
  - UX
  - Developer
  - Tester
  - Scrum Master

Display behaviour:

- Appears directly below the name
- Visually secondary to the name
- Displayed on a single line

#### Blurb

- Optional
- Maximum 280 characters after trimming
- Plain text only
- HTML and Markdown are not supported

Display behaviour:

- Appears below the role
- Limited to three visible lines
- Follows the rules described in Edge Case E2

### 3.3 Supporting Fields

These fields exist in the data but are not displayed to users.

| Field | Purpose |
|-------|---------|
| `id` | Unique identifier for each team member |
| `order` | Controls the display order of cards |

### 3.4 Layout Requirements

The Team Page should use a responsive card-based grid:

- **Desktop:** 3 cards per row
- **Tablet:** 2 cards per row
- **Mobile:** 1 card per row

Additional requirements:

- Cards within the same row must always have equal height.
- Short blurbs should not reduce card height.
- By default, records are sorted by:
  1. `order` (ascending)
  2. `name` (alphabetically A-Z)

---

## 4. Login Screen Changes

### 4.1 Styling Only

The login screen redesign is strictly visual.

The following behaviour must remain exactly the same before and after the update:

- Authentication provider
- Login method and credential flow
- Session creation and duration
- Token storage and refresh behaviour
- Redirect destinations after login
- Route protection logic
- Validation rules
- Error conditions and error messages
- Form field names
- Submit handlers
- Network requests

### 4.2 What Can Be Changed

Visual elements may be updated, including:

- Colours
- Typography
- Spacing
- Layout
- Input styling
- Button styling
- Loading-state appearance
- Focus-state appearance
- Responsive layouts

The wording of existing messages must not change, although their visual presentation may.

### 4.3 Development Rule

Developers should only modify:

- Markup structure
- Styling files

If implementing a design change appears to require a logic change, raise the issue with the Project Manager before proceeding.

### 4.4 Review Requirement

The reviewer must confirm that no authentication, session-management, or routing files have been modified in the feature branch.

---

## 5. Edge Cases

### E1 - Missing or Broken Profile Image

If the photo is missing or fails to load:

- Display a placeholder avatar of the same size.
- Show the member's initials using:
  - First letter of the first name
  - First letter of the last name
- Never display a broken-image icon.
- Card dimensions must remain unchanged.

### E2 - Blurb Exceeds Three Lines

- Display only three lines followed by an ellipsis.
- Store the full blurb in the element's `title` attribute.
- Records longer than 280 characters should be rejected during validation rather than automatically truncated.

### E3 - Missing Blurb

- Do not display placeholder text.
- Preserve card alignment and equal card heights.

### E4 - Long Role Text

- Keep the role on a single line.
- Display an ellipsis if necessary.
- The role must not affect card layout.

### E5 - Very Long Names

- Allow wrapping up to two lines.
- Display an ellipsis after the second line.
- Long unbroken strings should break within the word rather than overflow.

### E6 - Missing or Duplicate Order Values

- Sort tied records alphabetically by name.
- Records without an `order` value should appear after records that have one.
- Ordering must remain consistent across page refreshes.

### E7 - No Team Members Available

If data cannot be loaded or the list is empty:

- Display a simple, neutral message.
- Do not show an empty grid.
- Do not expose raw error messages.

### E8 - Incomplete Final Row

For example, four members displayed in a three-column grid:

- Remaining cards stay left-aligned.
- Card widths remain unchanged.
- Cards must not stretch to fill unused space.

### E9 - Mobile Login Experience

At mobile widths:

- The login form remains fully functional.
- No horizontal scrolling should occur.
- Tab order and field order must remain unchanged.

### E10 - Login Error Behaviour

Following the redesign:

- The same error message must appear for the same error condition.
- Error text must remain in the same position relative to the form.
- Styling may change, but content and triggering logic may not.

---

## 6. Acceptance Criteria

The work is considered complete when:

- Every seeded team member is displayed using the fields and rules defined in this document.
- Edge Cases E1-E10 have been tested and behave as expected.
- The login screen matches the approved design across desktop, tablet, and mobile devices.
- Authentication, session, and routing files show no changes in the feature branch.
- Logging in with valid and invalid credentials produces the same outcomes as the current `main` branch.
- All work is merged through a Pull Request and not committed directly to `main`.

---

## 7. Assumptions

- Team member records will be manually seeded for this mock sprint.
- Team members are expected to provide square profile photos.
- Missing photos are a supported scenario and should not be treated as defects.
- The roles listed in this document match the roles agreed upon during sprint planning.
- If additional authentication methods are introduced later, the styling-only boundary for the login page will need to be revisited.

---

## 8. Questions for PM and UX

Before final design sign-off, the following points require confirmation:

1. What should the final avatar size be?
2. What responsive breakpoints should be used?
3. For placeholder avatars, should we use:
   - Initials on a coloured background, or
   - A generic user icon?
4. Is 280 characters the agreed maximum length for a team member blurb?

---

## 9. Handover Notes

This document defines the required fields, validation rules, display behaviour, and scope boundaries for both the Team Page and Login Screen work.

**For Designers and Developers**

- Section 3 and the edge cases form the implementation contract.
- Any requirement not listed should be considered out of scope.
- Section 4 is a strict boundary. Do not modify authentication, session, or routing logic as part of the login redesign.
- The open questions need answers before final styling values are locked in, but should not prevent initial design or development work from starting.
- Empty and missing states (E1, E3 and E7) are valid scenarios and should be handled gracefully rather than treated as system errors.

**Deliverable:** `docs/team-83-login-restyling.md`, linked from the Requirements Planner card.
