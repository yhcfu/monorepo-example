import '@/styles/globals.css';

import { withUrql } from '@/hocs/urql';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
// see https://github.com/welldone-software/why-did-you-render
App.whyDidYouRender = true;

// provide the urql client to the app
// export default withUrql(App, { ssr: false });
export default App;
