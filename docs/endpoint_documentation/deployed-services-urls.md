# Deployed Services URLs & Cloud Run Access Model

This document lists production Cloud Run URLs and explains **Option A** access: a **public API gateway** plus **private internal services** with service-to-service identity tokens.

**Region:** `europe-west1`  
**Project:** `able-dryad-484821-q9`  
**Runtime service account:** `wafrivet-run-sa@able-dryad-484821-q9.iam.gserviceaccount.com`

---

## Service URLs

| Service Name | URL | Public internet |
|-------------|-----|-----------------|
| wafrivet-api-gateway | https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app | **Yes** (`--allow-unauthenticated`) |
| wafrivet-core | https://wafrivet-core-wdvfp4toqa-ew.a.run.app | No (private) |
| wafrivet-marketplace | https://wafrivet-marketplace-wdvfp4toqa-ew.a.run.app | No (private) |
| wafrivet-logistics | https://wafrivet-logistics-wdvfp4toqa-ew.a.run.app | No (private) |
| wafrivet-logistics-optimizer | https://wafrivet-logistics-optimizer-wdvfp4toqa-ew.a.run.app | No (private) |
| wafrivet-worker | https://wafrivet-worker-wdvfp4toqa-ew.a.run.app | No (private) |
| wafrivet-ai-orchestrator | https://wafrivet-ai-orchestrator-wdvfp4toqa-ew.a.run.app | No (private) |
| wafrivet-disease-engine | https://wafrivet-disease-engine-wdvfp4toqa-ew.a.run.app | No (private) |
| wafrivet-hardware-ingest | https://wafrivet-hardware-ingest-wdvfp4toqa-ew.a.run.app | No (private) |
| wafrivet-field-vet | https://wafrivet-field-vet-wdvfp4toqa-ew.a.run.app | Yes (separate product) |

**Last updated:** May 23, 2026

Refresh URLs:

```bash
gcloud run services list --project=able-dryad-484821-q9 --region=europe-west1 \
  --format='table(name,status.url)'
```

---

## Architecture (Option A)

```text
Browser / Next.js (app.wafrivet.com)
        │
        ▼  no GCP token required
wafrivet-api-gateway  ──(identity token + run.invoker)──►  wafrivet-core
        │                                                  wafrivet-marketplace
        └────────────────────────────────────────────────  wafrivet-logistics
                                                           wafrivet-logistics-optimizer

wafrivet-worker ──(identity token)──► wafrivet-core, wafrivet-logistics, …
```

- **Cloud Run IAM** on internal services: only `wafrivet-run-sa` (and similar) may invoke them.
- **App JWT** on gateway routes: protects logged-in users; signup/login use `@Public()`.

---

## Internal URLs (api-gateway & worker env)

Set on **`wafrivet-api-gateway`** at deploy time (`cloudbuild.yaml`):

| Env var | Production value |
|---------|------------------|
| `CORE_INTERNAL_URL` | `https://wafrivet-core-wdvfp4toqa-ew.a.run.app` |
| `MARKETPLACE_INTERNAL_URL` | `https://wafrivet-marketplace-wdvfp4toqa-ew.a.run.app` |
| `LOGISTICS_INTERNAL_URL` | `https://wafrivet-logistics-wdvfp4toqa-ew.a.run.app` |
| `LOGISTICS_ENGINE_URL` | `https://wafrivet-logistics-optimizer-wdvfp4toqa-ew.a.run.app` |

Set on **`wafrivet-worker`**:

| Env var | Production value |
|---------|------------------|
| `CORE_INTERNAL_URL` | `https://wafrivet-core-wdvfp4toqa-ew.a.run.app` |
| `LOGISTICS_INTERNAL_URL` | `https://wafrivet-logistics-wdvfp4toqa-ew.a.run.app` |

Gateway and worker attach **Google identity tokens** automatically for `*.run.app` hosts (see `@wafrivet/shared` `attachCloudRunAuthInterceptor`).

---

## Deployment steps

### 1. One-time fix on current Cloud Run (no full rebuild)

Open the **API gateway** to the internet (signup/login):

```bash
gcloud run services add-iam-policy-binding wafrivet-api-gateway \
  --project=able-dryad-484821-q9 \
  --region=europe-west1 \
  --member="allUsers" \
  --role="roles/run.invoker"
```

Or redeploy with `--allow-unauthenticated` (included in `cloudbuild.yaml` after this change).

### 2. Internal service invoker for `wafrivet-run-sa`

```bash
PROJECT=able-dryad-484821-q9
REGION=europe-west1
SA=wafrivet-run-sa@${PROJECT}.iam.gserviceaccount.com

for SVC in wafrivet-core wafrivet-marketplace wafrivet-logistics \
  wafrivet-logistics-optimizer wafrivet-worker; do
  gcloud run services add-iam-policy-binding "$SVC" \
    --project="$PROJECT" --region="$REGION" \
    --member="serviceAccount:${SA}" --role="roles/run.invoker" --quiet
done
```

### 3. Point api-gateway at core / marketplace / logistics

```bash
gcloud run services update wafrivet-api-gateway \
  --project=able-dryad-484821-q9 --region=europe-west1 \
  --update-env-vars="CORE_INTERNAL_URL=https://wafrivet-core-wdvfp4toqa-ew.a.run.app,MARKETPLACE_INTERNAL_URL=https://wafrivet-marketplace-wdvfp4toqa-ew.a.run.app,LOGISTICS_INTERNAL_URL=https://wafrivet-logistics-wdvfp4toqa-ew.a.run.app,LOGISTICS_ENGINE_URL=https://wafrivet-logistics-optimizer-wdvfp4toqa-ew.a.run.app"
```

### 4. Point worker at core

```bash
gcloud run services update wafrivet-worker \
  --project=able-dryad-484821-q9 --region=europe-west1 \
  --update-env-vars="CORE_INTERNAL_URL=https://wafrivet-core-wdvfp4toqa-ew.a.run.app,LOGISTICS_INTERNAL_URL=https://wafrivet-logistics-wdvfp4toqa-ew.a.run.app"
```

### 5. Redeploy via Cloud Build (recommended)

Push to the branch that triggers `cloudbuild.yaml`. The pipeline will:

- Deploy images
- Set `--allow-unauthenticated` on **api-gateway only**
- Inject internal URLs on gateway and worker
- Run the `iam-run-invoker-internal` step

### 6. Vercel / frontend (`app.wafrivet.com`)

In the Vercel project for the Next app:

```bash
API_URL=https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app/api/v1
NEXT_PUBLIC_API_URL=https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app/api/v1
```

Redeploy the frontend after changing env vars.

---

## Verify

**Public signup (no GCP token):**

```bash
curl -sS -X POST "https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app/api/v1/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234!","firstName":"Test","lastName":"User"}'
```

Expect **201** or a validation error JSON — not a Cloud Run IAM 403.

**Gateway health (checks core + logistics optimizer):**

```bash
curl -sS "https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app/api/v1/health"
```

**Herd module (Core only):** Livestock endpoints live at `https://wafrivet-core-wdvfp4toqa-ew.a.run.app/api/v1/herd/*` with a gateway-issued Bearer JWT. Not exposed on the public gateway yet. See [herd-service-endpoints-part1.md](./herd-service-endpoints-part1.md).

**Private core (should 403 without token):**

```bash
curl -sS -o /dev/null -w "%{http_code}\n" \
  "https://wafrivet-core-wdvfp4toqa-ew.a.run.app/api/v1/health"
# Expected: 403
```

---

## Local development

Docker Compose uses hostnames like `http://core:3001`. Identity tokens are **off** unless you set:

```bash
CLOUD_RUN_AUTH=true
```

in `.env` when testing against real Cloud Run URLs.

---

## When URLs change

After recreating a Cloud Run service, the `*.run.app` host may change. Update:

1. Substitutions in `cloudbuild.yaml` (`_CORE_URL`, `_GATEWAY_INTERNAL_ENV`, etc.)
2. This file
3. Vercel `API_URL` if the gateway URL changed
