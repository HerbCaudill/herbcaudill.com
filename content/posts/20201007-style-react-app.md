---
title: How to style React applications in 2020, as if anything mattered
subtitle: Thinking about front-end frameworks and CSS while the world burns around us

description: |
  What tools would you use to build the UI for a single 
  <a href='https://medium.com/all-the-things/the-trouble-with-saas-279694551b25'>infinitely-customizable app for everything</a>? 
  Specifically, how would you implement the visual design? I’ve spent an unreasonable amount of time 
  reading and thinking about this, and I wrote this as a way of sorting out my own thoughts about it.

draft: true

date: '2020-10-07'

caption: |
  "CSS is easy. It´s like riding a bike, which is on fire and the ground is on fire and everything is on fire because it is hell." 
  <i> —  <a href='https://twitter.com/iamdevloper/status/753716544949981184?lang=en'>@iamdevloper</a></i>

context: |
  **Note from the future:** I wrote most of this article in 2020 as my own notes on my research. Once I discovered Tailwind, I
  stopped writing and got back to work, and nearly forgot about this piece. It's now 2023, and in the interim Tailwind has gone 
  from being super controversial to being a safe, even [obvious](https://npmtrends.com/bootstrap-vs-tailwindcss) choice. So this all feels a bit like beating a dead horse at this point; but I've gone ahead and finished it and I'm posting it anyway, with the original title and date for context.
---

Recently, during Spain's second or third COVID wave, I sat down to build a very simple
React app as a demo for something I was working on, and I was immediately paralyzed trying to decide
how to style the application.

It wasn't at all important how this particular demo app _looked_, and the underlying technology used
to style it mattered even less.

Maybe it was the Difficult Times We're Living Through, but I found myself with dissatisfied with
basically every approach I'd ever used: Every UI framework, every component library, every CSS
methodology -- they all seemed to fundamentally fall short of doing what I needed.

I started out in this business as a designer, so design just matters a lot to me in general.

And I'm thinking a lot about about interfaces that users can modify or assemble from scratch using
components that can be composed with other components. So there needs to be a solid design system
underlying this that is **modular and composable**.

If the goal is for this to universal, it's not reasonable to expect the same UI esthetic to
work in every context; so everything needs to be **themable and customizable**.

And the developer experience (DX) of styling matters more than it normally would,
because ultimately I'd like for it to be easy for advanced users to extend the system by creating
new datatypes  --  along with the components for working with them. So the whole question of how you
balance customizability with keeping the design good and appealing and consistent is super
important. We want it to be flexible in all the right places, while making it easy to create
things that look great and hard to make ugly things.

This article started out as my own notes on my research. For a while, the deeper I went down the
rabbit hole, and the longer this piece got, the more unhappy I was with my options.

The good news is that I finally did find an approach that ticks all my boxes -- so much so that I went
back to work, stopped writing, and nearly forgot about this article.

You should read to the end to find out what that approach was! But let's start from the beginning.

## UI libraries

<figure class='figure-lg'>

![]($$/ui-frameworks.png)

</figure>

My first thought was to take a look at the current state of UI component libraries.

About a decade ago, I -- along with seemingly every other web designer in the planet -- went all-in
on [Bootstrap](http://getbootstrap.com).

Bootstrap was originally an internal project at Twitter, intended to reduce duplication and
encourage consistency across various parts of the application’s UI. When they open-sourced it, it
became hugely popular – to the point of becoming the default choice for new websites and web apps,
defining the visual style of the web for the better part of the decade, and causing
[some](https://www.friday.ie/blog/why-do-all-websites-look-the-same/) to
[complain](https://medium.com/@firedrop/is-it-just-me-or-do-all-websites-look-the-same-8bb166d4dc9c)
that [every website looked the same](https://www.dagusa.com/).

Bootstrap provides ready-made grids and templates, a library of individual elements like buttons,
alerts, and forms; and a handful of interactive components like dropdowns and dialogs. It's a solid
choice; DevResults still uses Bootstrap to this day.

<figure class='figure-xl'>

![]($$/buttons.png)

UI libraries vary widely in terms of how many components they offer and which ones, but they all
start with buttons. Shown here, from left to right: Material UI, Semantic UI, Ant Design, Bootstrap.

</figure>

Bootstrap is still far and away the most widely used UI framework, but there are other options that
have become popular as well:

- [**Material UI**](https://material-ui.com/) is an unofficial, community-created implementation of
  Google’s [Material Design](https://material.io/design).
- [**Semantic UI**](https://semantic-ui.com/) is a sharp, simple library that seems to be struggling
  a bit to keep up with the times.
- [**Ant Design**](https://ant.design/) is a product of Ant Financial, which I gather is the PayPal
  of the Alibaba universe. It’s very widely used in China.

<figure class='figure-xl'>

![]($$/carbon.jpg)

I've always thought IBM's [Carbon](https://www.carbondesignsystem.com/) design system was
particularly sharp, and in fact I use the [IBM Plex](https://www.ibm.com/plex/) family of typefaces
a lot, including on this site.

</figure>

## Design systems

What we’re looking for goes beyond just buttons and dropdowns, though. We’ll need other kinds of
components, and we want to make it easy to create new components that fit in esthetically.

For me, a big part of the promise of CSS has always been that you can establish a visual identity by
enforcing design constraints. So a designer creates the CSS, and developers can only pick from the
classes the designer offers.

But this leaves the designer themselves without any guiderails every time they need to add something
_new _ —  they have to try to be consistent on their own. In a large codebase, maintaining that
consistency carries a significant cognitive load, and it’s easy for things to diverge in lots of
directions. Even with a world-class design team, you can end up with a lot of unwanted
inconsistency.

Adam Wathan [catalogs some
examples](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/%23cp_embed_ZJeWBY:~:text%3DBut%2520what%2520if%2520you%2520decide%2520to%2C124%2520background%2520colors%252C%252070%2520font%2520sizes)
of the crazy profusion of styles on some well-known sites:

- **GitLab**: 402 text colors, 239 background colors, 59 font sizes
- **Buffer**: 124 text colors, 86 background colors, 54 font sizes
- **Stripe**: 189 text colors, 90 background colors, 35 font sizes
- **GitHub**: 163 text colors, 147 background colors, 56 font sizes

This is where you end up when every new chunk of CSS you write is a blank canvas; there’s nothing
stopping you from using whatever values you want.

Good design requires constraints. Grids and palettes are useful design tools _because they limit our
choices_.

What we’re looking for here is really what’s called a **design system.**

A design system says you can use these colors, these type treatments, these drop shadows, these 5
spacing increments. These are called design tokens. By composing these building blocks taken from a
limited menu of options, you can build up the rest of your styles without having to work your brain
so hard.

Many companies have open-sourced their design systems: Microsoft has [Fluent
UI](https://www.microsoft.com/design/fluent/%23/web), Salesforce has
[Lightning](https://www.lightningdesignsystem.com/), Shopify has
[Polaris](http://polaris.shopify.com), GitHub has [Primer](http://primer.style), IBM has
[Carbon](https://www.carbondesignsystem.com/), and so on.

Some of these are really internally-facing and seemingly open-sourced just for the hell of it; while
others are intended for wider adoption and customization.

<figure>

![]($$/material.gif)

Material Design is kind of a meta-design system: It has been used as the foundation of many
non-Google brands' design systems.

</figure>

Google’s “Material Design” system was my introduction to the concept, and it really straddles these
two modes: Its original intention was to unify Google’s sprawling universe of applications. But
Material embodies a set of principles that can be adapted to any graphic identity, and it has been
used as the foundation of in-house design systems for [many
organizations](http://material.io/blog/material-partner-studies) from Lyft to NPR to Zappos.

The question of how you modify an existing set of styles brings us to an extended digression on an
important topic, which is…

## The beauty and the terror of working with Cascading Style Sheets

The DevResults codebase has around 17,000 lines of our own SCSS, plus something like 6,000 lines
from Bootstrap.

I’m sure I’m not the only one on my team who has experienced a familiar sinking feeling whenever it
comes time to touch the application’s CSS. Whether the task at hand is fixing a display bug,
updating the design, or creating a new component  —  there’s a sense of dread, rooted in the fear of
breaking something  —  which in turn comes from a sense that it’s impossible to completely
understand or predict the effects of any given change.

There are definitely things that we could have done better  —  conventions we could have adopted,
systems we could have put in place, abstractions we could have abstracted. But I think this a
classic case of a software [Pit of
Despair](https://blog.codinghorror.com/falling-into-the-pit-of-success/)  —  the sort of technology
problem that **everyone blames themselves** for, when the real problem has to do with the
technology’s own built-in defaults, limitations, and
[footguns](https://en.wiktionary.org/wiki/footgun).

<figure class='figure-md figure-b'>

![]($$/two-css-properties-walk-into-a-bar.png)

There should be a German noun for the fear of breaking something in a CSS codebase. Perhaps
**_Kaskadenangst_**  —  “cascade anxiety”?

</figure>

I think it’s time for us to stop blaming ourselves. It’s not wrong to want our technology to help us
fall into the Pit of Success; we haven’t gotten here due to a lack of competence or understanding.

Case in point: [_The Guardian_](http://theguardian.com)’s web presence been an inspiration to me for
many years, with a confident and distinctive design sense that’s woven across an amazing variety of
digital contexts with remarkable consistency. If anyone knows what they’re doing with CSS, it’s
these people.

<figure class='figure-lg'>

![]($$/guardian.png)

**This is hard even for the pros:** [_The Guardian_](http://theguardian.com) has long been a leader
in digital design and typography. If they feel overwhelmed by their CSS codebase, what hope is there
for the rest of us?

</figure>

Here’s how they describe their codebase before their last update:

> At the time of writing, it has gone from 0 to 62,783 lines of Sass. That Sass generates tens of
> thousands of rules that are intended to describe a maintainable set of responses to business and
> design problems. Individually, they represent half a decade’s considered decisions made by
> skillful and dedicated engineers. In sum, though, they present **a precarious, teetering,
> maintenance nightmare**.

Now of course, working in _any_ kind of legacy code can seem opaque and feel nerve-wracking to work
with. But there are some peculiarities of CSS that make it particularly fraught.

### The perils of globalization

The "C" in CSS stands for "cascading", and the cascade is a powerful device: Changing one small rule
can can have sweeping effects. This system of inheritance and overrides makes it possible to style a
page elegantly and concisely. It’s rigorously logical and can be very satisfying to work with.

The flip side of the cascade’s power, though, is that if you have more than a handful of rules, you
can quickly end up with a network of effects and counter-effects that exceeds your ability to keep
it straight in your head.

The root of the problem is that **all CSS is global**. As Facebook engineer Christopher Chedeau
points out in this [landmark 2014 talk](https://vimeo.com/116209150), “avoid global variables” has
forever been at the top of the list of best practices for programmers, but Bootstrap 3 shipped with
600 global variables. CSS is, by its very nature, a global list of rules.

Not only do all styles exist in the same global namespace, but rules can “see” the entire DOM, and
you don’t know in advance what the DOM will contain; so it’s not possible to compute in advance what
rules might be applied in what combinations. This is not merely a difficulty, it’s a problem of
**fundamental unknowability**. This is why so many CSS codebases are, in practice, append-only: No
amount of static analysis can tell you whether it’s safe to delete any given rule.

In an article entitled [Oh No! Our Stylesheet Only Grows and Grows and
Grows!](https://css-tricks.com/oh-no-stylesheet-grows-grows-grows-append-stylesheet-problem/), CSS
guru Chris Coyier describes the lengths one team goes to: They instrument their production site to
analyze a sample of real page loads and report back which CSS selectors seem to be unused. But even
this extreme approach to dead code elimination just provides an educated guess: It’s not realistic
to test every possible page in every conceivable state of user interaction:

> I’m sure you can imagine some CSS that applies only to a select menu, for a logged-in user, with
> an expired subscription, who wants to update a credit card, in a modal window, with a form that
> displays a certain way because the card is American Express.

(And if you can’t even detect dead code, you definitely can’t think about automating optimizations
like inlining critical CSS for first load, or other forms of just-in-time CSS delivery.)

So we all approach CSS changes with trepidation, only adding and never changing or deleting, and
keeping our additions as focused as possible  —  and consequently ramping up specificity in a
never-ending arms race of specificity. Sunil Pai, another Facebook front-end engineer,
[says](https://gist.github.com/threepointone/731b0c47e78d8350ae4e105c1a83867d):

> The Facebook codebase has thousands of `!important` statements, despite being written by competent
> engineers with solid engineering practices and deep relationships with design teams.

Most programming languages have found ways to **modularize** code, so that an ordinary human only
needs to reason about one self-contained part at a time. There are ways of dealing with CSS’s lack
of modularity  —  I’ll come back to this later.

But the problem goes beyond CSS’s global scope. I’m increasingly convinced that we’ve been using CSS
the wrong way altogether, at least when it comes to building software applications that run in the
browser. This is partly due to the nature of the language, and partly due to the culture that’s
grown up around CSS.

<figure class='figure-xl'>

![]($$/zen-garden.jpg)

**A vivid illustration of the power of CSS:** The Zen Garden was hugely influential in getting
designers and developers to embrace web standards.

</figure>

### The false promise of the CSS Zen Garden

The first time I wrote an HTML page was in 1995, before CSS was a thing.

In 1996, when Internet Explorer 3 came out with the first browser support for CSS, I tried it out
with great excitement, although it didn’t work in Netscape so I knew it would be a while before I
could use it for anything real.

<figure class='figure-md'>

![](https://cdn-images-1.medium.com/max/800/0*NIk91gK-3YTXNOBd.png)

Gather around for a little history, kids.

</figure>

Around the turn of the millennium, the first websites I made for money used just a smattering of CSS
for styling. Like everyone else at the time, I used carefully sliced-up images, tucked into
elaborately nested `<table>` structures, to pull off effects like rounded corners and drop shadows.

In 2003, the one-two punch of Jeffrey Zeldman’s [Designing With Web
Standards](https://www.amazon.com/Designing-Web-Standards-Jeffrey-Zeldman/dp/0735712018) and the
[CSS Zen Garden](http://www.csszengarden.com/) changed forever the way I built web pages.

The CSS Zen Garden is a website made by David Shea, a Canadian web designer. It consists of a single
bare-bones HTML file, radically restyled in different ways simply by changing the stylesheet.
Thousands of people submitted designs. Minds were blown, including mine. The Zen Garden, I think,
left all of us trying to live up to this ideal, that you should always be prepared to swap out your
web page’s stylesheet with another. Your HTML is “content”: It’s a static, immutable, known thing.
And what we optimize for is changing out is “style”, CSS, which treats the HTML as a stable
dependency.

### A different perspective on “separation of concerns”

<figure >

![]($$/separation-of-concerns-pulp-fiction.jpg)

I dare you. I double dog dare you.

</figure>

But when’s the last time you actually swapped out a site’s stylesheet?

Some sites use this approach to offer multiple themes  —  this is how [Wikipedia’s skins
work](https://en.wikipedia.org/wiki/Wikipedia:Skin), for instance  —  but it’s an unusual thing to
do precisely because it multiplies the CSS maintenance burden. Basically, this thing that was sold
to us as a killer feature turned out to be an edge case.

In practice, my experience is that it’s very rare to make substantial CSS changes without making
corresponding HTML changes.

Philip Walton, now an engineer at Google, [observed way back in
2013](https://tympanus.net/codrops/2013/01/22/defending-presentational-class-names/%5C):

> I’ve been redesigning websites for many, many years. I’ve worked on big sites and small ones; I’ve
> worked alone and as a member of a large engineering team. And not once, in my entire career, have
> I worked on a redesign where I wasn’t allowed to alter the HTML. For me and most designers I know,
> when you redesign a site you want to change the markup. … **Markup is not content. HTML adds
> structure and semantics to our content, but it is not the content itself**. I think it’s time we
> stopped equating the two.

Your CSS and your markup are tightly coupled, because **there’s presentation-level information
encoded in the structure of your HTML**  —  the order things are in, the way they’re nested. HTML is
not pure “content” and never has been.

<figure class='figure-md'>

![]($$/presentation-vs-content.png)

**A couple of different ways of thinking about “separation of concerns”.** An HTML document mixes
content, structure, and semantics. If your data is separate from your markup  —  as it will be in
any software application  —  it starts to make more sense to treat the styling and the markup as a
single thing: a **component**.

</figure>

I think that the mental model encouraged by the Zen Garden has led us astray, by causing us to focus
on a nearly non-existent use case.

As a result we’ve instituted the wrong sort of separation of concerns. In any website or application
of any complexity, the meaningful boundary between presentation and content isn’t between files with
that end in `.html` and files that end in `.css`  —  it’s between _components_ (containing CSS,
HTML, and JavaScript) and structured _data_. You can take a given piece of data – a contact entry,
or a restaurant’s details and reviews, or a blog post – and pour it into any number of different
components.

![]($$/modular.png)

For example, a single contact record might be displayed as a row in a table, or a thumbnail, or an
editable form.

<figure class='figure-xl'>

![]($$/components.png)

**A powerful abstraction:** Components allow you to take a single element of **data** and bind it to
any number of different **presentation** layouts   —  “presentation” meaning styles and markup.

</figure>

Now _this_ is a separation of concerns that actually turns out to be super useful in practice. It’s
something developers do all the time. And that’s why we’ve all coalesced around React and other
component-centric frameworks.

### Software applications are not documents

The model of an interchangeable global stylesheet works fine for its original purpose, which is
formatting hypertext *documents*  —  where there’s a fairly limited universe of possibilities.

<figure class='figure-md'>

![]($$/pdf-about-css.png)

**Isn’t it ironic:** HTML was originally designed for publishing academic papers  —  which these
days are the one form of content that you’re **least** likely to find in HTML (including research on
HTML and CSS)!

</figure>

But today’s web would be unrecognizable to the authors of the original HTML and CSS specs. Most
significantly, we’ve turned it into a platform for serving software _applications_. In this context,
our document-related metaphors are unhelpful; and we don’t do ourselves any favors by continuing to
insist on the abstractions that made sense in that world.

It shouldn’t surprise us if the the best tools for publishing an essay or a research paper aren’t
the best tools for building an email client or a spreadsheet.

I feel like so much of the drama and controversy and hard feelings that have been stirred up in the
front-end community over the last few years could have been avoided by being clearer about this
distinction.

> ### Speaking of drama: A side note recognizing that this is, perhaps surprisingly, a really sensitive topic
>
> Before I go any further, I should acknowledge that I’ve wandered onto a topic that is flammable in
> ways that goes beyond the usual nerd debates.
>
> It might seem strange that we could get emotional over the question of how exactly the style rules
> for web pages should be written and organized. But this isn’t tabs vs. spaces.
>
> ![]($$/glory-of-cascade.jpg)
>
> Understandably, if your whole career has been about taming the cascade, you’re not going to take
> kindly to some clueless twentysomething writing the whole thing off as obsolete or misguided. When
> you’ve mastered a technology, even the driest analysis of that technology’s drawbacks can be seen
> as a personal attack.
>
> To complicate things further, there’s a gender angle to this. Front-end development has
> historically been somewhat more accessible to women, while elite brogrammers saw HTML and CSS as
> trivial and unworthy of their attention. As much of the value has shifted from the server to the
> client, it’s understandably galling to see the same dudes now saying that stylesheets are too
> complex and need to be replaced with tools from their side of the house. One could be forgiven for
> seeing it as a land grab, a hostile encroachment on a rare bit of tech territory where women have
> thrived.
>
> Kevin Ball was once the lead developer for the ZURB Foundation UI framework. In a 2018 post
> entitled “[CSS dismissal is about exclusion, not
> technology](http://zendev.com/2018/09/11/css-dismissal-is-about-exclusion-not-technology.html)”,
> he draws an analogy to the male takeover of programming as a profession in the 60s and 70s.
>
> > We’ve seen this play before. The systematic devaluation of CSS, and more, the people who use
> > CSS. The constant “mansplaining” of CSS features to women who literally are the reason it
> > exists. It’s time to stop pretending. We’re seeing a power play, trying to once again push
> > people out of the industry by pushing a particular approach to front-end development.
>
> I … I don’t know about that.
>
> There’s a legitimate point here about the immediate effects on people’s careers of a shift in
> technology. But while I can’t really speak to anyone’s motivations but my own, it seems a bit of a
> stretch to suggest that people’s complaints about CSS are actually a front for a bad-faith effort
> to perpetuate male privilege.
>
> At any rate, I know my own lived experience of nightmarish CSS codebases; and I'd like to know how
> to avoid going there again.
>
> So: Onwards.

## Reining in CSS’s global scope

The case of JavaScript might be instructive. JavaScript is another web technology that originally
used a single global scope; so it might be instructive to see how that’s played out.

Turning JavaScript into a modular language is something that the community has wrestled with for the
last decade, and we could break that process into three stages:

1.  naming conventions and other best practices;
2.  userland libraries and build-time tools (AMD, CommonJS); and
3.  modularity as a language-level feature (ES6 modules).

In the CSS world, we’re seeing the first two stages playing out, maybe with a few years’ delay
relative to JS. (The CSS specification itself is evolving rapidly, but as far as I know there’s not
been a proposal to build a module system into the language itself.)

### Naming conventions

If you don’t have proper namespacing, you can always just fake it by prepending your global variable
names with a probably-unique string, add in lots of underscores for good measure, and hope for the
best.

The [BEM](http://getbem.com/) (Block, Element, Modifier) methodology, from the Russian search engine
Yandex, was the first naming convention to gain wide adoption in the CSS community, and is still far
and away the most popular despite the subsequent appearance of alternatives like
[SMACSS](http://smacss.com/),
[OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/) and
[SUIT](https://suitcss.github.io/).

The idea is straightforward: Class names always start with a block name  —  essentially a namespace
at the component level  —  and are followed by an element name, and perhaps a modifier. Something
like this:

```text
.bio__image { ... }
.bio__name { ... }
.bio__name--hover { ... }
.article__image { ... }
.article__title { ... }
.article__title--hover { ... }
```

This works well as far as it goes, but it’s brittle. As The Guardian’s front-end team observed,

> Systems that try to contain complexity over long periods of time by **convention** will inevitably
> tend toward entropy, because one significant characteristic of convention is that it is trivially
> simple to break one.

### CSS Modules

So, the problem with conventions is that they require discipline, diligence, and consistency from
humans; while humans notoriously sloppy, lazy, and undisciplined.

Hmm. Well, that’s why we invented computers. Rather than cajole and persuade developers and then
hope against hope that they nobody screws things up, we can just give the job of naming things to a
computer.

That’s the big idea behind [CSS Modules](http://glenmaddern.com/articles/css-modules), a build-time
tool created by Australian developer Mark Dalgleish that basically automates a BEM-style prefixing
scheme. It lets you break your stylesheet up into component-level files, and then namespaces them by
prefixing them with the component’s filename. So for example, a style named `title` might be
replaced with one named `_article__title_309571057`.

### CSS in JavaScript

But what if, instead of creating a new pseudo-module system for CSS, we just used the module systems
that we already have in JavaScript?

These kinds of ideas usually just sneak up on us little by little. The whole CSS-in-JS thing is
unusual in that it went overnight from being preposterous to plausible. Nearly every article on the
topic  —  whether it’s an argument for or against, or a tutorial, implementation, or whatever  —
points back to a talk by Christopher Chedeau ([Vjeux](https://medium.com/u/46fa99d9bca4)) at a
regional JavaScript conference in Washington DC at the end of 2014. It’s worth watching in full:

<figure class='figure-md'>

<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/116209150?h=ee272a3a11&color=ffffff&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><script src="https://player.vimeo.com/api/player.js"></script>
</div>

In spite of the somewhat muffled audio, this is a really compelling presentation. I can’t imagine he went into
the talk thinking it would be such a watershed.

</figure>

The basic idea he put forward seems simple: Rather than CSS classes, you have JavaScript objects
whose names correspond to CSS properties (camel-cased, e.g. `borderRadius` rather than
`border-radius`). The object is then passed to an element’s `style` property in JSX, whereby they’re
rendered as inline styles.

```js
let styles = {
  background: 'lightBlue',
  border: '1px solid blue',
  borderRadius: 2,
}
<div style={styles}>...</div>
```

A number of CSS-in-JS libraries popped up over the following year, with widely varying approaches.
Since then, [Styled Components](http://styled-components.com) and
[Emotion](http://emotion.sh/docs/introduction) have come to dominate the field  —  and they’ve each
liberally adopted each others’ improvements and API options, so that they’re nearly interchangeable
at this point.

![](https://cdn-images-1.medium.com/max/800/0*t2yNRxE2nsk8KN_i.png)

Styles in either of these libraries can be authored using actual CSS syntax and template literals:

```js
let styles = css`
    background: lightBlue;
    border: 1px solid blue;
    border-radius: 2px;
    @:hover {
      background: darkBlue;
    }
}`
<div css={styles}>...</div>
```

Or they can be written using the same kind of objects Chedeau proposed:

```js
let styles = {
  background: 'lightBlue',
  border: '1px solid blue',
  borderRadius: 2,
  '&:hover': { background: 'darkBlue' }
}
<div css={styles}>...</div>
```

You’ll notice that we’re adding our styles to a `css` attribute instead of `styles`. The simple
approach of adding inline styles turns out to be limiting; there are things you can do with classes
—  pseudo-selectors like `:hover` or `:focus`, media queries, etc.  —  that you can't do with inline
styles. So most modern libraries convert rules to CSS classes on the fly, with generated names.

For example, here’s a glimpse behind the scenes on Twitter’s web client.

<figure class='figure-lg figure-b'>

![]($$/twitter-source.png)

(Depending on your perspective, you might think this is slick   —  or [not
so much](https://twitter.com/dhh/status/1089179428788133888)!)

</figure>

To me, a beautiful thing about having CSS in your JS is how it simplifies styling a component’s
various states. Imagine you’re styling a strip of tabs, and you want the currently active tab to be
styled differently. In BEM-flavored CSS you might have this:

```css
.tabstrip__tab {
    ...
    background: 'lightBlue';
}
.tabstrip__tab--active {
    ...
    background: 'darkBlue';
}

```

With Emotion etc. you have this:

```js
const Tab = props => {
  let styles = {
        ...
        background: props.active ? 'darkBlue' : 'lightBlue',
    }
  ...
}

```

The key insight of React and other modern rendering engines is to think of **UI as a function of
state**. In the original model, UI meant just HTML, with the CSS living on a separate, static,
global plane. But that segregation never made a whole lot of sense, and I think that’s why Chedeau’s
presentation was an epiphany for so many people. HTML and CSS are two inseparable sides of the UI
coin and it’s useful to think of them _both_ as a function of state.

## But we still need constraints

So we could use CSS modules or one of the CSS-in-JS frameworks to solve the problem of global scope.
That's a huge improvement.

But how do you go about building a **design system** that constrains our choices? Whether you love
CSS-in-JS or think it’s an abomination, it doesn’t solve the 400-colors-of-text problem.

<figure class='figure-xl'>

![]($$/theme-ui.png)

</figure>

### Theme UI

[Theme UI](https://theme-ui.com/home/) came out in 2019, and it's the first CSS-in-JS framework I
found that explicitly sets out to be the foundation of a design system. Created by Gatsby developer
Brent Jackson, it builds on his previous contributions including [BassCSS](http://basscss.com),
[ReBass](https://rebassjs.org/), and [Styled System](http://styled-system.com). It works on top of
existing CSS-in-JS libraries to constrain choices to a set of pre-established design tokens. These
are driven by a theme file, which conforms to a [theme
specification](https://theme-ui.com/theme-spec) that he advocates adopting as a standard.

```js
<button
  sx={{
    color: 'white',
    bg: 'primary',
    m: 10,
    px: 4,
    py: 2,
    fontSize: 2,
    boxShadow: 'large',
  }}
>
  Click me
</button>
```

There’s a lot to like about Theme UI. Its themes let you define color palettes, font options, and
sensible scales for things like padding or text size. In practice I’ve found it to be easy to work
with.

But it hasn’t exactly taken the world by storm. And while it says it comes with 30 pre-built
components, they're kind of a random assortment and they're mostly _very_ low-level; so you're
pretty much starting from scratch when it comes to building out the UI for an application.

## Utility-first CSS

The final piece of the puzzle for me came when I took a second look at the idea of "atomic" or
"functional" or "utility-first" CSS.

<figure class='figure-lg'>

![]($$/tachyons-demo.png)

</figure>

[Tachyons](https://tachyons.io/), originally developed by Brent Jackson's long-term collaborator
Adam Morse, was the first atomic CSS framework that I learned about. It uses a stylesheet generated at
build time using PostCSS, and has classes with names like `.pa3` (to apply a certain amount of
padding) and `.o-50` (for 50% opacity).

It’s always been common practice to use a handful of utility classes in CSS: Things like
`.float-left` or `.hidden` that often only contain a single rule, referred to in the class's name.

But Jeffrey Zeldman et al. had drilled into my very soul the principle that classes should be
**semantic** — that they should refer to the _content_ (`.author-name` or `.summary`) rather than
the _presentation_ (`.thick-border-top` or `.small-text`).

So when I first heard about Tachyons, I dismissed it out of hand. The idea of a stylesheet that
consisted entirely of utility classes seemed to make a mockery of CSS.

<figure >

![]($$/atomic-css-tweets.png)

Like CSS-in-JS before it, the idea of “atomic” or “utility-first” CSS provoked an unexpectedly
visceral response in some prominent corners of the web design community. (Dave Shea is the creator
of the CSS Zen Garden)

</figure>

But on reflection, the dogma of semantic CSS never really aligned very well with the reality
front-end development. You often want to use consistent styling for things with completely different
semantics.

<figure class='figure-md'>

![]($$/cards.png)

Is there a _semantic_ connection between these two things?

</figure>

The idea of centering everything around the semantics of the content is is fundamentally in tension
with the idea of a scalable and composable design system. In a post entitled [CSS and
Scalability](https://mrmrs.cc/writing/scalable-css/), Adam Morse writes:

> This is where we come to the crux of the problem I have with any system that requires you to map
> visual styles to components in your CSS. Content semantics have **nothing to do with visual
> styles**. When I used to build things with Legos I never thought ‘oh this is a piece for an engine
> block’ I thought ‘oh cool this is a 1x4 blue Lego and I can do anything I want with it’. It didn’t
> matter if I was building an underwater aquanauts base or an airplane  --  I knew exactly how to use
> that Lego block.

With the right set of "Lego blocks", a single stylesheet should accommodate an evolving application
without having to change much or at all. Traditional CSS has never _scaled_ in that sense: It's always
grown linearly along with markup, with tons of repetition (or worse, _almost_-repetition).

### Tailwind CSS

<figure class='figure-xs'>

![]($$/refactoring-ui.png)

Bonus tip: This is a really good book and you should read it.

</figure>

Adam Wathan, who I first encountered as the co-author of the excellent book [Refactoring
UI](https://refactoringui.com/), was thinking along these lines in 2017. In his article [CSS Utility
Classes and "Separation of
Concerns"](http://adamwathan.me/css-utility-classes-and-separation-of-concerns/), he walks us
through his evolving approach, starting with strictly semantic CSS.

He points out that we gave up the game on semantic purity a long time ago, with class names like
`.media-card` and `.stacked-form`:

> There's no pretending that `.stacked-form` is any more "semantic" than `.align-right`; they're both
> named after how they affect the presentation of the markup, and we are using those classes in our
> markup to achieve a specific presentational result.

The crux of his argument is that "separation of concerns" between HTML and CSS is beside the point:
They're both concerned with presentation. The real question is whether your CSS depends on your HTML
(which defines arbitrary class names that the CSS needs to reference), or your HTML depends on your
CSS (which defines a limited set of class names that the HTML needs to use). The first way, your
HTML is seen as fixed, and can be used with any CSS, à la Zen Garden. The second way, your CSS is
fixed, and can be used with any HTML. And he asks:

> For the project you're working on, what would be more valuable: restyleable HTML, or reusable CSS?

This seems like an easy choice to me. Outside the artificial confines of the CSS Zen Garden,
approximately _nobody_ has ever redesigned a website by writing a new stylesheet for the existing
markup. But while chasing that fantasy, we've given up the ability to **reuse our existing CSS
classes**, which would be far more valuable. As Adam Morse writes (emphasis mine):

> When I read about or listen to ideas on how to scale an app’s CSS  —  most of the talk is about
> how to write CSS. The real way to scale CSS, is to **stop writing CSS**.

With utility classes, not only are you able to "stop writing CSS", but -- as a side benefit -- you get
the _constraints_ that you need to implement a design system:

> You could try and enforce consistency through variables or mixins, but every line of new CSS is
> still an opportunity for new complexity; adding more CSS will never make your CSS simpler.
>
> If instead, the solution to styling something is to apply existing classes, all of a sudden that
> blank canvas problem goes away.
>
> When everyone on a project is choosing their styles from a curated set of limited options, your
> CSS stops growing linearly with your project size, and you get consistency for free.

The approach he ends up with is one that, like Tachyons, almost exclusively relies on utility
classes like `.p-2`, `.text-xs`, and `.bg-warning`.

At the end of this article, he mentions that he's open-sourced his framework and called it [Tailwind
CSS](https://tailwindcss.com/).

I was intrigued by Tailwind, but still very skeptical: This was really not what I thought I was
looking for. It went counter to the religion of web standards that I had internalized over nearly two
decades. The [white-hot wrath](https://alistapart.com/article/cult-of-the-complex) of [Jeffrey
Zeldman's disapproval](https://www.zeldman.com/2017/01/03/kiss-my-classname/) was making me sweat
from 6,000 kilometers away.

<figure>

![]($$/zeldman.jpg)

Jeffrey Zeldman is not amused by our desire for a better life.

</figure>

But I actually _did_ think it was my job to make things easier on myself and my fellow developers,
if I could. And I had read somewhere that Tailwind was the sort of thing you had to try out to
understand. So I took Tailwind out for a spin, expecting to hate it.

I've never looked back.

The first thing I noticed was how _ergonomic_ it is to work in Tailwind.

You probably never noticed what a drag it is to have to waste brain cycles _choosing names for
classes_. How much of your life has been wasted coming up with single-use class names like
`.card-details__inner-wrapper--selected`? That's a useless stupid abstraction and it's not worthy of
any more of my short time on earth. In Tailwind it doesn't require a millisecond of thought: You
just make an anonymous `div` and slap a couple of self-explanatory classes on it.

The clarity and simplicity of having the styles right there in front of you, in line with the markup
they're affecting, is a breath of fresh air. Even when you're starting with a blank slate, it's a
significant cognitive burden to keep track of what styles in this file apply to which elements in
this other file: The constant mental effort that this context-switching requires is something that
you underestimate until you're freed from it. And as we've noted, this mental burden only grows and
grows as your stylesheets grow and proliferate and contradict each other, until it becomes a dark,
anxiety-producing thing that makes your life substantially worse.

With Tailwind, you never have to wonder about the scope of your changes, or worry about unintended
effects. No more knocking over a bar stool in a completely different bar.

<figure class='figure-lg'>

![]($$/tailwind-tooling.png)

Tailwind's editor tooling is excellent -- the official VS Code extension provides inline
autocompletion for the full set of utility classes, complete with color previews.

</figure>

The experience of customizing Tailwind was such a revelation. In Bootstrap, with its _billions and
billions_ of global variables, the process of applying your own design choices felt like a
never-ending battle against the tide. With Tailwind, I felt in control. I tweaked the colors, chose
some fonts, and from then on I was picking from a reasonable set of options, rather than constantly
struggling to override someone else's defaults.

Beyond choosing fonts, colors, size and spacing scales, and so on, the depth of Tailwind's
customizability blew me away. The config file gives you full access to the underlying machinery, so
for example if you need utility classes that Tailwind doesn't include, you can have it generate
whatever you want.

Tailwind is still a _CSS_ framework, and that shows in several respects that make it a big
improvement over CSS-in-JS frameworks like Theme UI or Styled Components.

For one thing you're able to use its utility classes as building blocks in a regular stylesheet,
using the `@apply` directive. So you get the consistency benefits of your design tokens whether
you're styling a React component, or writing a traditional CSS style definition.

```css
h2 {
  @apply text-xl font-bold font-serif my-4 border-b-2 border-black;
}

.button {
  @apply rounded-full border border-primary px-5 py-2;
}
```

That turns out to be important for a couple of reasons. First, as we saw earlier, traditional
CSS stylesheets make total sense for _documents_, and that extends really to any long body of text,
like a blog post. These are often stored in Markdown format anyway, so don't control the HTML and
you have no choice but to style your headings, lists, links, blockquotes, etc. using a stylesheet.

There are also situations where a CSS abstraction makes more sense than a component abstraction. For
example, you might want a button-like style that you can apply to both `<button>` and `<a>`
elements. You _could_ make a polymorphic `<Button>` component that encapsulates the styling and is
able to return either of those tags, but I've gone down that road and let me save you the trouble.
It's much easier to just write `<button class='button'>` and `<a class='button'>`.

CSS-in-JS systems also struggle with essential CSS features like media queries and element states
like `hover` and `focus`, and are forced to fake it in JavaScript. Since Tailwind is just CSS at the
end of the day, it doesn't have this problem. As a bonus, Tailwind's shorthand is ergonomic and easy
to read and write:

```html
<!-- Darker background on hover -->
<button class="bg-primary-500 hover:bg-primary-700 ...">...</button>

<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

[Tailwind UI](https://tailwindui.com) is Tailwind's answer to the component libraries offered by
frameworks like Bootstrap or Semantic UI.

<figure class='figure-lg figure-b'>

![]($$/tailwind-ui-buttons.png)

Tailwind UI gives you lots and lots of thoughtfully designed copy-and-paste examples of markup using Tailwind CSS for
common application and website components.

</figure>

It's a library of professionally designed components that goes beyond the basics of buttons,
dropdowns and modals, to include fully fleshed-out examples of common application UI requirements
like sign-in forms and dashboards; marketing website elements like pricing pages and logo clouds;
and ecommerce components like shopping carts and checkout forms. A few components are free, but full
access requires a paid account; this in turn supports ongoing development of the open-source
framework, and has allowed Adam Wathan to quit his day job and work on Tailwind full-time.

Most of the Tailwind UI components are just static HTML markup with curated CSS classes, which you
copy and paste into your project and customize as needed.

<figure class='figure-lg'>

![]($$/headless-ui.jpg)

Headless UI finally solves the problem of interactive components that are tightly coupled to a
specific visual style.

</figure>

For more complex interactions requiring JavaScript, [Headless UI](https://headlessui.com/) is an
open-source set of unstyled components designed to be used with Tailwind. Like [Reach
UI](https://reach.tech/) and Adobe's [React Aria](https://react-spectrum.adobe.com/react-aria/),
it's intended to prioritize accessibility. Available for both React and Vue, each component is
shipped as a set of composable parts. For example, here's the autocomplete-style `Combobox`:

```jsx
<Combobox value={selectedPerson} onChange={setSelectedPerson}>
  <Combobox.Input onChange={event => setQuery(event.target.value)} />
  <Combobox.Options>
    {filteredPeople.map(person => (
      <Combobox.Option key={person} value={person}>
        {person}
      </Combobox.Option>
    ))}
  </Combobox.Options>
</Combobox>
```

These elements can be put together in a variety of different ways, styled any way you want, and even
interwoven with whatever HTML markup you need. This is a vast improvement over the
take-it-or-leave-it components from libraries that I've used in the past, which have invariably been
difficult or impossible to restyle and customize.

### Unexpectedly, the holy grail

I'm as surprised as anyone to find myself here: While Tailwind maybe wasn't the sort of solution I
thought I was looking for, it's definitely the solution I needed. It checks all my boxes, and then
some; and at this point it's hard for me to imagine using anything else.
