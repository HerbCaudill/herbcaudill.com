---
title: Computer, enhance
subtitle: A secret agent database for_the rest of us
description: Why shouldn’t our tools for organizing information be as cool as the ones in the movies?
date: '2018-12-22'
image: '/images/thumbnails/secretagent.png'
---

![](https://miro.medium.com/max/2880/1*jrxpw3vsHQx7XjjRDBZiuw.png)

I have a long-standing love-hate relationship with the way computer interfaces are portrayed in films.

On the one hand, they’re so unrealistic! Lynne has patiently sat through any number of post-movie rants about this kind of thing:

![](https://miro.medium.com/max/1000/1*XNLlC7LKlxZVAeCx4lqGMw.gif)

![](https://miro.medium.com/max/1000/1*4R2cJaZYjv4BlMn30lZVLA.gif)

On the other hand, they’re kind of awesome! At their best, film UIs capture the way we _wish_ computers worked:

![](https://miro.medium.com/max/1070/0*jgOMevZ-deY9tv6J.gif)

![](https://miro.medium.com/max/1000/1*tJ6kqhv0ieacUiGoWucz4Q.gif)

In the movies, no one ever spends five minutes looking for a file. In the movies, no one struggles to print something from their laptop.

In the movies, when you type someone’s name into the computer, you’re immediately presented with everything you need to know about them:

![](https://miro.medium.com/max/2560/1*kZJBq15ke6bvrCJKpX3rbA.png)

![](https://miro.medium.com/max/1980/1*OA2TQV2tq1BxbKpCmI_NvA.png)

![](https://miro.medium.com/max/1554/1*auDTNgXZH1n-wRHR4jZkHw.jpeg)

![](https://miro.medium.com/max/1240/1*-PEeinnSNlWcVa1AV_SRTQ.jpeg)

![](https://miro.medium.com/max/3840/1*SSnpTNu5UHNg7_Bso9RNZw.jpeg)

![](https://miro.medium.com/max/1440/1*dMgO11mIbmZetB9Wp0FwdA.jpeg)

![](https://miro.medium.com/max/1980/1*izI_o-sAyrgVWigdBQHcVA.png)

![](https://miro.medium.com/max/1600/1*t510GzPVN1OQzP9XykbT6w.png)

![](https://miro.medium.com/max/1110/1*lrje37x5BVTWpozSWwVOaA.jpeg)

![](https://miro.medium.com/max/1800/1*mEf-TLOjkEKjsIHiUNFJ3g.jpeg)

![](https://miro.medium.com/max/872/1*Vliol4v-N_st1_AWQEl_xA.jpeg)

Mugshots, surveillance photos, maps, scans of paper records, ID cards, maps, fingerprints, 3D body scans: It’s all there, in one place, when you need it.

When I see the computer systems used by spy organizations in the movies, I always have the same three thoughts:

**Thought #1:** Why do secret agents type so loudly?

**Thought #2:** I’d love to just get a glimpse at the systems real-world spies use. Going by the Agency databases I _have_ seen, I’m guessing they’re not all that:

![](https://miro.medium.com/max/3508/1*LRM7XjMqYghV48mN7YBUsw.png)

![](https://miro.medium.com/max/2872/1*8l9H_ZWUT2PXjhLj4rSH6w.png)

On the other hand, maybe the CIA saves all the good software contractors for their internally-facing systems — who knows!

**Thought #3:** It sure would be nice if, at _my_ job, I could type in, say, a customer’s name — and see everything I need to know about them, in once place.

So let’s take the secret agent use-case as a way of anchoring our thinking. **Let’s focus on an imaginary user — let’s call her Celeste.** Celeste has a desk job at the headquarters office of an intelligence organization. She’s smart. She’s not a programmer, and she doesn’t have a team of programmers at her disposal. It’s her job to put all the organization’s information about secret agents at her team’s fingertips.

Specifically, Celeste wants to be able to type in an agent’s name _(klackety-klackety-klack)_ and see something like this:

![](https://miro.medium.com/max/4384/1*aoyXMzKHOk3MnHh6La2UfQ.png)

This shouldn't be rocket science, should it?

Now, this screen has no slowly rotating 3-D models, no live satellite tracking in grainy grayscale, no ANSI 381-encoded fingerprint templates. **Just a bunch of facts.** It doesn’t even need to make little futuristic beeps as it loads. This shouldn’t be hard, right?

Unfortunately, **none of the tools we have today are of any use to Celeste.**

So how is she making do?

Perhaps **she already has a spreadsheet** with a row for each agent, with their names and vital stats. **But it’s limited**: There’s no place for photos or documents. And when she was trying to come up with a good way of capturing agents’ language capabilities — a table inside a cell? a couple of linked tables? numbered columns? — [her brain melted](https://medium.com/all-the-things/a-single-infinitely-customizable-app-for-everything-else-9abed7c5b5e7).

- She tried some **database-spreadsheet hybrids** like Airtable and Fieldbook, but they were **not much better than spreadsheets**: Neither one lets you customize a form like this; and neither one can handle things like the log of notes or the language skills table.
- She looked at **easy-to-use** off-the-shelf systems for storing information about people— contact managers, CRMs, ERPs, etc. — but they weren’t made for the espionage business. With a little imagination, maybe you can stretch things a little bit — think of `Agents` as `Customers`, and `Missions` as `Deals`, and so on—but at some point you run into the limits of whatever customizability these systems offer.
- And she probably considered highly **customizable** application builders — Mendix, Salesforce, Microsoft PowerApps, Google App Maker —but found them **intimidating and unapproachable**.

So it’s up to us to design a system that could help Celeste. Her happiness is in our hands.
