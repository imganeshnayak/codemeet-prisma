import { useState } from "react"

const asset = (name: string) => `/assets/donation-tracker/${name}`

const journey = [
  {
    title: "Donation Received",
    description: "Your donation was collected.",
    time: "10 Oct, 10:24 AM",
    photo: "fd25f.png",
  },
  {
    title: "Sorted & Prepared",
    description: "Items were verified and packed for distribution.",
    time: "10 Oct, 03:15 PM",
    photo: "405bb.png",
  },
  {
    title: "Delivered",
    description: "Donation was delivered to the community.",
    time: "11 Oct, 11:30 AM",
    photo: "41231.png",
  },
  {
    title: "Received & Confirmed",
    description: "The receiver has confirmed successful receipt.",
    time: "11 Oct, 11:45 AM",
    photo: "ab234.png",
    received: true,
  },
]

const categories = [
  { label: "Clothes", icon: "dde4a.svg" },
  { label: "Food", icon: "d214b.svg" },
  { label: "Funds", icon: "2f73f.svg" },
]

function Brand() {
  return (
    <div className="flex items-center" aria-label="SevaSathi">
      <span className="font-['Inter:Black'] text-[22px] font-black tracking-[-1.2px]">
        Seva<span className="text-[#9800f8]">Sathi</span>
      </span>
      <img alt="" className="h-[22px] w-[18px]" src={asset("6af05.svg")} />
    </div>
  )
}

function HeroArtwork() {
  return (
    <div className="donation-hero-art" aria-hidden="true">
      <img className="art-backdrop" src={asset("8c72a.svg")} />
      <img className="art-heart" src={asset("1ca31.svg")} />
      <img className="art-rays" src={asset("b71b6.svg")} />
      <img className="art-left-sprig" src={asset("2eaca.svg")} />
      <img className="art-right-sprig" src={asset("b4396.svg")} />
      <img className="art-box-back" src={asset("4a8b2.svg")} />
      <img className="art-shirt" src={asset("39552.svg")} />
      <img className="art-white-bottle" src={asset("b9e3f.svg")} />
      <img className="art-purple-bottle" src={asset("4bff2.svg")} />
      <img className="art-clothes" src={asset("ed920.svg")} />
      <img className="art-box-body" src={asset("e1b48.svg")} />
      <img className="art-box-flap" src={asset("77008.svg")} />
      <img className="art-box-heart" src={asset("bab07.svg")} />
    </div>
  )
}

function DecorativeGarden() {
  return (
    <div className="donation-garden" aria-hidden="true">
      <img className="absolute inset-0 h-full w-full" src={asset("cea03.svg")} />
      <img className="garden-left-upright" src={asset("22810.svg")} />
      <img className="garden-left-outward" src={asset("d469d.svg")} />
      <img className="garden-left-sweeping" src={asset("bf6a7.svg")} />
      <img className="garden-right-upright" src={asset("c5579.svg")} />
      <img className="garden-right-outward" src={asset("fa39e.svg")} />
      <img className="garden-right-sweeping" src={asset("a6790.svg")} />
    </div>
  )
}

export default function DonationTracker({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState("Clothes")
  const [showProofNotice, setShowProofNotice] = useState(false)

  return (
    <main className="donation-tracker min-h-dvh bg-[#fffbff] text-black">
      <header className="mx-auto flex h-[54px] w-full max-w-[760px] items-center justify-between px-[22px]">
        <button
          aria-label="Back to tasks"
          className="flex h-9 w-9 items-center justify-start"
          onClick={onBack}
          type="button"
        >
          <img alt="" className="h-6 w-6" src={asset("6c9ad.svg")} />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Brand />
        </div>
        <div className="flex items-center gap-[15px]">
          <button aria-label="Notifications" className="relative" type="button">
            <img alt="" className="h-7 w-[21px]" src={asset("fb050.svg")} />
          </button>
          <button aria-label="Open profile" type="button">
            <img
              alt="Aarav Sharma"
              className="h-[33px] w-[33px]"
              src={asset("52dd4.png")}
            />
          </button>
        </div>
      </header>

      <section className="relative mx-auto h-[171px] w-full max-w-[760px] overflow-hidden px-[22px] pt-1">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border-[0.7px] border-[#9800f8] bg-[#f5e8fc] px-[11px] py-1.5">
            <img alt="" className="h-[19px] w-[19px]" src={asset("9d200.svg")} />
            <span className="font-['Inter:Bold'] text-xs font-bold">
              Donation Tracker
            </span>
          </div>
          <h1 className="mt-[10px] font-['Inter:Black'] text-[24px] font-black leading-[1.03] tracking-[-0.9px]">
            Track Your
            <br />
            Donation
            <br />
            with{" "}
            <span className="inline-block rounded-[11px] border-[0.7px] border-[#74852a] bg-[#beff21] px-[5px] leading-[1.15]">
              Live Proof.
            </span>
          </h1>
          <p className="mt-2 w-[225px] font-['Inter:Regular'] text-[10.5px] leading-[1.32] text-[#33333f]">
            See the complete journey of your donation
            <br />— from your hand to the right people.
          </p>
        </div>
        <HeroArtwork />
      </section>

      <section className="mx-auto flex w-full max-w-[760px] flex-col gap-[13px] px-[13px] pb-1">
        <div
          className="grid h-11 grid-cols-3 rounded-full border-[0.7px] border-[#9800f8] bg-[#f5e8fc] p-[3px]"
          role="tablist"
        >
          {categories.map((item) => {
            const active = category === item.label
            return (
              <button
                aria-selected={active}
                className={`flex items-center justify-center gap-2 rounded-full font-['Inter:Semi_Bold'] text-[13px] font-semibold transition ${
                  active ? "bg-[#9800f8] text-white" : "text-[#080909]"
                }`}
                key={item.label}
                onClick={() => setCategory(item.label)}
                role="tab"
                type="button"
              >
                <img alt="" className="h-[21px] w-[21px]" src={asset(item.icon)} />
                {item.label}
              </button>
            )
          })}
        </div>

        <article className="flex h-[75px] items-center gap-[10px] rounded-2xl border-[0.8px] border-[#c9addf] bg-[#fffbff] p-[9px]">
          <div className="relative flex h-[57px] w-[92px] shrink-0 items-end overflow-hidden rounded-[10px]">
            <img
              alt="Folded clothes ready for donation"
              className="absolute inset-0 h-full w-full object-cover"
              src={asset("6d276.png")}
            />
            <span className="relative flex h-[18px] w-full items-center justify-center rounded-full bg-[#9800f8] font-['Inter:Semi_Bold'] text-[9px] font-semibold text-white">
              Clothes Donation
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-['Inter:Extra_Bold'] text-[15px] font-extrabold tracking-[-0.6px]">
              Donation #DN-4821
            </h2>
            <p className="mt-[7px] font-['Inter:Regular'] text-[10.5px] text-[#33333f]">
              10 Oct 2025 • 12 Items
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#bbfbc1] px-1.5 py-[5px]">
            <img alt="" className="h-[15px] w-[15px]" src={asset("aa2e6.svg")} />
            <span className="font-['Inter:Bold'] text-[9px] font-bold">Completed</span>
          </div>
        </article>

        <h2 className="pl-3 font-['Inter:Extra_Bold'] text-[17px] font-extrabold">
          Donation Journey
        </h2>

        <div className="relative flex flex-col gap-[7px] pl-8 pr-[3px]">
          <div className="absolute bottom-[35px] left-5 top-4 w-[2.5px] bg-[#9800f8]" />
          {journey.map((step) => (
            <article className="relative h-[70px]" key={step.title}>
              <div className="flex h-full items-center gap-[5px] overflow-hidden rounded-2xl border-[0.8px] border-[#dccde7] bg-[#fcf7ff] py-[5px] pl-[19px] pr-[9px]">
                <div className="min-w-0 flex-1">
                  <h3 className="font-['Inter:Extra_Bold'] text-[13.2px] font-extrabold leading-normal tracking-[-0.5px]">
                    {step.title}
                  </h3>
                  <p className="mt-[2px] max-w-[180px] font-['Inter:Regular'] text-[10.1px] leading-[1.18] text-[#33333f]">
                    {step.description}
                  </p>
                  <div className="mt-[2px] flex items-center gap-1">
                    <img alt="" className="h-3 w-3" src={asset("811c1.svg")} />
                    <span className="font-['Inter:Regular'] text-[9.7px]">
                      {step.time}
                    </span>
                  </div>
                </div>
                <div className="relative h-[60px] w-[113px] shrink-0 overflow-hidden rounded-[10px]">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src={asset(step.photo)}
                  />
                  {step.received && (
                    <span className="absolute bottom-[3px] right-[3px] flex items-center gap-[3px] rounded-full bg-white p-[3px] font-['Inter:Bold'] text-[8px] font-bold">
                      <img alt="" className="h-[13px] w-[13px]" src={asset("6d04a.svg")} />
                      Received
                    </span>
                  )}
                </div>
              </div>
              <span className="absolute left-[-23px] top-2 flex h-6 w-6 items-center justify-center rounded-full border-[1.2px] border-[#8700db] bg-[#beff21]">
                <img alt="" className="h-[15px] w-[15px]" src={asset("606ab.svg")} />
              </span>
            </article>
          ))}
        </div>

        <div className="px-[15px] pt-[3px]">
          <button
            className="flex h-[39px] w-full items-center justify-center gap-3 rounded-full border border-[#9800f8] bg-[#f5e8fc] font-['Inter:Extra_Bold'] text-sm font-extrabold"
            onClick={() => setShowProofNotice(true)}
            type="button"
          >
            <img alt="" className="h-[22px] w-[22px]" src={asset("05631.svg")} />
            View Full Proofs
            <img alt="" className="h-5 w-5" src={asset("77d65.svg")} />
          </button>
        </div>
        {showProofNotice && (
          <p
            className="text-center font-['Inter:Bold'] text-[11px] font-bold text-[#6500a4]"
            role="status"
          >
            All donation proofs are shown above.
          </p>
        )}
      </section>
      <DecorativeGarden />
    </main>
  )
}
