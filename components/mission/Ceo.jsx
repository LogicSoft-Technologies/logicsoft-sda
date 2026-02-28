"use client";

export default function Ceo() {
  return (
    <section
      id="ceo-quote"
      aria-label="Message from the CEO"
      className="py-20 bg-white border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-6">
        <div className="grid md:grid-cols-[220px_1fr] gap-10 items-start">

          {/* ── Author ── */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-[140px] h-[140px] overflow-hidden border border-gray-200 shrink-0">
              <img
                src="/about/experts/elijah-alexander.jpg"
                alt="Elijah O Alexander — CEO, Logicsoft Technologies"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-[#1f3a5f] leading-snug">
                Elijah O Alexander
              </p>
              <p className="text-[13px] text-[#1f6fb2] mt-0.5">
                CEO, Logicsoft Technologies
              </p>
            </div>
          </div>

          {/* ── Quote ── */}
          <blockquote className="relative">
            {/* Opening quote mark */}
            <span
              className="absolute -top-4 -left-2 text-[80px] leading-none text-[#1f6fb2]/15 font-serif select-none"
              aria-hidden="true"
            >
              "
            </span>

            <div className="border-l-[3px] border-[#1f6fb2] pl-7 pt-2">
              <p className="text-[18px] lg:text-[20px] text-[#1f3a5f] font-serif font-normal leading-[1.75]">
                At Logicsoft Technologies, we take pride in our "Can do" culture,
                believing that exceptional results are achievable even in the most
                challenging conditions. Complexity doesn't intimidate us — it inspires
                us to innovate and improve. By combining deep technical expertise with
                strategic, result-oriented project management, we help our clients
                succeed where others see only obstacles.
              </p>
            </div>
          </blockquote>

        </div>
      </div>
    </section>
  );
}