const assetPathPrefix = "/assets";
const imgProfilePortrait = `${assetPathPrefix}/52dd4.png`;
const imgFoodDrivePhoto = `${assetPathPrefix}/53027.png`;
const imgEnvironmentPhoto = `${assetPathPrefix}/9f66a.png`;
const imgCausePhoto = `${assetPathPrefix}/d7a6c.png`;
const imgLavenderWave = `${assetPathPrefix}/cea03.svg`;
const imgLeftUprightLeaf = `${assetPathPrefix}/3c411.svg`;
const imgLeftUprightLeaf1 = `${assetPathPrefix}/22810.svg`;
const imgLeftOutwardLeaf = `${assetPathPrefix}/d469d.svg`;
const imgLeftSweepingLeaf = `${assetPathPrefix}/bf6a7.svg`;
const imgRightUprightLeaf = `${assetPathPrefix}/c5579.svg`;
const imgRightOutwardLeaf = `${assetPathPrefix}/fa39e.svg`;
const imgRightSweepingLeaf = `${assetPathPrefix}/a6790.svg`;
const imgIosSignal = `${assetPathPrefix}/445b6.svg`;
const imgIosWifiSignal = `${assetPathPrefix}/f3992.svg`;
const imgIosBatteryFull = `${assetPathPrefix}/2444c.svg`;
const imgArrowLeft = `${assetPathPrefix}/6c9ad.svg`;
const imgBrandRays = `${assetPathPrefix}/6af05.svg`;
const imgNotifications = `${assetPathPrefix}/fb050.svg`;
const imgHeart = `${assetPathPrefix}/2f52b.svg`;
const imgBackdrop = `${assetPathPrefix}/8c72a.svg`;
const imgFloatingHeart = `${assetPathPrefix}/1ca31.svg`;
const imgExcitementRays = `${assetPathPrefix}/b71b6.svg`;
const imgLeftSprig = `${assetPathPrefix}/2eaca.svg`;
const imgRightSprig = `${assetPathPrefix}/b4396.svg`;
const imgBoxBack = `${assetPathPrefix}/4a8b2.svg`;
const imgBlueShirt = `${assetPathPrefix}/39552.svg`;
const imgWhiteBottle = `${assetPathPrefix}/b9e3f.svg`;
const imgSmallLavenderBottle = `${assetPathPrefix}/4bff2.svg`;
const imgFoldedClothes = `${assetPathPrefix}/ed920.svg`;
const imgBoxBody = `${assetPathPrefix}/e1b48.svg`;
const imgOpenRightFlap = `${assetPathPrefix}/77008.svg`;
const imgFrontHeart = `${assetPathPrefix}/bab07.svg`;
const imgShirt = `${assetPathPrefix}/9fafc.svg`;
const imgHeart1 = `${assetPathPrefix}/7514c.svg`;
const imgMapPin = `${assetPathPrefix}/a708c.svg`;
const imgUsersRound = `${assetPathPrefix}/62b14.svg`;
const imgPackage = `${assetPathPrefix}/cc738.svg`;
const imgX = `${assetPathPrefix}/3d1a1.svg`;
const imgArrowLeft1 = `${assetPathPrefix}/2c776.svg`;
const imgArrowRight = `${assetPathPrefix}/51fe3.svg`;
const imgHand = `${assetPathPrefix}/33c3d.svg`;
const imgCalendarDays = `${assetPathPrefix}/ae70f.svg`;
const imgUsersRound1 = `${assetPathPrefix}/cbd09.svg`;
const imgSprout = `${assetPathPrefix}/4f226.svg`;

export default function SwipeDonation({
  onBack,
  onCreate,
  onTrack,
}: {
  onBack: () => void
  onCreate: () => void
  onTrack: () => void
}) {
  return (
    <div className="bg-[#fffbff] content-stretch flex flex-col items-start relative min-h-dvh w-full" data-node-id="165:12399" data-name="Donate with a Swipe mobile">
      <div className="absolute bg-[#f5e8fc] h-[619px] left-0 top-[237px] w-[393px]" data-node-id="165:12400" data-name="Swipe area backdrop" />
      <div className="absolute bottom-0 content-stretch flex flex-col h-[80px] items-start left-0 overflow-clip w-[393px]" data-node-id="165:12401" data-name="Decorative garden">
        <div className="h-[80px] relative shrink-0 w-[393px]" data-node-id="165:12402" data-name="Lavender wave">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLavenderWave} />
        </div>
        <div className="absolute h-[80px] left-0 overflow-clip top-0 w-[393px]" data-node-id="165:12403" data-name="Garden leaves">
          <div className="absolute h-[80px] left-0 overflow-clip top-0 w-[393px]" data-node-id="165:12892" data-name="Frame">
            <div className="absolute contents inset-0" data-node-id="165:12905" data-name="Clip path group">
              <div className="absolute contents inset-[23.75%_79.9%_-7.5%_-5.52%]" data-node-id="165:12893" data-name="left-leaf-cluster">
                <div className="absolute inset-[23.75%_91.66%_-7.5%_0.88%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3.444px_-19px] mask-size-[393px_80px]" data-node-id="165:12894" style={{ maskImage: `url("${imgLeftUprightLeaf}")` }} data-name="left-upright-leaf">
                  <div className="absolute inset-[-0.86%_-1.96%]">
                    <img alt="" className="block max-w-none size-full" src={imgLeftUprightLeaf1} />
                  </div>
                </div>
                <div className="absolute inset-[47.5%_95.33%_-5.12%_-5.52%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[21.688px_-38px] mask-size-[393px_80px]" data-node-id="165:12897" style={{ maskImage: `url("${imgLeftUprightLeaf}")` }} data-name="left-outward-leaf">
                  <div className="absolute inset-[-1.25%_-1.44%]">
                    <img alt="" className="block max-w-none size-full" src={imgLeftOutwardLeaf} />
                  </div>
                </div>
                <div className="absolute inset-[56.19%_79.9%_-6.25%_3.82%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15px_-44.953px] mask-size-[393px_80px]" data-node-id="165:12900" style={{ maskImage: `url("${imgLeftUprightLeaf}")` }} data-name="left-sweeping-leaf">
                  <div className="absolute inset-[-1.44%_-0.9%]">
                    <img alt="" className="block max-w-none size-full" src={imgLeftSweepingLeaf} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute contents inset-0" data-node-id="165:12918" data-name="Clip path group">
              <div className="absolute contents inset-[22.5%_-6.11%_-7.5%_80.92%]" data-node-id="165:12906" data-name="right-leaf-cluster">
                <div className="absolute inset-[22.5%_1.67%_-7.5%_91.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-359.915px_-18px] mask-size-[393px_80px]" data-node-id="165:12907" style={{ maskImage: `url("${imgLeftUprightLeaf}")` }} data-name="right-upright-leaf">
                  <div className="absolute inset-[-0.85%_-2.17%]">
                    <img alt="" className="block max-w-none size-full" src={imgRightUprightLeaf} />
                  </div>
                </div>
                <div className="absolute inset-[48.56%_-6.11%_-6.25%_96.12%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-377.747px_-38.848px] mask-size-[393px_80px]" data-node-id="165:12910" style={{ maskImage: `url("${imgLeftUprightLeaf}")` }} data-name="right-outward-leaf">
                  <div className="absolute inset-[-1.25%_-1.46%_-1.25%_-1.47%]">
                    <img alt="" className="block max-w-none size-full" src={imgRightOutwardLeaf} />
                  </div>
                </div>
                <div className="absolute inset-[54.36%_3.56%_-6.25%_80.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-318px_-43.485px] mask-size-[393px_80px]" data-node-id="165:12913" style={{ maskImage: `url("${imgLeftUprightLeaf}")` }} data-name="right-sweeping-leaf">
                  <div className="absolute inset-[-1.39%_-0.94%]">
                    <img alt="" className="block max-w-none size-full" src={imgRightSweepingLeaf} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col h-[45px] items-start overflow-clip relative shrink-0 w-full" data-node-id="165:12404" data-name="App header">
        <div className="content-stretch flex h-[45px] items-center justify-between overflow-clip px-[22px] relative shrink-0 w-full" data-node-id="165:12411" data-name="Navigation">
          <div className="relative shrink-0 size-[24px]" data-node-id="165:12975" data-name="arrow-left">
            <img
              alt="Go back"
              aria-label="Go back"
              className="absolute inset-0 block size-full max-w-none cursor-pointer"
              onClick={onBack}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onBack()
                }
              }}
              role="button"
              src={imgArrowLeft}
              tabIndex={0}
            />
          </div>
          <div className="-translate-x-1/2 absolute content-stretch flex h-[30px] items-start justify-center left-1/2 overflow-clip top-[9px] w-[128px]" data-node-id="165:12413" data-name="Centered brand">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="165:12414" data-name="SevaSathi">
              <p className="[word-break:break-word] font-['Inter:Black'] font-black leading-[0] not-italic relative shrink-0 text-[22px] text-black tracking-[-1.2px] whitespace-nowrap" data-node-id="165:12415">
                <span className="leading-[normal]">Seva</span>
                <span className="leading-[normal] text-[#9800f8]">Sathi</span>
              </p>
              <div className="h-[22px] relative shrink-0 w-[18px]" data-node-id="165:12416" data-name="Brand rays">
                <div className="absolute inset-[-11.37%_-13.89%]">
                  <img alt="" className="block max-w-none size-full" src={imgBrandRays} />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[15px] items-center overflow-clip relative shrink-0" data-node-id="165:12417" data-name="Account controls">
            <div className="h-[28px] relative shrink-0 w-[21px]" data-node-id="165:12418" data-name="Notifications">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgNotifications} />
            </div>
            <div className="relative shrink-0 size-[33px]" data-node-id="165:12421" data-name="Profile portrait">
              <img alt="" className="absolute block inset-0 max-w-none size-full" height="33" src={imgProfilePortrait} width="33" />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col h-[162px] items-start relative shrink-0 w-full" data-node-id="165:12422" data-name="Hero region">
        <div
          aria-label="Open donation tracker"
          className="content-stretch flex flex-col gap-[10px] h-[169px] items-start pt-[4px] px-[22px] relative shrink-0 w-full cursor-pointer rounded-[18px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#9800f8]"
          data-node-id="165:12423"
          data-name="Introduction"
          onClick={onTrack}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              onTrack()
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="bg-[#f5e8fc] border-[#9800f8] border-[0.7px] border-solid content-stretch flex gap-[8px] items-center overflow-clip px-[11px] py-[6px] relative rounded-[100px] shrink-0" data-node-id="165:12424" data-name="Page label">
            <div className="relative shrink-0 size-[19px]" data-node-id="165:12981" data-name="heart">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgHeart} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="165:12426">
              Donate with a Swipe
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-[255px]" data-node-id="165:12427" data-name="Headline and description">
            <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-node-id="165:12428" data-name="Headline">
              <p className="[word-break:break-word] font-['Inter:Black'] font-black leading-[1.03] min-w-full not-italic relative shrink-0 text-[24px] text-black tracking-[-0.9px] w-[min-content]" data-node-id="165:12429">
                Find a Cause
              </p>
              <div className="content-stretch flex gap-[3px] items-center overflow-clip relative shrink-0" data-node-id="165:12430" data-name="Highlighted promise">
                <p className="[word-break:break-word] font-['Inter:Black'] font-black leading-[normal] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.9px] whitespace-nowrap" data-node-id="165:12431">
                  to
                </p>
                <div className="bg-[#beff21] border-[#74852a] border-[0.7px] border-solid content-stretch flex items-start overflow-clip px-[5px] relative rounded-[11px] shrink-0" data-node-id="165:12432" data-name="Lime emphasis">
                  <p className="[word-break:break-word] font-['Inter:Black'] font-black leading-[1.15] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.9px] whitespace-nowrap" data-node-id="165:12433">
                    Support.
                  </p>
                </div>
              </div>
            </div>
            <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#33333f] text-[10.5px] w-[230px]" data-node-id="165:12434">
              <p className="leading-[1.32] mb-0">Swipe right to donate, left to skip.</p>
              <p className="leading-[1.32]">Support what matters to you.</p>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col h-[140px] items-start left-[226px] overflow-clip top-[20px] w-[176px]" data-node-id="165:12435" data-name="Hero artwork">
          <div className="h-[140px] overflow-clip relative shrink-0 w-[176px]" data-node-id="165:12436" data-name="Donation care package">
            <div className="absolute h-[140px] left-0 overflow-clip top-0 w-[176px]" data-node-id="165:12919" data-name="Frame">
              <div className="absolute inset-[20.31%_8.85%_6.61%_13.61%]" data-node-id="165:12920" data-name="backdrop">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBackdrop} />
              </div>
              <div className="absolute inset-[12.96%_72.13%_65.71%_9.54%]" data-node-id="165:12923" data-name="floating-heart">
                <div className="absolute inset-[-4.69%_-4.34%]">
                  <img alt="" className="block max-w-none size-full" src={imgFloatingHeart} />
                </div>
              </div>
              <div className="absolute inset-[7.86%_35.8%_82.14%_40.34%]" data-node-id="165:12925" data-name="excitement-rays">
                <div className="absolute inset-[-17.86%_-5.95%]">
                  <img alt="" className="block max-w-none size-full" src={imgExcitementRays} />
                </div>
              </div>
              <div className="absolute inset-[48.57%_76.14%_19.29%_8.24%]" data-node-id="165:12928" data-name="left-sprig">
                <div className="absolute inset-[-2.67%_-4.54%_-2.78%_-4.36%]">
                  <img alt="" className="block max-w-none size-full" src={imgLeftSprig} />
                </div>
              </div>
              <div className="absolute bottom-[17.14%] left-[79.55%] right-[6.25%] top-1/2" data-node-id="165:12933" data-name="right-sprig">
                <div className="absolute inset-[-2.61%_-4.8%_-2.72%_-5%]">
                  <img alt="" className="block max-w-none size-full" src={imgRightSprig} />
                </div>
              </div>
              <div className="absolute inset-[40%_22.16%_41.43%_24.43%]" data-node-id="165:12938" data-name="box-back">
                <div className="absolute inset-[-5.38%_-1.49%]">
                  <img alt="" className="block max-w-none size-full" src={imgBoxBack} />
                </div>
              </div>
              <div className="absolute inset-[23.57%_21.02%_44.29%_44.89%]" data-node-id="165:12941" data-name="blue-shirt">
                <div className="absolute inset-[-3.11%_-2.33%]">
                  <img alt="" className="block max-w-none size-full" src={imgBlueShirt} />
                </div>
              </div>
              <div className="absolute inset-[24.76%_56.63%_44.29%_28.98%]" data-node-id="165:12944" data-name="white-bottle">
                <div className="absolute inset-[-3%_-5.33%_-3.12%_-5.33%]">
                  <img alt="" className="block max-w-none size-full" src={imgWhiteBottle} />
                </div>
              </div>
              <div className="absolute inset-[35.71%_47.06%_42.86%_43.18%]" data-node-id="165:12948" data-name="small-lavender-bottle">
                <div className="absolute inset-[-4%_-7.57%_-4.33%_-7.57%]">
                  <img alt="" className="block max-w-none size-full" src={imgSmallLavenderBottle} />
                </div>
              </div>
              <div className="absolute inset-[40.54%_39.2%_39.29%_26.14%]" data-node-id="165:12952" data-name="folded-clothes">
                <div className="absolute inset-[-4.78%_-2.21%]">
                  <img alt="" className="block max-w-none size-full" src={imgFoldedClothes} />
                </div>
              </div>
              <div className="absolute inset-[47.14%_21.59%_10%_24.43%]" data-node-id="165:12956" data-name="box-body">
                <div className="absolute inset-[-2.33%_-1.47%]">
                  <img alt="" className="block max-w-none size-full" src={imgBoxBody} />
                </div>
              </div>
              <div className="absolute inset-[47.14%_9.66%_30.71%_63.64%]" data-node-id="165:12960" data-name="open-right-flap">
                <div className="absolute inset-[-4.52%_-2.98%]">
                  <img alt="" className="block max-w-none size-full" src={imgOpenRightFlap} />
                </div>
              </div>
              <div className="absolute inset-[61.43%_45.99%_19.29%_34.63%]" data-node-id="165:12963" data-name="front-heart">
                <div className="absolute inset-[-5%_-3.96%]">
                  <img alt="" className="block max-w-none size-full" src={imgFrontHeart} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col h-[390px] items-start relative shrink-0 w-[393px]" data-node-id="165:12437" data-name="Swipeable causes">
        <div className="absolute flex h-[344.132px] items-center justify-center left-[21px] top-[19.64px] w-[295.044px]" data-node-id="165:12438">
          <div className="-rotate-5 flex-none">
            <div className="bg-white border-[#c9addf] border-[0.8px] border-solid content-stretch flex flex-col h-[322px] items-start overflow-clip p-[6px] relative rounded-[24px] shadow-[0px_5px_16px_0px_rgba(90,38,121,0.16)] w-[268px]" data-name="Food cause preview">
              <div className="h-[160px] relative rounded-[18px] shrink-0 w-full" data-node-id="165:12439" data-name="Food drive photo">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[18px] size-full" src={imgFoodDrivePhoto} />
              </div>
              <div className="content-stretch flex flex-col gap-[9px] items-start overflow-clip p-[14px] relative shrink-0 w-full" data-node-id="165:12440" data-name="Food drive details">
                <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] min-w-full not-italic relative shrink-0 text-[17px] text-black w-[min-content]" data-node-id="165:12441">
                  Meals for Every Child
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap" data-node-id="165:12442">
                  Udupi, Karnataka
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[12px] text-black w-[min-content]" data-node-id="165:12443">
                  Help bring warm, nutritious meals to children in our community.
                </p>
                <div className="bg-[#e7b7f4] h-[8px] relative rounded-[100px] shrink-0 w-full" data-node-id="165:12444" data-name="Progress" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[346.685px] items-center justify-center left-[84.67px] top-[39px] w-[290.325px]" data-node-id="165:12445">
          <div className="flex-none rotate-5">
            <div className="bg-white border-[#c9addf] border-[0.8px] border-solid content-stretch flex flex-col h-[325px] items-start overflow-clip p-[6px] relative rounded-[24px] shadow-[0px_5px_16px_0px_rgba(90,38,121,0.16)] w-[263px]" data-name="Environment cause preview">
              <div className="h-[160px] relative rounded-[18px] shrink-0 w-full" data-node-id="165:12446" data-name="Environment photo">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[18px] size-full" src={imgEnvironmentPhoto} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[9px] items-start leading-[normal] not-italic overflow-clip p-[14px] relative shrink-0 text-black w-full" data-node-id="165:12447" data-name="Environment drive details">
                <p className="font-['Inter:Extra_Bold'] font-extrabold min-w-full relative shrink-0 text-[17px] w-[min-content]" data-node-id="165:12448">
                  Grow a Greener Tomorrow
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[12px] whitespace-nowrap" data-node-id="165:12449">
                  Udupi, Karnataka
                </p>
                <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[12px] w-[min-content]" data-node-id="165:12450">
                  Plant a little hope for a greener future.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[384.984px] items-center justify-center left-[48px] top-[-10.49px] w-[314.959px]" data-node-id="165:12451">
          <div className="-rotate-3 flex-none">
            <div className="content-stretch flex flex-col h-[370px] items-start relative w-[296px]" data-name="Featured cause">
              <div className="bg-white border-[#c9addf] border-[0.8px] border-solid content-stretch flex flex-col h-[370px] items-start overflow-clip p-[5px] relative rounded-[24px] shadow-[0px_5px_16px_0px_rgba(90,38,121,0.16)] shrink-0 w-[296px]" data-node-id="165:12452" data-name="Warm clothes cause">
                <div className="content-stretch flex flex-col h-[181px] items-start overflow-clip p-[11px] relative rounded-tl-[21px] rounded-tr-[21px] shrink-0 w-full" data-node-id="165:12453" data-name="Cause photo">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[21px] rounded-tr-[21px] size-full" src={imgCausePhoto} />
                  <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="165:12454" data-name="Photo actions">
                    <div className="bg-[#e7b7f4] content-stretch flex gap-[7px] items-center overflow-clip px-[9px] py-[6px] relative rounded-[100px] shrink-0" data-node-id="165:12455" data-name="Drive category">
                      <div className="relative shrink-0 size-[18px]" data-node-id="165:12984" data-name="shirt">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShirt} />
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[11px] text-black whitespace-nowrap" data-node-id="165:12457">
                        Clothes Drive
                      </p>
                    </div>
                    <button aria-label="Create an event" className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[34px]" data-node-id="165:12458" data-name="Create event" onClick={onCreate} type="button">
                      <span className="font-['Inter:Regular'] text-[27px] leading-none text-black">+</span>
                    </button>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip pt-[10px] px-[14px] relative shrink-0 w-full" data-node-id="165:12460" data-name="Cause details">
                  <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] min-w-full not-italic relative shrink-0 text-[17.5px] text-black tracking-[-0.6px] w-[min-content]" data-node-id="165:12461">
                    Warm Clothes for Kids
                  </p>
                  <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="165:12462" data-name="Location">
                    <div className="relative shrink-0 size-[18px]" data-node-id="165:12990" data-name="map-pin">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMapPin} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#33333f] text-[12px] whitespace-nowrap" data-node-id="165:12464">
                      Udupi, Karnataka
                    </p>
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.32] min-w-full not-italic relative shrink-0 text-[#33333f] text-[11.5px] w-[min-content]" data-node-id="165:12465">
                    Help children in need with clean and comfortable clothes this season.
                  </p>
                  <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="165:12466" data-name="Donation progress">
                    <div className="bg-[#e7b7f4] content-stretch flex flex-[1_0_0] flex-col h-[9px] items-start min-w-px overflow-clip relative rounded-[100px]" data-node-id="165:12467" data-name="Progress track">
                      <div className="bg-[#9800f8] flex-[1_0_0] min-h-px relative rounded-[100px] w-[167px]" data-node-id="165:12468" data-name="Progress fill" />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[10px] text-black whitespace-nowrap" data-node-id="165:12469">
                      72%
                    </p>
                  </div>
                  <div className="bg-[#fcf7ff] content-stretch flex gap-[10px] items-center overflow-clip px-[5px] py-[8px] relative rounded-[10px] shrink-0 w-full" data-node-id="165:12470" data-name="Cause needs">
                    <div className="content-stretch flex flex-[1_0_0] gap-[7px] items-center min-w-px overflow-clip relative" data-node-id="165:12471" data-name="Children supported">
                      <div className="relative shrink-0 size-[23px]" data-node-id="165:12993" data-name="users-round">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUsersRound} />
                      </div>
                      <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 text-black whitespace-nowrap" data-node-id="165:12473" data-name="Impact">
                        <p className="font-['Inter:Extra_Bold'] font-extrabold relative shrink-0 text-[11.3px]" data-node-id="165:12474">
                          85 Children
                        </p>
                        <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[8.2px]" data-node-id="165:12475">
                          To Be Supported
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#c9addf] h-[26px] relative shrink-0 w-px" data-node-id="165:12476" data-name="Divider" />
                    <div className="content-stretch flex flex-[1_0_0] gap-[7px] items-center min-w-px overflow-clip relative" data-node-id="165:12477" data-name="Clothes needed">
                      <div className="relative shrink-0 size-[23px]" data-node-id="165:12996" data-name="package">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPackage} />
                      </div>
                      <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 text-black whitespace-nowrap" data-node-id="165:12479" data-name="Need">
                        <p className="font-['Inter:Extra_Bold'] font-extrabold relative shrink-0 text-[11.3px]" data-node-id="165:12480">
                          120+
                        </p>
                        <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[8.2px]" data-node-id="165:12481">
                          Clothes Needed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center overflow-clip pt-[6px] relative shrink-0 w-full" data-node-id="165:12482" data-name="Giving actions">
        <div className="content-stretch flex h-[92px] items-start justify-between overflow-clip relative shrink-0 w-[270px]" data-node-id="165:12483" data-name="Donation decisions">
          <div className="content-stretch flex flex-col gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="165:12484" data-name="Skip action">
            <div className="bg-white border-[#c9addf] border-[0.8px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[69px]" data-node-id="165:12485" data-name="Not now button">
              <div className="relative shrink-0 size-[39px]" data-node-id="165:12999" data-name="x">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgX} />
              </div>
            </div>
            <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[11px] text-black whitespace-nowrap" data-node-id="165:12487">
              Not Now
            </p>
          </div>
          <div className="content-stretch flex flex-col h-[80px] items-center justify-center overflow-clip relative shrink-0 w-[75px]" data-node-id="165:12488" data-name="Swipe guidance">
            <div className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0" data-node-id="165:12489" data-name="Swipe directions">
              <div className="relative shrink-0 size-[24px]" data-node-id="165:13002" data-name="arrow-left">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowLeft1} />
              </div>
              <div className="relative shrink-0 size-[24px]" data-node-id="165:13005" data-name="arrow-right">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowRight} />
              </div>
            </div>
            <div className="relative shrink-0 size-[30px]" data-node-id="165:13008" data-name="hand">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgHand} />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="165:12493" data-name="Donate action">
            <div className="bg-white border-[#c9addf] border-[0.8px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0 size-[69px]" data-node-id="165:12494" data-name="Donate button">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-none not-italic relative shrink-0 text-[#00d66b] text-[45px] whitespace-nowrap" data-node-id="165:12495">
                ♥
              </p>
            </div>
            <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[11px] text-black whitespace-nowrap" data-node-id="165:12496">
              Donate
            </p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start overflow-clip pt-[18px] px-[16px] relative shrink-0 w-full" data-node-id="165:12497" data-name="Community results">
        <div className="bg-white border-[#9800f8] border-[0.7px] border-solid content-stretch flex h-[56px] items-center justify-between overflow-clip px-[13px] relative rounded-[23px] shrink-0 w-full" data-node-id="165:12498" data-name="Community impact">
          <div className="content-stretch flex gap-[7px] items-center overflow-clip relative shrink-0" data-node-id="165:12499" data-name="Impact statistic">
            <div className="relative shrink-0 size-[23px]" data-node-id="165:13011" data-name="calendar-days">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCalendarDays} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 text-black whitespace-nowrap" data-node-id="165:12501" data-name="Statistic">
              <p className="font-['Inter:Extra_Bold'] font-extrabold relative shrink-0 text-[15px]" data-node-id="165:12502">
                320+
              </p>
              <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[8px]" data-node-id="165:12503">
                Donations
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[7px] items-center overflow-clip relative shrink-0" data-node-id="165:12504" data-name="Impact statistic">
            <div className="bg-[#c9addf] h-[27px] relative shrink-0 w-[0.7px]" data-node-id="165:12505" data-name="Divider" />
            <div className="relative shrink-0 size-[23px]" data-node-id="165:13014" data-name="users-round">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUsersRound1} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 text-black whitespace-nowrap" data-node-id="165:12507" data-name="Statistic">
              <p className="font-['Inter:Extra_Bold'] font-extrabold relative shrink-0 text-[15px]" data-node-id="165:12508">
                1.8K+
              </p>
              <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[8px]" data-node-id="165:12509">
                People Helped
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[7px] items-center overflow-clip relative shrink-0" data-node-id="165:12510" data-name="Impact statistic">
            <div className="bg-[#c9addf] h-[27px] relative shrink-0 w-[0.7px]" data-node-id="165:12511" data-name="Divider" />
            <div className="relative shrink-0 size-[23px]" data-node-id="165:13017" data-name="sprout">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSprout} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 text-black whitespace-nowrap" data-node-id="165:12513" data-name="Statistic">
              <p className="font-['Inter:Extra_Bold'] font-extrabold relative shrink-0 text-[15px]" data-node-id="165:12514">
                18+
              </p>
              <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[8px]" data-node-id="165:12515">
                Active Drives
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
