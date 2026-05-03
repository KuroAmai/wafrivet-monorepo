# PRD: Wafrivet Herd — NFC Animal Record Layer (Frontend)
**Product:** herd.wafrivet.com  
**Platform:** Progressive Web App (PWA) — Android Chrome/Samsung Internet (Web NFC)  
**Version:** 1.0  
**Author:** Wafrivet Product Team  
**Date:** May 2026  
**Status:** Draft

---

## 1. Overview

Wafrivet Herd is the NFC-powered animal health layer of the Wafrivet platform, accessible at `herd.wafrivet.com`. It is built as an offline-first PWA serving veterinarians and livestock farmers on Android devices. Its primary function is: scan an NFC ear tag → instantly view the animal's full record → interact with the Wafrivet AI assistant using that animal's data as full context.

This document covers the **frontend only**: screens, components, data displayed, interactions, offline behaviour, NFC flow, and AI context integration. Backend, infrastructure, and tag provisioning hardware are out of scope here.

---

## 2. Users

| Role | Who | Primary Use |
|---|---|---|
| Farmer | Livestock owner, often low-tech | Check animal records, log feed/deworming, ask AI basic questions |
| Veterinarian | Licensed vet, field or clinic | Full clinical review, add diagnoses/treatments, use AI for differential diagnosis |
| Field Agent | Wafrivet staff / farm extension officers | Tag provisioning, data capture support |

---

## 3. Design Principles

- **Offline-first**: Core screens must load and function without network
- **Scan-first UX**: The primary interaction is "tap and see"—zero typing required to identify an animal
- **AI always available**: Any animal record can become AI context with one tap
- **Low data**: Minimal payloads, aggressive caching, no heavy media on default views
- **Role-aware**: Vets see clinical detail; farmers see simplified summaries and alerts
- **Multilingual-ready**: All UI strings to support EN, Yoruba, Hausa, Igbo in future iterations

---

## 4. Screen & Component Inventory

### 4.1 App Shell / Global Components

#### `<AppShell />`
- Bottom navigation bar with: **Scan**, **My Animals**, **Farms** (vet/agent), **AI**, **Settings**
- Top bar: Wafrivet Herd logo, user avatar, offline indicator badge
- **Offline Banner**: sticky yellow ribbon when no network detected — "Offline — showing cached data"
- **PWA Install Prompt**: shown first-time Android users who haven't installed the app

#### `<AuthGate />`
- Login screen: phone number + OTP (consistent with Wafrivet's main auth)
- Role detection on login (farmer vs vet vs agent) — controls which tabs and fields are visible

---

### 4.2 Scan Screen (Home / Primary Screen)

This is the landing screen and the heart of the UX.

#### `<ScanScreen />`
- **Scan Button (large, centred)**: "Tap to Scan Animal Tag"
  - On press: initialises `NDEFReader`, prompts user to tap phone to tag
  - Animated pulse ring while scanning
  - Shows scanning status: "Waiting for tag...", "Reading...", "Found: WAF-NG-C-2026-000123"
- **Manual Lookup**: small text link below — "Enter ID manually" → opens `<AnimalSearchModal />`
- **NFC Not Supported Banner**: shown if `'NDEFReader' not in window` — "Web NFC is not supported on this browser. Please use Chrome on Android."
- **Last Scanned Strip**: horizontal scroll row of last 5 scanned animals — avatar (species icon), name/UID, time of last scan — tap any to reopen record
- **Quick Farm Sync Button**: "Sync farm for offline" → triggers `<FarmSyncModal />`

---

### 4.3 Animal Record Screen (Core Screen)

Opened after a successful NFC scan or manual lookup. The most data-rich screen.

#### `<AnimalRecordScreen />`

Split into a tabbed layout. All tabs load from IndexedDB if offline; fetch fresh from API if online.

---

#### Tab 1: Overview

**`<AnimalHeroCard />`**
- Species icon (cow, goat, sheep, pig — illustrated, distinct colour per species)
- Animal UID (`WAF-NG-C-2026-000123`) — tappable to copy
- Farmer name + farm name
- Sex badge (M/F), Age (computed from birth year), Production type (Dairy / Beef / Meat / Breeding)
- Status badge: ACTIVE / SOLD / DECEASED (coloured)
- Last scanned: "2 minutes ago" / "3 days ago"

**`<AlertBanner />`**
- Conditional, shown when relevant:
  - 🔴 Overdue vaccine — "FMD vaccine due 23 days ago"
  - 🟡 Deworming due soon — "Next deworming in 5 days"
  - 🔵 Active treatment — "Currently on Oxytetracycline — Day 3 of 5"
  - 🟠 Withdrawal active — "Not safe for slaughter / milking yet — check treatment record"

**`<QuickStatsRow />`**  
4 stat tiles in a 2×2 grid:
- Last visit date
- Last diagnosis label (or "None recorded")
- Last vaccine (name + date)
- Last deworming date

**`<AskAI_Button />`** — primary floating action, always visible on this tab  
- Label: "Ask AI about this animal"
- On tap: opens `<AIContextSheet />` with this animal's full record auto-loaded as context
- Subtitle under button: "Animal record will be used as context"

---

#### Tab 2: Health History

**`<DiagnosisTimeline />`**
- Chronological list, newest first
- Each entry card shows:
  - Date, diagnosis name + code (e.g. "Mastitis — MST")
  - Attending vet name
  - Short presenting complaint
  - Tap to expand: full SOAP notes (Subjective, Objective, Assessment, Plan)
  - Status badge: RESOLVED / ONGOING / FOLLOW-UP

**`<TreatmentList />`** (collapsible section within each diagnosis card)
- Drug name, dose, route (oral / IM / IV / topical)
- Course: start → end date
- Prescribed by (vet name)

**`<LabResultsList />`**
- Test name, date, key result (normal / abnormal badge)
- Tap to expand: full values table + reference ranges
- Attachment icon if PDF report exists (online only)

**`<AddDiagnosis_FAB />`** — vet role only
- Floating action button: "+ New Diagnosis / Visit"
- Opens `<NewVisitSheet />`

---

#### Tab 3: Vaccinations & Deworming

**`<VaccinationTable />`**
| Vaccine | Date Given | Batch/Lot | Next Due | Status |
|---|---|---|---|---|
- Colour-coded status: ✅ Current / ⚠️ Due Soon / 🔴 Overdue
- Tap row to see full detail: dose, route, manufacturer, administered by

**`<DewormingTable />`**
- Same structure as vaccinations
- Columns: Drug / Class / Date / Next Due / Status

**`<AddVaccine_Button />`** + **`<AddDeworming_Button />`** — vet/agent role only

---

#### Tab 4: Reproduction & Production

**`<ReproductiveTimeline />`**
- Events in order: Mating → Pregnancy Confirmed → Birth → Weaning
- Each event card: date, method (AI / natural), outcome (litter/calf size, live/stillborn)
- Parity number shown on each birth record

**`<BodyConditionChart />`**
- Line chart: body condition score over time
- Plotted points from each recorded vet visit
- Weight (kg) secondary axis if available

**`<MilkYieldSummary />`** — dairy animals only
- Latest yield, 7-day average, trend arrow (up/down)

---

#### Tab 5: Management Notes

**`<ManagementFeed />`**
- Activity-feed style list, reverse-chronological
- Entry types: feeding change, housing move, purchase note, general farm note
- Each entry: date, entered by (farmer / agent / vet), note text
- Farmers can add entries directly

**`<AddNote_Button />`** — all roles

---

### 4.4 AI Context Sheet

**`<AIContextSheet />`**
- Slides up from bottom (half-screen, expandable to full)
- Header: "[Animal UID] loaded as context" + species icon
- Context pills shown: "Overview", "Health History", "Vaccinations", "Reproduction" — toggleable
  - Farmer can deselect sections they don't want to send to AI
- **Chat interface**: message input + send
  - Supports text input
  - AI responses rendered in chat bubbles with markdown support
  - Citations from animal record shown inline (e.g. "Based on the mastitis diagnosis on 2025-11-01...")
- **Quick Prompt Chips** (pre-filled suggestions):
  - "What's the likely diagnosis for these symptoms?"
  - "Is this animal due for any vaccines?"
  - "What treatment options are available for this condition?"
  - "Summarise this animal's health in plain language"
  - "Is this animal safe for slaughter/milking?"
- **Symptom Input Widget**: checkbox grid of common symptoms per species (fever, limping, not eating, nasal discharge, swollen joints, etc.) — selecting symptoms auto-appends them to the next AI message
- History: last 5 AI conversations for this animal stored locally, viewable by scrolling up
- Wafrivet branding + disclaimer: "AI suggestions are not a substitute for professional veterinary diagnosis"

---

### 4.5 Farm & Animal List Screen

**`<MyAnimalsScreen />`** (Farmer view)
- List of all animals owned by the logged-in farmer
- Grouped by species (Cattle, Goats, Sheep, Pigs)
- Each animal card: species icon, UID, name (if set), age, last visit date, alert dot
- Search + filter bar: by species, status, alert type
- "Sync for Offline" button per farm group

**`<FarmsScreen />`** (Vet / Agent view)
- List of farms assigned to or visited by the vet
- Each farm card: farm name, owner name, location, animal count, last visit
- Tap farm → `<FarmDetailScreen />` with all animals on that farm
- Filter: by region, species mix, alert count

**`<FarmSyncModal />`**
- Select farm(s) to download for offline use
- Shows estimated size and last sync time
- Progress bar during sync
- Lists which animal records will be cached

---

### 4.6 New Visit / Diagnosis Sheet

**`<NewVisitSheet />`** — vet/agent role only
- Fields:
  - Visit date (defaults to today)
  - Visit type: Routine / Emergency / Follow-up / Vaccination / Deworming / Reproductive
  - Presenting complaint (text area)
  - Clinical findings (text area)
  - Diagnosis: searchable dropdown of standard diagnosis codes + free text
  - Treatments added: drug name, dose, route, duration (repeatable rows)
  - Vaccines given this visit (repeatable rows)
  - Deworming given (optional)
  - Next visit date
  - Notes
- **Ask AI for Differential** button inline — opens `<AIContextSheet />` with symptom fields pre-filled from this form
- Save: writes to IndexedDB immediately, queues to sync when online

---

### 4.7 Tag Provisioning Screen

**`<ProvisionTagScreen />`** — agent/admin role only
- Step 1: Select or create animal in the system (dropdown / new animal form)
- Step 2: Review AnimalUID assigned by backend
- Step 3: Tap "Write to Tag" → uses `NDEFReader.write()` to write URL to NFC tag
  - Shows: "Hold tag to back of phone..."
  - Success: "Tag written successfully ✅" + confirm chip UID logged
  - Failure: retry prompt
- Step 4: Confirm tag-to-animal binding in backend
- Replace Tag flow: same screen with "Replace existing tag" toggle
  - Shows current chip UID, asks confirmation before retiring old one

---

### 4.8 Settings & Profile Screen

**`<SettingsScreen />`**
- User profile: name, phone, role, farm/clinic affiliation
- Language selector (EN default; Yoruba, Hausa, Igbo — future)
- Offline storage: shows cache size, "Clear cache" button, last sync timestamps
- NFC: "Test NFC" scan demo button
- Notification preferences: overdue vaccine alerts, sync completion alerts
- Logout

---

## 5. Offline Behaviour Summary

| Screen | Offline Available | Data Source |
|---|---|---|
| Scan + Manual Lookup | ✅ (NFC still works) | IndexedDB cache |
| Animal Record — all tabs | ✅ if synced | IndexedDB cache |
| AI Context Sheet | ✅ limited (cached context only, no AI calls without network) | IndexedDB + shows "AI unavailable offline" |
| My Animals / Farms List | ✅ if synced | IndexedDB cache |
| New Visit (write) | ✅ queued | IndexedDB outbox → sync on reconnect |
| Tag Provisioning | ❌ requires network | API |
| Lab result attachments | ❌ requires network | Cloud storage |

---

## 6. AI Integration Detail

### Context Loading
When a user taps "Ask AI about this animal," the frontend assembles a context object:
- Animal overview fields (species, sex, age, production type)
- Last 3 diagnoses with notes
- Last 3 treatments
- Vaccination record (last 5 entries)
- Deworming record (last 3 entries)
- Active alerts
- Any symptoms entered in the current session

This context is sent to the Wafrivet AI backend endpoint alongside the user's message. The frontend does not process AI logic; it only assembles context and renders responses.

### Context Toggle
Users can toggle which sections are included in context using the pill toggles in `<AIContextSheet />`. This controls what is appended to the API payload, not what is displayed. Default: all sections on.

### Offline AI Behaviour
When offline, the AI chat input is visible but disabled with a banner: "AI requires an internet connection. Your animal record is available for offline viewing." Previously cached AI conversations for this animal are still viewable.

---

## 7. Component Hierarchy (Summary)

```
herd.wafrivet.com (PWA)
├── <AppShell />
│   ├── <BottomNav />
│   ├── <OfflineBanner />
│   └── <PWAInstallPrompt />
├── <AuthGate />
├── <ScanScreen />
│   ├── <ScanButton />
│   ├── <LastScannedStrip />
│   ├── <AnimalSearchModal />
│   └── <FarmSyncModal />
├── <AnimalRecordScreen />
│   ├── <AnimalHeroCard />
│   ├── <AlertBanner />
│   ├── <QuickStatsRow />
│   ├── <AskAI_Button />
│   ├── Tab: Health History
│   │   ├── <DiagnosisTimeline />
│   │   ├── <TreatmentList />
│   │   └── <LabResultsList />
│   ├── Tab: Vaccinations & Deworming
│   │   ├── <VaccinationTable />
│   │   └── <DewormingTable />
│   ├── Tab: Reproduction & Production
│   │   ├── <ReproductiveTimeline />
│   │   ├── <BodyConditionChart />
│   │   └── <MilkYieldSummary />
│   └── Tab: Management Notes
│       └── <ManagementFeed />
├── <AIContextSheet />
│   ├── <ContextPills />
│   ├── <ChatInterface />
│   ├── <QuickPromptChips />
│   └── <SymptomInputWidget />
├── <MyAnimalsScreen />
├── <FarmsScreen />
│   └── <FarmDetailScreen />
├── <NewVisitSheet />
├── <ProvisionTagScreen />
└── <SettingsScreen />
```

---

## 8. Out of Scope (Frontend v1)

- iOS support
- Push notifications (planned v2)
- Offline AI model (edge inference — planned v3)
- QR code fallback scanning
- Image/photo capture for animals
- Marketplace ordering flow (handled on main wafrivet.com, not herd subdomain)
- Multi-language UI (strings prepared but not translated for v1)
