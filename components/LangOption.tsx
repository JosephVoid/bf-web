"use client";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LangOption() {
  const router = useRouter();

  function isAmh() {
    return getCookie("lang") === "am";
  }

  function setLang(lang: string) {
    setCookie("lang", lang);
    router.refresh();
  }

  return (
    <div className="font-extrabold">
      <span
        className={`cursor-pointer mr-3 ${
          isAmh() ? `opacity-100` : `opacity-30`
        }`}
        onClick={() => setLang("am")}
      >
        አማ
      </span>
      <span
        className={`cursor-pointer ${!isAmh() ? `opacity-100` : `opacity-30`}`}
        onClick={() => setLang("en")}
      >
        EN
      </span>
    </div>
  );
}
