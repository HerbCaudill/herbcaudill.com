import { Html, Head, Main, NextScript } from 'next/document'
import { siteDescription, siteTitle } from 'lib/constants'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <title>{`${siteTitle} | ${label}`}</title>
        <meta name="og:title" content={`${siteTitle} | ${label}`} /> */}
        <meta name="description" content={siteDescription} />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/images/avatar/glasses-head-sat-transp.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href={GoogleFont('IBM Plex Sans')} rel="stylesheet" />
        <link href={GoogleFont('IBM Plex Serif')} rel="stylesheet" />
        <link href={GoogleFont('IBM Plex Mono')} rel="stylesheet" />
        <link href={GoogleFont('IBM Plex Sans Condensed')} rel="stylesheet" />

        <meta property="og:type" content="blog" />

        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// returns a url like https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;1,100;1,200&display=swap
export const GoogleFont = (
  family: string,
  styles: (0 | 1)[] = [0, 1],
  weights: number[] = [100, 200, 300, 400, 500, 600, 700]
) => {
  // URL encode, e.g. IBM Plex Sans => IBM+Plex+Sans
  family = family.replace(/\s+/g, '+')

  // variants e.g. 0,100;0,200;1,100;1,200
  const variants = styles
    .flatMap(style =>
      weights //
        .map(weight => `${style},${weight}`)
    )
    .join(';')

  return [`https://fonts.googleapis.com/css2`, `?family=${family}`, `:ital,wght@${variants}`, `&display=swap`].join('')
}
