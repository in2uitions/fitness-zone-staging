import HeadTag from '../assets/headTag'
// import Sections from '@assets/sections'
import Sections from '../assets/section'
import Header from './components/page-headers'
import { handleApi } from '../api/server'

function Home({ data = {} }) {

  return (
    <>
      <HeadTag data={data} />
      
      <main >
        {data.header? <Header data={data.header}/>:null}
          <Sections data={data} />
          
      </main>
    </>
  )
}

export async function getStaticProps() {
  let res = await handleApi({url:'homepage'})
  const data = res[0];
  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}

export default Home