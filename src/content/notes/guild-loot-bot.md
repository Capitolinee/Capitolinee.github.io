---
title: Building a Guild Loot-Tracking Bot
date: 2026-09-23
summary: A Discord bot that tracks who showed up, what dropped, and who gets paid — synced to a Google Sheet.
tags: [Discord, Python, 專案]
---

Guild loot tracking by hand is a pain — who showed up, what dropped, who gets paid, who's already claimed. A raid ends and it's all buried in Discord chat, and good luck reconstructing it the next day.

So I built a bot to handle it. Send it a screenshot of the party and it reads out who was there. Loot drops, log it with a command. Selling it and splitting the cut, giving it to someone for free, or holding it for the guild — pick one from a menu and it's handled. Everything syncs to a Google Sheet, so officers can check it anytime, or tweak it by hand without the bot getting in the way.

A few parts worth mentioning:

- Image recognition runs on Gemini, reading screenshots to pull out party rosters and item names
- The payout math had more edge cases than expected (does one person bringing two characters count as two shares? does a free giveaway deduct from the guild fund?), and the data model went through several redesigns before it held up
- Data writes to Google Sheets, but the spreadsheet does its own math with formulas — the bot just writes data, officers never have to learn a new tool
- Full audit logging, so anything anyone did is traceable
- Along the way I actually caught a real security bug — a formula injection vulnerability where someone could set their character name to a malicious formula and get the spreadsheet to silently run external commands. Fixed it.

Built with Python + discord.py, deployed and running 24/7.
