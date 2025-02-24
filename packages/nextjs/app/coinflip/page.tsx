"use client";

import type { NextPage } from "next";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ConflipPlayPage } from './_components/ConflipPlayPage';
import { isOver18 } from "~~/utils/ageVerification";


const Debug: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isOver18()) {
      router.push('/verifyage');
    }
  }, [router]);

  return (
    <>
      <ConflipPlayPage />
    </>
  );
};

export default Debug;