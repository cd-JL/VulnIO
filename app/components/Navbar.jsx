/*
  CPRG306 Assignment #3

  The navbar layout at the top of each page

  Input: None

  Processing:
  - Uses the useSession hook from next-auth to retrieve authentication status and user data.

  Output: 
  - Renders a navigation bar with links to movies, edit movies, login, register, and user-related actions.

  Authors: Julien Lam, Elvis Chizoba, Tyler Gettle
  Version: 2023-12-04
*/

'use client'
import React from "react";
import { PrismaClient } from '@prisma/client';
import Link from "next/link";
import { useSession } from 'next-auth/react'

// Creating a Prisma client instance
const prisma = new PrismaClient();

// Functional component for the Navbar
const Navbar = () => {
  // Using the useSession hook from next-auth to get authentication status and data
  const { status, data: session } = useSession();

  // JSX rendering for the Navbar component
  return (
    <nav className="flex bg-gray-800 p-10 text-white flex-row justify-between">
      <h1 className=" text-2xl font-bold">VulnIO</h1>
    </nav>
  );
};

// Exporting the Navbar component for external use
export default Navbar;
