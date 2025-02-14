"use client";

import { Abhaya_Libre } from "next/font/google";

const abhaya = Abhaya_Libre({subsets:['latin'], weight: '800'});

export default function Home() {
  return (
    <>
<div className="bg-[#E8EBE4]">
  <div className="max-w-5xl mx-auto px-4 xl:px-0 pt-24 lg:pt-32 pb-24">
    <h1 className="font-semibold text-[#223843] text-5xl md:text-6xl">
      <span className={`${abhaya.className} text-[#CA3C25] text-[8rem]`}>Awaaz:</span> Online Petitition
    </h1>
    <div className="max-w-4xl">
      <p className="mt-5 text-[#223843] text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate distinctio illum nulla aperiam laborum reiciendis pariatur doloremque optio commodi deleniti ex saepe, provident, ea molestias? Quisquam voluptates quae vel neque quod fugiat error repellat, repellendus asperiores consequuntur molestias eum corrupti, nobis vero quos? Nisi mollitia natus tempora quam suscipit libero quae doloribus.
      </p>
    </div>
  </div>
</div>

    </>
  );
}
