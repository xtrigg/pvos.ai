# PVOS.ai Landing Page

Static Cloudflare Pages landing page for PVOS.ai.

## Product Positioning

PVOS.ai is positioned as a Private Voice OS for enterprise memory:

- AI Recorder for capturing work conversations
- Privacy Gateway for edge redaction and Privacy Score routing
- Memory OS for safe search, summaries, workflows, and customer-owned AI routing

Target customer: 100-1000 person companies that need voice AI while keeping raw audio and sensitive information under control.

## Local Verification

```bash
node scripts/verify-site.mjs
python -m http.server 8788
```

Then open `http://127.0.0.1:8788/`.

## Cloudflare Pages

This project is static. Deploy with:

```bash
wrangler pages deploy . --project-name pvos-ai --branch main
```
