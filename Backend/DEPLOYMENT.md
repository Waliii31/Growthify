# AWS Lambda Serverless Deployment Guide

This guide walks through deploying the Growthify backend to AWS Lambda using the Serverless Framework.

## Prerequisites

- AWS Account with billing enabled
- Node.js 18+ installed
- npm or yarn package manager

## Step 1: Install Serverless Framework Globally

```bash
npm install -g serverless
```

Verify installation:
```bash
serverless --version
```

## Step 2: Configure AWS Credentials

### Option A: Using AWS CLI
```bash
aws configure
```

When prompted, enter:
- **AWS Access Key ID**: Your IAM user access key
- **AWS Secret Access Key**: Your IAM user secret key
- **Default region**: `ap-south-1` (or your preferred region)
- **Default output format**: `json`

### Option B: Using Environment Variables
```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=ap-south-1
```

### Option C: AWS Credentials File
Create `~/.aws/credentials`:
```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

Create `~/.aws/config`:
```
[default]
region = ap-south-1
output = json
```

## Step 3: Set Environment Variables

Before deploying, ensure all environment variables are set in your shell:

```bash
export MONGO_URI="your-mongodb-connection-string"
export JWT_SECRET="your-jwt-secret-key"
export GOOGLE_CLIENT_ID="your-google-client-id"
export RESEND_API_KEY="your-resend-api-key"
export RESEND_FROM_EMAIL="Growthify Contact <onboarding@resend.dev>"
export CONTACT_TO_EMAIL="your@recipient.email"
```

Or create a `.env` file in the Backend directory (do NOT commit this):
```dotenv
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=Growthify Contact <onboarding@resend.dev>
CONTACT_TO_EMAIL=your@recipient.email
```

## Step 4: Deploy to AWS Lambda

From the `Backend` directory:

```bash
npm install
serverless deploy
```

For a specific stage:
```bash
serverless deploy --stage prod
```

After successful deployment, you'll receive:
- **API Gateway URL** (e.g., `https://abc123def.execute-api.ap-south-1.amazonaws.com/prod/`)
- **Function names** and other details

## Step 5: Update Frontend Configuration

Once deployed, update your frontend's `.env`:

```
VITE_API_BASE_URL=https://your-api-gateway-url
```

For example:
```
VITE_API_BASE_URL=https://abc123def.execute-api.ap-south-1.amazonaws.com/prod
```

## Local Testing

Test locally before deploying:

```bash
npm run offline
```

This starts a local API Gateway emulator on `http://localhost:3000`

## CloudFormation Stack Management

View deployed stack:
```bash
serverless info
```

Remove the stack (be careful!):
```bash
serverless remove
```

## Monitoring & Logs

View real-time logs:
```bash
serverless logs -f api --tail
```

View CloudWatch metrics:
- Open AWS Console > CloudWatch > Log Groups > `/aws/lambda/growthify-backend-api`

## Production Optimization Tips

1. **Enable Provisioned Concurrency**: Reduces cold start latency
   ```yaml
   functions:
     api:
       handler: handler.handler
       provisionedConcurrency: 1
   ```

2. **Use VPC for Secure Database Access** (optional):
   ```yaml
   provider:
     vpc:
       securityGroupIds:
         - sg-xxxxxxxx
       subnetIds:
         - subnet-xxxxxxxx
   ```

3. **Monitor Costs**:
   - Check AWS Billing > Cost Explorer
   - Set up CloudWatch Alarms for Lambda duration and errors

4. **Environment-Specific Configuration**:
   ```bash
   serverless deploy --stage dev  # Development
   serverless deploy --stage prod # Production
   ```

## Troubleshooting

### Cold Start Issues
MongoDB connections may timeout on first request. The handler uses connection caching to mitigate this.

### CORS Errors
Verify `serverless.yml` includes proper CORS configuration:
```yaml
httpApi:
  cors:
    allowedOrigins:
      - "*"
```

### MongoDB Connection Timeout
- Ensure MongoDB Atlas allows AWS IP ranges or use a static IP
- Increase timeout in `mongooseconnect` options

### 502 Bad Gateway Errors
- Check CloudWatch logs: `serverless logs -f api --tail`
- Verify environment variables are set in AWS Lambda console

## Deployment Checklist

- [ ] AWS credentials configured
- [ ] MongoDB URI is a production-grade cluster
- [ ] All environment variables set
- [ ] Local testing passed (`npm run offline`)
- [ ] Frontend `.env` updated with API URL
- [ ] Run `serverless deploy`
- [ ] Test API endpoints
- [ ] Monitor CloudWatch logs

## Additional Resources

- [Serverless Framework Documentation](https://www.serverless.com/framework/docs)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [MongoDB Atlas Network Access](https://docs.mongodb.com/atlas/network-access/)
