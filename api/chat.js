/**
 * Vercel Serverless Function for AWS Bedrock Chat
 * This proxies requests to AWS Bedrock to keep credentials secure
 *
 * Environment Variables Required:
 * - AWS_REGION
 * - AWS_ACCESS_KEY_ID
 * - AWS_SECRET_ACCESS_KEY
 */

// Note: Install AWS SDK in your project:
// npm install @aws-sdk/client-bedrock-runtime

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if AWS credentials are configured
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.warn('AWS credentials not configured, using demo mode');
      return res.json({
        response: getDemoResponse(message),
        demo: true
      });
    }

    // Import AWS SDK (only when credentials are available)
    const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

    // Initialize Bedrock client
    const client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    // Prepare conversation history for Claude
    const messages = [
      ...history.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    // System prompt for NFT news assistant
    const systemPrompt = `You are an NFT news expert assistant. You provide accurate, up-to-date information about:
- NFT trends and market analysis
- Blockchain technology and cryptocurrencies
- Digital art and collectibles
- NFT marketplaces and platforms
- Minting, trading, and investing in NFTs
- Web3 and decentralized applications

Keep responses concise (2-3 sentences), friendly, and informative. Use emojis occasionally to match the spooky theme.`;

    // Call Bedrock API with Claude model
    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 500,
        system: systemPrompt,
        messages: messages,
        temperature: 0.7
      })
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    // Extract the response text
    const assistantMessage = responseBody.content[0].text;

    return res.json({
      response: assistantMessage,
      demo: false
    });

  } catch (error) {
    console.error('Bedrock API error:', error);

    // Return demo response on error
    return res.json({
      response: getDemoResponse(req.body.message),
      demo: true,
      error: 'Using demo mode due to API error'
    });
  }
}

/**
 * Demo response generator (fallback when API is not configured)
 */
function getDemoResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('trend')) {
    return '🎨 Current NFT trends include AI-generated art, gaming NFTs, and utility-focused collections. The market is shifting towards NFTs with real-world utility and community engagement.';
  } else if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
    return '🔗 NFTs (Non-Fungible Tokens) are unique digital assets stored on a blockchain. Each NFT has a unique identifier that proves ownership and authenticity. They can represent art, music, videos, or any digital content.';
  } else if (lowerMessage.includes('marketplace')) {
    return '🏪 Popular NFT marketplaces include OpenSea, Rarible, Foundation, SuperRare, and Magic Eden. Each platform has its own focus - some specialize in art, others in gaming or collectibles.';
  } else if (lowerMessage.includes('price') || lowerMessage.includes('value')) {
    return '💰 NFT prices vary widely based on rarity, artist reputation, utility, and community demand. Always do your research (DYOR) before investing in any NFT project.';
  } else if (lowerMessage.includes('mint')) {
    return '⚡ Minting is the process of creating a new NFT on the blockchain. It involves uploading your digital asset, adding metadata, and paying a gas fee to record it permanently on-chain.';
  } else if (lowerMessage.includes('gas') || lowerMessage.includes('fee')) {
    return '⛽ Gas fees are transaction costs on blockchain networks. They vary based on network congestion. Consider minting during off-peak hours to save on fees!';
  } else if (lowerMessage.includes('wallet')) {
    return '👛 Popular NFT wallets include MetaMask, Coinbase Wallet, and Trust Wallet. Always keep your seed phrase secure and never share it with anyone!';
  } else {
    return `🤔 That's an interesting question about "${message}". NFTs are revolutionizing digital ownership and creativity. Would you like to know more about specific aspects like minting, trading, or the technology behind NFTs?`;
  }
}
