'use client'
import Image from "next/image";
import Link from 'next/link'
import React from 'react'
import { useSession,signIn,signOut } from 'next-auth/react'
import { useRouter } from "next/navigation";
const Nav = () => {
    const {data:session}=useSession();
    const router=useRouter();
    console.log(session)
  return (
    <nav className="bg-white bg-opacity-10 shadow-lg py-4 px-6 flex items-center justify-between">
  <Link href="/" className="flex items-center">
    {/* <img src="" alt="Logo" class="h-8 w-8 mr-2"></img> */}
    <h1 className="text-white font-semibold text-lg text-black">Your Logo</h1>
  </Link>
      
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className="flex items-center">
            <Link href='/create-prompt' className="bg-black hover:bg-white hover:text-black text-white font-semibold py-2 px-4 mr-2 rounded transition-transform duration-300 hover:scale-110">
              Create Post
            </Link>

            <button type='button' onClick={() => {signOut();router.push("/"); }}  className="bg-black hover:bg-white hover:text-black text-white font-semibold py-2 px-4 rounded transition-transform duration-300 hover:scale-110">
              Sign Out
            </button>

            <Link href='/profile' className="rounded-lg transition-transform duration-300 hover:scale-110 h-12 w-12 ml-4">
              <img src={session?.user.image} alt=""/>
            </Link>
          </div>
        ):(
            <>
            <button type='button' onClick={() => {
                    signIn('google');
                  }}
                  className='bg-black hover:bg-white hover:text-black text-white font-semibold py-2 px-4 mr-2 rounded transition-transform duration-300 hover:scale-110'
                >
                  Sign in
                </button>
            </>
        )}
        </div>
        </nav>
  )
}

export default Nav