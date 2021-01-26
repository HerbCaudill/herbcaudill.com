---
title: 'A secret agent database for the rest of us'
subtitle: ''
description: 'Why shouldn’t our tools for organizing information be as cool as the ones in the movies?'
date: '2018-12-22'
image: 'https://miro.medium.com/max/2880/1*jrxpw3vsHQx7XjjRDBZiuw.png'
---

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/2880/1\*jrxpw3vsHQx7XjjRDBZiuw.png" width="1440" height="298" srcSet="https://miro.medium.com/max/552/1\*jrxpw3vsHQx7XjjRDBZiuw.png 276w, https://miro.medium.com/max/1104/1\*jrxpw3vsHQx7XjjRDBZiuw.png 552w, https://miro.medium.com/max/1280/1\*jrxpw3vsHQx7XjjRDBZiuw.png 640w, https://miro.medium.com/max/1456/1\*jrxpw3vsHQx7XjjRDBZiuw.png 728w, https://miro.medium.com/max/1632/1\*jrxpw3vsHQx7XjjRDBZiuw.png 816w, https://miro.medium.com/max/1808/1\*jrxpw3vsHQx7XjjRDBZiuw.png 904w, https://miro.medium.com/max/1984/1\*jrxpw3vsHQx7XjjRDBZiuw.png 992w, https://miro.medium.com/max/2160/1\*jrxpw3vsHQx7XjjRDBZiuw.png 1080w, https://miro.medium.com/max/2700/1\*jrxpw3vsHQx7XjjRDBZiuw.png 1350w, https://miro.medium.com/max/2880/1\*jrxpw3vsHQx7XjjRDBZiuw.png 1440w" sizes="1440px"/>

I have a long-standing love-hate relationship with the way computer interfaces are portrayed in films.

On the one hand, they’re so unrealistic! Lynne has patiently sat through any number of post-movie rants about this kind of thing:

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1000/1\*XNLlC7LKlxZVAeCx4lqGMw.gif" width="500" height="281" srcSet="https://miro.medium.com/max/552/1\*XNLlC7LKlxZVAeCx4lqGMw.gif 276w, https://miro.medium.com/max/864/1\*XNLlC7LKlxZVAeCx4lqGMw.gif 432w" sizes="432px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1000/1\*4R2cJaZYjv4BlMn30lZVLA.gif" width="500" height="213" srcSet="https://miro.medium.com/max/552/1\*4R2cJaZYjv4BlMn30lZVLA.gif 276w, https://miro.medium.com/max/1000/1\*4R2cJaZYjv4BlMn30lZVLA.gif 500w" sizes="500px"/>

On the other hand, they’re kind of awesome! At their best, film UIs capture the way we _wish_ computers worked:

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1070/0\*jgOMevZ-deY9tv6J.gif" width="535" height="245" srcSet="https://miro.medium.com/max/552/0\*jgOMevZ-deY9tv6J.gif 276w, https://miro.medium.com/max/1044/0\*jgOMevZ-deY9tv6J.gif 522w" sizes="522px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1000/1\*tJ6kqhv0ieacUiGoWucz4Q.gif" width="500" height="250" srcSet="https://miro.medium.com/max/552/1\*tJ6kqhv0ieacUiGoWucz4Q.gif 276w, https://miro.medium.com/max/958/1\*tJ6kqhv0ieacUiGoWucz4Q.gif 479w" sizes="479px"/>

In the movies, no one ever spends five minutes looking for a file. In the movies, no one struggles to print something from their laptop.

In the movies, when you type someone’s name into the computer, you’re immediately presented with everything you need to know about them:

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/2560/1\*kZJBq15ke6bvrCJKpX3rbA.png" width="1280" height="720" srcSet="https://miro.medium.com/max/552/1\*kZJBq15ke6bvrCJKpX3rbA.png 276w, https://miro.medium.com/max/916/1\*kZJBq15ke6bvrCJKpX3rbA.png 458w" sizes="458px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1980/1\*OA2TQV2tq1BxbKpCmI\_NvA.png" width="990" height="470" srcSet="https://miro.medium.com/max/552/1\*OA2TQV2tq1BxbKpCmI\_NvA.png 276w, https://miro.medium.com/max/1086/1\*OA2TQV2tq1BxbKpCmI\_NvA.png 543w" sizes="543px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1554/1\*auDTNgXZH1n-wRHR4jZkHw.jpeg" width="777" height="960" srcSet="https://miro.medium.com/max/552/1\*auDTNgXZH1n-wRHR4jZkHw.jpeg 276w, https://miro.medium.com/max/564/1\*auDTNgXZH1n-wRHR4jZkHw.jpeg 282w" sizes="282px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1240/1\*-PEeinnSNlWcVa1AV\_SRTQ.jpeg" width="620" height="300" srcSet="https://miro.medium.com/max/552/1\*-PEeinnSNlWcVa1AV\_SRTQ.jpeg 276w, https://miro.medium.com/max/1104/1\*-PEeinnSNlWcVa1AV\_SRTQ.jpeg 552w, https://miro.medium.com/max/1240/1\*-PEeinnSNlWcVa1AV\_SRTQ.jpeg 620w" sizes="620px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/3840/1\*SSnpTNu5UHNg7\_Bso9RNZw.jpeg" width="1920" height="1080" srcSet="https://miro.medium.com/max/552/1\*SSnpTNu5UHNg7\_Bso9RNZw.jpeg 276w, https://miro.medium.com/max/1054/1\*SSnpTNu5UHNg7\_Bso9RNZw.jpeg 527w" sizes="527px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1440/1\*dMgO11mIbmZetB9Wp0FwdA.jpeg" width="720" height="451" srcSet="https://miro.medium.com/max/552/1\*dMgO11mIbmZetB9Wp0FwdA.jpeg 276w, https://miro.medium.com/max/948/1\*dMgO11mIbmZetB9Wp0FwdA.jpeg 474w" sizes="474px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1980/1\*izI\_o-sAyrgVWigdBQHcVA.png" width="990" height="470" srcSet="https://miro.medium.com/max/552/1\*izI\_o-sAyrgVWigdBQHcVA.png 276w, https://miro.medium.com/max/1104/1\*izI\_o-sAyrgVWigdBQHcVA.png 552w, https://miro.medium.com/max/1108/1\*izI\_o-sAyrgVWigdBQHcVA.png 554w" sizes="554px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1600/1\*t510GzPVN1OQzP9XykbT6w.png" width="800" height="470" srcSet="https://miro.medium.com/max/552/1\*t510GzPVN1OQzP9XykbT6w.png 276w, https://miro.medium.com/max/894/1\*t510GzPVN1OQzP9XykbT6w.png 447w" sizes="447px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1110/1\*lrje37x5BVTWpozSWwVOaA.jpeg" width="555" height="312" srcSet="https://miro.medium.com/max/552/1\*lrje37x5BVTWpozSWwVOaA.jpeg 276w, https://miro.medium.com/max/834/1\*lrje37x5BVTWpozSWwVOaA.jpeg 417w" sizes="417px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/1800/1\*mEf-TLOjkEKjsIHiUNFJ3g.jpeg" width="900" height="1166"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/872/1\*Vliol4v-N\_st1\_AWQEl\_xA.jpeg" width="436" height="254" srcSet="https://miro.medium.com/max/552/1\*Vliol4v-N\_st1\_AWQEl\_xA.jpeg 276w, https://miro.medium.com/max/806/1\*Vliol4v-N\_st1\_AWQEl\_xA.jpeg 403w" sizes="403px"/>

Mugshots, surveillance photos, maps, scans of paper records, ID cards, maps, fingerprints, 3D body scans: It’s all there, in one place, when you need it.

When I see the computer systems used by spy organizations in the movies, I always have the same three thoughts:

**Thought #1:** Why do secret agents type so loudly?

**Thought #2:** I’d love to just get a glimpse at the systems real-world spies use. Going by the Agency databases I _have_ seen, I’m guessing they’re not all that:

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/3508/1\*LRM7XjMqYghV48mN7YBUsw.png" width="1754" height="1152" srcSet="https://miro.medium.com/max/552/1\*LRM7XjMqYghV48mN7YBUsw.png 276w, https://miro.medium.com/max/804/1\*LRM7XjMqYghV48mN7YBUsw.png 402w" sizes="402px"/>

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/2872/1\*8l9H\_ZWUT2PXjhLj4rSH6w.png" width="1436" height="633" srcSet="https://miro.medium.com/max/552/1\*8l9H\_ZWUT2PXjhLj4rSH6w.png 276w, https://miro.medium.com/max/1104/1\*8l9H\_ZWUT2PXjhLj4rSH6w.png 552w, https://miro.medium.com/max/1198/1\*8l9H\_ZWUT2PXjhLj4rSH6w.png 599w" sizes="599px"/>

On the other hand, maybe the CIA saves all the good software contractors for their internally-facing systems — who knows!

**Thought #3:** It sure would be nice if, at _my_ job, I could type in, say, a customer’s name — and see everything I need to know about them, in once place.

So let’s take the secret agent use-case as a way of anchoring our thinking. **Let’s focus on an imaginary user — let’s call her Celeste.** Celeste has a desk job at the headquarters office of an intelligence organization. She’s smart. She’s not a programmer, and she doesn’t have a team of programmers at her disposal. It’s her job to put all the organization’s information about secret agents at her team’s fingertips.

Specifically, Celeste wants to be able to type in an agent’s name _(klackety-klackety-klack)_ and see something like this:

<img alt="Image for post" class="t u v hn ak" src="https://miro.medium.com/max/4384/1\*aoyXMzKHOk3MnHh6La2UfQ.png" width="2192" height="1808" srcSet="https://miro.medium.com/max/552/1\*aoyXMzKHOk3MnHh6La2UfQ.png 276w, https://miro.medium.com/max/1104/1\*aoyXMzKHOk3MnHh6La2UfQ.png 552w, https://miro.medium.com/max/1280/1\*aoyXMzKHOk3MnHh6La2UfQ.png 640w, https://miro.medium.com/max/1456/1\*aoyXMzKHOk3MnHh6La2UfQ.png 728w, https://miro.medium.com/max/1632/1\*aoyXMzKHOk3MnHh6La2UfQ.png 816w, https://miro.medium.com/max/1808/1\*aoyXMzKHOk3MnHh6La2UfQ.png 904w, https://miro.medium.com/max/1984/1\*aoyXMzKHOk3MnHh6La2UfQ.png 992w, https://miro.medium.com/max/2000/1\*aoyXMzKHOk3MnHh6La2UfQ.png 1000w" sizes="1000px"/>

This shouldn't be rocket science, should it?

Now, this screen has no slowly rotating 3-D models, no live satellite tracking in grainy grayscale, no ANSI 381-encoded fingerprint templates. **Just a bunch of facts.** It doesn’t even need to make little futuristic beeps as it loads. This shouldn’t be hard, right?

Unfortunately, **none of the tools we have today are of any use to Celeste.**

So how is she making do?

Perhaps **she already has a spreadsheet** with a row for each agent, with their names and vital stats. **But it’s limited**: There’s no place for photos or documents. And when she was trying to come up with a good way of capturing agents’ language capabilities — a table inside a cell? a couple of linked tables? numbered columns? — [her brain melted](https://medium.com/all-the-things/a-single-infinitely-customizable-app-for-everything-else-9abed7c5b5e7).

- She tried some **database-spreadsheet hybrids** like Airtable and Fieldbook, but they were **not much better than spreadsheets**: Neither one lets you customize a form like this; and neither one can handle things like the log of notes or the language skills table.
- She looked at **easy-to-use** off-the-shelf systems for storing information about people— contact managers, CRMs, ERPs, etc. — but they weren’t made for the espionage business. With a little imagination, maybe you can stretch things a little bit — think of `Agents` as `Customers`, and `Missions` as `Deals`, and so on—but at some point you run into the limits of whatever customizability these systems offer.
- And she probably considered highly **customizable** application builders — Mendix, Salesforce, Microsoft PowerApps, Google App Maker —but found them **intimidating and unapproachable**.

So it’s up to us to design a system that could help Celeste. Her happiness is in our hands.
