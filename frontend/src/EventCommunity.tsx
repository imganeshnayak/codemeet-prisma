import { SevaEvent } from "./events";
import { useState } from "react";

const TabIcon = ({ name }: { name: "users" | "clipboard" | "image" | "chat" }) => {
  const paths: Record<string, React.ReactNode> = {
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5" />
      </>
    ),
    clipboard: (
      <>
        <rect x="4" y="4" width="16" height="18" rx="2" />
        <path d="M9 2h6v4H9z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 20" />
      </>
    ),
    chat: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      className="size-[22px]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
};

export default function EventCommunity({
  event,
  onBack,
  onVolunteers,
  onAssignments,
  onPhotos,
  onCommunity,
  showNavigationTabs = true,
}: {
  event: SevaEvent;
  onBack: () => void;
  onVolunteers: () => void;
  onAssignments: () => void;
  onPhotos: () => void;
  onCommunity: () => void;
  showNavigationTabs?: boolean;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { name: "Disha J Kotian", text: "Looking forward to planting saplings together!", mine: false },
    { name: "Chaithali R Shettigar", text: "I can bring extra gloves and water bottles.", mine: false },
    { name: "You", text: "Great, see you all at 9 AM!", mine: true },
  ]);

  function send() {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { name: "You", text: trimmed, mine: true }]);
    setMessage("");
  }

  return (
    <div className="bg-[#fcf8ff] content-stretch flex flex-col items-start relative min-h-dvh w-full">
      <div className="content-stretch flex h-[48px] items-center justify-between overflow-clip px-[20px] relative shrink-0 w-full">
        <button
          aria-label="Back to event"
          className="flex size-[30px] items-center justify-center rounded-full border border-[#d5c9e1] text-[18px] text-[#09090b]"
          onClick={onBack}
          type="button"
        >
          ←
        </button>
        <p className="font-['Arimo:Bold'] font-bold text-[#09090b] text-[22px] absolute left-[calc(50%-30px)]">Community</p>
      </div>
      <div className="content-stretch flex flex-col gap-[18px] items-start overflow-clip pb-[56px] pt-[10px] px-[16px] relative shrink-0 w-full">
        <div className={showNavigationTabs ? "content-stretch flex flex-col gap-[9px] items-start relative shrink-0 w-full" : "hidden"} data-name="Event navigation">
          <div className="content-stretch flex gap-[9px] items-start relative shrink-0 w-full">
            <div className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex flex-[1_0_0] cursor-pointer flex-col gap-[8px] h-[90px] items-center justify-center min-w-px relative rounded-[15px]" onClick={onVolunteers} role="button" tabIndex={0}>
              <div className="text-[#09090b]"><TabIcon name="users" /></div>
              <p className="font-['Arimo:Bold'] font-bold text-[#09090b] text-[15px]">1. Volunteers</p>
            </div>
            <div className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex flex-[1_0_0] cursor-pointer flex-col gap-[8px] h-[90px] items-center justify-center min-w-px relative rounded-[15px]" onClick={onAssignments} role="button" tabIndex={0}>
              <div className="text-[#09090b]"><TabIcon name="clipboard" /></div>
              <p className="font-['Arimo:Bold'] font-bold text-[#09090b] text-[15px]">2. Task Assignments</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[9px] items-start relative shrink-0 w-full">
            <div className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch cursor-pointer drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex flex-[1_0_0] flex-col gap-[8px] h-[90px] items-center justify-center min-w-px relative rounded-[15px]" onClick={onPhotos} role="button" tabIndex={0}>
              <div className="text-[#09090b]"><TabIcon name="image" /></div>
              <div className="flex flex-col items-center gap-px">
                <p className="font-['Arimo:Bold'] font-bold text-[#09090b] text-[15px]">3. Event Photos</p>
                <p className="font-['Arimo:Regular'] text-[#09090b] text-[13px]">(Geo-Tag)</p>
              </div>
            </div>
            <div className="bg-[#933bc4] border border-[#933bc4] border-solid content-stretch cursor-pointer drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex flex-[1_0_0] flex-col gap-[8px] h-[90px] items-center justify-center min-w-px relative rounded-[15px]" onClick={onCommunity} role="button" tabIndex={0}>
              <div className="text-white"><TabIcon name="chat" /></div>
              <div className="flex flex-col items-center gap-px">
                <p className="font-['Arimo:Bold'] font-bold text-white text-[15px]">4. Community</p>
                <p className="font-['Arimo:Regular'] text-white text-[13px]">(Chat)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch flex flex-col items-start overflow-clip pb-[8px] pt-[10px] px-[16px] relative rounded-[15px] shrink-0 w-full min-h-[320px]">
          <p className="font-['Arimo:Bold'] font-bold text-[#09090b] text-[19px] mb-[10px]">Volunteer Community Chat</p>
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full flex-1 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex w-full ${m.mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-[12px] px-[12px] py-[8px] ${m.mine ? "bg-[#933bc4] text-white" : "bg-[#ead5f8] text-[#09090b]"}`}>
                  {!m.mine && <p className="font-['Arimo:Bold'] font-bold text-[11px] mb-[2px]">{m.name}</p>}
                  <p className="font-['Arimo:Regular'] text-[14px]">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full mt-[10px]">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="Type a message..."
              className="flex-[1_0_0] min-w-px h-[40px] rounded-[10px] border border-[#d5c9e1] px-[12px] font-['Arimo:Regular'] text-[14px] outline-none"
            />
            <button onClick={send} className="bg-[#933bc4] text-white font-['Arimo:Bold'] font-bold h-[40px] px-[16px] rounded-[10px]">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
