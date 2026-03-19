# ✅ DuetGame - All Errors Fixed!

## 🎮 Overview
DUET is an on-chain survival game built on the Base blockchain. Navigate rotating circles to dodge falling obstacles while competing for the highest score. Every game entry requires a small ETH fee (~$0.0001), creating a true on-chain gaming experience.

## 🐛 All Issues Resolved

### Critical Fixes Applied:
1. ✅ **Wagmi v3 Compatibility** - Removed unsupported `baseAccount()` connector
2. ✅ **Type Safety** - Fixed React event typing in MobileControls
3. ✅ **Metadata Export** - Moved metadata declaration before default export in layout
4. ✅ **Type Interfaces** - Updated Obstacle ID type to support both string and number
5. ✅ **Wallet Integration** - Fixed WalletConnectButton to work with wagmi v3
6. ✅ **Environment Config** - Added .env.example for WalletConnect setup

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
# Edit .env.local and add your WalletConnect Project ID from:
# https://cloud.walletconnect.com/
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to **http://localhost:3000**

## 🎯 How to Play

1. **Connect Wallet** - Link your Base blockchain wallet (Coinbase Wallet, MetaMask, etc.)
2. **Pay Entry Fee** - Confirm transaction (~$0.0001 USD worth of ETH)
3. **Control Circles** - Use arrow keys (↑ ↓) or A/D keys to rotate
4. **Dodge Obstacles** - Avoid the white rectangles falling down
5. **Climb Leaderboard** - Survive longer = Higher score

**Desktop Controls:**
- ← or A - Rotate left circle counter-clockwise
- → or D - Rotate right circle clockwise

**Mobile Controls:**
- Tap left side of screen - Rotate left
- Tap right side of screen - Rotate right

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.3.8 | React framework with API routes |
| React | 19.1.0 | UI components and state management |
| Wagmi | 2.19.5 | Web3 wallet connection |
| Viem | 2.40.3 | Ethereum interactions |
| Tailwind CSS | 3.4.1 | Styling |
| Canvas API | Native | Game rendering |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main game component
│   ├── globals.css          # Global styles & animations
│   └── api/
│       └── eth-price/       # ETH price fetching API
├── components/
│   ├── game/
│   │   ├── GameCanvas.tsx   # Canvas rendering
│   │   ├── HUD.tsx          # Score/time display
│   │   ├── MobileControls.tsx
│   │   ├── AudioManager.tsx
│   │   ├── ControlsGuide.tsx
│   │   ├── StyledButton.tsx
│   │   └── WalletDisplay.tsx
│   └── WalletConnectButton.tsx
├── lib/
│   ├── game/
│   │   ├── constants.ts     # Game configuration
│   │   └── utils.ts         # Game logic helpers
│   └── web3/
│       └── provider.tsx      # Wagmi configuration
├── hooks/
│   └── useBaseAppWallet.ts  # Wallet detection
└── types/
    └── game.ts              # TypeScript interfaces
```

## 🔧 Environment Variables

Create `.env.local`:
```env
# WalletConnect v2 Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional: Mainnet RPC (uses default if not set)
# NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
```

## 🔐 Security Notes

- All wallet connections use standard Web3 patterns
- No private keys stored locally
- Transaction signing happens in user's wallet
- Entry fees go to configured recipient address
- On-chain data immutable and transparent

## 📊 Game Mechanics

- **Spawn Rate**: Faster as difficulty increases
- **Obstacle Speed**: Increases with time elapsed
- **Max Difficulty**: Caps at level 10
- **Scoring**: 1 point per 100ms survived
- **High Score**: Saved in browser localStorage

## 🐛 Debugging

If you encounter issues, check:

1. **Wallet Connection**
   - Ensure wallet is connected to Base mainnet
   - Check browser console for wallet errors

2. **Balance**
   - Minimum $0.0001 USD worth of ETH required
   - Verify balance in connected wallet

3. **Environment Variables**
   - Confirm `.env.local` exists with WalletConnect ID
   - Restart dev server after env changes

4. **Console Logs**
   - Open browser DevTools (F12)
   - Check Console tab for detailed error messages

## 📝 Build for Production

```bash
# Build optimized bundle
npm run build

# Start production server
npm run start
```

## 🚀 Deployment

Deploy to Vercel with one click:
- Push changes to GitHub
- Connect repository to Vercel
- Environment variables auto-sync

Or deploy manually:
```bash
npm run build
# Deploy the .next folder to your hosting service
```

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support (touch controls enabled)

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Base Network Docs](https://docs.base.org/)

## 📄 License

This project is open source and available under the MIT License.

---

**Ready to play?** Run `npm run dev` and start your DuetGame journey! 🎮✨
