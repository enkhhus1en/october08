import { IDKBRO } from "@/components/idk";

export default function Home() {
  return (
    <div className="space-y-8">
      <IDKBRO />
      <div className="text-center text-sm">
        ШИНЭ ОН, ШИНЭ БИ !! haha
        <br />
        2026
      </div>
      <div className="flex justify-center items-center mt-20">
        <iframe
          className="border-0"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/nRTBM4UwnBs?si=MBJgfOWiDydETlSE"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
