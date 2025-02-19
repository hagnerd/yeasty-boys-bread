import Nav from "components/Nav";
import Head from "next/head";

function Layout(props) {
  return (
    <div
      className="relative overflow-hidden subpixel-antialiased"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%23f1f1f1' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@itwasmattgregg" />
        <meta
          property="og:title"
          content="Yeasty Boys Sourdough Bread Lottery"
          key="title"
        />
        <meta
          property="og:description"
          content="Sign up to win the bread lottery and purchase merch!"
        />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/images/logo.png`}
        />
        <title>Yeasty Boys Sourdough Bread Lottery</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍞</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <Nav />
      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
