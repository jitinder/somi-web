# Somi Web - On-Chain Website Hosting Platform

A "decentralized Vercel" - web3-enabled system that hosts websites fully on-chain as JSON, rendered via a webapp at `somi.web/<contractAddress>`. Includes a basic editor for deploying/updating websites.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Web3**: wagmi + viem
- **Editor**: Monaco Editor
- **Validation**: Zod
- **Blockchain**: Somnia testnet (configurable for any EVM chain)

## Somnia Network Details

- **Testnet Chain ID**: 50312
- **RPC**: `https://dream-rpc.somnia.network/`
- **Explorer**: `https://shannon-explorer.somnia.network/`
- **Native Token**: STT

---

## Project Structure

```
somi-web/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Landing page / editor
│   ├── globals.css                # Global styles + Tailwind
│   ├── providers.tsx              # WagmiProvider wrapper
│   └── [address]/
│       └── page.tsx               # Website renderer route
├── components/
│   ├── editor/
│   │   └── JsonEditor.tsx         # Monaco JSON editor
│   ├── renderer/
│   │   ├── WebsiteRenderer.tsx    # Main renderer component
│   │   ├── ComponentRegistry.tsx  # Component mapping
│   │   ├── RenderNode.tsx         # Recursive node renderer
│   │   └── ErrorBoundary.tsx      # Error handling
│   └── primitives/
│       ├── Container.tsx
│       ├── Flex.tsx
│       ├── Grid.tsx
│       ├── Stack.tsx
│       ├── Heading.tsx
│       ├── Text.tsx
│       ├── Link.tsx
│       ├── Image.tsx
│       ├── Button.tsx
│       ├── Icon.tsx
│       └── index.ts
├── contracts/
│   └── SomiWebsite.sol            # Website storage contract
├── hooks/
│   ├── useDeployWebsite.ts
│   ├── useUpdateWebsite.ts
│   └── useReadWebsite.ts
├── lib/
│   ├── chains.ts                  # Chain configurations
│   ├── wagmi.ts                   # Wagmi config
│   ├── contract.ts                # ABI and bytecode
│   ├── schemas.ts                 # Zod validation
│   ├── types.ts                   # TypeScript types
│   └── utils.ts                   # Utilities (cn helper)
└── package.json
```

---

## JSON Schema for Websites

Based on [json-render](https://json-render.dev) format:

```json
{
  "version": "1.0",
  "metadata": {
    "title": "My Website",
    "description": "A website on-chain"
  },
  "root": {
    "type": "Container",
    "props": { "maxWidth": "lg", "className": "py-12" },
    "children": [
      {
        "type": "Heading",
        "props": { "level": 1 },
        "children": "Welcome to Somi Web"
      },
      {
        "type": "Text",
        "props": { "className": "text-gray-600" },
        "children": "Your website lives on-chain."
      }
    ]
  }
}
```

## Built-in Components

| Component | Props | Description |
|-----------|-------|-------------|
| Container | maxWidth, className | Centered container with max-width |
| Flex | direction, justify, align, gap, wrap, className | Flexbox layout |
| Grid | cols, rows, gap, className | CSS Grid layout |
| Stack | gap, direction, className | Vertical/horizontal stack |
| Heading | level (1-6), className | h1-h6 elements |
| Text | size, weight, color, className | Paragraph text |
| Link | href, target, className | Anchor links |
| Image | src, alt, width, height, objectFit, className | Images |
| Button | variant, size, href, disabled, className | Buttons/links |
| Icon | name, size, color, strokeWidth, className | Lucide icons |

---

## Smart Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SomiWebsite {
    address public owner;
    string public websiteJson;
    uint256 public createdAt;
    uint256 public updatedAt;

    event WebsiteCreated(address indexed owner, string websiteJson);
    event WebsiteUpdated(address indexed owner, string websiteJson);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(string memory _websiteJson) {
        owner = msg.sender;
        websiteJson = _websiteJson;
        createdAt = block.timestamp;
        updatedAt = block.timestamp;
        emit WebsiteCreated(msg.sender, _websiteJson);
    }

    function updateWebsite(string memory _websiteJson) external onlyOwner {
        websiteJson = _websiteJson;
        updatedAt = block.timestamp;
        emit WebsiteUpdated(msg.sender, _websiteJson);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }

    function getWebsiteInfo() external view returns (
        address, string memory, uint256, uint256
    ) {
        return (owner, websiteJson, createdAt, updatedAt);
    }
}
```

---

## Implementation Phases

### Phase 1: Project Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Install dependencies: wagmi, viem, @tanstack/react-query, zod, @monaco-editor/react

### Phase 2: Core Types & Validation
- [ ] Create `/lib/types.ts` with JSON schema types
- [ ] Create `/lib/schemas.ts` with Zod validation
- [ ] Create `/lib/utils.ts` with cn helper

### Phase 3: Primitive Components
- [ ] Implement Container, Flex, Grid, Stack
- [ ] Implement Heading, Text, Link
- [ ] Implement Image, Button
- [ ] Create index export

### Phase 4: JSON Renderer
- [ ] Create ComponentRegistry with type-safe mapping
- [ ] Implement ErrorBoundary
- [ ] Create recursive RenderNode component
- [ ] Build WebsiteRenderer component

### Phase 5: Web3 Integration
- [ ] Define Somnia chain config in `/lib/chains.ts`
- [ ] Create wagmi config with connectors
- [ ] Set up Providers with WagmiProvider
- [ ] Update root layout

### Phase 6: Smart Contract
- [ ] Write and compile SomiWebsite.sol
- [ ] Create `/lib/contract.ts` with ABI and bytecode
- [ ] Test contract deployment on testnet

### Phase 7: Contract Hooks
- [ ] useReadWebsite - fetch website JSON
- [ ] useDeployWebsite - deploy new contract
- [ ] useUpdateWebsite - update existing website

### Phase 8: Editor UI
- [ ] Create JsonEditor with Monaco
- [ ] Build editor page with split view
- [ ] Add wallet connection UI
- [ ] Implement deploy/update buttons
- [ ] Add live preview pane

### Phase 9: Website Viewer Route
- [ ] Create `/app/[address]/page.tsx`
- [ ] Implement server-side data fetching
- [ ] Add metadata generation
- [ ] Handle error states

### Phase 10: Polish
- [ ] Loading states
- [ ] Error messages
- [ ] Basic responsive design

---

## Key Files to Create

1. `/lib/types.ts` - TypeScript types for JSON schema
2. `/lib/schemas.ts` - Zod validation schemas
3. `/lib/chains.ts` - Somnia chain configuration
4. `/lib/wagmi.ts` - Wagmi setup
5. `/lib/contract.ts` - Contract ABI and bytecode
6. `/components/primitives/*` - 9 built-in components
7. `/components/renderer/WebsiteRenderer.tsx` - Main renderer
8. `/components/renderer/RenderNode.tsx` - Recursive renderer
9. `/components/editor/JsonEditor.tsx` - Monaco editor
10. `/hooks/useDeployWebsite.ts` - Deploy hook
11. `/app/page.tsx` - Editor page
12. `/app/[address]/page.tsx` - Viewer route
13. `/contracts/SomiWebsite.sol` - Smart contract

---

## Verification Plan

1. **Unit test renderer**: Create test JSON and verify components render
2. **Contract test**: Deploy to Somnia testnet, verify read/write
3. **E2E flow**:
   - Connect wallet
   - Write JSON in editor
   - Deploy website
   - Navigate to `/<contractAddress>`
   - Verify website renders
   - Update JSON
   - Verify changes reflect
