"use client";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";

export default function LangOption() {
  const router = useRouter();
  const [amh, setAmh] = React.useState(false);

  function isAmh() {
    return getCookie("lang") === "am";
  }

  function setLang(lang: string) {
    setCookie("lang", lang);
    if (lang === "am") setAmh(true);
    else setAmh(false);
    router.refresh();
  }

  React.useEffect(() => {
    if (isAmh()) setAmh(true);
  }, []);

  return (
    <div className="font-extrabold">
      <span
        className={`cursor-pointer mr-3 ${amh ? `opacity-100` : `opacity-30`}`}
        onClick={() => setLang("am")}
      >
        አማ
      </span>
      <span
        className={`cursor-pointer ${!amh ? `opacity-100` : `opacity-30`}`}
        onClick={() => setLang("en")}
      >
        EN
      </span>
    </div>
  );
}
