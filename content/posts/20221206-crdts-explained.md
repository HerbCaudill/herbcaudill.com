---
title: CRDTs demystified
subtitle: Conflict free something something

description: |
  Something something something

draft: false

date: '2022-12-06'
thumbnail: /images/thumbnails/placeholder.jpg
---

CRDTs (conflict-free replicated datatypes) are exciting. They're widely regarded as a key enabling
technology for creating local-first software — or for building any kind of decentralized multiplayer
system, for that matter.

The idea emerged from academia ^^TK details^^

When I first became interested and was digging around to try to understand how they work, I took one
look at the academic literature and decided it was over my head and I didn't really need to know the
details.

Some time later, I was making a [thing](https://github.com/local-first-web/auth) and once I got it
working, I realized that I had created a CRDT without intending to.

I still don't know for sure what a semilattice is. At some point I intend to educate myself, but for
now I think I have enough of a practical understanding of CRDTs to equip you, the reader, with
reasonably good intuitions about how they work.

### What problem are CRDTs intended to solve?

Think about the difference between Microsoft Word running on your computer and Google Docs running
on a server somewhere.

The selling point of Google Docs is that any number of people can work on a document at the same
time, and you don't have to worry about reconciling conflicting versions of a document.

<aside>

Of course, there's now a cloud-based version of Microsoft Word; and it's also kind of true that
Google Docs can now work offline.

</aside>

With Word, you can have your documents stored on your own hard drive on your own machine, which has
its advantages: You can work on your stuff when you're offline, for example. And more generally, you
have ownership and control over your stuff. ^^(link to article)^^

On the other hand, working together on a document can be a nightmare if everyone has their own
copies on their own computers.

The promise of local-first software is that we might get the best of both worlds: Software that
works without a server and lets us have our stuff on our own devices, like Word, but where our
devices talk directly to each other and make collaboration as easy and seamless as it is with Google
Docs.

The big thing that makes that complicated to pull off is the problem of **resolving conflicts**
between different versions of a document.

The reason you don't have to worry about conflicts with Google Docs is that there's only one version
of the document — the one on Google's servers — and you have to be online to edit it. But any
software that lets you work while offline has to deal with the prospect of conflicting changes — and
they often deal with it by panicking and throwing the conflicts back at the user.

^^TK illustration of conflict error messages^^

The idea behind CRDTs, as the name suggests, is that you don't have to worry about these conflicts,
because they're resolved automagically.

So how does this work? The "magic" of CRDTs boils down to this:

1. Keep track of every change everyone makes
2. Define rules for mechanically deciding what to do about changes that are conflict with each
   other

### Living in the present considered harmful

The typical database system is organized primarily around the way things are **right now**. The way
things were in the past, and the fact that things might change at any minute, are

**current state** of your data. All
the information about how we got to that state might be recorded for a while, in the form of logs.
But this **history of changes** — the sequence of individual edits, additions, and deletions that
were made along the way — gets no respect. It's an afterthought, treated as a transient and
ultimately disposable artifact.

The first thing I'd like to convince you of is that this approach gets it backwards: That log of
changes? That's the good stuff. That's the **real** first-class data, and we should treat it with
respect. The current state of the database? We don't even need to store it, in principle. As long as
we've preserved the full history, we can recalculate the latest state at any time by starting with
nothing and reapplying all of the changes in order.

Suppose Alice's copy of a contact database says that I live in Barcelona, but Bob's copy says I live
in Washington DC. Which version is correct? Without the logs or some other form of metadata,
it's impossible to know.

| First | Last    | City          |
| ----- | ------- | ------------- |
| Herb  | Caudill | Washington DC |

| First | Last    | City      |
| ----- | ------- | --------- |
| Herb  | Caudill | Barcelona |

But if this database, rather than reifying the **current state** of things, records the actual **events** that brought us to this state, it becomes trivial to sort it out. Maybe Alice's database has one entry like this:

```txt
1999-09-01 | update Herb Caudill | city: Washington DC
```

Whereas Bob's database has two entries:

```txt
1999-09-01 | update Herb Caudill | city: Washington DC
2016-02-01 | update Herb Caudill | city: Barcelona
```

Now it's obvious what's going on and what needs to happen — Alice is simply missing the most recent change, and once she has it, Alice and Bob will be synced up and up to date.

Martin Kleppmann calls this "turning the database inside out" — giving the logs primacy and treating
the current state as a derived artifact, rather than the other way around.

This turns out to be a good idea for lots of reasons. For example, you have straightforward access
to your state at any point in time, not just the present. If you're a programmer and you've used
React for a while, you might have had your mind blown a few years back by Dan Abramov's "[time
travel](https://www.youtube.com/watch?v=xsSnOQynTHs)" demo for Redux. Rich Hickey's seminal talk
"[Deconstructing the Database](https://www.youtube.com/watch?v=Cym4TZwTCNU)" explores lots of other
advantages.

The advantage we're interested in right now is how it simplifies conflict resolution, and there the
key insight is that conflicting **states** are hard to resolve automatically, whereas conflicting
**actions** can be resolved in a principled way.

### Time in a world without clocks

In the example above, you'll notice that the timestamps on the changes were essential to our ability
to sort things out. Without them, Alice and Bob wouldn't know the **order** the changes came in —
whether I lived in DC and then moved to Barcelona, or vice versa. And without knowing the correct
order of the changes, they wouldn't be able to clear up the **current value** of the city field in
my contact record.

There's a problem, though: It's not a good idea for distributed systems to rely too much on
timestamps to resolve conflicts, especially when the stakes are high. Without an authoritative
server, you don't have an impartial shared clock; and you can't trust self-reported timestamps. A
device's clock might be off. Or, less innocently, someone might be deliberately manipulating them in
order to make sure their version of things wins out.

So we need a way to keep our log of changes in the correct order, without relying on clock time.

There are a couple of ways to do this. I'm going to focus on the one I like best, which is hash
chaining. This might ring a bell if you're familiar with distributed source control systems like
Git, or with the way the blockchain works in cryptocurrencies like Bitcoin.

<aside>

A **hash** can be thought of as a fingerprint for data. A hash function takes a chunk of data of any
size, and returns a random-looking short code called a **digest** that uniquely<sup>1</sup>
identifies that chunk of data. It's impossible<sup>2</sup> to engineer a collision - that is, come
up with two inputs that give the same fingerprint. Whether the data is one password or the collected
works of Shakespeare, the hash is always the same length. If you change the source data, even by a
single letter, you get a **completely** different fingerprint. The hash is **deterministic** — given
the same input, you always get the same output.

<sup>1</sup>For all practical purposes.<br/> <sup>2</sup>For all practical purposes.

For example:

SHA512 hash of "Herb Caudill":  
`1fbbc7bb4bdb50b9ce97b1025f6530c302...`

SHA512 hash of "Hurb Caudill":  
`9f4a55639d69b6f3479f8440b2d2de2e79...`

</aside>

A **hash chain** is a sequence in which **each entry includes the hash of the entry that precedes
it**. This creates a self-verifying data structure — the relative order of the entries cannot be
manipulated, and neither can the contents of the entries.

^^TK illustration^^

In Git, these entries are called **commits**. On the Bitcoin blockchain, they represent
**transactions**. In both cases, storing changes on a hash-linked chain ensures that entries can
neither be reordered nor modified without invalidating the rest of the chain.

### Everything all at once

We still haven't gotten to how we deal with conflicts. But what is a conflict, anyway?

If Alice changes my city to Barcelona, and Bob **sees that change**, and then changes my city it to
Istanbul, that's not a conflict. These changes happened in sequential order — Alice's first, then
Bob's — and the most recent change wins.

But what if **Alice is offline** when she changes my city to Barcelona and Bob changes it to
Istanbul? That's a conflict, because it's not clear what the software is supposed to do.

Why is there no obviously right answer? Because there's no obviously right way to put the
changes in _sequential order_. We can't trust timestamps, so we can't say that Alice's change came
after Bob's, and we can't say the opposite either.

<aside>

In everyday speech, when two things happen at the same **absolute** time, we say they happened
**simultaneously**.

In computer science, when two things happen at the same **relative** time, we say they
happened **concurrently**.

</aside>

If we only have relative time, we have to think of these changes as happening "at the same time",
or **concurrently**.

Of course, not all _concurrent_ changes are in _conflict_. For example, if Alice edits my city and Bob
concurrently edits my phone number, there's no conflict. If Alice edits my city and Bob concurrently
edits someone else's city, there's no conflict. In these cases, we can put Alice's change before
Bob's, or Bob's before Alice's, and either way we get the same result.

So in the case of our contact database, the only time you have a conflict is when the _same field_
on the _same person's record_ is changed _concurrently_ by two different people. In practice,
this happens pretty rarely; but it's always a possibility, and we need to be able to deal with it.
