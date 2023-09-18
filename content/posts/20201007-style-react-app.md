---
title: Six ways to style React applications in 2020, as if anything mattered
subtitle: Thinking about front-end frameworks and CSS while the world burns around us

draft: true

date: '2020-10-07'

caption: '"CSS is easy. It´s like riding a bike, which is on fire and the ground is on fire and everything is on fire because it is hell." <i>— iamdevloper</i>'
---

So, I’ve been thinking a lot lately about how one might go about building the UI for a single [infinitely-customizable app for everything](https://medium.com/all-the-things/the-trouble-with-saas-279694551b25). Specifically, how the visual design would be implemented.

I’ve spent what feels like a ridiculous amount of time just reading and thinking about this, and I’m writing this as a way of sorting out my own thoughts about it.

## Why? 

Let’s start with some reasons why I feel this is so important:

- We’re starting with a more-or-less **clean slate**, and we want to get things as right as possible.
- I started out in this business as a designer, so **design just matters a lot** to me in general.
- The subtleties of making this app **appealing** are a big part of what will make or break it.
- Since the goal is for this to universal, it’s not reasonable to expect the same UI esthetic to work in every context; so instances of the app need to be **themable.**
- This is all about interfaces that users can modify or assemble from scratch using components. Components can be composed with other components. So there needs to be a solid design system underlying this that is **modular** and **composable**.
- The **developer experience** (DX) of styling at the code level matters more than it normally would, because ultimately I’d like for it to be easy for advanced users to extend the system by creating new datatypes — along with the components for working with them. So the whole question of how you balance customizability with keeping the design good and appealing and consistent is super important. We want it to be flexible in all the right places, while making it easy to create things that look great and hard to make ugly things.

### The case for thinking about developer experience

On that last point, a brief sidebar: There’s been a bit of a backlash lately against optimizing for developer experience, especially to the extent that there are trade-offs between DX and UX.

This project blurs the line a bit between users and developers, so I feel like the emphasis on DX is justified.

But I think it goes a bit beyond that: After all, if you take the idea of improving the the DX for some task to the logical extreme, what happens is the task becomes something that _doesn’t require a developer at all._ This in turn inches us closer to the promised land of [end-user programming](https://www.inkandswitch.com/end-user-programming.html).

> No user should have to put up with the arcane programming environments that we professional programmers have to endure on a daily basis. Then again, we shouldn’t have to either! Which is why the goal of software should not be to build machines, but to build pleasing, accessible programming environments that delight and inspire our users.  <i>— [Paul Chiusano](https://pchiusano.github.io/2013-05-22/future-of-software.html)</i>

<figure class='figure-lg'>

![]($$/ui-frameworks.png)

</figure>

## UI frameworks

My first thought was to take a look at the current state of UI component libraries.

Developers can save a lot of time by building on top of an open-source library for UI components, rather than creating their entire user interface from scratch. A UI library typically provides ready-made grids and templates for laying out the screen, as well as individual elements like buttons, alerts, and forms. Libraries also typically include any JavaScript needed to make interactive things like dropdowns and dialogs work.

For example, for years DevResults has used a library called [**Bootstrap**](http://getbootstrap.com).

Bootstrap was originally an internal project at Twitter, intended to reduce duplication and encourage consistency across various parts of the application’s UI. Twitter released Bootstrap to the public in 2011. It became hugely popular – so much so that it became the default choice for new websites and web apps, and it defined the visual style of the web for the better part of a decade.

<figure class='figure-xl'>

![]($$/buttons.png)

UI libraries vary widely in terms of how many components they offer and which ones, but they all start with buttons. Shown here, from left to right: Material UI, Semantic UI, Ant Design, Bootstrap.

</figure>

Bootstrap is still far and away the most widely used UI framework, but there are other options that have become popular as well:

- [**Material UI**](https://material-ui.com/) is an unofficial, community-created implementation of Google’s [Material Design](https://material.io/design).
- [**Semantic UI**](https://semantic-ui.com/) is a sharp, simple library that seems to be struggling a bit to keep up with the times.
- [**Ant Design**](https://ant.design/) is a product of Ant Financial, which I gather is the PayPal of the Alibaba universe. It’s very widely used in China.

If you look through these libraries’ websites, they all _say_ somewhere that their components are accessible. But some of them are built from the ground up with accessibility in mind, while [others seem to treat it as an afterthought](https://darekkay.com/blog/accessible-ui-frameworks/). Accessibility isn’t a yes-or-no proposition — there are degrees, and it’s really hard to get it all right.

One approach is to separate out the styling from the interactivity. For example, [**Reach UI**](https://reach.tech/) is an accessibility-first library that that provides bare-bones implementations of UI patterns like dialogs and autocomplete, with the expectation that you’ll provide your own styling.

Most libraries, though, come with their own distinct esthetic. They’re all customizable to a greater or lesser extent, and they vary widely in their approach to making that possible.

<figure class='figure-xl'>

![]($$/carbon.jpg)

</figure>

## Design systems

What we’re looking for goes beyond just buttons and dropdowns, though. We’ll need other kinds of components, and we want to make it easy to create new components that fit in esthetically.

For me, a big part of the promise of CSS has always been that you can establish a visual identity by enforcing design constraints. So a designer creates the CSS, and developers can only pick from the classes the designer offers.

But this leaves the designer themselves without any guiderails every time they need to add something new — they have to try to be consistent on their own. In a large codebase, maintaining that consistency carries a significant cognitive load, and it’s easy for things to diverge in lots of directions. Even with a world-class design team, you can end up with a lot of unwanted inconsistency.

Adam Wathan [catalogs some examples](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/%23cp_embed_ZJeWBY:~:text%3DBut%2520what%2520if%2520you%2520decide%2520to%2C124%2520background%2520colors%252C%252070%2520font%2520sizes) of the crazy profusion of styles on some well-known sites:

- **GitLab**: 402 text colors, 239 background colors, 59 font sizes
- **Buffer**: 124 text colors, 86 background colors, 54 font sizes
- **Stripe**: 189 text colors, 90 background colors, 35 font sizes
- **GitHub**: 163 text colors, 147 background colors, 56 font sizes

This is where you end up when every new chunk of CSS you write is a blank canvas; there’s nothing stopping you from using whatever values you want.

Good design requires constraints. Grids and palettes are useful design tools _because they limit our choices_.

What we’re looking for here is really what’s called a **design system.**

A design system says you can use these colors, these type treatments, these drop shadows, these 5 spacing increments. These are called design tokens. By composing these building blocks taken from a limited menu of options, you can build up the rest of your styles without having to work your brain so hard.

Many companies have open-sourced their design systems: Microsoft has [Fluent UI](https://www.microsoft.com/design/fluent/%23/web), Salesforce has [Lightning](https://www.lightningdesignsystem.com/), Shopify has [Polaris](http://polaris.shopify.com), GitHub has [Primer](http://primer.style), IBM has [Carbon](https://www.carbondesignsystem.com/), and so on.

Some of these are really internally-facing, open-sourced because why not. Others are intended for wider adoption and customization.

<figure>

![]($$/material.gif)

Material Design is kind of a meta-design system: It has been used as the foundation of many non-Google brands' design systems.

</figure>

Google’s “Material Design” system was my introduction to the concept, and it really straddles these two modes: Its original intention was to unify Google’s sprawling universe of applications. But Material embodies a set of principles that can be adapted to any graphic identity, and it has been used as the foundation of in-house design systems for [many organizations](http://material.io/blog/material-partner-studies) from Lyft to NPR to Zappos.

The question of how you modify an existing set of styles brings us to a digression on an important topic, which is…

… the beauty and the terror of working with Cascading Style Sheets.

## The problem with CSS

The DevResults codebase has around 17,000 lines of our own SCSS, plus something like 6,000 lines from Bootstrap.

There should be a German noun for the fear of breaking something in a CSS codebase. Perhaps **_Kaskadenangst_** *—* “cascade anxiety”?

I’m sure I’m not the only one on my team who has experienced a familiar sinking feeling whenever it comes time to touch the application’s CSS. Whether the task at hand is fixing a display bug, updating the design, or creating a new component — there’s a sense of dread, rooted in the fear of breaking something — which in turn comes from a sense that it’s impossible to completely understand or predict the effects of any given change.

There are definitely things that we could have done better — conventions we could have adopted, systems we could have put in place, abstractions we could have abstracted. But I think this a classic case of a software [Pit of Despair](https://blog.codinghorror.com/falling-into-the-pit-of-success/) — the sort of technology problem that **everyone blames themselves** for, when the real problem has to do with the technology’s own built-in defaults, limitations, and [footguns](https://en.wiktionary.org/wiki/footgun).

<figure class='w-3/4 mx-auto'>

![]($$/two-css-properties-walk-into-a-bar.png)

</figure>

I think it’s time for us to stop blaming ourselves. It’s not wrong to want our technology to help us fall into the Pit of Success; we haven’t gotten here due to a lack of competence or understanding.

Case in point: [_The Guardian_](http://theguardian.com)’s web presence been an inspiration to me for many years, with strong typography and a consistent design sense across an amazing variety of digital contexts. If anyone knows what they’re doing with CSS, it’s these people.

<figure class='figure-xl'>

![]($$/guardian.png)

**_This is hard even for the pros:_** [_The Guardian_](http://theguardian.com) has long been a leader in digital design and typography, with a confident and distinctive design sense that’s woven across multiple websites and applications with remarkable consistency. If they feel overwhelmed by their CSS codebase, what hope is there for the rest of us?

</figure>

Here’s how they describe their codebase before their last update:

> At the time of writing, it has gone from 0 to 62,783 lines of Sass. That Sass generates tens of thousands of rules that are intended to describe a maintainable set of responses to business and design problems. Individually, they represent half a decade’s considered decisions made by skillful and dedicated engineers. In sum, though, they present **a precarious, teetering, maintenance nightmare**.

Now of course, working in _any_ kind of legacy code can seem opaque and feel nerve-wracking to work with. But there are some peculiarities of CSS that make it particularly fraught.

### The perils of globalization

The cascade is a powerful device: Changing one small rule can can have sweeping effects. This system of inheritance and overrides makes it possible to style a page elegantly and concisely. It’s rigorously logical and can be very satisfying to work with.

The flip side of the cascade’s power, though, is that if you have more than a handful of rules, you can quickly end up with a network of effects and counter-effects that exceeds your ability to keep it straight in your head.

The root of the problem is that **all CSS is global**. As Facebook engineer Christopher Chedeau points out in this [landmark 2014 talk](https://vimeo.com/116209150), “avoid global variables” has forever been at the top of the list of best practices for programmers, but Bootstrap 3 shipped with 600 global variables. CSS is, by its very nature, a global list of rules.

Not only do all styles exist in the same global namespace, but rules can “see” the entire DOM, and you don’t know in advance what the DOM will contain; so it’s not possible to compute in advance what rules might be applied in what combinations. This is not merely a difficulty, it’s a problem of **fundamental unknowability**. This is why so many CSS codebases are, in practice, append-only: No amount of static analysis can tell you whether it’s safe to delete any given rule.

In an article entitled [Oh No! Our Stylesheet Only Grows and Grows and Grows!](https://css-tricks.com/oh-no-stylesheet-grows-grows-grows-append-stylesheet-problem/), CSS guru Chris Coyier describes the lengths one team goes to: They instrument their production site to analyze a sample of real page loads and report back which CSS selectors seem to be unused. But even this extreme approach to dead code elimination just provides an educated guess: It’s not realistic to test every possible page in every conceivable state of user interaction:

> I’m sure you can imagine some CSS that applies only to a select menu, for a logged-in user, with an expired subscription, who wants to update a credit card, in a modal window, with a form that displays a certain way because the card is American Express.

(And if you can’t even detect dead code, you definitely can’t think about automating optimizations like inlining critical CSS for first load, or other forms of just-in-time CSS delivery.)

So we all approach CSS changes with trepidation, only adding and never changing or deleting, and keeping our additions as focused as possible — and consequently ramping up specificity in a never-ending arms race of specificity. Sunil Pai, another Facebook front-end engineer, [says](https://gist.github.com/threepointone/731b0c47e78d8350ae4e105c1a83867d):

> The Facebook codebase has thousands of `!important` statements, despite being written by competent engineers with solid engineering practices and deep relationships with design teams.

Most programming languages have found ways to **modularize** code, so that an ordinary human only needs to reason about one self-contained part at a time. There are ways of dealing with CSS’s lack of modularity — I’ll come back to this later.

But the problem goes beyond CSS’s global scope. I’m increasingly convinced that we’ve been using CSS the wrong way altogether, at least when it comes to building software applications that run in the browser. This is partly due to the nature of the language, and partly due to the culture that’s grown up around CSS.

<figure class='figure-xl'>

![]($$/zen-garden.jpg)

**A vivid illustration of the power of CSS:** The Zen Garden was hugely influential in getting designers and developers to embrace web standards.

</figure>

### The false promise of the CSS Zen Garden

The first time I wrote an HTML page was in 1995, before CSS was a thing.

In 1996, when Internet Explorer 3 came out with the first browser support for CSS, I tried it out with great excitement, although it didn’t work in Netscape so I knew it would be a while before I could use it for anything real.

<figure class='figure-md'>

![](https://cdn-images-1.medium.com/max/800/0*NIk91gK-3YTXNOBd.png)

Gather around for a little history, kids.

</figure>

Around the turn of the millennium, the first websites I made for money used just a smattering of CSS for styling. Like everyone else at the time, I used carefully sliced-up images, tucked into elaborately nested `<table>` structures, to pull off effects like rounded corners and drop shadows.

In 2003, the one-two punch of Jeffrey Zeldman’s [Designing With Web Standards](https://www.amazon.com/Designing-Web-Standards-Jeffrey-Zeldman/dp/0735712018) and the [CSS Zen Garden](http://www.csszengarden.com/) changed forever the way I built web pages.

The CSS Zen Garden is a website made by David Shea, a Canadian web designer. It consists of a single bare-bones HTML file, radically restyled in different ways simply by changing the stylesheet. Thousands of people submitted designs. Minds were blown, including mine. The Zen Garden, I think, left all of us trying to live up to this ideal, that you should always be prepared to swap out your web page’s stylesheet with another. Your HTML is “content”: It’s a static, immutable, known thing. And what we optimize for is changing out is “style”, CSS, which treats the HTML as a stable dependency.

### A different perspective on “separation of concerns”

<figure >

![]($$/separation-of-concerns-pulp-fiction.jpg)

I dare you. I double dog dare you.

</figure>

But when’s the last time you actually swapped out a site’s stylesheet?

Some sites use this approach to offer multiple themes — this is how [Wikipedia’s skins work](https://en.wikipedia.org/wiki/Wikipedia:Skin), for instance — but it’s an unusual thing to do precisely because it multiplies the CSS maintenance burden. Basically, this thing that was sold to us as a killer feature turned out to be an edge case.

In practice, my experience is that it’s very rare to make substantial CSS changes without making corresponding HTML changes.

Philip Walton, now an engineer at Google, [observed way back in 2013](https://tympanus.net/codrops/2013/01/22/defending-presentational-class-names/%5C):

> I’ve been redesigning websites for many, many years. I’ve worked on big sites and small ones; I’ve worked alone and as a member of a large engineering team. And not once, in my entire career, have I worked on a redesign where I wasn’t allowed to alter the HTML. For me and most designers I know, when you redesign a site you want to change the markup. … **Markup is not content. HTML adds structure and semantics to our content, but it is not the content itself**. I think it’s time we stopped equating the two.

<figure class='figure-md'>

![]($$/presentation-vs-content.png)

**A couple of different ways of thinking about “separation of concerns”.** An HTML document mixes content, structure, and semantics. If your data is separate from your markup — as it will be in any software application — it starts to make more sense to treat the styling and the markup as a single thing: a **component**.

</figure>

Your CSS and your markup are tightly coupled, because **there’s presentation-level information encoded in the structure of your HTML** — the order things are in, the way they’re nested. HTML is not pure “content” and never has been.

I think that the mental model encouraged by the Zen Garden has led us astray, by causing us to focus on a nearly non-existent use case.

As a result we’ve instituted the wrong sort of separation of concerns. In any website or application of any complexity, the meaningful boundary between presentation and content isn’t between files with that end in `.html` and files that end in `.css` — it’s between _components_ (containing CSS, HTML, and JavaScript) and structured _data_. You can take a given piece of data – a contact entry, or a restaurant’s details and reviews, or a blog post – and pour it into any number of different components.

![]($$/modular.png)

For example, a single contact record might be displayed as a row in a table, or a thumbnail, or an editable form.

This is a separation of concerns that turns out to be super useful in practice. It’s something developers do all the time. And that’s why we’ve all coalesced around React and other component-centric frameworks.

<figure class='figure-xl'>

![]($$/components.png)

**A powerful abstraction:** Components allow you to take a single element of **data** and bind it to any number of different **presentation** layouts  —  “presentation” meaning styles and markup.

</figure>

### Software applications are not documents

The model of an interchangeable global stylesheet works fine for its original purpose, which is formatting hypertext *documents* — where there’s a fairly limited universe of possibilities.

<figure class='figure-md'>

![]($$/pdf-about-css.png)

**Isn’t it ironic:** HTML was originally designed for publishing academic papers — which these days are the one form of content that you’re **least** likely to find in HTML (including research on HTML and CSS)!

</figure>

But today’s web would be unrecognizable to the authors of the original HTML and CSS specs. Most significantly, we’ve turned it into a platform for serving software _applications_. In this context, our document-related metaphors are unhelpful; and we don’t do ourselves any favors by continuing to insist on the abstractions that made sense in that world.

It shouldn’t surprise us if the the best tools for publishing an essay or a research paper aren’t the best tools for building an email client or a spreadsheet.

I feel like so much of the drama and controversy and hard feelings that have been stirred up in the front-end community over the last few years could have been avoided by being clearer about this distinction.

---

### Speaking of drama: A side note recognizing that this is, perhaps surprisingly, a really sensitive topic

Before I go any further, I should acknowledge that I’ve wandered onto a topic that is flammable in ways that goes beyond the usual nerd debates.

It might seem strange that we could get emotional over the question of how exactly the style rules for web pages should be written and organized. But this isn’t tabs vs. spaces.

![]($$/glory-of-cascade.jpg)

Understandably, if your whole career has been about taming the cascade, you’re not going to take kindly to some clueless twentysomething writing the whole thing off as obsolete or misguided. When you’ve mastered a technology, even the driest analysis of that technology’s drawbacks can be seen as a personal attack.

To complicate things further, there’s a gender angle to this. Front-end development has historically been somewhat more accessible to women, while elite brogrammers saw HTML and CSS as trivial and unworthy of their attention. As much of the value has shifted from the server to the client, it’s understandably galling to see the same dudes now saying that stylesheets are too complex and need to be replaced with tools from their side of the house. One could be forgiven for seeing it as a land grab, a hostile encroachment on a rare bit of tech territory where women have thrived.

Kevin Ball was once the lead developer for the ZURB Foundation UI framework. In a 2018 post entitled “[CSS dismissal is about exclusion, not technology](http://zendev.com/2018/09/11/css-dismissal-is-about-exclusion-not-technology.html)”, he draws an analogy to the male takeover of programming as a profession in the 60s and 70s.

> We’ve seen this play before. The systematic devaluation of CSS, and more, the people who use CSS. The constant “mansplaining” of CSS features to women who literally are the reason it exists. It’s time to stop pretending. We’re seeing a power play, trying to once again push people out of the industry by pushing a particular approach to front-end development.

I … I don’t know about that.

There’s a legitimate point here about the immediate effects on people’s careers of a shift in technology. But while I can’t really speak to anyone’s motivations but my own, it seems a bit of a stretch to suggest that people’s complaints about CSS are actually a front for a bad-faith effort to perpetuate male privilege.

At any rate, I stand by my own lived experience of _Kaskadenangst_ in working with a mature CSS codebase; and it’s clear that I’m not alone. And if there are ways to avoid that in a greenfield project, I’d like to explore them.

So: Onwards.

## Reining in CSS’s global scope

The case of JavaScript might be instructive. JavaScript is another web technology that, out of the box, uses a single global scope; so it might be instructive to see how that’s played out.

Turning JavaScript into a modular language is something that the community has wrestled with for the last decade, and we could break that process into three stages:

1.  naming conventions and other best practices;
2.  userland libraries and build-time tools (AMD, CommonJS); and
3.  modularity as a language-level feature (ES6 modules).

In the CSS world, we’re seeing the first two stages playing out, maybe with a few years’ delay relative to JS. (The CSS specification itself is evolving rapidly, but as far as I know there’s not been a proposal to build a module system into the language itself.)

### Naming conventions

If you don’t have proper namespacing, you can always just fake it by prepending your global variable names with a probably-unique string, add in lots of underscores for good measure, and hope for the best.

The [BEM](http://getbem.com/) (Block, Element, Modifier) methodology, from the Russian search engine Yandex, was the first naming convention to gain wide adoption in the CSS community, and is still far and away the most popular despite the subsequent appearance of alternatives like [SMACSS](http://smacss.com/), [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/) and [SUIT](https://suitcss.github.io/).

The idea is straightforward: Class names always start with a block name — essentially a namespace at the component level — and are followed by an element name, and perhaps a modifier. Something like this:

```text
.bio__image { ... }
.bio__name { ... }
.bio__name--hover { ... }
.article__image { ... }
.article__title { ... }
.article__title--hover { ... }
```

This works well as far as it goes, but it’s brittle. As The Guardian’s front-end team observed,

> Systems that try to contain complexity over long periods of time by **convention** will inevitably tend toward entropy, because one significant characteristic of convention is that it is trivially simple to break one.

### CSS Modules

So, the problem with conventions is that they require discipline, diligence, and consistency from humans; while humans notoriously sloppy, lazy, and undisciplined.

Well, that’s why we invented computers. Rather than cajole and persuade developers and then hope against hope that they nobody screws things up, we can just give the job of naming things to a computer.

That’s the big idea behind [CSS Modules](http://glenmaddern.com/articles/css-modules), a build-time tool created by Australian developer Mark Dalgleish that basically automates a BEM-style prefixing scheme. It lets you break your stylesheet up into component-level files, and then namespaces them by prefixing them with the component’s filename. So for example, a style named `title` might be replaced with one named `_article__title_309571057`.

### CSS in JavaScript

What if, instead of creating a new pseudo-module system for CSS, we just used the module systems that we already have in JavaScript?

These kinds of ideas usually just sneak up on us little by little. The whole CSS-in-JS thing is unusual in that it went overnight from being preposterous to plausible. Nearly every article on the topic — whether it’s an argument for or against, or a tutorial, implementation, or whatever — points back to a talk by Chrisopher Chedeau ([Vjeux](https://medium.com/u/46fa99d9bca4)) at a regional JavaScript conference in Washington DC at the end of 2014. It’s worth watching in full:

<figure class='figure-md'>

[![]($$/css-in-js-video.png)](https://vimeo.com/116209150)

In spite of the crappy audio, this is a really compelling presentation. I can’t imagine he went into the talk thinking it would be such a watershed.

</figure>

The basic idea he put forward seems simple: Rather than CSS classes, you have JavaScript objects whose names correspond to CSS properties (camel-cased, e.g. `borderRadius` rather than `border-radius`). The object is then passed to an element’s `style` property in JSX, whereby they’re rendered as inline styles.

```js
let styles = {
  background: 'lightBlue',
  border: '1px solid blue',
  borderRadius: 2,
}
<div style={styles}>...</div>
```

A number of CSS-in-JS libraries popped up over the following year, with widely varying approaches. Since then, [Styled Components](http://styled-components.com) and [Emotion](http://emotion.sh/docs/introduction) have come to dominate the field — and they’ve each liberally adopted each others’ improvements and API options, so that they’re nearly interchangeable at this point.

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

You’ll notice that we’re adding our styles to a `css` attribute instead of `styles`. The simple approach of adding inline styles turns out to be limiting; there are things you can do with classes — pseudo-selectors like `:hover` or `:focus`, media queries, etc. — that you can't do with inline styles. So most modern libraries convert rules to CSS classes on the fly, with generated names.

For example, here’s a glimpse behind the scenes on Twitter’s web client.

<figure class='figure-lg figure-b'>

![]($$/twitter-source.png)

(Depending on your perspective, you might think this is slick  —  or [not so much](https://twitter.com/dhh/status/1089179428788133888)!)

</figure>

To me, a beautiful thing about having CSS in your JS is how it simplifies the way you style a component’s various states. Imagine you’re styling a strip of tabs, and you want the currently active tab to be styled differently. In BEM-flavored CSS you might have this:

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

The key insight of React and other modern rendering engines is to think of **UI as a function of state**. This is one of those simple, obvious-in-retrospect abstractions that is so genuinely useful, and such an improvement over previous ways of doing things, that it turns ordinary programmers into annoying proselytizers.

In the original model, UI meant just HTML, with the CSS living on a separate, static, global plane. But that segregation never made a whole lot of sense, and I think that’s why Chedeau’s presentation was an epiphany for so many people. HTML and CSS are two inseparable sides of the UI coin and it’s useful to think of them _both_ as a function of state.

### React Native for Web

Facebook originally created React as a way of generating web user interfaces, but in short order they refactored the library to allow using the same model to render to targets other than the DOM, introducing [React Native](http://reactnative.dev) as an abstraction layer for creating mobile apps.

Rather than work with DOM elements like `<div>`, `<p>`, and `<input>`, React Native uses generic components like `<View>`, `<Text>`, and `<TextInput>` that are in rendered as the platform equivalent: For example, `View` becomes `UIView` in iOS and `android.view` in Android.

React Native only has official support for iOS and Android, so the community has created projects to support other build targets like Windows UWP and Apple tvOS.

Bringing the story full circle, Nicolas Gallagher created [React Native for Web](http://github.com/necolas/react-native-web) (RNW) while working at Twitter, adding support for the web as a build target — making it possible to write a single app that builds to iOS, Android, and the web. The new Twitter web app uses it, and there are a few other high-profile adopters including _The Times_ of London and U.S. Major League Soccer.

So this should be the ideal solution for writing a single app that runs everywhere, right? Well…

- Styling is managed using an idiosyncratic CSS-in-JS approach that imposes some limitations in order to make everything work across platforms. For example, there are no pseudo-classes like `:hover`, and no media queries; instead these use cases need to be handled in JS by responding to browser events.
- It’s incomplete: Many [React Native core APIs](https://github.com/necolas/react-native-web%23compatibility-with-react-native) haven’t been implemented, including basics like `Modal` and `Alert`.
- Your options for third-party libraries are sharply limited: Many React Native libraries won’t work, because they drop into native code here and there for performance reasons, without offering a JavaScript fallback. On the other hand, many React libraries won’t work, because they output DOM elements that don’t work in native.
- It uses a different build system than the iOS and Android build targets (Webpack instead of Metro), so the developer experience is that much more complex.

Gallagher now works at Facebook on the React team, and one hopes that web eventually becomes an officially supported target for React Native, with a more approachable developer story and perhaps adapters for otherwise incompatible libraries. For now, though, RNW seems to be in an awkward spot between native and web.

## We still need constraints

So far none of what we’ve talked about helps us with the problem of building a **design system** that constrains our choices. Whether you love CSS-in-JS or think it’s an abomination, it doesn’t solve the 400-colors-of-text problem.

<figure class='figure-xl'>

![]($$/theme-ui.png)

</figure>

### Theme UI

[Theme UI](https://theme-ui.com/home/) is the first CSS-in-JS framework I found that explicitly sets out to be the foundation of a design system. Created by Gatsby developer Brent Jackson, it builds on his previous contributions including [BassCSS](http://basscss.com), [ReBass](https://rebassjs.org/), and [Styled System](http://styled-system.com). It works on top of existing CSS-in-JS libraries to constrain choices to a set of pre-established design tokens. These are driven by a theme file, which conforms to a [theme specification](https://theme-ui.com/theme-spec) that he advocates adopting as a standard.

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

Note that the numbers here are on a scale – they’re not absolute pixel measurements. So `p: 2` refers to the 2nd value on a theme’s scale of spacing values, not necessarily to `2px`.

There’s a lot to like about Theme UI. Its themes let you define color palettes, font options, and sensible scales for things like padding or text size. In practice I’ve found it to be easy to work with.

But it hasn’t exactly taken the world by storm, and I think part of the reason is that it feels weird to have every single style attribute calculated in JavaScript at runtime.

## “Atomic” or “utility-first” CSS

It’s always been common practice to use a handful of “utility” classes

What if, instead of writing `sx={{p: 2}}`, we just created

that started gaining popularity around the same time

<figure class='' >

![]($$/atomic-css-tweets.png)

Like CSS-in-JS before it, the idea of “atomic” or “utility-first” CSS provoked an unexpectedly visceral response in some prominent corners of the web design community. (Dave Shea is the creator of the CSS Zen Garden)

</figure>

Tachyons, by Adam Morse, has been around the longest of these (since early 2014). It uses a stylesheet generated at build time using PostCSS.

style definitions are “immutable” in the sense that they mostly don’t ever change

defending presentational class names: [https://tympanus.net/codrops/2013/01/22/defending-presentational-class-names/](https://tympanus.net/codrops/2013/01/22/defending-presentational-class-names/)

- this isn’t `big-blue-header` or `rounded-corners-6px`
- any numbers refer to **positions on a scale**, not to actual dimensions; so if we have 6 padding options, .p-1 is the smallest and .p-6 is the biggest

But … semantic!!

CSS and Scalability: [https://mrmrs.cc/writing/scalable-css/](https://mrmrs.cc/writing/scalable-css/)

> This is where we come to the crux of the problem I have with any system that requires you to map visual styles to components in your css. Content semantics have **nothing to do with visual styles**. When I used to build things with legos I never thought ‘oh this is a piece for an engine block’ I thought ‘oh cool this is a 1x4 blue lego and I can do anything I want with it’. It didn’t matter if I was building an underwater aquanauts base or an airplane — I knew exactly how to use that lego block.

> When I read about or listen to ideas on how to scale an app’s css — most of the talk is about how to write css. The real way to scale css, is to stop writing css.

better than inline styles because

- more terse, ergonomic
- supports pseudo-selectors, media queries
- limited options
- can make global changes to the scale

<figure class='figure-xl'>

![]($$/tailwind.png)

</figure>

### **Tailwind CSS**

Adam Wathan, the co-author of [Refactoring UI](https://refactoringui.com/), created [Tailwind CSS](https://tailwindcss.com/) in 2018, and it’s become very popular in a short time.

Tailwind uses PostCSS to generate styles at build time based on a config file that defines the theme’s constraints. It can purge styles that aren’t used, by cross-checking generated names against the site’s JSX and HTML.

Class names are a bit more readable out of the box. Note that the numbers here are on a scale — they’re not absolute pixel measurements. So `m-4` refers to the 4th value on a theme’s scale of spacing values.

With Tailwind, class names are still succinct but a bit more readable.

Tailwind is very configurable and extensible — everything about the rules and class names it generates can be customized.

####
