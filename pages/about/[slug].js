
import Header from '../components/page-headers'
import { handleApi } from '../../api/server'
import Sections from '../../assets/section'
import HeadTag from "../../assets/headTag"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function Slug({ data = {} }) {

    const router = useRouter()

    return (
        <div>

            <HeadTag data={data} />
            <main className="">

                {data.header ? <Header data={data.header} /> : null}

                <Sections data={data} />



            </main>




        </div>

    )
}


export async function getStaticPaths() {
    // ...

    let res = await handleApi({ url: `pages` })


    // Get the paths we want to pre-render based on posts
    const paths = res.map((item) => ({
        params: { slug: item.slug },
    }))

    return { paths, fallback: true }
}

// This function gets called at build time
export async function getStaticProps({ params }) {

    const { slug } = params

    // Call an external API endpoint to get posts
    let res = await handleApi({ url: `pages/`, slug: slug })
    const data = res[0];

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            data,
        },
        revalidate: 60,
    }
}

export default Slug
