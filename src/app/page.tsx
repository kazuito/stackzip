"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {};

const Home = ({}: Props) => {
  useEffect(() => {
    console.log("Hello");
  }, []);

  return (
    <div className="">
      <Link href="/zip" className="text-white">
        Let's Zip
      </Link>
    </div>
  );
};

export default Home;
