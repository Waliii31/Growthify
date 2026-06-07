# Agent Service

This directory contains the Hugging Face Spaces agent service for Growthify.

## Production deployment

The Agent service is deployed to Hugging Face Spaces from the `Agent` subfolder.
The GitHub Actions workflow at `.github/workflows/deploy-monorepo.yml` pushes only the `Agent` folder to the Spaces repository.

### Required environment variables

- `GROQ_API_KEY`

### Setup

1. Add these GitHub secrets in your repository settings:
   - `HF_TOKEN`
   - `HF_USERNAME`
   - `HF_SPACE_NAME`
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID_FRONTEND`
   - `VERCEL_PROJECT_ID_BACKEND`

2. Configure your Hugging Face Space to use the `Agent/app.py` entrypoint.

3. Configure the Vercel projects for `Frontend` and `Backend` to use the respective subdirectories.

## Local development

```bash
cd Agent
python -m uvicorn app:app --reload
```

## Notes

- The backend and frontend are deployed separately to Vercel.
- The Agent app is deployed separately to Hugging Face Spaces.
