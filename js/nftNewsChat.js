/**
 * NFT News Chat Widget
 * Floating chat interface for NFT news powered by AWS Bedrock
 */

class NFTNewsChat {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.isTyping = false;
    this.apiEndpoint = '/api/chat'; // Vercel serverless function endpoint

    this.init();
  }

  init() {
    this.createChatWidget();
    this.attachEventListeners();
    this.loadWelcomeMessage();
  }

  createChatWidget() {
    const chatHTML = `
      <div class="chat-widget" id="chatWidget">
        <!-- Toggle Button -->
        <button class="chat-toggle-btn" id="chatToggleBtn" aria-label="Toggle NFT News Chat">
          💬
        </button>

        <!-- Chat Window -->
        <div class="chat-window" id="chatWindow">
          <!-- Header -->
          <div class="chat-header">
            <div class="chat-title">
              <span class="chat-status"></span>
              NFT News Assistant
            </div>
            <button class="chat-close-btn" id="chatCloseBtn" aria-label="Close chat">
              ✕
            </button>
          </div>

          <!-- Messages Container -->
          <div class="chat-messages" id="chatMessages">
            <!-- Messages will be added here -->
          </div>

          <!-- Input Container -->
          <div class="chat-input-container">
            <div class="chat-input-wrapper">
              <textarea
                class="chat-input"
                id="chatInput"
                placeholder="Ask about NFT news..."
                rows="1"
              ></textarea>
              <button class="chat-send-btn" id="chatSendBtn" aria-label="Send message">
                🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chatToggleBtn');
    const closeBtn = document.getElementById('chatCloseBtn');
    const sendBtn = document.getElementById('chatSendBtn');
    const input = document.getElementById('chatInput');

    toggleBtn.addEventListener('click', () => this.toggleChat());
    closeBtn.addEventListener('click', () => this.closeChat());
    sendBtn.addEventListener('click', () => this.sendMessage());

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('chatWindow');
    const toggleBtn = document.getElementById('chatToggleBtn');

    if (this.isOpen) {
      chatWindow.classList.add('active');
      toggleBtn.classList.add('active');
      toggleBtn.textContent = '💬';
      document.getElementById('chatInput').focus();
    } else {
      chatWindow.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.textContent = '💬';
    }
  }

  closeChat() {
    this.isOpen = false;
    document.getElementById('chatWindow').classList.remove('active');
    document.getElementById('chatToggleBtn').classList.remove('active');
  }

  loadWelcomeMessage() {
    const welcomeHTML = `
      <div class="chat-welcome">
        <div class="chat-welcome-icon">🎨</div>
        <div class="chat-welcome-title">Welcome to NFT News!</div>
        <div class="chat-welcome-text">
          Ask me anything about NFTs, blockchain, digital art, and the latest trends in the NFT space.
        </div>
        <div class="chat-suggestions">
          <button class="suggestion-btn" data-question="What are the latest NFT trends?">
            💡 What are the latest NFT trends?
          </button>
          <button class="suggestion-btn" data-question="How do NFTs work?">
            🔍 How do NFTs work?
          </button>
          <button class="suggestion-btn" data-question="What are popular NFT marketplaces?">
            🏪 What are popular NFT marketplaces?
          </button>
        </div>
      </div>
    `;

    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = welcomeHTML;

    // Add click handlers to suggestions
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        document.getElementById('chatInput').value = question;
        this.sendMessage();
      });
    });
  }

  async sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message || this.isTyping) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Call API
      const response = await this.callAPI(message);

      // Remove typing indicator
      this.hideTypingIndicator();

      // Add bot response
      this.addMessage(response, 'bot');
    } catch (error) {
      this.hideTypingIndicator();
      this.addMessage('Sorry, I encountered an error. Please try again later.', 'bot', true);
      console.error('Chat error:', error);
    }
  }

  async callAPI(message) {
    // For now, return a demo response
    // This will be replaced with actual Bedrock API call via serverless function
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getDemoResponse(message));
      }, 1500);
    });

    /* Uncomment when serverless function is ready:
    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        history: this.messages
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.response;
    */
  }

  getDemoResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('trend')) {
      return 'Current NFT trends include AI-generated art, gaming NFTs, and utility-focused collections. The market is shifting towards NFTs with real-world utility and community engagement.';
    } else if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
      return 'NFTs (Non-Fungible Tokens) are unique digital assets stored on a blockchain. Each NFT has a unique identifier that proves ownership and authenticity. They can represent art, music, videos, or any digital content.';
    } else if (lowerMessage.includes('marketplace')) {
      return 'Popular NFT marketplaces include OpenSea, Rarible, Foundation, SuperRare, and Magic Eden. Each platform has its own focus - some specialize in art, others in gaming or collectibles.';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('value')) {
      return 'NFT prices vary widely based on rarity, artist reputation, utility, and community demand. Always do your research (DYOR) before investing in any NFT project.';
    } else if (lowerMessage.includes('mint') || lowerMessage.includes('create')) {
      return 'Minting an NFT means creating a unique token on the blockchain. You can mint NFTs on platforms like OpenSea, Rarible, or directly through smart contracts. Consider gas fees and choose the right blockchain for your needs.';
    } else if (lowerMessage.includes('wallet') || lowerMessage.includes('metamask')) {
      return 'Popular NFT wallets include MetaMask, Coinbase Wallet, Trust Wallet, and Phantom (for Solana). Always keep your seed phrase secure and never share it with anyone!';
    } else if (lowerMessage.includes('gas') || lowerMessage.includes('fee')) {
      return 'Gas fees are transaction costs on blockchains like Ethereum. They vary based on network congestion. Consider using Layer 2 solutions like Polygon or alternative blockchains to reduce costs.';
    } else if (lowerMessage.includes('blockchain') || lowerMessage.includes('ethereum') || lowerMessage.includes('solana')) {
      return 'Popular NFT blockchains include Ethereum (most established), Solana (fast & cheap), Polygon (Layer 2), Binance Smart Chain, and Cardano. Each has different benefits and ecosystems.';
    } else if (lowerMessage.includes('art') || lowerMessage.includes('artist')) {
      return 'NFT art has opened new opportunities for digital artists. Focus on building a community, creating unique styles, and engaging with collectors. Quality and storytelling matter more than quick profits.';
    } else if (lowerMessage.includes('game') || lowerMessage.includes('gaming') || lowerMessage.includes('play')) {
      return 'Gaming NFTs include in-game items, characters, and land. Play-to-earn games like Axie Infinity and The Sandbox have shown the potential of NFT gaming ecosystems.';
    } else if (lowerMessage.includes('invest') || lowerMessage.includes('buy')) {
      return 'NFT investing requires research: check the team, roadmap, community, and utility. Look for projects with strong fundamentals, not just hype. Never invest more than you can afford to lose.';
    } else if (lowerMessage.includes('scam') || lowerMessage.includes('safe') || lowerMessage.includes('security')) {
      return 'Stay safe: verify official links, check contract addresses, avoid suspicious DMs, use hardware wallets for large holdings, and be wary of "too good to be true" offers. DYOR always!';
    } else if (lowerMessage.includes('royalt') || lowerMessage.includes('creator')) {
      return 'NFT royalties allow creators to earn from secondary sales, typically 2.5-10%. However, enforcement varies by marketplace. Some platforms are moving away from mandatory royalties.';
    } else if (lowerMessage.includes('metadata') || lowerMessage.includes('ipfs')) {
      return 'NFT metadata contains the token\'s properties and links to media files. IPFS (InterPlanetary File System) is commonly used for decentralized storage, ensuring your NFT data persists.';
    } else if (lowerMessage.includes('community') || lowerMessage.includes('discord')) {
      return 'Strong communities drive NFT success. Join Discord servers, follow Twitter spaces, and engage authentically. Community-driven projects often have better long-term value.';
    } else if (lowerMessage.includes('avatar') || lowerMessage.includes('pfp')) {
      return 'Profile picture (PFP) NFTs like CryptoPunks and Bored Apes became status symbols. They represent digital identity and community membership. Our avatar generator lets you create unique horror-themed PFPs!';
    } else if (lowerMessage.includes('future') || lowerMessage.includes('2024') || lowerMessage.includes('2025')) {
      return 'The NFT space is evolving towards utility, real-world integration, and sustainable practices. Expect more focus on gaming, metaverse applications, and environmentally friendly blockchains.';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! 👋 Welcome to NFT Avatar Zone! I\'m here to help you with NFT questions, trends, and tips. Feel free to ask about minting, marketplaces, or anything NFT-related!';
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! 😊 Happy to help with your NFT journey. Don\'t forget to try our avatar generator to create your own spooky NFT character!';
    } else {
      return `That's an interesting question about "${message}". NFTs are revolutionizing digital ownership and creativity. Would you like to know more about specific aspects like minting, trading, or the technology behind NFTs?`;
    }
  }

  addMessage(text, sender = 'bot', isError = false) {
    const messagesContainer = document.getElementById('chatMessages');

    // Remove welcome message if exists
    const welcome = messagesContainer.querySelector('.chat-welcome');
    if (welcome) {
      welcome.remove();
    }

    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const messageHTML = `
      <div class="chat-message ${sender}">
        <div class="chat-avatar">
          ${sender === 'bot' ? '🤖' : '👤'}
        </div>
        <div>
          <div class="chat-bubble ${isError ? 'chat-error' : ''}">
            ${text}
          </div>
          <div class="chat-timestamp">${timestamp}</div>
        </div>
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store message
    this.messages.push({
      role: sender === 'user' ? 'user' : 'assistant',
      content: text,
      timestamp: new Date()
    });
  }

  showTypingIndicator() {
    this.isTyping = true;
    const messagesContainer = document.getElementById('chatMessages');

    const typingHTML = `
      <div class="chat-message bot typing-message">
        <div class="chat-avatar">🤖</div>
        <div class="chat-bubble">
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
      typingMessage.remove();
    }
  }

  clearHistory() {
    this.messages = [];
    this.loadWelcomeMessage();
  }
}

// Initialize chat when DOM is ready
if (typeof window !== 'undefined') {
  window.NFTNewsChat = NFTNewsChat;

  // Auto-initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.nftChat = new NFTNewsChat();
    });
  } else {
    window.nftChat = new NFTNewsChat();
  }
}
