import { Analytics } from '@vercel/analytics/projeto-musica';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}

export default MyApp;