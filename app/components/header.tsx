'use client'
import Logout from '../svg/logout'
import { useGithubAuth } from '../hook/useGithubAuth'

const Header = () => {
  const { handleLogout } = useGithubAuth()
  return (
    <header className="w-full bg-white py-3 px-4 border-b border-solid border-gray-200 flex justify-between items-center">
        <img src="/logo.png" alt="note" className="h-7"/>
        <div className="cursor-pointer" onClick={handleLogout}>
            <Logout />
        </div>
    </header>
  )
}

export default Header;
