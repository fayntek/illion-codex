<a name="Illion-Codex"></a> 

<p align="center"><img width=100% src="resource/illion-codex_repobanner.png"></p>


[![GitHub license](https://img.shields.io/github/license/fayntek/illion-codex?color=green)](#license) [![GitHub issues](https://img.shields.io/github/issues/fayntek/illion-codex?color=red)](https://github.com/fayntek/illion-codex/issues) ![visitors](https://visitor-badge.laobi.icu/badge?page_id=fayntek.illion-codex&left_text=Visits) [![Pages](https://github.com/fayntek/illion-codex/actions/workflows/main.yml/badge.svg)](https://github.com/fayntek/illion-codex/actions/workflows/main.yml) [![GitHub stars](https://img.shields.io/github/stars/fayntek/illion-codex?color=yellow)]()
[![GitHub forks](https://img.shields.io/github/forks/fayntek/illion-codex?color=orange)]()
[![GitHub watchers](https://img.shields.io/github/watchers/fayntek/illion-codex?color=blue)]()

[![Discord](https://img.shields.io/badge/Discord-Join%20the%20server-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/k3qVkmXFAN)

---

A serial number goes in, a name comes out. That's the whole pitch.

Type `1000000000000` and instead of staring at `1e12` you get `trilli` and its proper Latin name, plus an incremental-game-style abbreviation like the ones Swarm Simulator players will recognize. No scientific notation, ever - that's kind of the whole point.

## What it does

- Turns any serial number (1, 999, 1,000,000, or something absurdly bigger) into its full Conway-Wechsler name
- Generates a short abbreviation for it, the same style you'd see in incremental games
- Breaks the number down piece by piece (units / tens / hundreds, or chiliad by chiliad once you're past 999) so you can actually see how the name is built instead of just trusting a black box
- Decodes abbreviations back into numbers, single codes or hyphenated multi-group ones like `M-Ni`
- Ships a full reference table for 1-999 you can search, click through, or export as CSV
- Remembers whatever number you were looking at via the URL hash, so you can bookmark or share a specific one

Everything from 1 to 999 is checked against Swarm Simulator's real data. Past 999 the names still follow the documented Conway-Wechsler extension rules, but the abbreviations are this tool's own consistent scheme rather than anything official - the app is upfront about that distinction wherever it matters.

## Running it

There's no build step. Download or clone this, then just open `index.html` in a browser. That's it.

```bash
git clone https://github.com/fayntek/illion-codex.git
cd illion-codex/src
open index.html   # or double-click it, whatever you prefer
```

## Why this exists

I wanted an incremental game friendly way to name absurdly large numbers without ever falling back to "x.xxe+308". Turns out doing that properly (correctly declined Latin prefixes and all) is more involved than it looks, so here we are.

## License
Foul tarnished, this work belongs to no one, truly. Yet a mention of its maker would not go unnoticed.
Do whatever you want with it alas a credit would be nice (:

---

<p align="center"><sub>a numerarium by</sub><br><a href="https://github.com/fayntek"><img src="https://img.shields.io/badge/%E2%9A%99-Fayntek-fff5d6?style=flat-square&amp;labelColor=191c21" alt="Fayntek" height="20"></a></p>
