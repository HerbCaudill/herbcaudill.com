---
title: Seven reasons to be excited about local-first software
subtitle: Collaboration without giving up control.

description: |
  Cloud-based software has made collaboration easier, but at a cost to both developers and users.
  Could a new model for software give us the best of both worlds?

draft: false

date: '2022-01-10'
thumbnail: /images/thumbnails/placeholder.jpg
tags: software
---

Imagine you were trying to reach a mountain peak, in heavy fog, with no maps or trails. How would
you proceed?

One smart heuristic might be simply "head uphill, until you can't get any higher".

If you think about it for a moment, though, you might realize that there's a problem with this
approach. Maybe if the mountain you're climbing looks like Mt. Fuji, you're fine - but what if, like
most mountains, it includes a number of smaller peaks at different altitudes?

![](/images/posts/localfirst/mountain.gif)

If you only go up and never go down, you'll very likely find yourself in what mathematicians call a
[local maximum](TK).

And if others are also using your same mountain-climbing heuristics, you might quickly find yourself
in the ridiculous situation of competing with a bunch of other people for this same false summit.

Here's the thing, though - even if you can see higher peaks from where you are, it's not altogether
irrational to keep heading for the nearer, lower peak. After all, you're almost there. If everyone
else is there too, then the trail is well-worn so you won't get lost. Going downhill just feels
wrong - especially while others are making progress uphill.

### This is a metaphor

I think that we in software industry have ended up in a local maximum. When I say the "software
industry", I'm thinking specifically of those of us who make collaboration software: multiplayer
apps that help people work together over the internet.

In this metaphor the false summit, the local maximum, is **cloud software**, also referred to as
"web-based software" and "software as a service". My hope with this article to persuade you that
there's a higher peak out there - a better approach to creating collaboration software, which goes
by the name of **local-first software**. And I'd like to not only persuade you that this other peak
exists, but that we should be excited about it, that it's worth the additional effort to get there.

---

### From client-server and local-only software, to cloud software

Twenty or thirty years ago, if I had an important document to write — say, a term paper or a
proposal - the only real choice was to fire up WordPerfect or Microsoft Word or MacWrite on my
computer and started typing.

But what if this wasn't a solo project? What if I was working on a team? Maybe different people are
writing different sections. Maybe other people are helping with proofreading or editing.

Well, if you're old enough to remember, you'll know how this went: Before you know it everyone is
emailing each other files and you have 27 different conflicting versions, with filenames that only
grow longer and longer. One person might ask everyone to hold off on making any further changes
while they're working on the document; but inevitably at some point you would still end up
laboriously re-applying edits from one document to another.

![](/images/posts/localfirst/filesharing.gif)

Around this time, if you wanted multiplayer software, you generally had to host it yourself; so this
was mostly the province of bigger companies that had the kind of infrastructure to do this.
Accounting software, CRM tools to help sales teams work together, that kind of thing. Sprawling
"enterprise resource planning" systems intended to do everything for everyone, provided by giants
like SAP and Oracle. For the most part these were delivered as "client-server" software - the
company would host a server, and each user would install the client application, which you could
only use within the company's local network.

---

Today, instead I can use web software like Google Docs. This makes it super easy for me and my
teammates to work together on a document, without emailing files or worrying who has the latest
version.

> TK graph of SaaS replacing installed software?

The story of software over the last couple of decades is largely the story of installed software
giving way to software in the cloud. You have Google Workspace and Microsoft 365. You have project
management tools like Basecamp, Asana, Monday.com, Trello, and Jira. You have QuickBooks and
FreshBooks. For shared notes, there's Notion, Coda, and Roam. Designers have tools like Canva and
Figma. Sales teams have Salesforce, FreshSales, and Pipedrive.

All of these products have roughly the same architecture: Your data lives on the provider's server,
not in files on your computer. You have an account and you log in with a username and password. The
technical architecture involves a database layer and at least a couple of codebases — one for the
server and one for the client, which is typically delivered as a web application, and perhaps also
as native apps for platforms like iOS, Android, MacOS, or Windows.

## Why we like cloud software

I'm going to be talking about an alternative way of building software, but to be clear, **the
cloud-based model has a lot going for it**. I depend heavily on the software products I just
mentioned myself. Not only that, I'm a cloud software provider myself. My small company, DevResults,
makes web-based monitoring and evaluation software for international aid projects.

What's good about this approach?

### Users get easy collaboration

For the user, the big advantage of cloud software is having a **single source of truth**: Your data
lives in only one place, and that makes collaboration easier.

You never have to worry about upgrading your software — it's **continuously upgraded** so you're
always using the latest version.

You can **access it from anywhere**, and it's **backed up** for you — you don't have to worry about
losing data if something happens to your device.

### Providers get control over customers and their data

The advantages for the software developer are even greater. It's very convenient having everything
on your servers; it gives you a lot of **control**. It's much easier to debug, because you have
**access to all the data** and there are **fewer unknowns** regarding the environment.

Once a customer starts to depend on your software, they're kind of **locked in**. It's very
difficult for them to leave, because you've got their data. If they don't pay their bills, you can
shut off their access.

## What we've traded off

So there's a lot to like here. But everything is about trade-offs, and I think it's worth thinking
about what we traded off when we moved everything to the cloud.

### Users have given up the ability to work offline

For the **user**, the tradeoffs all have to do with the fact that our data, which used to live on
our own computer, is now inconveniently located hundreds or possibly thousands of miles away, on
someone else's computer. For starters, this means that we have to have a good, working networking
connection in order to do anything at all. If we're **offline**, or having network problems, we have
no access to our stuff.

### …and responsiveness

And our own network connection is just the beginning: Every leg of the journey between you and your
data represents a possible point of failure. And even if everything is working perfectly and every
step takes place at the maximum possible speed, which it won't, you'll still experience some
**latency** with every interaction. You're ultimately limited by the speed of light, which starts to
matter at planetary scale.

### …and ownership of our data

So the "hundreds or possibly thousands of miles away" part is inconvenient, but the "someone else's
computer" part is what's really troublesome. "Possession is nine tenths of the law", and in a very
real sense, my document on Google Docs is **not mine**, it's Google's. My project on Asana is not
mine. It lives on someone else's hardware, not mine, and if they want to, they can keep it from me.
There's always the threat of being **locked out** of my stuff because my credit card expired, or
because my product was discontinued, or the company went out of business, or just because someone
goofed up.

### … and our privacy

Putting my stuff on someone else's computers also means that I have less control over who sees my
stuff.

Once a provider starts to accumulate lots and lots of people's personal data on its servers, those
servers become an attractive target for attackers.

You have no guarantee that your cloud software company's employees aren't [rifling through your
things](http://vice.com/en/article/xwnva7/snapchat-employees-abused-data-access-spy-on-users-snaplion).

In the U.S., the fourth amendment to the constitution specifically protects my "papers and effects"
from "unreasonable searches and seizures"; and so if law enforcement wanted access to my phone or my
laptop, they would need a warrant, and I would have all the legal protections of due process. But my
stuff stored in the cloud is [not protected](https://epic.org/ecpa/): Not only can the government
require providers to hand it over with just a subpoena, but then they can issue a gag order that
prevents my providers from **even letting me know** about the search and seizure that's taking
place.

Now maybe you feel like you have nothing to hide, and you're blasé about the prospect of law
enforcement going through your stuff. If you're like me, your "papers and effects" are pretty boring
and the idea that they would be of interest to Interpol or the FBI is kind of hilarious.

But if that's the way you feel, I think it's worth thinking about the very big picture, and
reflecting on what a rare luxury it is to live in a time in history, and a place in the world, where
you generally are not worried that people in power will abuse that power. The culture and the
institutions that have made that possible aren't universal facts of life — they're human constructs,
and they're fragile, and they're not available to everyone. If you're a government whistleblower,
you can't be blasé. If you're an activist in Hong Kong, you don't have that luxury.

### As a society

And I'll say one last thing about what we as consumers and as a society have given up.

When we're talking about power, and abuses of power, at least when it comes to the government, in a
democracy, we have the rule of law and the protections of due process. If I'm accused of something,
I can get a lawyer, I can ask to see the evidence against me, and so on.

Something that's starting to worry me more and more is that we depend so much on just a few tech
companies, that they end up with the kind of power over our lives that normally we reserve for
democratically elected governments. So much is at stake if you're booted off Twitter or Google or
Amazon that these companies have what amounts to internal judicial systems to deal with various
kinds of misbehavior. But unlike the real thing, in these shadow judiciaries you have no _rights_.
Big tech doesn't have to prove anything to you, or even tell you what you're accused of.

So I think as a society, "we the people" should be worried about the quasi-governmental power that
we're conceding, little by little, to unelected, unaccountable private companies.

### Developers have taken on lots of extra complexity

So the shift to cloud software has resulted in us users giving up a lot of control to software
providers. But for software developers, cloud software has been a mixed bag as well — especially for
small startups, and for individual developers with a good idea.

Matthew Weidner makes this point vividly in [this talk](http://youtube.com/watch?v=Exr0iY_D-vw). He
asks us to imagine that we have an idea for a better recipe-sharing app.

The client application itself — the software that the user interacts with — isn't complicated: You
could code it up in a weekend.

But to turn that into a multi-user cloud-based app?

For starters, you need servers, and those cost money.

And you need a database, and a whole new codebase on the server. Before you know it, most of your
code is just about getting data from the client to the server to the database and back, and adding
the smallest new feature requires tons of soul-crushing boilerplate code.

And you need to think about user accounts, and passwords, and resetting passwords, and securing
passwords.

Suddenly this is not a weekend project, it’s a startup in search of funding — all because of the
added cost and complexity that comes with creating a cloud-based app.

### Where we are today

In sum: Cloud software has made it much easier for us to collaborate, and that's a wonderful thing.
But that has come at a cost.

We've decided that we're OK with paying $10 per month here and $25 per month there, every month of
our lives without fail until we're dead and maybe afterwards as well.

We've given up our ability work offline.

We've given up much of our expectation of privacy in our digital lives.

We've given unaccountable companies the power to decide whether or not we deserve to have access to
our own stuff.

And we've raised the barrier of entry for new software products, further entrenching the power of
the incumbent software companies.

## Is there a better way?

Maybe the value we're getting from this software is worth the cost we've paid — I'm not saying it's
not!

But I think it's worth asking: Is this state of affairs inevitable? Or is it possible to imagine
another way, that would give us the benefits of collaboration without giving up ownership of our
digital lives?

The local-first model starts with the question: **To collaborate, couldn't our devices just talk to
each other directly?**

You and I want to work together, and we both have computers. So what do we need a third party's
computers for?

After all, today's laptops are far more powerful than the beefiest servers from just a few years
ago. Even the phones in our pockets would vastly outperform the servers that the SaaS industry
started out with.

Going back to the word processing example we started out with: With good ol' Microsoft Word, I
didn't have to give up my privacy, or the ability to work offline, or the confidence that I'd still
have access to my document next year. The only reason I switched to Google Docs was because it made
collaboration easier.

But what if **my** Microsoft Word could talk to **your** Microsoft Word directly, allowing you and I
to work together on a document, Google Docs-style? We would both have the full document stored on
our devices, and the software would take care of keeping our copies synced up.

That's the vision behind local-first software: Applications that are primarily **local** to your
device — giving back the control and agency you should have over your data — but that still enable
collaboration, via peer-to-peer communication with the local applications on other people's devices.

I think that's a really exciting vision of the future — one that would get us back everything we
traded away when we switch to cloud applications, without making us give up the ability to
collaborate smoothly. The best of both worlds.

|                                                         | 💿<br/>traditional<br/>apps | 🌧<br/>cloud<br/>apps | 👍<br/>local-first<br/>apps |
| ------------------------------------------------------- | :-------------------------: | :------------------: | :-------------------------: |
| ⌚ **fast**: my data is on my device                    |             ✅              |          ⛔          |             ✅              |
| 🚙 **robust**: network optional                         |             ✅              |          ⛔          |             ✅              |
| 🕵️‍♀️ **private**: only I decide who sees it               |             ✅              |          ⛔          |             ✅              |
| 📦 **mine**: I own it and can take it with me           |             ✅              |          ⛔          |             ✅              |
| 👪 **multiplayer**: I can work with others in real time |             ⛔              |          ✅          |             ✅              |
| 📱 **multidevice**: move from laptop to phone to tablet |             ⛔              |          ✅          |             ✅              |
| 🌩 **backed up**: no worries about data loss             |             ⛔              |          ✅          |             ✅              |

But if you look around, you'll see that very little software these days works that way. Why is that?
If this is such an attractive vision, why are we still building web apps? Why did Microsoft go to
the trouble of [rebuilding Word from the ground up as a web
application](https://www.microsoft.com/en-ww/microsoft-365/free-office-online-for-the-web), rather
than just adding collaboration capabilities to the existing program?

The short answer is that as an industry, we know how to build collaborative apps using a central
server, and we really haven't figured out any other way to enable collaboration.

So if we want to build local-first applications **without** central servers, we need to understand
the jobs those servers are currently doing for us — and figure out a way to fulfill those needs
without them.
