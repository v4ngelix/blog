---
title: Swimming with AI
started: 06.09.2026
finished: 26.09.2026
tags: [Fishing]
---

I love swimming, and snorkeling specifically.
That's an important reason for me to leave my home country every winter.
One amazing place where swimming is particularly fulfilling is Sardinia in Italy.
I visited the island some years ago, immediately fell in love with the local nature and vowed to return one day.
This year I had the pleasure of returning and once again enjoying the pristine beaches and crystal-clear water the island's coast offers.

The underwater environment there is incredible.
The beaches range from fine sand to gravel and smooth stones, and the seabed is just as varied: sandy patches give way to pebbles, boulders, crevices and steep underwater cliffs.
This all contributes to a diverse set of submarine flora and fauna.
Seeing so many unknown fish and plants, I naturally had the urge to identify, if not all, at least some of them.

At first I just tried to remember what I saw.
But back at the computer I quickly realized that I couldn't recall the subjects well enough to identify any of them.
Even if I managed to find a species that kind of looked like what I had seen, I couldn't be absolutely sure.
For example, many fish species look quite similar to each other.
The best way to differentiate one from the other would be to have a clear picture of the subject and look up the exact color of its head, the shape of its fins and the pattern on its body.

Fortunately, I remembered that at the bottom of my electronics bag was an old GoPro Hero 7, which had sat idle for years and was, incidentally, also waterproof.
I found a piece of old cord at my campsite and made myself a bracelet for attaching the camera to my wrist.
This way it wouldn't get lost while diving and I wouldn't need to hold on to it the whole time while swimming.
Of course, there is specialized gear for using a GoPro underwater and making sure it doesn't get lost, but why spend a lot of money on something I don't know whether I really need - a piece of cord is completely fine for the time being.
With this setup I hit the beach and managed to shoot a lot of photos underwater.

Back at the campsite I saw that many of the pictures were fuzzy or unclear, some were missing and some had turned out to be videos.
The last two things annoyed me a lot.
I would select the right mode at the surface, but while diving, to my frustration, I quite often saw that it had decided on its own to switch to time-lapse mode or navigate into the settings menu, or that it just didn't register my button press.
I wish there were a way to lock the touchscreen with some kind of key combination, as it ruined a lot of shots for me.

With the pictures I had, I still faced the problem of how to identify the fish.
I'm not a marine biologist or ichthyologist, so I had no clue how to properly go about doing it.
First, I tried Wikipedia, as it generally has great information about marine life.
But, well, you kind of need to know what to search for.
And if I knew what to search for, I wouldn't need to identify the species in the first place, so it's not good for casual identification.
I've also tried to find a book for identifying Mediterranean species, but I haven't found a good one yet.
I imagine there must be a nice book somewhere with all the information I need, and I've even asked around in many bookstores in different countries for such a book - without any success.
There are some enthusiast-made pages for identifying e.g. crabs from the east coast of the USA, but they're not very useful for me.
I tried using Claude and ChatGPT about a year ago to identify a dead crab from a beach in Crete, and I was quite unsuccessful at the time.
Even though I attached very good pictures from several angles to the prompt and described important features of the animal, it kept recommending the same two species, both quite different from the one I had found.

This time it was different.
I used Claude Opus 5, attached one or several of my underwater pictures, described the behavior of the fish, where I found it and what it looked like, and I think I mostly got correct identifications.
When checking the Latin names on iNaturalist, WoRMS and Wikipedia, I could confirm that the LLM had identified the fish correctly.

A really small but important thing I did to improve the flow and results of my prompts was to create a project within Claude and define:
- The goal of the prompts within this project: to identify marine life.
- Some background information: the diving location and the current season.
- A procedure: when unsure, ask; when extra info is needed, ask - I might know it but haven't thought to add it.

As a result, the identification really sped up and became more enjoyable.

Now I had a growing list of identified marine life.
What to do with it next?
At first I just renamed the photos with the correct Latin names.
But I wanted a nice visual way to collect the species and somehow attach a group of related links with additional information, to make learning about them easier for me and for other people diving with me.
Naturally, as an engineer, I built a webpage.

The result is a kind of Pokédex for marine life. It's a simple page with Pinterest-like tiles created from the photos.
Every tile has auto-generated links to iNaturalist, Wikipedia and WoRMS.
If a link is incorrect, there is a feature to override it (sorry, I haven't verified all of them, but even if a link doesn't work, it's easy to move on from there to the correct article or page).

iNaturalist and WoRMS deserve a special mention.
I had heard of the first one, but had never really taken the time to figure out what exactly it's about.
I found out that it's a pretty neat platform for nature lovers to help each other identify species and do citizen science.
The next step would probably be to figure out how to link my future contributions to this platform with sightings on my webpage.
WoRMS - that one I had never heard of before, and it was Claude's suggestion to have a look.
It's pretty good.
It gives a lot of extra information about the species and links for further research - a nice complement to the other two information sources.

The finished page became a great conversation starter at the campsite where I stayed.
There is a lot of AI slop on the internet these days, but the upside is that it's really easy for hobby naturalists to identify unknown species, build tools to learn about the subjects they're interested in and share their finds with the world.
I never thought I'd be taking AI swimming, but here I am, really enjoying it.

[You can see the page here](https://swimming.boheemia.ee)
