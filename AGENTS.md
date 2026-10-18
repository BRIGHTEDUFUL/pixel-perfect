<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio content lives in src/data/portfolio.ts and sections in src/components/sections/*; themes are CSS vars switched via html[data-theme] so colors animate in one place.
- Shared navigation, effects and ThemeProvider live around Outlet in the root route so page navigation preserves the active theme; leaf pages reuse section content with PortfolioPage for standalone headings and next-page navigation.
