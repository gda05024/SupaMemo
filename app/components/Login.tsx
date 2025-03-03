'use client'

import { useGithubAuth } from '../hook/useGithubAuth'

function Login() {
  const { signInWithGithub } = useGithubAuth()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
         <button
            onClick={signInWithGithub}
            className="w-full rounded-md bg-gray-300 px-4 py-2 text-gray-600 hover:text-gray-200 hover:bg-gray-600 focus:outline-none cursor-pointer"
          >
            GITHUB LOGIN
          </button>
      </div>
    </div>
  )
} 

export default Login