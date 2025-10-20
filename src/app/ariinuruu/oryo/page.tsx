"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("github")}>newter</button>;
  }

  return <button onClick={() => signOut()}>gar</button>;
};

export default SignInPage;
