'use client'

import Login from './components/Login'
import UI from './ui'
import { useGithubAuth } from './hook/useGithubAuth'

export default function Home() {
  const { isLoggedIn, loading } = useGithubAuth()
  return (
    <>
      {loading ? <div>Loading...</div> : isLoggedIn ? <UI /> : <Login />}
    </>
  )
}
