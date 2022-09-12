---
title: Is this a server?
subtitle: Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

description: |
  Cloud-based software has made collaboration easier, but at a cost to both developers and users.
  Could a new model for software give us the best of both worlds?

draft: true

date: '2022-01-15'
thumbnail: /images/posts/thumbnails/roads.jpg
image: /images/posts/roads/roads.jpg
tags: software

caption: |
  Felipe Juan Pablo Alfonso de Todos los Santos de Borbón y Grecia, King Felipe VI of Spain
---

As an American living in Spain, every once and a while I'm mildly surprised to be reminded that Spain still has a king (and a queen, and two little teenage princesses) whose lineage — and thus his authority — can be traced back to the dark ages.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fherbcaudill%2Fs0Fj3TOGjF.png?alt=media&token=5af24a27-a3da-4cbc-bdae-8663d0e9f23e)

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fherbcaudill%2FK-kSwVAllu.png?alt=media&token=111ce383-7e03-4b2b-9884-d49a2c17d586) - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fherbcaudill%2F_t0auUMmV-.png?alt=media&token=f22103fd-ec93-42a6-8c3c-93bd32a284b5)

Back when some humans first got the notion of replacing monarchs with more democratic forms of governments, most other humans thought this was a preposterous suggestion.

For starters, it took a while for the idea to sink in that kings and queens were actually just people like the rest of us.

But even once that was conceded, there were still legitimate questions to be answered. Monarchs played a number of roles, both practical and symbolic, that we would need to fulfill some other way. Who would lead us into battle? Who would be the decider of last resort in contentious court cases? Who would unify us as a nation? Who would represent us to the world?

## This is a metaphor

If we're going to get rid of servers, we'll need to understand the utility that they currently provide, and figure out different ways of fulfilling those needs.

#### Servers are just computers

The first thing to understand, though, is that servers are just computers. Just like any human could, in principle, serve as a leader, any computer could be a server.

I think maybe in the popular imagination, we need servers because they're bigger and more powerful than consumer-grade computers. That's certainly the case for some applications.

But as CPUs and GPUs get faster and faster and SSDs get bigger and bigger and everything gets cheaper and cheaper, there are fewer and fewer applications that are too big or too complex to run on users' own devices.

## What servers are good for

Servers do a lot, but the value they add may not be what you think it is.

I think maybe in the popular imagination, we need servers because they're bigger and more powerful than consumer-grade computers. That's certainly the case for some applications. But as CPUs and GPUs get faster and faster and SSDs get bigger and bigger and everything gets cheaper and cheaper, there are fewer and fewer applications that are too big or too complex to run on users' own devices.

So for the moment let's disregard use cases that involve vast amounts of data or server farms' worth of computation. Instead, think of something like a community group's project management system, or a medium-sized company's financial records, or a sales team's database of leads and deals and customers.

Even with these modest applications, we depend on servers to make collaboration happen. I'll divide the essential services they provide into five big categories: **consistency**, **discovery**, **persistence**, **authentication**, and **authorization**.

**Consistency** A server provides a single central point of contact for collaborative applications to read and write data. The data in the cloud acts as our single source of truth. There's no possibility of two people making conflicting change

**Discovery** There are a couple of things that turn an ordinary computer in to a server. One is that it has a stable IP address. This makes it easy for two users to find each other in the vastness of the internet. I connect to a URL from wherever I am in the world, you connect to the same URL from wherever you are, and just like that we're connecte

**Persistence** Another thing that makes a computer a server is that it's always on and always online. Typically there are teams of skilled people who have that as their only job. This means that we can collaborate **asynchronously**: I can make some changes, log off and go to sleep, and when you come online you'll see my change

**Authentication** A server can securely store sensitive information — passwords, for example — and then use that to challenge me to prove who I am. If I can't prove that I know my password, it can refuse to connect with me, and thereby prevent me from connecting to others. So the server acts as trusted third party, essentially vouching for my identity to my collaborator

**Authorization** If there's something I'm not allowed to see, a server just won't let me have it; and if there's something I'm not allowed to do, a server simply won't allow me to do i

## How do we do these things without servers?

So if we want to build local-first software, we first need to figure out how to provide these services **without a server**.

1. **Consistency** Without a server, if we each have our own local copy of the data, how do we stay in sync? What if our edits are in conflict with each othe

   <div class='spoiler'>
   **A:** An emerging class of technologies called **conflict-free replicated data types (CRDTs)**
   allows software on users' own devices to sync up directly with each other, automatically merging
   changes on both sides, and resolving any conflicts in a predictable way.

    </div>

2. **Discovery** Without a server, how can my laptop connect directly to your phone? Neither my laptop nor your phone has a stable IP address, so how do we find each other in order to communicat

   <div class='spoiler'>

   **A:** While we're waiting for true peer-to-peer networking technologies to become mature and widespread, we can use **relays** — tiny, generic servers that can be deployed to the cloud at little or no cost — that allow two devices anywhere on the internet to instantly connect to each other.

    </div>

3. **Persistence** Without a server, how do we communicate asynchronously? Our laptops and tablets and phones are often offline or powered down. We can't really collaborate effectively if we always have to be online at the same tim

4. **Authentication** Without a server acting as a trusted third party, who vouches for me so I can prove who I am to my collaborators? They don't know my passwords (I hope!), so how can they be sure that I'm not an impostor

5. **Authorization** Without a server to keep track of the rules, how dfo we know who's allowed to do what? And if everybody has a full copy of the data, how can we keep some people from seeing sensitive information

|                                                         | 💿<br/>traditional<br/>apps | 🌧<br/>cloud<br/>apps | 👍<br/>local-first<br/>apps |
| ------------------------------------------------------- | :-------------------------: | :------------------: | :-------------------------: | -------- |
| ⌚ **fast**: my data is on my device                    |             ✅              |          ⛔          |             ✅              |
| 🚙 **robust**: network optional                         |             ✅              |          ⛔          |             ✅              | \*\*\*\* |
| 🕵️‍♀️ **private**: only I decide who sees it               |             ✅              |          ⛔          |             ✅              |
| 📦 **mine**: I own it and can take it with me           |             ✅              |          ⛔          |             ✅              |
| 👪 **multiplayer**: I can work with others in real time |             ⛔              |          ✅          |             ✅              |
| 📱 **multidevice**: move from laptop to phone to tablet |             ⛔              |          ✅          |             ✅              |
| 🌩 **backed up**: no worries about data loss             |             ⛔              |          ✅          |             ✅              |

| A server is…  | because…                                       | as a result it can provide… | which means we can…                | In a peer-to-peer world, we can instead use… |
| ------------- | :--------------------------------------------- | :-------------------------- | :--------------------------------- | -------------------------------------------- |
| available     | it’s always plugged in, powered on, and online | persistence                 | collaborate asynchronously         | cloud clients                                |
| findable      | it has a public IP address                     | discovery                   | find each other                    | relays                                       |
| trusted       | it is under the control of a known entity      | authorization               | enforce read and write permissions | signature chains, lockboxes, and attention   |
| a third party | it is not a peer                               | authentication              | be sure of each other’s identity   | signature chains and signature challenges    |
| authoritative | we agree that it is the only source of truth   | consistency                 | edit shared data without conflicts | CRDTs                                        |
