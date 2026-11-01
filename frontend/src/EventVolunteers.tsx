import { useEffect, useState } from "react";
import { formatEventDate, SevaEvent } from "./events";
import { ApiTaskSubmission, ApiVolunteer, eventsApi, rewardsApi } from "./api";

const assetPathPrefix = "/assets";
const imgProfile = `${assetPathPrefix}/80e95.png`;
const imgTreePlantingPhoto = `${assetPathPrefix}/b3227.png`;
const imgPortrait = `${assetPathPrefix}/50725.png`;
const imgPortrait1 = `${assetPathPrefix}/13166.png`;
const imgPortrait2 = `${assetPathPrefix}/a40aa.png`;
const imgPortrait3 = `${assetPathPrefix}/512a4.png`;
const imgRightLeaf = `${assetPathPrefix}/86b96.svg`;
const imgMiddleLeaf = `${assetPathPrefix}/8c7d1.svg`;
const imgLeftLeaf = `${assetPathPrefix}/d17b4.svg`;
const imgLeftLeaf1 = `${assetPathPrefix}/ad73e.svg`;
const imgMiddleLeaf1 = `${assetPathPrefix}/3554a.svg`;
const imgRightLeaf1 = `${assetPathPrefix}/db6e9.svg`;
const imgLavenderWave = `${assetPathPrefix}/b6675.svg`;
const imgIosSignal = `${assetPathPrefix}/37e0f.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/c2697.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/68e37.svg`;
const imgArrowLeft = `${assetPathPrefix}/656fd.svg`;
const imgBrandAccent = `${assetPathPrefix}/51e40.svg`;
const imgBrandAccent1 = `${assetPathPrefix}/30e15.svg`;
const imgNotifications = `${assetPathPrefix}/f5613.svg`;
const imgBotanicalSprig = `${assetPathPrefix}/566bb.svg`;
const imgSprout = `${assetPathPrefix}/bdac9.svg`;
const imgCheck = `${assetPathPrefix}/1305a.svg`;
const imgMapPin = `${assetPathPrefix}/aab5e.svg`;
const imgCalendarDays = `${assetPathPrefix}/ff614.svg`;
const imgUsers = `${assetPathPrefix}/099e6.svg`;
const imgClipboardCheck = `${assetPathPrefix}/5a93a.svg`;
const imgImage = `${assetPathPrefix}/375ff.svg`;
const imgChevronDown = `${assetPathPrefix}/3beea.svg`;
const imgPhone = `${assetPathPrefix}/f21eb.svg`;
const imgMessageSquare = `${assetPathPrefix}/f98c3.svg`;

export default function EventVolunteers({ event, onBack, onAssignments, onPhotos, onVolunteers, onCommunity, showNavigationTabs = true, readOnly = false }: { event: SevaEvent; onBack: () => void; onAssignments: () => void; onPhotos: () => void; onVolunteers?: () => void; onCommunity?: () => void; showNavigationTabs?: boolean; readOnly?: boolean }) {
  const [submissions, setSubmissions] = useState<ApiTaskSubmission[]>([]);
  const [volunteers, setVolunteers] = useState<ApiVolunteer[]>([]);
  const [volunteerLoading, setVolunteerLoading] = useState(false);
  const [volunteerError, setVolunteerError] = useState("");
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    if (!/^[a-f\d]{24}$/i.test(event.id)) return;
    setVolunteerLoading(true);
    setVolunteerError("");
    eventsApi.listVolunteers(event.id)
      .then(({ volunteers: next }) => setVolunteers(next))
      .catch((error) => {
        setVolunteers([]);
        setVolunteerError(error instanceof Error ? error.message : "Could not load volunteers.");
      })
      .finally(() => setVolunteerLoading(false));
    rewardsApi.listSubmissions(event.id)
      .then(({ submissions: next }) => setSubmissions(next))
      .catch(() => setSubmissions([]));
  }, [event.id]);

  async function reviewSubmission(
    submission: ApiTaskSubmission,
    status: "approved" | "rejected" | "resubmission_requested",
  ) {
    setReviewError("");
    try {
      const { submission: updated } = await rewardsApi.reviewSubmission(submission.id, status);
      setSubmissions((current) => current.map((item) => item.id === updated.id ? updated : item));
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : "Could not review proof.");
    }
  }

  return (
    <div className="bg-[#fcf8ff] content-stretch flex flex-col items-start relative min-h-dvh w-full" data-node-id="174:11970" data-name="Event Volunteers mobile">
      <div className="absolute bottom-[0.4px] h-[62px] left-0 overflow-clip w-[543px]" data-node-id="174:11971" data-name="Botanical footer">
        <div className="absolute h-[94px] left-[491px] overflow-clip top-[-12px] w-[74px]" data-node-id="174:11974" data-name="Decorative leaves">
          <div className="absolute h-[94px] left-0 overflow-clip top-0 w-[74px]" data-node-id="174:12457" data-name="Frame">
            <div className="absolute inset-[2.09%_2.68%_4.26%_54.72%]" data-node-id="174:12458" data-name="right-leaf">
              <div className="absolute inset-[0_0_-0.48%_0]">
                <img alt="" className="block max-w-none size-full" src={imgRightLeaf} />
              </div>
            </div>
            <div className="absolute inset-[4.49%_9.46%_4.26%_14.12%]" data-node-id="174:12461" data-name="middle-leaf">
              <div className="absolute inset-[0_-0.75%_-0.5%_0]">
                <img alt="" className="block max-w-none size-full" src={imgMiddleLeaf} />
              </div>
            </div>
            <div className="absolute inset-[34.24%_9.46%_4.26%_3.5%]" data-node-id="174:12464" data-name="left-leaf">
              <div className="absolute inset-[0_-0.66%_-0.74%_0]">
                <img alt="" className="block max-w-none size-full" src={imgLeftLeaf} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[94px] left-[-22px] overflow-clip top-[-12px] w-[74px]" data-node-id="174:11973" data-name="Decorative leaves">
          <div className="absolute h-[94px] left-0 overflow-clip top-0 w-[74px]" data-node-id="174:12447" data-name="Frame">
            <div className="absolute inset-[2.7%_58.82%_3.19%_2.7%]" data-node-id="174:12448" data-name="left-leaf">
              <div className="absolute inset-[0_0_-0.45%_0]">
                <img alt="" className="block max-w-none size-full" src={imgLeftLeaf1} />
              </div>
            </div>
            <div className="absolute inset-[4.7%_21.24%_3.19%_8.11%]" data-node-id="174:12451" data-name="middle-leaf">
              <div className="absolute inset-[0_0_-0.46%_-0.77%]">
                <img alt="" className="block max-w-none size-full" src={imgMiddleLeaf1} />
              </div>
            </div>
            <div className="absolute inset-[33.74%_2.33%_3.19%_8.11%]" data-node-id="174:12454" data-name="right-leaf">
              <div className="absolute inset-[0_0_-0.67%_-0.6%]">
                <img alt="" className="block max-w-none size-full" src={imgRightLeaf1} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[62px] left-0 top-[16px] w-[543px]" data-node-id="174:11972" data-name="Lavender wave">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLavenderWave} />
        </div>
      </div>
      <div className="content-stretch flex h-[48px] items-center justify-between overflow-clip px-[20px] relative shrink-0 w-full" data-node-id="174:11981" data-name="App header">
        <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-node-id="174:11982" data-name="Brand navigation" onClick={onBack} role="button" tabIndex={0}>
          <div className="relative shrink-0 size-[18px]" data-node-id="174:12484" data-name="arrow-left">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowLeft} />
          </div>
          <div className="h-[38px] relative shrink-0 w-[137px]" data-node-id="174:11984" data-name="SevaSathi brand">
            <div className="absolute flex h-[10.509px] items-center justify-center left-[115.12px] top-[-3px] w-[13.411px]" data-node-id="174:11987">
              <div className="flex-none rotate-65">
                <div className="h-[12px] relative w-[6px]" data-name="Brand accent">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBrandAccent} />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[15.124px] items-center justify-center left-[109px] top-[-12px] w-[12.196px]" data-node-id="174:11986">
              <div className="flex-none rotate-30">
                <div className="h-[14px] relative w-[6px]" data-name="Brand accent">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBrandAccent1} />
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] absolute font-['Arimo:Bold'] font-bold leading-[0] left-0 text-[#09090b] text-[24px] top-0 tracking-[-1.1px] whitespace-nowrap" data-node-id="174:11985">
              <span className="leading-[normal]">Seva</span>
              <span className="leading-[normal] text-[#8109d9]">Sathi</span>
            </p>
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-['Arimo:Bold'] font-bold leading-[normal] left-[calc(50%-30px)] text-[#09090b] text-[22px] top-[calc(50%-12.5px)] whitespace-nowrap" data-node-id="174:11988">
          Event
        </p>
        <div className="content-stretch flex gap-[17px] items-center overflow-clip relative shrink-0" data-node-id="174:11989" data-name="Account actions">
          <div className="h-[30px] relative shrink-0 w-[27px]" data-node-id="174:11990" data-name="Notifications">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNotifications} />
          </div>
          <div className="relative shrink-0 size-[36px]" data-node-id="174:11993" data-name="Profile">
            <img alt="" className="absolute block inset-0 max-w-none size-full" height="36" src={imgProfile} width="36" />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[18px] items-start overflow-clip pb-[56px] pt-[10px] px-[16px] relative shrink-0 w-full" data-node-id="174:11994" data-name="Event content">
        <div className="bg-gradient-to-b border border-[#d5c9e1] border-solid content-stretch flex from-[#f8eeff] gap-[17px] h-[140px] items-center overflow-clip p-[9px] relative rounded-[20px] shrink-0 to-[#f3e9fd] w-full" data-node-id="174:11995" data-name="Event summary">
          <div className="absolute bottom-[-9px] h-[100px] opacity-24 overflow-clip right-[-7px] w-[88px]" data-node-id="174:11996" data-name="Botanical watermark">
            <div className="absolute h-[100px] left-0 overflow-clip top-0 w-[88px]" data-node-id="174:12467" data-name="Frame">
              <div className="absolute inset-[1.99%_2.22%_1.75%_4.32%]" data-node-id="174:12468" data-name="botanical-sprig">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBotanicalSprig} />
              </div>
            </div>
          </div>
          <div className="h-[122px] relative rounded-[17px] shrink-0 w-[183px]" data-node-id="174:11997" data-name="Tree planting photo">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[17px] size-full" src={event.image || imgTreePlantingPhoto} />
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative" data-node-id="174:11998" data-name="Event details">
            <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="174:11999" data-name="Event status">
              <div className="bg-[#efd9f4] content-stretch flex gap-[7px] items-center overflow-clip px-[9px] py-[5px] relative rounded-[100px] shrink-0" data-node-id="174:12000" data-name="Category">
                <div className="relative shrink-0 size-[17px]" data-node-id="174:12490" data-name="sprout">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSprout} />
                </div>
                <p className="[word-break:break-word] font-['Arimo:Bold'] font-bold leading-[normal] relative shrink-0 text-[#09090b] text-[12px] whitespace-nowrap" data-node-id="174:12002">
                  {event.category}
                </p>
              </div>
              <div className={`${event.status === "Ongoing" ? "bg-[#e0f5cc]" : event.status === "Upcoming" ? "bg-[#ead5f8]" : "bg-[#ffe1ef]"} content-stretch flex gap-[7px] items-center overflow-clip px-[10px] py-[5px] relative rounded-[100px] shrink-0`} data-node-id="174:12003" data-name="Ongoing status">
                <div className="relative shrink-0 size-[15px]" data-node-id="174:12493" data-name="check">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} />
                </div>
                <p className="[word-break:break-word] font-['Arimo:Bold'] font-bold leading-[normal] relative shrink-0 text-[#09090b] text-[12px] whitespace-nowrap" data-node-id="174:12005">
                  {event.status}
                </p>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Arimo:Bold'] font-bold leading-[normal] min-w-full relative shrink-0 text-[#09090b] text-[20px] tracking-[-0.4px] w-[min-content]" data-node-id="174:12006">
              {event.title}
            </p>
            <div className="content-stretch flex gap-[7px] items-center overflow-clip relative shrink-0" data-node-id="174:12007" data-name="Location">
              <div className="relative shrink-0 size-[16px]" data-node-id="174:12496" data-name="map-pin">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMapPin} />
              </div>
              <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#09090b] text-[13px] whitespace-nowrap" data-node-id="174:12009">
                {event.location}
              </p>
            </div>
            <div className="content-stretch flex gap-[7px] items-center overflow-clip relative shrink-0" data-node-id="174:12010" data-name="Schedule">
              <div className="relative shrink-0 size-[16px]" data-node-id="174:12499" data-name="calendar-days">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCalendarDays} />
              </div>
              <p className="[word-break:break-word] font-['Arimo:Regular'] font-normal leading-[normal] relative shrink-0 text-[#09090b] text-[13px] whitespace-pre" data-node-id="174:12012">{`${formatEventDate(event.date)}  •  ${event.time}`}</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[18px] items-start px-[3px] relative shrink-0 w-full" data-node-id="174:12013" data-name="Event management">
          {readOnly && onCommunity && (
            <button
              className="flex w-full items-center justify-center gap-2 rounded-[15px] border border-[#d5c9e1] bg-[#933bc4] px-4 py-4 font-['Arimo:Bold'] text-[15px] text-white"
              onClick={onCommunity}
              type="button"
            >
              <img alt="" className="size-6 brightness-0 invert" src={imgMessageSquare} />
              Open community messages
            </button>
          )}
          <div className={showNavigationTabs ? "content-stretch flex flex-col gap-[9px] items-start relative shrink-0 w-full" : "hidden"} data-node-id="174:12014" data-name="Event navigation">
            <div className="content-stretch flex gap-[9px] items-start relative shrink-0 w-full">
              <div className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch cursor-pointer drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex flex-[1_0_0] flex-col gap-[8px] h-[90px] items-center justify-center min-w-px relative rounded-[15px]" data-node-id="174:12015" data-name="Event tab" onClick={onVolunteers} role="button" tabIndex={0}>
                <div className="relative shrink-0 size-[28px]" data-node-id="174:12502" data-name="users">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUsers} style={{ filter: "brightness(0) saturate(100%) invert(30%) sepia(63%) saturate(1800%) hue-rotate(258deg) brightness(88%) contrast(95%)" }} />
                </div>
                <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-node-id="174:12017" data-name="Tab label">
                  <p className="[word-break:break-word] font-['Arimo:Bold'] font-bold leading-[normal] relative shrink-0 text-[15px] text-[#09090b] whitespace-nowrap" data-node-id="174:12018">
                    1. Volunteers
                  </p>
                </div>
              </div>
              <div className={readOnly ? "hidden" : "bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex flex-[1_0_0] cursor-pointer flex-col gap-[8px] h-[90px] items-center justify-center min-w-px relative rounded-[15px]"} data-node-id="174:12020" data-name="Event tab" onClick={onAssignments} role="button" tabIndex={0}>
                <div className="relative shrink-0 size-[28px]" data-node-id="174:12505" data-name="clipboard-check">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClipboardCheck} />
                </div>
                <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-node-id="174:12022" data-name="Tab label">
                  <p className="[word-break:break-word] font-['Arimo:Bold'] font-bold leading-[normal] relative shrink-0 text-[#09090b] text-[15px] whitespace-nowrap" data-node-id="174:12023">
                    2. Task Assignments
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[9px] items-start relative shrink-0 w-full">
              <div className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch cursor-pointer drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex flex-[1_0_0] flex-col gap-[8px] h-[90px] items-center justify-center min-w-px relative rounded-[15px]" data-node-id="174:12024" data-name="Event tab" onClick={onPhotos} role="button" tabIndex={0}>
                <div className="relative shrink-0 size-[28px]" data-node-id="174:12508" data-name="image">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgImage} />
                </div>
                <div className="[word-break:break-word] content-stretch flex flex-col gap-px items-center leading-[normal] overflow-clip relative shrink-0 text-[#09090b] whitespace-nowrap" data-node-id="174:12026" data-name="Tab label">
                  <p className="font-['Arimo:Bold'] font-bold relative shrink-0 text-[15px]" data-node-id="174:12027">
                    3. Event Photos
                  </p>
                  <p className="font-['Arimo:Regular'] font-normal relative shrink-0 text-[13px]" data-node-id="174:12028">
                    (Geo-Tag)
                  </p>
                </div>
              </div>
              <div className="bg-[#fffcff] border border-[#d5c9e1] border-solid content-stretch cursor-pointer drop-shadow-[0px_2px_3.5px_rgba(117,34,171,0.07)] flex flex-[1_0_0] flex-col gap-[8px] h-[90px] items-center justify-center min-w-px relative rounded-[15px]" data-node-id="174:12029" data-name="Event tab" onClick={onCommunity} role="button" tabIndex={0}>
                <div className="relative shrink-0 size-[28px]" data-node-id="174:12509" data-name="message-square">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMessageSquare} />
                </div>
                <div className="[word-break:break-word] content-stretch flex flex-col gap-px items-center leading-[normal] overflow-clip relative shrink-0 text-[#09090b] whitespace-nowrap" data-node-id="174:12030" data-name="Tab label">
                  <p className="font-['Arimo:Bold'] font-bold relative shrink-0 text-[15px]" data-node-id="174:12031">
                    4. Community
                  </p>
                  <p className="font-['Arimo:Regular'] font-normal relative shrink-0 text-[13px]" data-node-id="174:12032">
                    (Chat)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="w-full rounded-[18px] border border-[#d5c9e1] bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-['Arimo:Bold'] text-[18px] font-bold text-[#29115e]">Volunteers</h2>
            <span className="text-sm text-[#756c7b]">{volunteers.length}/{event.capacity}</span>
          </div>
          {volunteerLoading && <p className="mt-3 text-sm text-[#756c7b]">Loading volunteers...</p>}
          {!volunteerLoading && volunteerError && <p className="mt-3 text-sm text-red-600" role="alert">{volunteerError}</p>}
          {!volunteerLoading && !volunteerError && volunteers.length === 0 && (
            <p className="mt-3 text-sm text-[#756c7b]">No volunteers have joined this event yet.</p>
          )}
          {!volunteerLoading && !volunteerError && volunteers.length > 0 && (
            <div className="mt-3 flex flex-col gap-3">
              {volunteers.map((volunteer) => (
                <div className="flex items-center gap-3 border-t border-[#eadcf3] pt-3" key={volunteer.id}>
                  {volunteer.photoUrl ? (
                    <img alt="" className="h-12 w-12 rounded-full object-cover" src={volunteer.photoUrl} />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ead5f8] font-bold text-[#6606ae]">
                      {volunteer.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#09090b]">{volunteer.name}</p>
                    <p className="text-xs text-[#756c7b]">{volunteer.assignment}{volunteer.location ? ` · ${volunteer.location}` : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        {!readOnly && submissions.length > 0 && (
          <section className="w-full rounded-[18px] border border-[#d5c9e1] bg-white p-4">
            <h2 className="font-['Arimo:Bold'] text-[18px] font-bold text-[#29115e]">Task proof approvals</h2>
            <div className="mt-3 flex flex-col gap-3">
              {submissions.map((submission) => (
                <article className="rounded-xl border border-[#eadcf3] p-3" key={submission.id}>
                  <img alt="Submitted task proof" className="h-32 w-full rounded-lg object-cover" src={submission.proof.imageUrl} />
                  <p className="mt-2 text-sm font-semibold text-[#29115e]">Status: {submission.status}</p>
                  {submission.status === "submitted" && (
                    <div className="mt-2 flex gap-2">
                      <button className="rounded-lg bg-[#8c23df] px-3 py-2 text-xs font-bold text-white" onClick={() => reviewSubmission(submission, "approved")} type="button">Approve +50 XP</button>
                      <button className="rounded-lg bg-[#ffe1ef] px-3 py-2 text-xs font-bold text-[#8e246d]" onClick={() => reviewSubmission(submission, "resubmission_requested")} type="button">Request resubmission</button>
                      <button className="rounded-lg border border-[#d5c9e1] px-3 py-2 text-xs font-bold" onClick={() => reviewSubmission(submission, "rejected")} type="button">Reject</button>
                    </div>
                  )}
                </article>
              ))}
            </div>
            {reviewError && <p className="mt-2 text-sm text-red-600" role="alert">{reviewError}</p>}
          </section>
        )}
      </div>
    </div>
  );
}
