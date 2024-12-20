import { auth,signOut,signIn } from '@/auth'
import Link from 'next/link';


import React from 'react'

const Navbar = async () => {
    // checking if the user is authenticated
    const session = await auth();

  return (
      <header className='px-5 py-3 bg-white shadow-sm  text-black'>
          
          <nav className='flex justify-between items-center'>
              <Link href='/' className='text-blue-600 font-bold'> E-Combinator <small>by edyxCode</small> </Link>

              <div className="flex items-center gap-5">
                   
                  {/* login to check is user is authenticated and show either login or logout */}

                  {session && session?.user ? (
                      <>
                          <Link href="/startup/create"> <span>Create</span></Link>
                          {/* form actions */}
                          <form action={async () => {
                              "use server";
                              await signOut({redirectTo:"/"})
                          }}>
                              <button type='submit'>
                              Logout
                              </button>
                              
                          </form>

                          {/* link to user profile */}
                          <Link href={`/user/${session?.user.id}`}>
                              <span>{session?.user.name }</span>
                          </Link>
                      </>
                  ) : (
                          <form action={async () => {
                              "use server";
                             await signIn("github");
                          }}>
                  <button type='submit'>
                       <span>Login</span>
                             </button>
                          </form>  
                  )}

              </div>
         </nav>
      
    </header>
  )
}

export default Navbar
