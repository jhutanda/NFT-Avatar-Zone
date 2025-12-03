# NFT News Chat Setup Guide

## Overview

The NFT News Chat is a floating chat widget powered by AWS Bedrock (Claude AI) that provides real-time information about NFTs, blockchain, and digital art trends.

## Features

- 💬 Floating chat button in bottom-right corner
- 🤖 AI-powered responses using AWS Bedrock Claude
- 🎨 Matches the horror-themed glassmorphism design
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- 💡 Suggested questions for quick start
- 📝 Conversation history

## Setup Instructions

### 1. Install Dependencies

```bash
cd nft-avatar-zone
npm install
```

This installs the AWS SDK for Bedrock Runtime.

### 2. Configure AWS Credentials

You need to set up environment variables for AWS Bedrock access. Create a `.env` file in the project root:

```bash
# .env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
```

**IMPORTANT:** Never commit `.env` to git! It's already in `.gitignore`.

### 3. Vercel Environment Variables

For production deployment on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add these variables:
   - `AWS_REGION` = `us-east-1` (or your preferred region)
   - `AWS_ACCESS_KEY_ID` = Your AWS access key
   - `AWS_SECRET_ACCESS_KEY` = Your AWS secret key

### 4. AWS Bedrock Setup

1. **Enable Bedrock Access:**
   - Go to AWS Console → Bedrock
   - Request access to Claude models (if not already enabled)
   - Wait for approval (usually instant)

2. **Create IAM User:**
   - Go to AWS Console → IAM
   - Create new user with programmatic access
   - Attach policy: `AmazonBedrockFullAccess`
   - Save the access key and secret key

3. **Supported Models:**
   - `anthropic.claude-3-sonnet-20240229-v1:0` (default)
   - `anthropic.claude-3-haiku-20240307-v1:0` (faster, cheaper)
   - `anthropic.claude-3-opus-20240229-v1:0` (most capable)

## Demo Mode

The chat works in **demo mode** without AWS credentials. It provides pre-programmed responses for common NFT questions. This is perfect for:

- Local development
- Testing the UI
- Demos without API costs

To use demo mode, simply don't configure AWS credentials. The chat will automatically fall back to demo responses.

## File Structure

```
nft-avatar-zone/
├── api/
│   └── chat.js              # Vercel serverless function (Bedrock proxy)
├── css/
│   └── chat.css             # Chat widget styles
├── js/
│   └── nftNewsChat.js       # Chat widget logic
├── package.json             # Dependencies
└── CHAT_SETUP.md           # This file
```

## Usage

The chat widget is automatically initialized on all pages. Users can:

1. Click the 💬 button in bottom-right corner
2. Type questions about NFTs
3. Use suggested questions for quick start
4. View conversation history
5. Close chat anytime

## Customization

### Change AI Model

Edit `api/chat.js`:

```javascript
modelId: 'anthropic.claude-3-haiku-20240307-v1:0', // Faster model
```

### Adjust Response Length

Edit `api/chat.js`:

```javascript
max_tokens: 500, // Increase for longer responses
```

### Modify System Prompt

Edit `api/chat.js` to change the AI's personality and knowledge focus:

```javascript
const systemPrompt = `Your custom prompt here...`;
```

### Update Suggested Questions

Edit `js/nftNewsChat.js` in the `loadWelcomeMessage()` method.

## Cost Considerations

AWS Bedrock pricing (as of 2024):

- **Claude 3 Haiku:** ~$0.00025 per 1K input tokens, ~$0.00125 per 1K output tokens
- **Claude 3 Sonnet:** ~$0.003 per 1K input tokens, ~$0.015 per 1K output tokens
- **Claude 3 Opus:** ~$0.015 per 1K input tokens, ~$0.075 per 1K output tokens

Typical chat message: 100-500 tokens
Estimated cost per conversation: $0.001 - $0.01

**Tip:** Use Haiku for production to minimize costs while maintaining quality.

## Troubleshooting

### Chat shows "Using demo mode"

- AWS credentials not configured
- Check environment variables in Vercel
- Verify IAM permissions

### API errors in console

- Check AWS region matches your Bedrock access
- Verify model ID is correct
- Ensure IAM user has Bedrock permissions

### Chat button not appearing

- Check browser console for errors
- Verify `nftNewsChat.js` is loaded
- Ensure `chat.css` is included

## Security Notes

- ✅ API keys are stored server-side only (Vercel environment variables)
- ✅ Frontend never exposes AWS credentials
- ✅ Serverless function acts as secure proxy
- ✅ Rate limiting recommended for production (add to `api/chat.js`)

## Local Development

```bash
# Install Vercel CLI
npm i -g vercel

# Run local dev server with serverless functions
vercel dev
```

This runs the site at `http://localhost:3000` with the API endpoint working.

## Deployment

```bash
# Deploy to Vercel
vercel --prod
```

Or push to GitHub and let Vercel auto-deploy.

## Support

For issues or questions:
- Check AWS Bedrock documentation
- Review Vercel serverless function logs
- Test in demo mode first
- Verify all environment variables are set

---

**Happy chatting! 👻💬**
