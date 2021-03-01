---
title: Alice and Bob in wonderland
subtitle: Establishing trust in the strange world of peer-to-peer collaboration

description: |
  It's taken me a while to wrap my head around how security might work in a completely
  decentralized, peer-to-peer application. I'll dig into the big questions around local-first
  authentication and authorization and explain how I've approached solving these problems in a new
  library, <a href='https://github.com/local-first-web/auth'>@localfirst/auth</a>.

date: '2021-02-28'

thumbnail: /images/posts/trust/trust-thumbnail.png
image: /images/posts/trust/trust.png
caption: '"It would be so nice if something made sense for a change.” <i>— Lewis Carroll, Alice in Wonderland</i>'
tags: software
draft: true
---

For a developer, entering the local-first world can be disorienting; our understanding of how things
normally work is often turned upside down.

For me, the question of peer-to-peer **security** in particular at first seemed straightforward; but
the more I thought about it the trickier it got. Now I feel like I have a pretty good grasp on it
again, but I've had to reconsider what we really mean, _like really MEAN_, when we talk about
"permission" or "trust" or "identity".

By "security", we might mean a few related but different things:

- **Authentication:** Alice needs to be sure that messages and changes that **say** they come from
  Bob actually **did** come from Bob
- **Authorization:** Alice needs to be sure Bob can only see what he's allowed to see, and do what
  he's allowed to do
- **Encryption:** Alice and Bob need to be sure Eve can't snoop on what they're saying and doing

When all of your shared stuff lives on a server, authentication and authorization are
well-understood problems with lots of off-the-shelf solutions to choose from. The server acts as a
gatekeeper between users and the data. If Bob can't convince the server that he's really Bob, well
then the server won't let him in. The server knows what Bob's allowed to see and do, and it simply
won't let him see data he's not allowed to see, or change it in unauthorized ways.

In practice, what this means is that we rely on well-known technology companies — Google, Apple,
Microsoft, etc. — to **vouch for us** in our interactions with each other.

This is one of those situations that seems unremarkable until you really start thinking about it.
How weird is it that the role of certifying identity has fallen on **consumer brands**, as opposed
to, say, the government or an NGO like ICANN?

This state of affairs wasn't inevitable, and maybe it doesn't have to be that way going forward.
Rather than relying on tech giants, governments, or any centralized organization to vouch for us, is
there a way for us to **vouch for ourselves**?

## Down the rabbit hole

<aside>

If the mere mention of crypto skeeves you out by association with bitcoin bros, I get it. Hear me
out. I can't promise that I _won't_ say the word "blockchain", but I'll try to keep this grounded
in reality.

</aside>

When you put it that way, it becomes obvious that the way forward is going to involve cryptography —
specifically, public-key cryptography.

But the details of how we solve these problems with crypto are still fuzzy. Let's list some of the
questions that we might have at this stage:

1. **Peer authentication:** Without a server to vouch for his identity, how does Alice know it's
   really Bob at the other end?

    <aside>

   If you want to get straight to the point, you can hover to show a brief summary of the solution
   I'll propose for each of these problems.
    </aside>

   <span class='spoiler'>**A:** We use a **signature challenge**: Alice creates an identity challenge
   document for Bob to sign, and checks his signature against his public signature key </span>

1. **Permissions management:** Without a server to keep track of group membership and permissions,
   how can Alice add and remove team members, and limit what they can and can't do?  
   <span class='spoiler'>**A:** All changes to the group's membership and permissions are recorded as a
   sequence of signed and hash-chained changes called a **signature chain**. Every group member keeps
   a complete replica of the signature chain and can validate other members' actions independently.
   All authority can be traced back to the group's founding member.</span>

1. **Key management:** To encrypt anything or use digital signatures, you need to know each other's
   public keys; but how can that happen if you don't have a trusted, centralized key server?  
   <span class='spoiler'>**A:** New members are invited using a **Seitan token exchange**, which is
   basically Trust on First Use (TOFU) hardened with the use of an invitation key. </span>

1. **Read authorization:** How can you keep some users from seeing sensitive information if each user
   has a complete copy of the data?  
   <span class='spoiler'>**A:** We encrypt sensitive data for multiple users using
   **lockboxes** (encrypted keys). </span>

1. **Write authorization:** How do you prevent unauthorized users from modifying things they're not
   allowed to modify?  
   <span class='spoiler'>**A:** Since all users have the full signature chain and can use it to compute the
   current state of the group's membership and permissions, each user can independently determine
   whether or not to accept another member's changes as valid. </span>

1. **Synchronization and concurrency:** How does everyone stay up to date with changes to the group's
   membership and permissions? What happens when two admins make concurrent changes?  
   <span class='spoiler'>**A:** </span>

These are all tricky problems. Some of them have fairly well-understood solutions; others are closer
to the cutting edge of academic research. I’ve spent a lot of time over the last few months trying
to understand the landscape, and to create TypeScript implementations of the best available
solutions to each piece of the puzzle. The result is a library called `@local-first/auth`, which I
hope brings it all together to make it easier to create secure local-first collaboration
applications.

Let's look at each of these in more detail, and let's start reorient our thinking around **trust**
in a world where you don't have a server to enforce the rules.

## Peer authentication

### How can we be sure who we're talking to?

<aside>

If you're not clear on the details of public-key cryptography, or you'd like a refresher, I've written
a summary of what I've learned on the topic over the last year or two. LINK TODO

</aside>

When my web browser is talking to Amazon's, I know it's really Amazon because I typed in `amazon.es`
(and I trust the DNS system). Amazon's servers knows they're talking to me because I gave them the
email address and password they have on record for me.

Now imagine someone tries to connect directly to Alice's computer. They say they're Bob. But how
does Alice know they're not, Eve, impersonating Bob?

The most straightforward solution I've found here is a **signature challenge**.

<figure class='figure-md'>

![](/images/2021-02-28-18-25-46.png)

This isn't exactly how it works, but it gives the basic idea.

</figure>

As long as Alice knows the public half of the signature key Bob's using, she can validate Bob's
signature of any piece of data. So we just need to get Bob to sign something.

Bob **could** just show up with a signed document that says `Hi, I am Bob`. But if that was the only
evidence we required, then anyone Bob authenticates _to_ could just keep a copy of that document
around and use it to impersonate him.

So we need to make sure that the document maybe-Bob is signing is **unique** and **unpredictable**:
Maybe-Bob should have no way of knowing what the document will contain, so they can't just reuse a
signed document they've seen.

That means that we need a multi-step protocol in order for Alice and Bob to authenticate each other.
Here's how this works in `@localfirst/auth`:

1. Bob connects to Alice, and sends an **identity claim** asserting that he is Bob.
2. Alice responds with an **identity challenge** — a document that repeats back Bob's identity
   claim, and adds to it a **timestamp** and a **random nonce**.
3. Bob responds with an **identity proof** — a digitally signed copy of the challenge.
4. Alice validates Bob's signature against the original challenge document, using Bob's public
   signature key. If it checks out, she responds with an **identity acceptance** message indicating
   that she's convinced of Bob's authenticity.

If you're already asking "Yeah, but how does Alice know Bob's public key?" then congratulations,
that's exactly the right kind of question to be asking at this point in the proceedings. We'll get
to the answer in a moment. But first let's introduce an important piece of the puzzle, which is the
signature chain.

## Permissions management

### Where do rules come from?

In the absence of a server, the group **rules** themselves have to be passed around from client to
client. Who's a member, who's not, and who's allowed to do what — most importantly, who's allowed to
change the rules — all that information has to be replicated across multiple devices, just like the
data that the team is collaborating on. But **how do you know who to trust about what the rules
themselves are?**

<aside>

You might point out that this is not very democratic, but that's OK because the only thing at
stake here is the ability for members to communicate with each other. If Dwight is the only admin
and he is being a despot, there's nothing stopping everyone else from starting a new group without
him, and subsequently declining to communicate with him. This is analogous to how the **right to
fork** keeps open source maintainers from wielding power tyrannically.

</aside>

The key insight here is that **all authority can be traced back to the group's founding member**.

Suppose Alice creates a group. At that point, she is the group's only member and the group's only
admin. Now she adds Bob, Charlie, and Dwight, and she makes Bob an admin. Bob in turn makes Dwight
an admin.

Now suppose Dwight removes Charlie from the group. How do I know that's a legitimate change? Well,
if I look back through the history of changes, I can see that Dwight was made an admin by Bob; and I
can see that Bob was made an admin by Alice. Alice's authority is a given, since she created the
group. So Dwight's admin rights are legitimate because they can ultimately be traced back to Alice.
This works the same way no matter how long ago the group was created, no matter how much turnover
there is, and whether or not Alice is even a member any more.

<aside>

It's not a blockchain, I swear!

</aside>

In practice, this is implemented with a **signature chain**: Each link in this chain contains **a
single change to the team's membership or roles**: adding a member, removing a member, promoting a
member to admin (or another role), or demoting a member. **Each link contains a cryptographic hash**
of the preceding link; and **each link is digitally signed** by the member making the change (who
has to be an admin at that point in time). The first link, the **root** of the chain, marks the
creation of the group and by definition adds the founder to the group as an admin.

Any member can then reconstruct the group's current membership and roles from the signature chain.
Given the same chain, two members will always arrive at the same state. And given a new link, any
member can independently determine whether it's valid or not, and come to the same conclusion as
every other member.

## Key management

### Where do keys come from?

<figure class='figure-xs'>

![](/images/posts/trust/2021-02-28-17-30-41.png)

This is what [my public PGP key](https://keybase.io/hc3/pgp_keys.asc?fingerprint=33fe890a032e2915863b43f1cdd09cf0755686ec) looks like.

</figure>

Now we can return to the question of public keys and how we associate them with individual
identities.

Remember, the great thing about public key encryption is that **Alice and Bob don’t need to share a
secret** in order to encrypt messages for each other: they just need to know each other’s public
keys.

So **how does Alice find out what Bob‘s public key is?** For that matter, **how does Alice know what
her own public key is?** Where does one get a keypair anyway, AT THE KEYPAIR STORE?

The problem of linking identities to public keys — known as the public key infrastructure (PKI)
problem — doesn’t seem like it should be a show-stopper, but it’s been one of the biggest obstacles
to widespread adoption of encryption.

The most obvious solution is to have some trusted party keep a directory of people and their public
keys, and that’s totally a thing that exists. The **certificate authorities** (CAs) that make secure
`https` connections possible are an example: The SSL certificates that they issue are just documents
that link a domain to a public key, digitally signed by the CA. (Browsers and operating systems come
with a set of trusted CAs' public keys built-in.)

Some big companies have their own certificate authorities. So do some governments: Here in Spain, I
was issued a certificate to install in my browser, which allows me to transparently authenticate to
government websites and sign officially documents digitally.

But we’re trying to do this without depending on centralized services.

An alternative — and decentralized — solution is for people just to share their own keys directly
with each other. This was the approach taken by PGP ('Pretty Good Privacy'), the first encryption
toolset intended for ordinary users, in the 1990s. People would put their public keys on their
websites and in their email signatures. Apparently there were [key signing
parties](https://en.wikipedia.org/wiki/Key_signing_party) where people exchanged and signed each
other's keys.

This approach required a lot of in-person interaction, and it was all just too geeky and weird for
99.9% of the population; so it never took off.

[Keybase](https://keybase.io/) had the clever idea of getting people to associate their public keys
with their identities on public sites.

<figure class='figure-2up figure-b'>

![](/images/posts/trust/2021-02-28-17-35-23.png)

![](/images/posts/trust/2021-02-28-18-12-11.png)

I've "verified myself" by posting machine-readable statements on
[Twitter](https://twitter.com/herbcaudill/status/1252295765055156229),
[GitHub](https://gist.github.com/HerbCaudill/1a826885eacfebb60a6ff421d57a9e37), and
[Reddit](https://www.reddit.com/r/KeybaseProofs/comments/g4xt1n/my_keybase_proof_redditherbcaudill_keybasehc3/)

</figure>

It's a clever idea, but again, probably too nerdy for the average civilian.

### What PGP got wrong

What sets apart the current crop of secure messaging apps — apps like WhatsApp or Telegram or
Signal, which were the first to bring end-to-end encryption to the masses — is that they make
encryption **transparent** to the user.

It's not just that people are scared off by keys that looks like screenfuls of gobbledygook.
Fundamentally, PGP's mistaken assumption was that "our" keys would become stable components of our
digital identities, like our email addresses or our telephone numbers, and that we would manage them
ourselves.

Instead, **what we want is to not think about our keys at all**. As [Peter Van
Hardenberg](https://twitter.com/pvh), CEO of the Ink & Switch research lab, has said to me more than
once: "If the user sees an encryption key, you've already lost."

|                         | hasn't taken off                                                                                     | seems more promising                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **who manages keys**    | we manage our keys                                                                                   | computers manage our keys for us                                                                                                                  |
| **who has keys**        | individual humans or entities have keys                                                              | devices have keys                                                                                                                                 |
| **who sees keys**       | our keys are visible to us                                                                           | we never see our keys                                                                                                                             |
| **who shares keys**     | we explicitly share our public keys with other humans                                                | our devices share public keys with each other as needed                                                                                           |
| **how stable are keys** | keys are stable components of identity, like email addresses or phone numbers                        | keys are ephemeral and created on the fly                                                                                                         |
| **when are keys made**  | we generate keys once and provide the same private keys to multiple applications on multiple devices | keys are created for us as needed on each device by each application; they never leave that device, and are never shared with another application |
| **examples**            | PGP, various forms of PKI                                                                            | WhatsApp, Signal, Telegram                                                                                                                        |

### TOFU considered squishy

WhatsApp, Signal, and others have solved this problem using a approach called "Trust on First Use",
or TOFU.

Here's how the idea behind TOFU: - When Alice invites Bob to communicate with her, she just
**trusts** that the **first** person to show up saying they're Bob **is**, in fact, Bob. - Bob and
Alice exchange their public keys on that initial connection. - From that point on and for all future
connections they can use those keys to authenticate and encrypt messages to each other.

it seems safe enough to trust _just that one time_ that Bob isn't being impersonated. After all,
what are the chances that an adversary would know that Alice was going to invite Bob at that precise
moment, and would manage to show up before Bob himself did? Anyway in most scenarios, the worst that
could happen is that the real Bob shows up after the fake Bob, and Alice realizes that fake Bob
fooled her and is able to straighten it out.

The problem, though, is that **in practice TOFU doesn't happen just once**.

To understand why, it's worth clarifying that when we say "Bob" or "Alice" we should really be
saying "Bob's iPhone 10" or "Alice's new Dell laptop". As the table above makes clear, these keys
don't pertain to the individual, they're created by a particular application on a particular device.

So what happens when Bob gets a new phone, or Alice reinstalls the software on her laptop?

What happens is an "account reset", and at that point we're back to TOFU —- except that now, an
impostor might have engineered the reset, and it's much more plausible that they would be able to
exploit it.

And although a reset might not happen that often for any given individual, as the number of
participants goes up so does the frequency of resets:

> In group chats, the situation is even worse. The more people in the chat, the more common resets
> will be. In a company of just 20 people, it'll happen every 2 weeks or so, from our estimate. And
> every person in the company will need to go meet that person. In person. Otherwise, the entire
> chat is compromised by one mole or hacker.

That quote is from an [article](https://keybase.io/blog/chat-apps-softer-than-tofu) by the Keybase
team, in which they make the case against TOFU and present their solution. I've ~~stolen~~ adapted
several ideas from Keybase's approach: The signature chain idea is theirs, and so is the
invitation process I've implemented, which they call the **Seitan token exchange**.

<figure class='figure-xs'>

![](/images/2021-02-28-18-28-53.png)

</figure>

Rather than invite Bob and then accept the first person who shows up saying they're Bob, Alice
gives Bob a secret key when she invites him.

Now, we could just store that secret key on the signature chain, and ask Bob to repeat it back to
us when he's ready to join the group. But we'd prefer not to store unencrypted secrets on the
signature chain. Remember, everyone in the group gets a full copy of the chain, so it's "public"
within the group. We'd rather it not be possible for another group member to co-opt Bob's
invitation and impersonate him, as bizarre and unlikely as that scenario might be.

So rather than use the secret key directly, we **use it as a seed** to generate a single-use
keyset, with public and private signature keys. Here's how that works:

- Alice generates a **secret invitation key** and gets it to Bob, perhaps by emailing him a special
  invitation link.

- Alice uses the secret key to generate a keyset. She adds an invitation entry to signature chain,
  containing the **public signature key** from that keyset.

- On Bob's side, he uses the secret key to independently generate the same signature keypair. He
  uses the private key to sign a document that serves as **proof of invitation**.

- Now Bob can show that proof to any other group member — it doesn't have to be Alice, or even an
  admin — and they'll have all the information they need to confirm that this is indeed the Bob that
  Alice invited.

As soon as Bob joins the group, the first thing he does is to generate a new random keyset, which
will replace the ephemeral ones generated from the invitation key. He posts the new public keys on
the signature chain.

Now anyone in the group who wants to know Bob's public keys can get them from the chain. (Alice's
public keys are also in the chain, in the root link.) Et voilà: No key parties, no PKI, no TOFU, and
yet we're off to the races with public-key encryption.

<div class='caption'>

> If you're very sharp, at this point you might be thinking that I'm trying to pull the wool over your
> eyes by using a not-so-secure channel to bootstrap a secure one.
>
> I hope you'll at least grant me that if Alice wants to collaborate with Bob using our shiny new
> local-first software, **at some point** she has to communicate with him using some **other**
> channel, if only to send him a URL or tell him what to install. It's a small step from there to
> include a secret key in the URL.
>
> If this is a high-stakes scenario where we're targeted by active adversaries, we'll want to be very
> careful about using a trusted encrypted channel to send the invitation.
>
> In most cases, though, something like email or text is "secure enough". Keep in mind that this
> pre-existing side channel just needs to be trusted for as long as it takes Alice to invite Bob and
> for Bob to use the invitation to join. Once that's happened, the secret key is of no use to anyone
> else.

</div>

## Read authorization

## Write authorization

### "Don't trust the client" when there's nothing but clients

When you're creating a traditional web app, you learn early on that **you can't trust what's coming
from the user's browser**. You have no control over what happens on the client: A malicious user
could be running a modified version of your web app, or could be tampering with the data that it
sends your server. So it's not enough to implement permissions on the client. Suppose your app
checks whether a user has permission to modify a certain field; it's not enough for the app's UI to
stop them: You still have to check their updates when they get to the server, to make sure they
haven't bypassed your rules by tampering with the payload.

In a peer-to-peer world, there's nothing **but** clients — so you can't trust anyone. That means
that every peer needs to check the information they get from other peers against the team rules. A
traditional web app can just assume that whatever the server tells them is legit; a peer-to-peer app
can never let its guard down and has to treat every bit of data it gets as potentially malicious.
**So every client has to know what the rules are, and enforce them with every message received. **

What happens if a rogue peer sends changes that break the rules? **Everyone else simply ignores
them**, the same way the server would ignore illegal changes from a rogue client.

### Tired: Permission. Wired: Attention.

This requires another inversion of our usual thinking about **permission**. We can't stop our peers
from doing whatever they want on their own devices. The software we write might

: Rather than having a central authority enforce your
rules, and then passively accepting anything blessed by the server, we all have to continuously
enforce the rules **by choosing who we will listen to and who we will ignore**, and which changes we
will accept and which ones we will disregard.

## Synchronization and concurrency
