---
title: "Why I moved this site off Docsify and onto Hugo"
date: 2026-08-11
---

This site used to run on Docsify — markdown rendered client-side by JS, no build step. Fine for a quick personal page, bad for anything you want search engines to actually read: crawlers that don't execute JS see an empty shell, and there's no per-page metadata to speak of.

I wanted something boring instead: static HTML generated at build time, no framework churn, no dependency on a CDN script staying online. Hugo fit — a single binary, no Ruby/Node toolchain to maintain, markdown in, HTML out. I build locally and push the output straight to `/docs`; no CI pipeline to babysit.

The theme is [PaperMod](https://github.com/adityatelange/hugo-PaperMod) — minimal by default, built-in search, dark/light toggle, and it doesn't need me to write CSS. Same content model as before (markdown files, some images), just rendered properly this time.
