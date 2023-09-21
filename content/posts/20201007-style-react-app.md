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
  "CSS is easy. It´s like riding a bike, which is on fire and the ground is on fire and everything is 
  on fire because it is hell." 
  _ -- [@iamdevloper](https://twitter.com/iamdevloper/status/753716544949981184)_

context: |
  **Note from the future:** I wrote most of this article in 2020 as my own notes on my research. Once 
  I discovered Tailwind, I stopped writing and got back to work, and nearly forgot about this piece. 
  It's now 2023, and in the interim Tailwind has gone from being super controversial to being a safe, 
  even [obvious](https://npmtrends.com/bootstrap-vs-tailwindcss) choice. So this all feels a bit like 
  beating a dead horse at this point; but I've gone ahead and finished it and I'm posting it anyway, 
  with the original title and date for context.
---

Recently, locked down during Spain's second or third COVID wave and nervously anticipating elections
in the US, I sat down to build a very simple React app as a demo for something I was working on, and
I was immediately paralyzed trying to decide how to style the application.

There was no good reason for this to be a showstopper. It wasn't at all important how this
particular demo app _looked_, and the underlying technology used to style it mattered even less.

But I found myself unable to proceed, fundamentally dissatisfied with basically every approach I'd
ever used: Every UI framework, every component library, every CSS methodology -- they all seemed to
fall short of doing what I needed, and I didn't want to just pick something familiar and move on.

Maybe it was the Difficult Times We're Living Through. But I started out in this business as a
designer, so design just matters a lot to me in general.

And I'm thinking a lot about about interfaces that users can modify or assemble from scratch using
components that can be composed with other components. So there needs to be a solid design system
underlying this that is **modular and composable**.

And the **developer experience** of styling matters more than it normally would, because ultimately
I'd like for it to be easy for advanced users to extend the system by creating new
[datatypes ](/words/20181223-data-types-for-humans) -- along with the components for working with
them. So the whole question of how you balance customizability with keeping the design good and
appealing and consistent is super important. We want it to be flexible in all the right places,
while making it easy to create things that look great and hard to make ugly things.

This article started out as my own notes on my research. For a while, the deeper I went down the
rabbit hole, and the longer this piece got, the more unhappy I was with my options.

The good news is that I finally did find an approach that I got excited about -- so much so that I
went back to work, stopped writing, and nearly forgot about this article.

You should read to the end to find out what that approach was! But let's start from the beginning.

## UI libraries and design systems

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
alerts, and forms; and a handful of interactive components like dropdowns and modals. It's a solid
choice; DevResults still uses Bootstrap to this day.

<figure class='figure-xl'>

![]($$/buttons.png)

UI libraries vary widely in terms of how many components they offer and which ones, but they all
start with buttons. Shown here, from left to right: Material UI, Semantic UI, Ant Design, Bootstrap.

</figure>

Bootstrap is still far and away the most widely used UI framework, but there are other options that
have become popular as well:

- [**Zurb foundation**](https://get.foundation/) is a more minimalist framework that came out around
  the same time as Bootstrap.
- [**Material UI**](https://material-ui.com/) is an unofficial, community-created implementation of
  Google’s [Material Design](https://material.io/design).
- [**Semantic UI**](https://semantic-ui.com/) is a sharp, simple library that seems to be struggling
  a bit to keep up with the times.
- [**Ant Design**](https://ant.design/) is a product of Ant Financial, which I gather is the PayPal
  of the Alibaba universe. It’s very widely used in China.

The stylesheets and ready-made components of a UI framework are a useful way to start building a
polished-looking website or application. But when a developer needs to create new components, it
doesn't provide much in the way of guiderails, and it's easy to end up with lots of different
colors, type sizes, and so on.

Often an organization will come up with a comprehensive and opinionated framework internally, called
a **design system**.

A design system will usually include a Bootstrap-like UI library with pre-designed components like
buttons, modals, and dropdowns. But since it's not possible to foresee every component that people
are going to need, the focus is at a lower level: A design system offers a set of composable
elements, called **design tokens**. These might include everything from type styles and color
palettes to line weights, drop shadows, scales for spacing, and so on. These can be combined in
different ways to create completely new components and layouts in a way that's visually consistent with
other components and with the organization's overall brand.

<figure class='figure-xl'>

![]($$/carbon.jpg)

I've always thought IBM's [Carbon](https://www.carbondesignsystem.com/) design system was
particularly sharp, and in fact I use the [IBM Plex](https://www.ibm.com/plex/) family of typefaces
a lot, including on this site.

</figure>

The strength of a design system lies in the **constraints** provided by these design tokens: You
can't just pick any line weight or type size, you have to choose from a limited set of options.

Many companies have open-sourced their design systems: Microsoft has [Fluent
UI](https://www.microsoft.com/design/fluent/%23/web), Salesforce has
[Lightning](https://www.lightningdesignsystem.com/), Shopify has
[Polaris](http://polaris.shopify.com), GitHub has [Primer](http://primer.style), IBM has
[Carbon](https://www.carbondesignsystem.com/), and so on.

Some of these are really internally-facing and seemingly open-sourced just for the hell of it; while
others are intended for wider adoption and customization.

Google’s “Material Design” system was my introduction to the concept, and it really straddles these
two modes: Its original intention was to unify Google’s sprawling universe of applications. But
Material embodies a set of lower-level principles that can be adapted to any graphic identity, and
it has been used as the foundation of in-house design systems for [many
organizations](http://material.io/blog/material-partner-studies), from Lyft to NPR to Zappos.

<figure>

![]($$/material.gif)

Material Design is kind of a meta-design system: It has been used as the foundation of many
non-Google brands' design systems.

</figure>

In my experience, though, customizing the design of an existing framework like Bootstrap or Material
UI is a nightmare. Bootstrap's CSS contains _literally seventy-twelve million billion variables_. It's
death by a thousand overrides, as you struggle to overlay your vision on top of an endless supply of
someone else's decisions.

The question of how you modify an existing set of styles brings us to an extended digression on an
important topic, which is…

## The beauty and the terror of working with Cascading Style Sheets

The DevResults codebase has around 17,000 lines of our own CSS, plus something like 6,000 lines
from Bootstrap.

I’m sure I’m not the only one on my team who has experienced a familiar sinking feeling whenever it
comes time to touch the application’s CSS. Whether the task at hand is fixing a display bug,
updating the design, or creating a new component  --  there’s a sense of dread, rooted in the fear of
breaking something  --  which in turn comes from a sense that it’s impossible to completely
understand or predict the effects of any given change.

<figure class='figure-md figure-b'>

![]($$/two-css-properties-walk-into-a-bar.png)

There should be a German noun for the fear of breaking something in a CSS codebase. Perhaps
**_Kaskadenangst_**  --  “cascade anxiety”?

</figure>

I used to think it was just us, that this was our fault: Surely if we were using better conventions,
perhaps if we organized things better, maybe if we had abstracted the right abstractions, _then_ we
would enjoy working with our CSS.

But it turns out that large CSS codebases are pretty much universally feared and reviled by the very
people who created them, no matter how competent they are.

Case in point: If anyone knows what they're doing with digital design, it's the people at [_The
Guardian_](http://theguardian.com). Their web presence been an inspiration to me for many years,
with a confident and distinctive design sense that’s woven across an amazing variety of digital
contexts with remarkable consistency.

<figure class='figure-lg'>

![]($$/guardian.png)

**This is hard even for the pros:** [_The Guardian_](http://theguardian.com) has long been a leader
in digital design and typography. If they feel overwhelmed by their CSS codebase, what hope is there
for the rest of us?

</figure>

Here’s how they describe their codebase [six years after starting from
scratch](https://www.theguardian.com/info/2019/apr/04/revisiting-the-rendering-tier):

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

The root of the problem is that **all CSS is global**. “Avoid global variables” has forever been at
the top of the list of best practices for programmers, but CSS is, by its very nature, a global list
of rules.

Not only do all styles exist in the same global namespace, but rules can “see” the entire
DOM, and you don’t know in advance what the DOM will contain; so it’s not possible to compute in
advance what rules might be applied in what combinations. This is not merely a difficulty, it’s a
problem of **fundamental unknowability**.

This is why so many CSS codebases are, in practice, append-only: No amount of static analysis can
tell you whether it’s safe to delete any given rule.

In an article entitled [Oh No! Our Stylesheet Only Grows and Grows and
Grows!](https://css-tricks.com/oh-no-stylesheet-grows-grows-grows-append-stylesheet-problem/), CSS
guru Chris Coyier describes the lengths one team goes to: They instrument their production site to
analyze a sample of real page loads and report back which CSS selectors seem to be unused. But even
this extreme approach to dead code elimination just provides an educated guess -- there's just no
way to test every possible page in every conceivable state of user interaction:

> imagine some CSS that applies only to a select menu, for a logged-in user, with an expired
> subscription, who wants to update a credit card, in a modal window, with a form that displays a
> certain way because the card is American Express.

So we all approach CSS changes with trepidation, only adding and never changing or deleting, and
keeping our additions as focused as possible  --  and consequently ramping up specificity in a
never-ending arms race of specificity, with nuclear `!important` statements proliferating out of
control.

## Reining in CSS's global scope

Most programming languages have solved this problem by **modularizing** code, so that an ordinary
human only needs to reason about one self-contained part at a time. There are a couple of ways
to achieve this with CSS:

### Naming conventions

In the absence of true modules, you can always just fake it by prepending your global variable names
with a probably-unique string, add in lots of underscores for good measure, and hope for the best.

The [BEM](http://getbem.com/) methodology, from the Russian search engine Yandex, is a popular
naming convention for CSS that does just that. Class names always start with a **block** name  --
essentially a namespace at the component level  -- followed by an **element** name, and optionally
a **modifier**. For example:

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

Well, that’s why we invented computers. Rather than cajole and persuade developers and then hope
against hope that they nobody screws things up, we can just give the job of naming things to a
computer.

[CSS Modules](http://glenmaddern.com/articles/css-modules), a build-time tool created by Australian
developer Mark Dalgleish, basically automates a BEM-style prefixing scheme. It lets you break your
stylesheet up into component-level files, and then namespaces them by prefixing them with the
component’s filename. So for example, a style named `title` might be replaced with one named
`_article__title_309571057`.

### CSS in JavaScript

But what if, instead of creating a new pseudo-module system for CSS, we just used the module systems
that we already have in JavaScript?

These kinds of ideas usually just sneak up on us little by little. The whole CSS-in-JS thing is
unusual in that one day it was not a thing at all, and seemingly the next day there were thousands
of blog posts, tutorials, and opinion pieces, and dozens of brand-new frameworks jostling for attention.

The precipitating event was a talk that Facebook's Christopher Chedeau
([Vjeux](https://medium.com/u/46fa99d9bca4)) at a small JavaScript conference in Washington DC at
the end of 2014. It’s worth watching in full:

<figure class='figure-md'>

<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/116209150?h=ee272a3a11&color=ffffff&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><script src="https://player.vimeo.com/api/player.js"></script>
</div>

In spite of the somewhat muffled audio, this is a really compelling presentation. I can’t imagine he went into
the talk thinking it would be such a watershed.

</figure>

The original idea was fairly simple: Rather than have your CSS in a separate, global file, you
assign inline styles directly to elements within each component.

```jsx
return <div style={{ backgroundColor: 'red', height: 10, width: 10 }} />
```

This is rendered as

```html
<div style=`background-color: red; height: 10px; width: 10px` />
```

Modern CSS-in-JS libraries do a little fancy footwork in the background to dynamically roll these
inline styles into proper CSS classes, which allows you to support . For example:

```jsx
return <div css={{ backgroundColor: 'red', height: 10, width: 10, '&:hover': { backgroundColor: 'blue' } }} />
```

Which would render something like this:

```html
<style>
  .eujXCt {
    background-color: red;
    height: 10px;
    width: 10px;
  }
  .eujXCt:hover {
    background-color: blue;
  }
</style>
...
<div class="eujXCt" />
```

The key insight of React and other modern rendering engines is to think of **UI as a function of
state**. In the original model, UI meant just HTML, with the CSS living on a separate, static,
global plane. But that segregation never made a whole lot of sense, and I think that’s why Chedeau’s
presentation was an epiphany for so many people. HTML and CSS are two inseparable sides of the UI
coin and it’s useful to think of them _both_ as a function of state.

## But we still need constraints

OK. So we could use CSS modules or one of the CSS-in-JS frameworks to solve the problem of global scope.
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
**semantic** -- that they should refer to the _content_ (`.author-name` or `.summary`) rather than
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

> When I read about or listen to ideas on how to scale an app’s CSS  --  most of the talk is about
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
