// NFT Minter - Handles demo NFT minting functionality
class NFTMinter {
  constructor() {
    this.modal = null;
    this.isConnected = false;
    this.walletAddress = null;
  }

  // Initialize modal reference
  init(modalElement) {
    this.modal = modalElement;
  }

  // Show wallet connection modal
  showWalletModal() {
    if (!this.modal) return;
    
    this.modal.classList.remove('hidden');
    this.resetModal();
  }

  // Hide modal
  hideModal() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
  }

  // Reset modal to initial state
  resetModal() {
    const steps = this.modal.querySelectorAll('.mint-step');
    steps.forEach(step => step.classList.add('hidden'));
    
    const connectStep = this.modal.querySelector('#connectStep');
    if (connectStep) {
      connectStep.classList.remove('hidden');
    }
    
    this.isConnected = false;
  }

  // Simulate wallet connection
  async connectWallet() {
    return new Promise((resolve) => {
      // Show connecting state
      const connectBtn = document.getElementById('connectWalletBtn');
      if (connectBtn) {
        connectBtn.textContent = 'Connecting...';
        connectBtn.disabled = true;
      }

      // Simulate connection delay
      setTimeout(() => {
        // Generate fake wallet address
        this.walletAddress = this.generateWalletAddress();
        this.isConnected = true;
        
        if (connectBtn) {
          connectBtn.textContent = 'Connected!';
        }
        
        resolve(this.walletAddress);
      }, 1500);
    });
  }

  // Generate fake wallet address
  generateWalletAddress() {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  }

  // Generate fake transaction hash
  generateTxHash() {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  }

  // Show minting progress
  showMintingProgress() {
    const steps = this.modal.querySelectorAll('.mint-step');
    steps.forEach(step => step.classList.add('hidden'));
    
    const mintingStep = this.modal.querySelector('#mintingStep');
    if (mintingStep) {
      mintingStep.classList.remove('hidden');
    }
  }

  // Mint NFT (demo)
  async mintNFT(imageData) {
    if (!this.isConnected) {
      await this.connectWallet();
    }

    // Show minting progress
    this.showMintingProgress();

    return new Promise((resolve) => {
      // Simulate minting delay
      setTimeout(() => {
        const txHash = this.generateTxHash();
        this.showMintSuccess(txHash);
        resolve({ txHash, walletAddress: this.walletAddress });
      }, 3000);
    });
  }

  // Show mint success
  showMintSuccess(txHash) {
    const steps = this.modal.querySelectorAll('.mint-step');
    steps.forEach(step => step.classList.add('hidden'));
    
    const successStep = this.modal.querySelector('#successStep');
    if (successStep) {
      successStep.classList.remove('hidden');
      
      // Update wallet address and tx hash
      const walletEl = this.modal.querySelector('#walletAddress');
      const txEl = this.modal.querySelector('#txHash');
      
      if (walletEl) {
        walletEl.textContent = this.formatAddress(this.walletAddress);
      }
      
      if (txEl) {
        txEl.textContent = this.formatAddress(txHash);
      }
    }
  }

  // Format address for display (shorten)
  formatAddress(address) {
    if (!address || address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  // Complete mint flow
  async completeMintFlow(imageData) {
    try {
      this.showWalletModal();
      
      // Wait for user to click connect
      const connectBtn = document.getElementById('connectWalletBtn');
      if (!connectBtn) return;
      
      return new Promise((resolve, reject) => {
        const handleConnect = async () => {
          try {
            await this.connectWallet();
            const result = await this.mintNFT(imageData);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        };
        
        connectBtn.addEventListener('click', handleConnect, { once: true });
      });
    } catch (error) {
      console.error('Minting failed:', error);
      throw error;
    }
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.NFTMinter = NFTMinter;
}
