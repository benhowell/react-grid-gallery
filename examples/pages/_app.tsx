import "nextra-theme-docs/style.css";
import "./../custom-overlay/src/styles.css";
import "./../selection/src/styles.css";
import "./../captions/src/styles.css";

// @ts-ignore
export default function Nextra({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
