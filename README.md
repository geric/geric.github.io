# geric.github.io

Personal site — resume, portfolio, blog, contact. Built with [Hugo](https://gohugo.io/) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

Built locally and published from the `docs/` folder — no CI, no build step on GitHub's end.

## Structure

- `content/` — pages (`about.md`, `portfolio.md`, `contact.md`) and blog posts (`content/posts/`)
- `themes/PaperMod/` — theme, vendored as a git submodule
- `hugo.toml` — site config
- `docs/` — build output, served by GitHub Pages

## First time / after pulling

```sh
git submodule update --init --recursive
```

## Adding a new blog post

```sh
hugo new posts/my-new-post.md
```

Edit `content/posts/my-new-post.md` (markdown, front matter already filled in). It's created with `draft: true` — remove that line or set it to `false` before publishing, otherwise it's excluded from the production build.

## Preview locally

```sh
hugo server -D --port 8080
```

Open `http://localhost:8080/` (devcontainer forwards the port automatically). `-D` includes drafts. Live-reloads on save. Ctrl+C to stop.

**Warning:** `hugo server` writes its dev-mode build (including a livereload script that tries to connect back to `localhost`) directly into `docs/`, the same folder GitHub Pages serves. Never commit right after running the server — always do a clean production build first (see Publish below), or the live site ends up shipping a broken script that tries to reach your laptop.

## Publish

```sh
hugo --gc --minify
git add -A
git commit -m "..."
git push
```

`hugo --gc --minify` (no `-D`) rebuilds `docs/` as a clean production build, excluding drafts and overwriting any leftover dev-mode output from `hugo server`. GitHub Pages serves `docs/` on `master` automatically — no CI to configure, GitHub's own Pages workflow picks it up on push.
