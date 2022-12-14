import React from 'react'
import { useEffect, useState } from 'react'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import LoginForm from '../../components/Login/form'

export default function LoginContainer({ }) {
    const { isLoading, session, error, supabaseClient } = useSessionContext()
    const user = useUser()
    const [data, setData] = useState()
  
    useEffect(() => {
      async function loadData() {
        const { data } = await supabaseClient.from('test').select('*')
        setData(data)
      }
      // Only run query once user is logged in.
      if (user) loadData()
    }, [user])
  
    if (!user)
      return (
        <>
          {error && <p>{error.message}</p>}
          <LoginForm />
        </>
      )
  
    return (
      <>
        <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
        <p>user:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <p>client-side data fetching with RLS</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </>
    )
}