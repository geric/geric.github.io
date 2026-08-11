# geric.github.io

Personal site — resume, portfolio, blog, contact. Built with [Hugo](https://gohugo.io/) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

Built locally and published from the `docs/` folder — no CI, no build step on GitHub's end.

## Structure

- `content/` — pages (`about.md`, `portfolio.md`, `contact.md`) and blog posts (`content/posts/`)
- `themes/PaperMod/` — theme, vendored as a git submodule
- `hugo.toml` — site config
- `docs/` — build output, served by GitHub Pages

## Workflow

```sh
# first time / after pulling
git submodule update --init --recursive

# preview locally
hugo server -D

# build and publish
hugo
git add -A
git commit -m "..."
git push
```

GitHub Pages is configured to serve from the `docs/` folder on `master`.
