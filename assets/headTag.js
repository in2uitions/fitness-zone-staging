import Head from 'next/head'
import { image_url } from '../global_vars'


export default function HeadTag({ data = {} }) {
    return (
        <Head>
            <title>{data.meta_title}</title>
            <meta name="description" content={data.meta_description} />
            <meta name="keywords" content={data.meta_keywords} />
            <meta property="og:title" content={data.meta_title} />
            <meta property="og:image" content={`${image_url}${data.og_image}`} />
            <meta name="og:description" content={data.meta_description} />
        </Head>
    )
}
