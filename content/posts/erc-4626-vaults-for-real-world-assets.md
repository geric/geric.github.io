---
title: "ERC-4626 vaults for RWA: what changes when the collateral isn't crypto"
date: 2026-06-02
---

ERC-4626 was designed for yield-bearing crypto vaults — deposit an ERC-20, get shares, redeem later at a different exchange rate. The mechanics translate reasonably well to tokenized real-world assets, but a few assumptions in the standard stop holding once the underlying isn't sitting on-chain.

**Redemption isn't instant.** A crypto vault can settle a withdrawal in the same block. An RWA vault backed by a bond or a fund unit is gated by the actual settlement cycle of that asset — T+2, a subscription/redemption window, sometimes a manual custodian step. `previewRedeem` and `maxWithdraw` need to reflect that reality rather than assume liquidity is always there, or integrators will build against numbers the vault can't honor.

**Share price isn't purely on-chain data.** For a DeFi vault, `totalAssets()` is a balance you can read from a contract. For an RWA vault, it depends on a NAV or valuation that comes from off-chain records — administrator statements, custodian confirmations. That valuation has to be pushed on-chain by something accountable, which means the vault's trust model now includes whoever is authorized to update that number, not just the code.

**Compliance sits in the transfer path, not around it.** Investor eligibility (accredited status, jurisdiction, KYC/KYB) has to be enforced at transfer time, which usually means wrapping `transfer`/`transferFrom` with a compliance check rather than treating the token as a bare ERC-20. ERC-7540 (async deposit/redeem extensions to 4626) helps model the delayed-settlement piece, but the compliance layer is still something you build on top, not something either standard gives you.

None of this is a reason to avoid 4626 for tokenized assets — it's still the right shape for the share/asset accounting. It's just not a drop-in; the parts that assume instant, code-only settlement are exactly the parts that need to be replaced with something that reflects how the underlying asset actually settles.
