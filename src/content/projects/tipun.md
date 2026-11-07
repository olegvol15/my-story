---
title: "tipun"
description: "A local, deterministic terminal coach that suggests cleaner, equivalent shell commands. No AI, no network."
status: live
started: 2026-10-13
stack: [Rust, clap, zsh]
links:
  - label: GitHub
    href: https://github.com/olegvol15/tipun
  - label: v0.1.0 release
    href: https://github.com/olegvol15/tipun/releases/tag/v0.1.0
key: TIP
tickets:
  - title: "Shell lexer and parser: words, quotes, pipes, redirections and pipeline stages"
    status: done
    done: 2026-10-18
    href: https://github.com/olegvol15/tipun/pull/8
  - title: "First rewrite rule: drop the useless cat in front of grep, head, tail, sort and uniq"
    status: done
    done: 2026-10-28
    href: https://github.com/olegvol15/tipun/pull/11
  - title: "sort | uniq to sort -u, grep | wc -l to grep -c, and the analyze command"
    status: done
    done: 2026-11-01
    href: https://github.com/olegvol15/tipun/pull/15
  - title: "Release v0.1.0: zsh hook, prebuilt binaries for macOS and Linux, redirects kept in suggestions"
    status: done
    done: 2026-11-07
    href: https://github.com/olegvol15/tipun/releases/tag/v0.1.0
  - title: "One-line install script that downloads the right binary and checks its SHA-256"
    status: done
    done: 2026-11-07
    href: https://github.com/olegvol15/tipun/pull/19
  - title: "Keep tips working with harmless grep aliases, like the one oh-my-zsh defines"
    status: done
    done: 2026-11-07
    href: https://github.com/olegvol15/tipun/pull/20
  - title: "Flag bundling: ls -l -a to ls -la, rm -r -f to rm -rf"
    status: in-progress
    href: https://github.com/olegvol15/tipun/pull/21
  - title: "Modern git: checkout -b to switch -c, checkout -- file to restore, stash save to stash push -m"
    status: backlog
  - title: "Understand && chains, so tips can span more than one command"
    status: backlog
  - title: "Merge repeated commands: touch a && touch b to touch a b, repeated git add into one"
    status: backlog
  - title: "cd .. && cd .. to cd ../.."
    status: backlog
  - title: "git branch x && git checkout x to git switch -c x"
    status: backlog
---

tipun watches the commands you run and occasionally suggests a cleaner way to write the same one:
`cat app.log | grep ERROR` becomes `grep ERROR app.log`.

It runs entirely on your machine, with no AI, network or telemetry. Suggestions come from parsing the command, not from guessing, and it only speaks up when it is sure the rewrite behaves the same. A missed tip is fine; a wrong one is not.

It works in zsh today. Install it with one line:

```
curl -fsSL https://raw.githubusercontent.com/olegvol15/tipun/main/install.sh | sh
```
