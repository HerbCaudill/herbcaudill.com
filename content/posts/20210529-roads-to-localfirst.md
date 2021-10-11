---
title: Five roads to local-first software
subtitle: There's something here for everyone

description: |
  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
  Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed
  pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor
  eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.  Sed egestas, ante et vulputate volutpat,
  eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing,
  commodo quis, gravida id, est. Vestibulum volutpat.

draft: true

date: '2021-05-29'
thumbnail: /images/posts/thumbnails/roads.jpg
image: /images/posts/roads/roads.jpg
tags: software

caption: |
  Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis.
---

## Collaboration without ceding control

**Why should I have to give Google ownership of _my stuff_ just so that I can collaborate on a document with someone on my team? **

I wish I lived in a world where I could collaborate with other people without ceding ownership of my data to the likes of Google.

Right now, I have to choose: I can collaborate on my stuff with others, or I can have full agency over my own stuff. I can't have both.

Suppose I have an important document to write, and it's going to need to be a team effort - say, a big proposal.

I could use Microsoft Word, installed on my computer. In that case my proposal is in the form of a **file** that I can store on my own computer. No one can block my access to that file, and I can work on it when I'm offline. But then I have to be OK with collaborating like it's 1999: emailing files around, trying to figure out who has the latest version. That feels like a big step backwards.

Or, I could use web software like Google Docs, which makes it super easy for me and my colleagues to work on the proposal at the same time without conflicts. But then that document doesn't live on my computer - if I'm offline, I can't work on it or even see it. In a very real sense, it's not **mine**, it's Google's: It lives on their hardware, not mine, and if they want to, they can keep it from me. There's always the threat of losing my stuff because my credit card expired, or because Google decided to sunset Docs, or just because someone in Mountain View goofed up.

Imagine if, instead, I could start my proposal on my computer, and indicate to my word processing software that my teammates are welcome to work on it as well. The software on each of our computers could communicate directly to keep all of our copies in sync.

To make sure that we could still collaborate asynchronously, we could choose to also have a copy in the cloud that would also be in sync. That way if I do some work while you're offline, you'll still get my changes.

This would give us the best of both worlds.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fherbcaudill%2FRvKDXhq2UT.png?alt=media&token=4e5c12b5-4a49-4c9f-9693-d95ac7028585)

## Five roads

advantages for me as developer: **dealing with fewer moving parts**

- little or no **infrastructure to maintain**
- code is fundamentally **simpler** with no server

advantages for me as user: **regaining control over MY stuff**

- app **works offline**
- UI is **fast and responsive**
- I'm not **locked in** to a provider
- I can't be **locked out** by the provider
- my stuff can't be **shared without my consent**

## Questions

---

1. **Consistency**<br/> **Q:** Without a server to act as a central source of truth, how can Alice
   and Bob stay in sync?

   <div class='spoiler'>

   **A:** An emerging class of technologies called **conflict-free replicated data types (CRDTs)**
   allows software on users' own devices to sync up directly with each other, automatically merging
   changes on both sides, and resolving any conflicts in a predictable way.

    </div>

2. **Discovery**<br/>**Q:** Without a server, how can Alice and Bob find each other and communicate
   with each other at all?

   <div class='spoiler'>

   **A:** While we're waiting for true peer-to-peer networking technologies to become mature and widespread, we can use **relays** — tiny, generic servers that can be deployed to the cloud at little or no cost — that allow two devices anywhere on the internet to instantly connect to each other.

    </div>

3. **Persistence**<br/>**Q:** Without a server, if Alice makes changes while Bob is offline, how will Bob get them?

   <div class='spoiler'>

   **A:**

  </div>

## 1. Consistency

### CRDTs

> **Q:** Without a server to act as a central source of truth, how can Alice and Bob stay in sync?

## 2. Discovery

### Relay

> **Q:** Without a server, how can Alice and Bob find each other and communicate with each other at
> all?

In theory, any two devices should be able to connect directly to each other, but in practice this can be surprisingly difficult. Personal devices don't generally have stable public IP addresses or domain names

## 3. Persistence

### Robopeer

> **Q:** Without a server, if Alice makes changes while Bob is offline, how will Bob get them?
