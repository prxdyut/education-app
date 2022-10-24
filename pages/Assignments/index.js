import Head from 'next/head'
import Image from 'next/image'
import TopBar from '../../src/components/navBar'
import AssignmentsContainer from '../../src/container/Assignments'

export default function Assignments() {
  return (
    <div>
      <Head>
        <title>Assignments</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar>
        <main>
          <AssignmentsContainer />
        </main>
      </TopBar>
    </div>
  )
}