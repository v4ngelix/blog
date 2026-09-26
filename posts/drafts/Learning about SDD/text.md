---
title: Running an LLM locally in two commands
started: 20.09.2026
finished: 
tags: [TIL]
---

# Requirements:
I wanted as little vendor lock-in as possible. 
Terminal based, not and IDE or something similar, integrates with my coding agent.

Google and Amazon thingies.

After lots of reading I came to 3:
- specc driven eksperiment:
    - basically just installs agent skills.
    - Vahet pole mida kasutada, kohati suht kaua jahvata ja teeb midagi. Samas tekstid on üllatavalt põhjalikud.
    - OpenSpec
        - Suht palju läbu, oma skillid ja AGENT nagu on piisav.
        - Seems a bit spammy. Teksti struktuur veits kahtlane/harjumatu.
        - Lightweight, basically only 5 skills/steps.
    - SpecKit
        - tundub isiklikult loogilisem. Failidel on hea struktuur minu silmis. Hetkel kasutusel kv2-s.
        - Cosntitution - cool idea, exactly what ive been waiting for
        - Many steps, manually doing, a bit much.
        - /task - Lööb plaani taskideks. pretty cool skill, useful for ai workflows.
    - BMAD on ka, aga specKit on juba praegu rohkem kui küll
    - Tokeneid kulub rohkem.

