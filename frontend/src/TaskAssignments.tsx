import { formatEventDate, SevaEvent } from "./events";

const assetPathPrefix = "/assets";
const imgHandsPlantingASeedling = `${assetPathPrefix}/d9142.png`;
const imgArrowLeft = `${assetPathPrefix}/411df.svg`;
const imgEllipsisVertical = `${assetPathPrefix}/01ee4.svg`;
const imgMapPin = `${assetPathPrefix}/bbf3e.svg`;
const imgCalendarDays = `${assetPathPrefix}/c8d4e.svg`;
const imgUsers = `${assetPathPrefix}/74a51.svg`;
const imgClipboardCheck = `${assetPathPrefix}/f391c.svg`;
const imgImage = `${assetPathPrefix}/a3d12.svg`;
const imgPlus = `${assetPathPrefix}/dd5fa.svg`;
const imgSprout = `${assetPathPrefix}/bf2a6.svg`;
const imgUsers1 = `${assetPathPrefix}/dc8e9.svg`;
const imgChevronRight = `${assetPathPrefix}/e1d08.svg`;
const imgDroplet = `${assetPathPrefix}/08fcd.svg`;
const imgCamera = `${assetPathPrefix}/9c882.svg`;
const imgTrash2 = `${assetPathPrefix}/294e5.svg`;

export default function TaskAssignments({ event, onBack, onVolunteers, onPhotos }: { event: SevaEvent; onBack: () => void; onVolunteers: () => void; onPhotos: () => void }) {
  return (
    <div className="bg-[#fcf9ff] content-stretch flex flex-col items-start relative min-h-dvh w-full" data-node-id="199:641" data-name="Task assignments · Mobile">
      <div className="border-[#e2cff3] border-b border-solid content-stretch flex gap-[14px] h-[56px] items-center overflow-clip px-[18px] relative shrink-0 w-full" data-node-id="199:642" data-name="Event header">
        <div className="content-stretch flex cursor-pointer items-center justify-center overflow-clip relative shrink-0 size-[32px]" data-node-id="199:643" data-name="Back" onClick={onBack} role="button" tabIndex={0}>
          <div className="relative shrink-0 size-[21px]" data-node-id="199:855" data-name="arrow-left">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowLeft} />
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Bold'] font-bold leading-[normal] min-w-px relative text-[#29115e] text-[18px]" data-node-id="199:645" style={{ fontVariationSettings: '"wdth" 100' }}>
          Event details
        </p>
        <div className="relative shrink-0 size-[20px]" data-node-id="199:858" data-name="ellipsis-vertical">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipsisVertical} />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip pb-[28px] pt-[16px] px-[13px] relative shrink-0 w-full" data-node-id="199:647" data-name="Event workspace">
        <div className="bg-[#eedffb] content-stretch flex gap-[13px] items-center overflow-clip p-[12px] relative rounded-[13px] shrink-0 w-full" data-node-id="199:648" data-name="Event summary">
          <div className="h-[76px] overflow-clip relative rounded-[10px] shrink-0 w-[104px]" data-node-id="199:649" data-name="Planting photograph">
            <div className="absolute h-[518.182px] left-[-98.27px] top-0 w-[690.909px]" data-node-id="199:650" data-name="Hands planting a seedling">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={event.image || imgHandsPlantingASeedling} />
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-start min-w-px overflow-clip relative" data-node-id="199:651" data-name="Event information">
            <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] min-w-full relative shrink-0 text-[#29115e] text-[16px] w-[min-content]" data-node-id="199:652" style={{ fontVariationSettings: '"wdth" 100' }}>
              {event.title}
            </p>
            <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="199:653" data-name="Location">
              <div className="relative shrink-0 size-[13px]" data-node-id="199:861" data-name="map-pin">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMapPin} />
              </div>
              <p className="[word-break:break-word] font-['Roboto:Regular'] font-normal leading-[normal] relative shrink-0 text-[#191022] text-[10px] whitespace-nowrap" data-node-id="199:655" style={{ fontVariationSettings: '"wdth" 100' }}>
                {event.location}
              </p>
            </div>
            <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-node-id="199:656" data-name="Schedule">
              <div className="relative shrink-0 size-[13px]" data-node-id="199:864" data-name="calendar-days">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCalendarDays} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[normal] min-w-px relative text-[#191022] text-[10px] whitespace-pre-wrap" data-node-id="199:658" style={{ fontVariationSettings: '"wdth" 100' }}>{`${formatEventDate(event.date)}  •  ${event.time}`}</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full" data-node-id="199:659" data-name="Event tabs">
          <div className="bg-[#fffcff] border border-[#e2cff3] border-solid content-stretch cursor-pointer drop-shadow-[0px_3px_4px_rgba(82,36,119,0.04)] flex flex-[1_0_0] flex-col gap-[5px] h-[72px] items-center justify-center min-w-px relative rounded-[10px]" data-node-id="199:660" data-name="Event tab" onClick={onVolunteers} role="button" tabIndex={0}>
            <div className="relative shrink-0 size-[22px]" data-node-id="199:867" data-name="users">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUsers} />
            </div>
            <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] relative shrink-0 text-[#29115e] text-[10.5px] whitespace-nowrap" data-node-id="199:662" style={{ fontVariationSettings: '"wdth" 100' }}>
              1. Volunteers
            </p>
          </div>
          <div className="bg-[#9036cd] border border-[#9036cd] border-solid content-stretch drop-shadow-[0px_3px_4px_rgba(82,36,119,0.04)] flex flex-[1_0_0] flex-col gap-[5px] h-[72px] items-center justify-center min-w-px relative rounded-[10px]" data-node-id="199:663" data-name="Event tab">
            <div className="relative shrink-0 size-[22px]" data-node-id="199:870" data-name="clipboard-check">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClipboardCheck} />
            </div>
            <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] relative shrink-0 text-[10.5px] text-white whitespace-nowrap" data-node-id="199:665" style={{ fontVariationSettings: '"wdth" 100' }}>
              2. Task Assignments
            </p>
            <div className="-translate-x-1/2 absolute bottom-[-9.56px] flex items-center justify-center left-[calc(50%-5.67px)] size-[15.556px]" data-node-id="199:666">
              <div className="flex-none rotate-45">
                <div className="bg-[#9036cd] relative size-[11px]" data-name="Active tab pointer" />
              </div>
            </div>
          </div>
          <div className="bg-[#fffcff] border border-[#e2cff3] border-solid content-stretch cursor-pointer drop-shadow-[0px_3px_4px_rgba(82,36,119,0.04)] flex flex-[1_0_0] flex-col gap-[5px] h-[72px] items-center justify-center min-w-px relative rounded-[10px]" data-node-id="199:667" data-name="Event tab" onClick={onPhotos} role="button" tabIndex={0}>
            <div className="relative shrink-0 size-[22px]" data-node-id="199:873" data-name="image">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgImage} />
            </div>
            <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] relative shrink-0 text-[#29115e] text-[10.5px] whitespace-nowrap" data-node-id="199:669" style={{ fontVariationSettings: '"wdth" 100' }}>
              3. Event Photos
            </p>
            <p className="[word-break:break-word] font-['Roboto:Regular'] font-normal leading-[0.8] relative shrink-0 text-[#191022] text-[9px] whitespace-nowrap" data-node-id="199:670" style={{ fontVariationSettings: '"wdth" 100' }}>
              (Geo-Tag)
            </p>
          </div>
        </div>
        <div className="bg-[#fffcff] border border-[#e2cff3] border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[10px] relative rounded-[13px] shadow-[0px_3px_8px_0px_rgba(82,36,119,0.04)] shrink-0 w-full" data-node-id="199:671" data-name="Task assignments">
          <div className="content-stretch flex items-center justify-between overflow-clip pb-[4px] relative shrink-0 w-full" data-node-id="199:672" data-name="Section heading">
            <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] relative shrink-0 text-[#191022] text-[14px] whitespace-nowrap" data-node-id="199:673" style={{ fontVariationSettings: '"wdth" 100' }}>
              Task Assignments ({event.tasks})
            </p>
            <div className="bg-[#f6eefc] border border-[#9b20ed] border-solid content-stretch flex gap-[5px] h-[26px] items-center overflow-clip px-[9px] relative rounded-[30px] shrink-0" data-node-id="199:674" data-name="Add task">
              <div className="relative shrink-0 size-[12px]" data-node-id="199:876" data-name="plus">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
              </div>
              <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#9b20ed] text-[10px] whitespace-nowrap" data-node-id="199:676" style={{ fontVariationSettings: '"wdth" 100' }}>
                Add Task
              </p>
            </div>
          </div>
          <div className="bg-[#fcf9ff] border border-[#e2cff3] border-solid content-stretch flex gap-[9px] items-center min-h-[80px] overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full" data-node-id="199:677" data-name="Task card">
            <div className="bg-[#edfbd8] content-stretch flex h-[36px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[32px]" data-node-id="199:678" data-name="Task symbol">
              <div className="relative shrink-0 size-[22px]" data-node-id="199:879" data-name="sprout">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSprout} />
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip relative" data-node-id="199:680" data-name="Task information">
              <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] min-w-full relative shrink-0 text-[#191022] text-[12px] w-[min-content]" data-node-id="199:681" style={{ fontVariationSettings: '"wdth" 100' }}>
                Planting Saplings
              </p>
              <p className="[word-break:break-word] font-['Roboto:Regular'] font-normal leading-[normal] min-w-full relative shrink-0 text-[#685775] text-[9.5px] w-[min-content]" data-node-id="199:682" style={{ fontVariationSettings: '"wdth" 100' }}>
                Plant and secure the saplings.
              </p>
              <div className="content-stretch flex gap-[4px] items-center overflow-clip relative shrink-0" data-node-id="199:683" data-name="Assignment count">
                <div className="relative shrink-0 size-[11px]" data-node-id="199:882" data-name="users">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUsers1} />
                </div>
                <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[#29115e] text-[9px] whitespace-nowrap" data-node-id="199:685" style={{ fontVariationSettings: '"wdth" 100' }}>
                  5 Assigned
                </p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0" data-node-id="199:686" data-name="Assigned volunteers">
              <div className="border-[#fffcff] border-[1.2px] border-solid mr-[-5px] overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:687" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-331.67px] top-[-236.04px] w-[484.211px]" data-node-id="199:688" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
              <div className="border-[#fffcff] border-[1.2px] border-solid mr-[-5px] overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:689" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-351.04px] top-[-236.04px] w-[484.211px]" data-node-id="199:690" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
              <div className="border-[#fffcff] border-[1.2px] border-solid mr-[-5px] overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:691" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-370.41px] top-[-236.04px] w-[484.211px]" data-node-id="199:692" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
              <div className="bg-[#eedffb] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[23px]" data-node-id="199:693" data-name="More volunteers">
                <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] relative shrink-0 text-[#29115e] text-[9px] whitespace-nowrap" data-node-id="199:694" style={{ fontVariationSettings: '"wdth" 100' }}>
                  +2
                </p>
              </div>
            </div>
            <div className="relative shrink-0 size-[15px]" data-node-id="199:885" data-name="chevron-right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
            </div>
          </div>
          <div className="bg-[#fcf9ff] border border-[#e2cff3] border-solid content-stretch flex gap-[9px] items-center min-h-[80px] overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full" data-node-id="199:696" data-name="Task card">
            <div className="bg-[#e0f5fd] content-stretch flex h-[36px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[32px]" data-node-id="199:697" data-name="Task symbol">
              <div className="relative shrink-0 size-[22px]" data-node-id="199:888" data-name="droplet">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDroplet} />
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip relative" data-node-id="199:699" data-name="Task information">
              <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] min-w-full relative shrink-0 text-[#191022] text-[12px] w-[min-content]" data-node-id="199:700" style={{ fontVariationSettings: '"wdth" 100' }}>{`Watering & Maintenance`}</p>
              <p className="[word-break:break-word] font-['Roboto:Regular'] font-normal leading-[normal] min-w-full relative shrink-0 text-[#685775] text-[9.5px] w-[min-content]" data-node-id="199:701" style={{ fontVariationSettings: '"wdth" 100' }}>
                Water the planted saplings.
              </p>
              <div className="content-stretch flex gap-[4px] items-center overflow-clip relative shrink-0" data-node-id="199:702" data-name="Assignment count">
                <div className="relative shrink-0 size-[11px]" data-node-id="199:891" data-name="users">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUsers1} />
                </div>
                <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[#29115e] text-[9px] whitespace-nowrap" data-node-id="199:704" style={{ fontVariationSettings: '"wdth" 100' }}>
                  3 Assigned
                </p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0" data-node-id="199:705" data-name="Assigned volunteers">
              <div className="border-[#fffcff] border-[1.2px] border-solid mr-[-5px] overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:706" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-331.67px] top-[-236.04px] w-[484.211px]" data-node-id="199:707" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
              <div className="border-[#fffcff] border-[1.2px] border-solid mr-[-5px] overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:708" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-351.04px] top-[-236.04px] w-[484.211px]" data-node-id="199:709" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
              <div className="border-[#fffcff] border-[1.2px] border-solid overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:710" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-370.41px] top-[-236.04px] w-[484.211px]" data-node-id="199:711" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
            </div>
            <div className="relative shrink-0 size-[15px]" data-node-id="199:894" data-name="chevron-right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
            </div>
          </div>
          <div className="bg-[#fcf9ff] border border-[#e2cff3] border-solid content-stretch flex gap-[9px] items-center min-h-[80px] overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full" data-node-id="199:713" data-name="Task card">
            <div className="bg-[#eedffb] content-stretch flex h-[36px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[32px]" data-node-id="199:714" data-name="Task symbol">
              <div className="relative shrink-0 size-[22px]" data-node-id="199:897" data-name="camera">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCamera} />
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip relative" data-node-id="199:716" data-name="Task information">
              <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] min-w-full relative shrink-0 text-[#191022] text-[12px] w-[min-content]" data-node-id="199:717" style={{ fontVariationSettings: '"wdth" 100' }}>
                Event Documentation
              </p>
              <p className="[word-break:break-word] font-['Roboto:Regular'] font-normal leading-[normal] min-w-full relative shrink-0 text-[#685775] text-[9.5px] w-[min-content]" data-node-id="199:718" style={{ fontVariationSettings: '"wdth" 100' }}>
                Capture photos and videos of the event.
              </p>
              <div className="content-stretch flex gap-[4px] items-center overflow-clip relative shrink-0" data-node-id="199:719" data-name="Assignment count">
                <div className="relative shrink-0 size-[11px]" data-node-id="199:900" data-name="users">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUsers1} />
                </div>
                <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[#29115e] text-[9px] whitespace-nowrap" data-node-id="199:721" style={{ fontVariationSettings: '"wdth" 100' }}>
                  2 Assigned
                </p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0" data-node-id="199:722" data-name="Assigned volunteers">
              <div className="border-[#fffcff] border-[1.2px] border-solid mr-[-5px] overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:723" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-331.67px] top-[-236.04px] w-[484.211px]" data-node-id="199:724" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
              <div className="border-[#fffcff] border-[1.2px] border-solid overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:725" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-351.04px] top-[-236.04px] w-[484.211px]" data-node-id="199:726" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
            </div>
            <div className="relative shrink-0 size-[15px]" data-node-id="199:903" data-name="chevron-right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
            </div>
          </div>
          <div className="bg-[#fcf9ff] border border-[#e2cff3] border-solid content-stretch flex gap-[9px] items-center min-h-[80px] overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full" data-node-id="199:728" data-name="Task card">
            <div className="bg-[#fff3d6] content-stretch flex h-[36px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[32px]" data-node-id="199:729" data-name="Task symbol">
              <div className="relative shrink-0 size-[22px]" data-node-id="199:906" data-name="trash-2">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrash2} />
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px overflow-clip relative" data-node-id="199:731" data-name="Task information">
              <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] min-w-full relative shrink-0 text-[#191022] text-[12px] w-[min-content]" data-node-id="199:732" style={{ fontVariationSettings: '"wdth" 100' }}>{`Cleanup & Waste Management`}</p>
              <p className="[word-break:break-word] font-['Roboto:Regular'] font-normal leading-[normal] min-w-full relative shrink-0 text-[#685775] text-[9.5px] w-[min-content]" data-node-id="199:733" style={{ fontVariationSettings: '"wdth" 100' }}>
                Keep the plantation area clean.
              </p>
              <div className="content-stretch flex gap-[4px] items-center overflow-clip relative shrink-0" data-node-id="199:734" data-name="Assignment count">
                <div className="relative shrink-0 size-[11px]" data-node-id="199:909" data-name="users">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUsers1} />
                </div>
                <p className="[word-break:break-word] font-['Roboto:Medium'] font-medium leading-[normal] relative shrink-0 text-[#29115e] text-[9px] whitespace-nowrap" data-node-id="199:736" style={{ fontVariationSettings: '"wdth" 100' }}>
                  4 Assigned
                </p>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0" data-node-id="199:737" data-name="Assigned volunteers">
              <div className="border-[#fffcff] border-[1.2px] border-solid mr-[-5px] overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:738" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-331.67px] top-[-236.04px] w-[484.211px]" data-node-id="199:739" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
              <div className="border-[#fffcff] border-[1.2px] border-solid mr-[-5px] overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:740" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-351.04px] top-[-236.04px] w-[484.211px]" data-node-id="199:741" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
              <div className="border-[#fffcff] border-[1.2px] border-solid mr-[-5px] overflow-clip relative rounded-[11.5px] shrink-0 size-[23px]" data-node-id="199:742" data-name="Volunteer portrait">
                <div className="absolute h-[363.158px] left-[-370.41px] top-[-236.04px] w-[484.211px]" data-node-id="199:743" data-name="Portrait">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandsPlantingASeedling} />
                </div>
              </div>
              <div className="bg-[#eedffb] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[23px]" data-node-id="199:744" data-name="More volunteers">
                <p className="[word-break:break-word] font-['Roboto:Bold'] font-bold leading-[normal] relative shrink-0 text-[#29115e] text-[9px] whitespace-nowrap" data-node-id="199:745" style={{ fontVariationSettings: '"wdth" 100' }}>
                  +1
                </p>
              </div>
            </div>
            <div className="relative shrink-0 size-[15px]" data-node-id="199:912" data-name="chevron-right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
