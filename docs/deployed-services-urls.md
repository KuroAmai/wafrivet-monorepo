# All Deployed Services URLs

This document contains the URLs of all deployed Wafrivet services on Google Cloud Run.

---

## all_deployed_Services

### Google Cloud Run Services

| Service Name | URL |
|-------------|-----|
| wafrivet-ai-orchestrator | https://wafrivet-ai-orchestrator-wdvfp4toqa-ew.a.run.app |
| wafrivet-api-gateway | https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app |
| wafrivet-core | https://wafrivet-core-wdvfp4toqa-ew.a.run.app |
| wafrivet-disease-engine | https://wafrivet-disease-engine-wdvfp4toqa-ew.a.run.app |
| wafrivet-field-vet | https://wafrivet-field-vet-wdvfp4toqa-ew.a.run.app |
| wafrivet-hardware-ingest | https://wafrivet-hardware-ingest-wdvfp4toqa-ew.a.run.app |
| wafrivet-logistics | https://wafrivet-logistics-wdvfp4toqa-ew.a.run.app |
| wafrivet-logistics-optimizer | https://wafrivet-logistics-optimizer-wdvfp4toqa-ew.a.run.app |
| wafrivet-marketplace | https://wafrivet-marketplace-wdvfp4toqa-ew.a.run.app |
| wafrivet-worker | https://wafrivet-worker-wdvfp4toqa-ew.a.run.app |

**Region:** ew (europe-west)
**Last Updated:** May 15, 2026

---

## Command to Refresh URLs

```bash
gcloud run services list --format='table(name,status.url)'
```
