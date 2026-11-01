const assetPathPrefix = "/assets/arena-map"
const imgTrailDottedLine = `${assetPathPrefix}/4224d.png`
const imgRollingMeadow = `${assetPathPrefix}/6d16b.svg`
const imgMeadowSunlitPatches = `${assetPathPrefix}/03637.svg`
const imgGrassTuft = `${assetPathPrefix}/b2dbe.svg`
const imgGrassTuft1 = `${assetPathPrefix}/84565.svg`
const imgRiverBanks = `${assetPathPrefix}/18d09.svg`
const imgRiver = `${assetPathPrefix}/686db.svg`
const imgRiverShallows = `${assetPathPrefix}/f2531.svg`
const imgWaterfallRockFace = `${assetPathPrefix}/ce592.svg`
const imgRockFaceHighlights = `${assetPathPrefix}/9d6eb.svg`
const imgWaterfall = `${assetPathPrefix}/71334.svg`
const imgWaterfallRibbons = `${assetPathPrefix}/8ac33.svg`
const imgRiverFoam = `${assetPathPrefix}/79513.svg`
const imgRiverBoulder = `${assetPathPrefix}/51712.svg`
const imgRiverBoulder1 = `${assetPathPrefix}/10805.svg`
const imgTrailBorder = `${assetPathPrefix}/3dab8.svg`
const imgGoldenTrail = `${assetPathPrefix}/b70fd.svg`
const imgTrailEdgeLight = `${assetPathPrefix}/2360e.svg`
const imgTrailSurface = `${assetPathPrefix}/7e2db.svg`
const imgPixelTree = `${assetPathPrefix}/f03ed.svg`
const imgPixelTree1 = `${assetPathPrefix}/6a2e1.svg`
const imgPixelTree2 = `${assetPathPrefix}/8a098.svg`
const imgPixelTree3 = `${assetPathPrefix}/7f159.svg`
const imgPixelTree4 = `${assetPathPrefix}/4d47b.svg`
const imgPixelTree5 = `${assetPathPrefix}/ffab1.svg`
const imgPixelTree6 = `${assetPathPrefix}/fe9d3.svg`
const imgPixelTree7 = `${assetPathPrefix}/178a5.svg`
const imgPixelTree8 = `${assetPathPrefix}/1f2b3.svg`
const imgPixelTree9 = `${assetPathPrefix}/c55db.svg`
const imgPixelTree10 = `${assetPathPrefix}/38c12.svg`
const imgPixelTree11 = `${assetPathPrefix}/79d95.svg`
const imgPixelTree12 = `${assetPathPrefix}/66fde.svg`
const imgPixelTree13 = `${assetPathPrefix}/5d91e.svg`
const imgPixelTree14 = `${assetPathPrefix}/0e13a.svg`
const imgPixelTree15 = `${assetPathPrefix}/e0292.svg`
const imgPixelTree16 = `${assetPathPrefix}/957e2.svg`
const imgPixelTree17 = `${assetPathPrefix}/963b0.svg`
const imgGoldenTemple = `${assetPathPrefix}/4b3e6.svg`
const imgPixelTree18 = `${assetPathPrefix}/fd72e.svg`
const imgPixelTree19 = `${assetPathPrefix}/0334b.svg`
const imgBuildingShadow = `${assetPathPrefix}/d53bb.svg`
const imgCottageWalls = `${assetPathPrefix}/8ff29.svg`
const imgWallShade = `${assetPathPrefix}/7e66a.svg`
const imgRoofOutline = `${assetPathPrefix}/11058.svg`
const imgTerracottaRoof = `${assetPathPrefix}/cd08f.svg`
const imgRoofTileShadows = `${assetPathPrefix}/9c97d.svg`
const imgRoofTileHighlights = `${assetPathPrefix}/009fd.svg`
const imgChimney = `${assetPathPrefix}/7597c.svg`
const imgDoorFrame = `${assetPathPrefix}/aeb0e.svg`
const imgDoorLight = `${assetPathPrefix}/dd720.svg`
const imgWindowFrames = `${assetPathPrefix}/f40b3.svg`
const imgWindowPanes = `${assetPathPrefix}/c46fd.svg`
const imgCampSign = `${assetPathPrefix}/8ef60.svg`
const imgPixelTree20 = `${assetPathPrefix}/72cc8.svg`
const imgPixelTree21 = `${assetPathPrefix}/5e19b.svg`
const imgPixelTree22 = `${assetPathPrefix}/2f0be.svg`
const imgPixelTree23 = `${assetPathPrefix}/c60c6.svg`
const imgForestMarketStall = `${assetPathPrefix}/9679f.svg`
const imgTreasureChest = `${assetPathPrefix}/7ca01.svg`
const imgPixelTree24 = `${assetPathPrefix}/b1e18.svg`
const imgTrailSign = `${assetPathPrefix}/c810b.svg`
const imgLockedLevel = `${assetPathPrefix}/d5f2c.svg`
const imgMarkerShadow = `${assetPathPrefix}/b0f14.svg`
const imgMarkerOutline = `${assetPathPrefix}/e6d05.svg`
const imgLevelBadge = `${assetPathPrefix}/b6e41.svg`
const imgBadgeHighlight = `${assetPathPrefix}/19ad3.svg`
const imgEarnedStar = `${assetPathPrefix}/ca96a.svg`
const imgLevelGlow = `${assetPathPrefix}/d643f.svg`
const imgRadiantBeam = `${assetPathPrefix}/44e80.svg`
const imgRadiantBeam1 = `${assetPathPrefix}/48672.svg`
const imgRadiantBeam2 = `${assetPathPrefix}/b6478.svg`
const imgRadiantBeam3 = `${assetPathPrefix}/b6e69.svg`
const imgRadiantBeam4 = `${assetPathPrefix}/08fdc.svg`
const imgRadiantBeam5 = `${assetPathPrefix}/77ea0.svg`
const imgRadiantBeam6 = `${assetPathPrefix}/ab63c.svg`
const imgRadiantBeam7 = `${assetPathPrefix}/4a84d.svg`
const imgRadiantBeam8 = `${assetPathPrefix}/8b41b.svg`
const imgRadiantBeam9 = `${assetPathPrefix}/8e1fd.svg`
const imgRadiantBeam10 = `${assetPathPrefix}/bdcdf.svg`
const imgRadiantBeam11 = `${assetPathPrefix}/1100f.svg`
const imgRadiantBeam12 = `${assetPathPrefix}/5c18d.svg`
const imgRadiantBeam13 = `${assetPathPrefix}/2f667.svg`
const imgRadiantBeam14 = `${assetPathPrefix}/46237.svg`
const imgRadiantBeam15 = `${assetPathPrefix}/ccda2.svg`
const imgMarkerOutline1 = `${assetPathPrefix}/3c935.svg`
const imgLevelBadge1 = `${assetPathPrefix}/11c42.svg`
const imgBadgeHighlight1 = `${assetPathPrefix}/4edc5.svg`

export default function PixelAdventureMap({
  onLevelSix,
  onLevelSelect,
  rewardClaimed,
  unlockedLevels,
}: {
  onLevelSix: () => void
  onLevelSelect: (level: number) => void
  rewardClaimed: boolean
  unlockedLevels: number[]
}) {
  const unlockedLevelPositions: Record<number, { left: number; top: number }> = {
    1: { left: 80, top: 567 },
    2: { left: 239, top: 515 },
    3: { left: 94, top: 404 },
    4: { left: 239, top: 321 },
    5: { left: 136, top: 220 },
  }

  const lockedLevelPositions: Record<number, { left: number; top: number }> = {
    2: { left: 239, top: 515 },
    3: { left: 94, top: 404 },
    4: { left: 239, top: 321 },
    5: { left: 136, top: 220 },
    6: { left: 238, top: 170 },
  }

  return (
    <div
      className="relative h-[640px] w-[390px] bg-[#70c324]"
      data-node-id="139:29243"
      data-name="Pixel adventure · Mobile"
    >
      <div
        className="absolute bg-[#70c324] h-[640px] left-0 overflow-clip top-0 w-[390px]"
        data-node-id="139:29589"
        data-name="Forest landscape"
      >
        <div
          className="absolute bg-[#59c9dc] h-[70px] left-0 top-0 w-[390px]"
          data-node-id="139:30556"
          data-name="Distant sky"
        />
        <div
          className="absolute h-[628px] left-0 top-[12px] w-[390px]"
          data-node-id="139:30555"
          data-name="Rolling meadow"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRollingMeadow}
          />
        </div>
        <div
          className="absolute h-[579px] left-[69px] top-[61px] w-[221px]"
          data-node-id="139:30554"
          data-name="Meadow sunlit patches"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgMeadowSunlitPatches}
          />
        </div>
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[19px] top-[35px] w-[5px]"
          data-node-id="139:30553"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[92px] size-[2px] top-[172px]"
          data-node-id="139:30552"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[165px] size-[2px] top-[309px]"
          data-node-id="139:30551"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[238px] size-[2px] top-[446px]"
          data-node-id="139:30550"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[311px] top-[583px] w-[5px]"
          data-node-id="139:30549"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[384px] size-[2px] top-[115px]"
          data-node-id="139:30548"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[67px] size-[2px] top-[252px]"
          data-node-id="139:30547"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[140px] size-[2px] top-[389px]"
          data-node-id="139:30546"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[213px] top-[526px] w-[5px]"
          data-node-id="139:30545"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[286px] size-[2px] top-[58px]"
          data-node-id="139:30544"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[359px] size-[2px] top-[195px]"
          data-node-id="139:30543"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[42px] size-[2px] top-[332px]"
          data-node-id="139:30542"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[115px] top-[469px] w-[5px]"
          data-node-id="139:30541"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[188px] size-[2px] top-[606px]"
          data-node-id="139:30540"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[261px] size-[2px] top-[138px]"
          data-node-id="139:30539"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[334px] size-[2px] top-[275px]"
          data-node-id="139:30538"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[17px] top-[412px] w-[5px]"
          data-node-id="139:30537"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[90px] size-[2px] top-[549px]"
          data-node-id="139:30536"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[163px] size-[2px] top-[81px]"
          data-node-id="139:30535"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[236px] size-[2px] top-[218px]"
          data-node-id="139:30534"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[309px] top-[355px] w-[5px]"
          data-node-id="139:30533"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[382px] size-[2px] top-[492px]"
          data-node-id="139:30532"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[65px] size-[2px] top-[629px]"
          data-node-id="139:30531"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[138px] size-[2px] top-[161px]"
          data-node-id="139:30530"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[211px] top-[298px] w-[5px]"
          data-node-id="139:30529"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[284px] size-[2px] top-[435px]"
          data-node-id="139:30528"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[357px] size-[2px] top-[572px]"
          data-node-id="139:30527"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[40px] size-[2px] top-[104px]"
          data-node-id="139:30526"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[113px] top-[241px] w-[5px]"
          data-node-id="139:30525"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[186px] size-[2px] top-[378px]"
          data-node-id="139:30524"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[259px] size-[2px] top-[515px]"
          data-node-id="139:30523"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[332px] size-[2px] top-[47px]"
          data-node-id="139:30522"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[15px] top-[184px] w-[5px]"
          data-node-id="139:30521"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[88px] size-[2px] top-[321px]"
          data-node-id="139:30520"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[161px] size-[2px] top-[458px]"
          data-node-id="139:30519"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[234px] size-[2px] top-[595px]"
          data-node-id="139:30518"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[307px] top-[127px] w-[5px]"
          data-node-id="139:30517"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[380px] size-[2px] top-[264px]"
          data-node-id="139:30516"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[63px] size-[2px] top-[401px]"
          data-node-id="139:30515"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[136px] size-[2px] top-[538px]"
          data-node-id="139:30514"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[209px] top-[70px] w-[5px]"
          data-node-id="139:30513"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[282px] size-[2px] top-[207px]"
          data-node-id="139:30512"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[355px] size-[2px] top-[344px]"
          data-node-id="139:30511"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[38px] size-[2px] top-[481px]"
          data-node-id="139:30510"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[111px] top-[618px] w-[5px]"
          data-node-id="139:30509"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[184px] size-[2px] top-[150px]"
          data-node-id="139:30508"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[257px] size-[2px] top-[287px]"
          data-node-id="139:30507"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[330px] size-[2px] top-[424px]"
          data-node-id="139:30506"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[13px] top-[561px] w-[5px]"
          data-node-id="139:30505"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[86px] size-[2px] top-[93px]"
          data-node-id="139:30504"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[159px] size-[2px] top-[230px]"
          data-node-id="139:30503"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[232px] size-[2px] top-[367px]"
          data-node-id="139:30502"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[305px] top-[504px] w-[5px]"
          data-node-id="139:30501"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[378px] size-[2px] top-[36px]"
          data-node-id="139:30500"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[61px] size-[2px] top-[173px]"
          data-node-id="139:30499"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[134px] size-[2px] top-[310px]"
          data-node-id="139:30498"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[207px] top-[447px] w-[5px]"
          data-node-id="139:30497"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[280px] size-[2px] top-[584px]"
          data-node-id="139:30496"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[353px] size-[2px] top-[116px]"
          data-node-id="139:30495"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[36px] size-[2px] top-[253px]"
          data-node-id="139:30494"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[109px] top-[390px] w-[5px]"
          data-node-id="139:30493"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[182px] size-[2px] top-[527px]"
          data-node-id="139:30492"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[255px] size-[2px] top-[59px]"
          data-node-id="139:30491"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[328px] size-[2px] top-[196px]"
          data-node-id="139:30490"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[11px] top-[333px] w-[5px]"
          data-node-id="139:30489"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[84px] size-[2px] top-[470px]"
          data-node-id="139:30488"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[157px] size-[2px] top-[607px]"
          data-node-id="139:30487"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[230px] size-[2px] top-[139px]"
          data-node-id="139:30486"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[303px] top-[276px] w-[5px]"
          data-node-id="139:30485"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[376px] size-[2px] top-[413px]"
          data-node-id="139:30484"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[59px] size-[2px] top-[550px]"
          data-node-id="139:30483"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[132px] size-[2px] top-[82px]"
          data-node-id="139:30482"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[205px] top-[219px] w-[5px]"
          data-node-id="139:30481"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[278px] size-[2px] top-[356px]"
          data-node-id="139:30480"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[351px] size-[2px] top-[493px]"
          data-node-id="139:30479"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[34px] size-[2px] top-[630px]"
          data-node-id="139:30478"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[107px] top-[162px] w-[5px]"
          data-node-id="139:30477"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[180px] size-[2px] top-[299px]"
          data-node-id="139:30476"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[253px] size-[2px] top-[436px]"
          data-node-id="139:30475"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[326px] size-[2px] top-[573px]"
          data-node-id="139:30474"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[9px] top-[105px] w-[5px]"
          data-node-id="139:30473"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[82px] size-[2px] top-[242px]"
          data-node-id="139:30472"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[155px] size-[2px] top-[379px]"
          data-node-id="139:30471"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[228px] size-[2px] top-[516px]"
          data-node-id="139:30470"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[301px] top-[48px] w-[5px]"
          data-node-id="139:30469"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[374px] size-[2px] top-[185px]"
          data-node-id="139:30468"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[57px] size-[2px] top-[322px]"
          data-node-id="139:30467"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[130px] size-[2px] top-[459px]"
          data-node-id="139:30466"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[203px] top-[596px] w-[5px]"
          data-node-id="139:30465"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[276px] size-[2px] top-[128px]"
          data-node-id="139:30464"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[349px] size-[2px] top-[265px]"
          data-node-id="139:30463"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[32px] size-[2px] top-[402px]"
          data-node-id="139:30462"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[105px] top-[539px] w-[5px]"
          data-node-id="139:30461"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[178px] size-[2px] top-[71px]"
          data-node-id="139:30460"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[251px] size-[2px] top-[208px]"
          data-node-id="139:30459"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[324px] size-[2px] top-[345px]"
          data-node-id="139:30458"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[7px] top-[482px] w-[5px]"
          data-node-id="139:30457"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[80px] size-[2px] top-[619px]"
          data-node-id="139:30456"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[153px] size-[2px] top-[151px]"
          data-node-id="139:30455"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[226px] size-[2px] top-[288px]"
          data-node-id="139:30454"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[299px] top-[425px] w-[5px]"
          data-node-id="139:30453"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[372px] size-[2px] top-[562px]"
          data-node-id="139:30452"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[55px] size-[2px] top-[94px]"
          data-node-id="139:30451"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[128px] size-[2px] top-[231px]"
          data-node-id="139:30450"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[201px] top-[368px] w-[5px]"
          data-node-id="139:30449"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[274px] size-[2px] top-[505px]"
          data-node-id="139:30448"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[347px] size-[2px] top-[37px]"
          data-node-id="139:30447"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[30px] size-[2px] top-[174px]"
          data-node-id="139:30446"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[103px] top-[311px] w-[5px]"
          data-node-id="139:30445"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[176px] size-[2px] top-[448px]"
          data-node-id="139:30444"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[249px] size-[2px] top-[585px]"
          data-node-id="139:30443"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[322px] size-[2px] top-[117px]"
          data-node-id="139:30442"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[5px] top-[254px] w-[5px]"
          data-node-id="139:30441"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[78px] size-[2px] top-[391px]"
          data-node-id="139:30440"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[151px] size-[2px] top-[528px]"
          data-node-id="139:30439"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[224px] size-[2px] top-[60px]"
          data-node-id="139:30438"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[297px] top-[197px] w-[5px]"
          data-node-id="139:30437"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[370px] size-[2px] top-[334px]"
          data-node-id="139:30436"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[53px] size-[2px] top-[471px]"
          data-node-id="139:30435"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[126px] size-[2px] top-[608px]"
          data-node-id="139:30434"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[199px] top-[140px] w-[5px]"
          data-node-id="139:30433"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[272px] size-[2px] top-[277px]"
          data-node-id="139:30432"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[345px] size-[2px] top-[414px]"
          data-node-id="139:30431"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[28px] size-[2px] top-[551px]"
          data-node-id="139:30430"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[101px] top-[83px] w-[5px]"
          data-node-id="139:30429"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[174px] size-[2px] top-[220px]"
          data-node-id="139:30428"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[247px] size-[2px] top-[357px]"
          data-node-id="139:30427"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[320px] size-[2px] top-[494px]"
          data-node-id="139:30426"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[3px] top-[631px] w-[5px]"
          data-node-id="139:30425"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[76px] size-[2px] top-[163px]"
          data-node-id="139:30424"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[149px] size-[2px] top-[300px]"
          data-node-id="139:30423"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[222px] size-[2px] top-[437px]"
          data-node-id="139:30422"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[295px] top-[574px] w-[5px]"
          data-node-id="139:30421"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[368px] size-[2px] top-[106px]"
          data-node-id="139:30420"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[51px] size-[2px] top-[243px]"
          data-node-id="139:30419"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[124px] size-[2px] top-[380px]"
          data-node-id="139:30418"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[197px] top-[517px] w-[5px]"
          data-node-id="139:30417"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[270px] size-[2px] top-[49px]"
          data-node-id="139:30416"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[343px] size-[2px] top-[186px]"
          data-node-id="139:30415"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[26px] size-[2px] top-[323px]"
          data-node-id="139:30414"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[99px] top-[460px] w-[5px]"
          data-node-id="139:30413"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[172px] size-[2px] top-[597px]"
          data-node-id="139:30412"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[245px] size-[2px] top-[129px]"
          data-node-id="139:30411"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[318px] size-[2px] top-[266px]"
          data-node-id="139:30410"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-px top-[403px] w-[5px]"
          data-node-id="139:30409"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[74px] size-[2px] top-[540px]"
          data-node-id="139:30408"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[147px] size-[2px] top-[72px]"
          data-node-id="139:30407"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[220px] size-[2px] top-[209px]"
          data-node-id="139:30406"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[293px] top-[346px] w-[5px]"
          data-node-id="139:30405"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[366px] size-[2px] top-[483px]"
          data-node-id="139:30404"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[49px] size-[2px] top-[620px]"
          data-node-id="139:30403"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[122px] size-[2px] top-[152px]"
          data-node-id="139:30402"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[195px] top-[289px] w-[5px]"
          data-node-id="139:30401"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[268px] size-[2px] top-[426px]"
          data-node-id="139:30400"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[341px] size-[2px] top-[563px]"
          data-node-id="139:30399"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[24px] size-[2px] top-[95px]"
          data-node-id="139:30398"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[97px] top-[232px] w-[5px]"
          data-node-id="139:30397"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[170px] size-[2px] top-[369px]"
          data-node-id="139:30396"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[243px] size-[2px] top-[506px]"
          data-node-id="139:30395"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[316px] size-[2px] top-[38px]"
          data-node-id="139:30394"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[389px] top-[175px] w-[5px]"
          data-node-id="139:30393"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[72px] size-[2px] top-[312px]"
          data-node-id="139:30392"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[145px] size-[2px] top-[449px]"
          data-node-id="139:30391"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[218px] size-[2px] top-[586px]"
          data-node-id="139:30390"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[291px] top-[118px] w-[5px]"
          data-node-id="139:30389"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[364px] size-[2px] top-[255px]"
          data-node-id="139:30388"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[47px] size-[2px] top-[392px]"
          data-node-id="139:30387"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[120px] size-[2px] top-[529px]"
          data-node-id="139:30386"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[193px] top-[61px] w-[5px]"
          data-node-id="139:30385"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[266px] size-[2px] top-[198px]"
          data-node-id="139:30384"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[339px] size-[2px] top-[335px]"
          data-node-id="139:30383"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[22px] size-[2px] top-[472px]"
          data-node-id="139:30382"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[95px] top-[609px] w-[5px]"
          data-node-id="139:30381"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[168px] size-[2px] top-[141px]"
          data-node-id="139:30380"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[241px] size-[2px] top-[278px]"
          data-node-id="139:30379"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[314px] size-[2px] top-[415px]"
          data-node-id="139:30378"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[387px] top-[552px] w-[5px]"
          data-node-id="139:30377"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[70px] size-[2px] top-[84px]"
          data-node-id="139:30376"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[143px] size-[2px] top-[221px]"
          data-node-id="139:30375"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[216px] size-[2px] top-[358px]"
          data-node-id="139:30374"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[289px] top-[495px] w-[5px]"
          data-node-id="139:30373"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[362px] size-[2px] top-[632px]"
          data-node-id="139:30372"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[45px] size-[2px] top-[164px]"
          data-node-id="139:30371"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[118px] size-[2px] top-[301px]"
          data-node-id="139:30370"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[191px] top-[438px] w-[5px]"
          data-node-id="139:30369"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[264px] size-[2px] top-[575px]"
          data-node-id="139:30368"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[337px] size-[2px] top-[107px]"
          data-node-id="139:30367"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[20px] size-[2px] top-[244px]"
          data-node-id="139:30366"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[93px] top-[381px] w-[5px]"
          data-node-id="139:30365"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[166px] size-[2px] top-[518px]"
          data-node-id="139:30364"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[239px] size-[2px] top-[50px]"
          data-node-id="139:30363"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[312px] size-[2px] top-[187px]"
          data-node-id="139:30362"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[385px] top-[324px] w-[5px]"
          data-node-id="139:30361"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[68px] size-[2px] top-[461px]"
          data-node-id="139:30360"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[141px] size-[2px] top-[598px]"
          data-node-id="139:30359"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[214px] size-[2px] top-[130px]"
          data-node-id="139:30358"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[287px] top-[267px] w-[5px]"
          data-node-id="139:30357"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[360px] size-[2px] top-[404px]"
          data-node-id="139:30356"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[43px] size-[2px] top-[541px]"
          data-node-id="139:30355"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[116px] size-[2px] top-[73px]"
          data-node-id="139:30354"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[189px] top-[210px] w-[5px]"
          data-node-id="139:30353"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[262px] size-[2px] top-[347px]"
          data-node-id="139:30352"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[335px] size-[2px] top-[484px]"
          data-node-id="139:30351"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[18px] size-[2px] top-[621px]"
          data-node-id="139:30350"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[91px] top-[153px] w-[5px]"
          data-node-id="139:30349"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[164px] size-[2px] top-[290px]"
          data-node-id="139:30348"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[237px] size-[2px] top-[427px]"
          data-node-id="139:30347"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[310px] size-[2px] top-[564px]"
          data-node-id="139:30346"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[383px] top-[96px] w-[5px]"
          data-node-id="139:30345"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[66px] size-[2px] top-[233px]"
          data-node-id="139:30344"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[139px] size-[2px] top-[370px]"
          data-node-id="139:30343"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[212px] size-[2px] top-[507px]"
          data-node-id="139:30342"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[285px] top-[39px] w-[5px]"
          data-node-id="139:30341"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[358px] size-[2px] top-[176px]"
          data-node-id="139:30340"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[41px] size-[2px] top-[313px]"
          data-node-id="139:30339"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[114px] size-[2px] top-[450px]"
          data-node-id="139:30338"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[187px] top-[587px] w-[5px]"
          data-node-id="139:30337"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[260px] size-[2px] top-[119px]"
          data-node-id="139:30336"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[333px] size-[2px] top-[256px]"
          data-node-id="139:30335"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[16px] size-[2px] top-[393px]"
          data-node-id="139:30334"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[89px] top-[530px] w-[5px]"
          data-node-id="139:30333"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[162px] size-[2px] top-[62px]"
          data-node-id="139:30332"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[235px] size-[2px] top-[199px]"
          data-node-id="139:30331"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[308px] size-[2px] top-[336px]"
          data-node-id="139:30330"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[381px] top-[473px] w-[5px]"
          data-node-id="139:30329"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[64px] size-[2px] top-[610px]"
          data-node-id="139:30328"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[137px] size-[2px] top-[142px]"
          data-node-id="139:30327"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[210px] size-[2px] top-[279px]"
          data-node-id="139:30326"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[283px] top-[416px] w-[5px]"
          data-node-id="139:30325"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[356px] size-[2px] top-[553px]"
          data-node-id="139:30324"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[39px] size-[2px] top-[85px]"
          data-node-id="139:30323"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[112px] size-[2px] top-[222px]"
          data-node-id="139:30322"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[185px] top-[359px] w-[5px]"
          data-node-id="139:30321"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[258px] size-[2px] top-[496px]"
          data-node-id="139:30320"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[331px] size-[2px] top-[633px]"
          data-node-id="139:30319"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[14px] size-[2px] top-[165px]"
          data-node-id="139:30318"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[87px] top-[302px] w-[5px]"
          data-node-id="139:30317"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[160px] size-[2px] top-[439px]"
          data-node-id="139:30316"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[233px] size-[2px] top-[576px]"
          data-node-id="139:30315"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[306px] size-[2px] top-[108px]"
          data-node-id="139:30314"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[379px] top-[245px] w-[5px]"
          data-node-id="139:30313"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[62px] size-[2px] top-[382px]"
          data-node-id="139:30312"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[135px] size-[2px] top-[519px]"
          data-node-id="139:30311"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[208px] size-[2px] top-[51px]"
          data-node-id="139:30310"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[281px] top-[188px] w-[5px]"
          data-node-id="139:30309"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[354px] size-[2px] top-[325px]"
          data-node-id="139:30308"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[37px] size-[2px] top-[462px]"
          data-node-id="139:30307"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[110px] size-[2px] top-[599px]"
          data-node-id="139:30306"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[183px] top-[131px] w-[5px]"
          data-node-id="139:30305"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[256px] size-[2px] top-[268px]"
          data-node-id="139:30304"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[329px] size-[2px] top-[405px]"
          data-node-id="139:30303"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[12px] size-[2px] top-[542px]"
          data-node-id="139:30302"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[85px] top-[74px] w-[5px]"
          data-node-id="139:30301"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[158px] size-[2px] top-[211px]"
          data-node-id="139:30300"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[231px] size-[2px] top-[348px]"
          data-node-id="139:30299"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[304px] size-[2px] top-[485px]"
          data-node-id="139:30298"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[377px] top-[622px] w-[5px]"
          data-node-id="139:30297"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[60px] size-[2px] top-[154px]"
          data-node-id="139:30296"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[133px] size-[2px] top-[291px]"
          data-node-id="139:30295"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[206px] size-[2px] top-[428px]"
          data-node-id="139:30294"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[279px] top-[565px] w-[5px]"
          data-node-id="139:30293"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[352px] size-[2px] top-[97px]"
          data-node-id="139:30292"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[35px] size-[2px] top-[234px]"
          data-node-id="139:30291"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[108px] size-[2px] top-[371px]"
          data-node-id="139:30290"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[181px] top-[508px] w-[5px]"
          data-node-id="139:30289"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[254px] size-[2px] top-[40px]"
          data-node-id="139:30288"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[327px] size-[2px] top-[177px]"
          data-node-id="139:30287"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[10px] size-[2px] top-[314px]"
          data-node-id="139:30286"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[83px] top-[451px] w-[5px]"
          data-node-id="139:30285"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[156px] size-[2px] top-[588px]"
          data-node-id="139:30284"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[229px] size-[2px] top-[120px]"
          data-node-id="139:30283"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[302px] size-[2px] top-[257px]"
          data-node-id="139:30282"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[375px] top-[394px] w-[5px]"
          data-node-id="139:30281"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[58px] size-[2px] top-[531px]"
          data-node-id="139:30280"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[131px] size-[2px] top-[63px]"
          data-node-id="139:30279"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[204px] size-[2px] top-[200px]"
          data-node-id="139:30278"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[277px] top-[337px] w-[5px]"
          data-node-id="139:30277"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[350px] size-[2px] top-[474px]"
          data-node-id="139:30276"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[33px] size-[2px] top-[611px]"
          data-node-id="139:30275"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[106px] size-[2px] top-[143px]"
          data-node-id="139:30274"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[179px] top-[280px] w-[5px]"
          data-node-id="139:30273"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[252px] size-[2px] top-[417px]"
          data-node-id="139:30272"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[325px] size-[2px] top-[554px]"
          data-node-id="139:30271"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[8px] size-[2px] top-[86px]"
          data-node-id="139:30270"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[81px] top-[223px] w-[5px]"
          data-node-id="139:30269"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[154px] size-[2px] top-[360px]"
          data-node-id="139:30268"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[227px] size-[2px] top-[497px]"
          data-node-id="139:30267"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[300px] size-[2px] top-[634px]"
          data-node-id="139:30266"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[373px] top-[166px] w-[5px]"
          data-node-id="139:30265"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[56px] size-[2px] top-[303px]"
          data-node-id="139:30264"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[129px] size-[2px] top-[440px]"
          data-node-id="139:30263"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[202px] size-[2px] top-[577px]"
          data-node-id="139:30262"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[275px] top-[109px] w-[5px]"
          data-node-id="139:30261"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[348px] size-[2px] top-[246px]"
          data-node-id="139:30260"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[31px] size-[2px] top-[383px]"
          data-node-id="139:30259"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[104px] size-[2px] top-[520px]"
          data-node-id="139:30258"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[177px] top-[52px] w-[5px]"
          data-node-id="139:30257"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[250px] size-[2px] top-[189px]"
          data-node-id="139:30256"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[323px] size-[2px] top-[326px]"
          data-node-id="139:30255"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[6px] size-[2px] top-[463px]"
          data-node-id="139:30254"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[79px] top-[600px] w-[5px]"
          data-node-id="139:30253"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[152px] size-[2px] top-[132px]"
          data-node-id="139:30252"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[225px] size-[2px] top-[269px]"
          data-node-id="139:30251"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[298px] size-[2px] top-[406px]"
          data-node-id="139:30250"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[371px] top-[543px] w-[5px]"
          data-node-id="139:30249"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[54px] size-[2px] top-[75px]"
          data-node-id="139:30248"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[127px] size-[2px] top-[212px]"
          data-node-id="139:30247"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[200px] size-[2px] top-[349px]"
          data-node-id="139:30246"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[273px] top-[486px] w-[5px]"
          data-node-id="139:30245"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[346px] size-[2px] top-[623px]"
          data-node-id="139:30244"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[29px] size-[2px] top-[155px]"
          data-node-id="139:30243"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[102px] size-[2px] top-[292px]"
          data-node-id="139:30242"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[175px] top-[429px] w-[5px]"
          data-node-id="139:30241"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[248px] size-[2px] top-[566px]"
          data-node-id="139:30240"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[321px] size-[2px] top-[98px]"
          data-node-id="139:30239"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[4px] size-[2px] top-[235px]"
          data-node-id="139:30238"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[77px] top-[372px] w-[5px]"
          data-node-id="139:30237"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[150px] size-[2px] top-[509px]"
          data-node-id="139:30236"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[223px] size-[2px] top-[41px]"
          data-node-id="139:30235"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[296px] size-[2px] top-[178px]"
          data-node-id="139:30234"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[369px] top-[315px] w-[5px]"
          data-node-id="139:30233"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[52px] size-[2px] top-[452px]"
          data-node-id="139:30232"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[125px] size-[2px] top-[589px]"
          data-node-id="139:30231"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[198px] size-[2px] top-[121px]"
          data-node-id="139:30230"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[271px] top-[258px] w-[5px]"
          data-node-id="139:30229"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[344px] size-[2px] top-[395px]"
          data-node-id="139:30228"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[27px] size-[2px] top-[532px]"
          data-node-id="139:30227"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[100px] size-[2px] top-[64px]"
          data-node-id="139:30226"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] h-[2px] left-[173px] top-[201px] w-[5px]"
          data-node-id="139:30225"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[246px] size-[2px] top-[338px]"
          data-node-id="139:30224"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[319px] size-[2px] top-[475px]"
          data-node-id="139:30223"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[2px] size-[2px] top-[612px]"
          data-node-id="139:30222"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] h-[2px] left-[75px] top-[144px] w-[5px]"
          data-node-id="139:30221"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[148px] size-[2px] top-[281px]"
          data-node-id="139:30220"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[221px] size-[2px] top-[418px]"
          data-node-id="139:30219"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[294px] size-[2px] top-[555px]"
          data-node-id="139:30218"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] h-[2px] left-[367px] top-[87px] w-[5px]"
          data-node-id="139:30217"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#59b126] left-[50px] size-[2px] top-[224px]"
          data-node-id="139:30216"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#8ed12b] left-[123px] size-[2px] top-[361px]"
          data-node-id="139:30215"
          data-name="Meadow texture"
        />
        <div
          className="absolute bg-[#b1dc3b] left-[196px] size-[2px] top-[498px]"
          data-node-id="139:30214"
          data-name="Meadow texture"
        />
        <div
          className="absolute h-[12.6px] left-[12px] top-[55px] w-[16.8px]"
          data-node-id="139:30211"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[9px] left-[79px] top-[152px] w-[12px]"
          data-node-id="139:30208"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[146px] top-[249px] w-[12px]"
          data-node-id="139:30205"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[213px] top-[346px] w-[12px]"
          data-node-id="139:30202"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[280px] top-[443px] w-[12px]"
          data-node-id="139:30199"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[12.6px] left-[347px] top-[540px] w-[16.8px]"
          data-node-id="139:30196"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[9px] left-[52px] top-[66px] w-[12px]"
          data-node-id="139:30193"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[119px] top-[163px] w-[12px]"
          data-node-id="139:30190"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[186px] top-[260px] w-[12px]"
          data-node-id="139:30187"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[253px] top-[357px] w-[12px]"
          data-node-id="139:30184"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[12.6px] left-[320px] top-[454px] w-[16.8px]"
          data-node-id="139:30181"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[9px] left-[25px] top-[551px] w-[12px]"
          data-node-id="139:30178"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[92px] top-[77px] w-[12px]"
          data-node-id="139:30175"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[159px] top-[174px] w-[12px]"
          data-node-id="139:30172"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[226px] top-[271px] w-[12px]"
          data-node-id="139:30169"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[12.6px] left-[293px] top-[368px] w-[16.8px]"
          data-node-id="139:30166"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[9px] left-[360px] top-[465px] w-[12px]"
          data-node-id="139:30163"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[65px] top-[562px] w-[12px]"
          data-node-id="139:30160"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[132px] top-[88px] w-[12px]"
          data-node-id="139:30157"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[199px] top-[185px] w-[12px]"
          data-node-id="139:30154"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[12.6px] left-[266px] top-[282px] w-[16.8px]"
          data-node-id="139:30151"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[9px] left-[333px] top-[379px] w-[12px]"
          data-node-id="139:30148"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[38px] top-[476px] w-[12px]"
          data-node-id="139:30145"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[105px] top-[573px] w-[12px]"
          data-node-id="139:30142"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[172px] top-[99px] w-[12px]"
          data-node-id="139:30139"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[12.6px] left-[239px] top-[196px] w-[16.8px]"
          data-node-id="139:30136"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[9px] left-[306px] top-[293px] w-[12px]"
          data-node-id="139:30133"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[373px] top-[390px] w-[12px]"
          data-node-id="139:30130"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[78px] top-[487px] w-[12px]"
          data-node-id="139:30127"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[145px] top-[584px] w-[12px]"
          data-node-id="139:30124"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[12.6px] left-[212px] top-[110px] w-[16.8px]"
          data-node-id="139:30121"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[9px] left-[279px] top-[207px] w-[12px]"
          data-node-id="139:30118"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[346px] top-[304px] w-[12px]"
          data-node-id="139:30115"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[51px] top-[401px] w-[12px]"
          data-node-id="139:30112"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[118px] top-[498px] w-[12px]"
          data-node-id="139:30109"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[12.6px] left-[185px] top-[595px] w-[16.8px]"
          data-node-id="139:30106"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[9px] left-[252px] top-[121px] w-[12px]"
          data-node-id="139:30103"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[319px] top-[218px] w-[12px]"
          data-node-id="139:30100"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[24px] top-[315px] w-[12px]"
          data-node-id="139:30097"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[91px] top-[412px] w-[12px]"
          data-node-id="139:30094"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[12.6px] left-[158px] top-[509px] w-[16.8px]"
          data-node-id="139:30091"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[9px] left-[225px] top-[606px] w-[12px]"
          data-node-id="139:30088"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[292px] top-[132px] w-[12px]"
          data-node-id="139:30085"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[359px] top-[229px] w-[12px]"
          data-node-id="139:30082"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[9px] left-[64px] top-[326px] w-[12px]"
          data-node-id="139:30079"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft1}
          />
        </div>
        <div
          className="absolute h-[12.6px] left-[131px] top-[423px] w-[16.8px]"
          data-node-id="139:30076"
          data-name="Grass tuft"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGrassTuft}
          />
        </div>
        <div
          className="absolute h-[294px] left-0 top-[286px] w-[113px]"
          data-node-id="139:30075"
          data-name="River banks"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBanks}
          />
        </div>
        <div
          className="absolute h-[260px] left-0 top-[304px] w-[101px]"
          data-node-id="139:30074"
          data-name="River"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiver}
          />
        </div>
        <div
          className="absolute h-[243px] left-0 top-[308px] w-[90px]"
          data-node-id="139:30073"
          data-name="River shallows"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverShallows}
          />
        </div>
        <div
          className="absolute h-[120px] left-0 top-[347px] w-[85px]"
          data-node-id="139:30072"
          data-name="Waterfall rock face"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgWaterfallRockFace}
          />
        </div>
        <div
          className="absolute h-[100px] left-0 top-[357px] w-[82px]"
          data-node-id="139:30071"
          data-name="Rock face highlights"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRockFaceHighlights}
          />
        </div>
        <div
          className="absolute h-[116px] left-0 top-[345px] w-[63px]"
          data-node-id="139:30070"
          data-name="Waterfall"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgWaterfall}
          />
        </div>
        <div
          className="absolute h-[100px] left-px top-[349px] w-[52px]"
          data-node-id="139:30069"
          data-name="Waterfall ribbons"
        >
          <div className="absolute inset-[-1.4%_-2.88%_-0.59%_-1.01%]">
            <img
              alt=""
              className="block max-w-none size-full"
              src={imgWaterfallRibbons}
            />
          </div>
        </div>
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-0 top-[456px] w-[3px]"
          data-node-id="139:30068"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[19px] top-[479px] w-[4px]"
          data-node-id="139:30067"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[38px] top-[502px] w-[5px]"
          data-node-id="139:30066"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-[57px] top-[525px] w-[6px]"
          data-node-id="139:30065"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[76px] top-[470px] w-[7px]"
          data-node-id="139:30064"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[14px] top-[493px] w-[3px]"
          data-node-id="139:30063"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-[33px] top-[516px] w-[4px]"
          data-node-id="139:30062"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[52px] top-[461px] w-[5px]"
          data-node-id="139:30061"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[71px] top-[484px] w-[6px]"
          data-node-id="139:30060"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-[9px] top-[507px] w-[7px]"
          data-node-id="139:30059"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[28px] top-[530px] w-[3px]"
          data-node-id="139:30058"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[47px] top-[475px] w-[4px]"
          data-node-id="139:30057"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-[66px] top-[498px] w-[5px]"
          data-node-id="139:30056"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[4px] top-[521px] w-[6px]"
          data-node-id="139:30055"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[23px] top-[466px] w-[7px]"
          data-node-id="139:30054"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-[42px] top-[489px] w-[3px]"
          data-node-id="139:30053"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[61px] top-[512px] w-[4px]"
          data-node-id="139:30052"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[80px] top-[457px] w-[5px]"
          data-node-id="139:30051"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-[18px] top-[480px] w-[6px]"
          data-node-id="139:30050"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[37px] top-[503px] w-[7px]"
          data-node-id="139:30049"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[56px] top-[526px] w-[3px]"
          data-node-id="139:30048"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-[75px] top-[471px] w-[4px]"
          data-node-id="139:30047"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[13px] top-[494px] w-[5px]"
          data-node-id="139:30046"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[32px] top-[517px] w-[6px]"
          data-node-id="139:30045"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-[51px] top-[462px] w-[7px]"
          data-node-id="139:30044"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[70px] top-[485px] w-[3px]"
          data-node-id="139:30043"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#d1ffff] h-[2px] left-[8px] top-[508px] w-[4px]"
          data-node-id="139:30042"
          data-name="Water sparkle"
        />
        <div
          className="absolute bg-[#0c82ce] h-[2px] left-[27px] top-[531px] w-[5px]"
          data-node-id="139:30041"
          data-name="Water sparkle"
        />
        <div
          className="absolute h-[29px] left-[7px] top-[449px] w-[69px]"
          data-node-id="139:30040"
          data-name="River foam"
        >
          <div className="absolute inset-[-8.8%_-1.41%_-6.9%_0]">
            <img
              alt=""
              className="block max-w-none size-full"
              src={imgRiverFoam}
            />
          </div>
        </div>
        <div
          className="absolute h-[18px] left-[5px] top-[330px] w-[20px]"
          data-node-id="139:30036"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder}
          />
        </div>
        <div
          className="absolute h-[18px] left-[11px] top-[382px] w-[20px]"
          data-node-id="139:30032"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder1}
          />
        </div>
        <div
          className="absolute h-[18px] left-[66px] top-[387px] w-[20px]"
          data-node-id="139:30028"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder}
          />
        </div>
        <div
          className="absolute h-[18px] left-[76px] top-[415px] w-[20px]"
          data-node-id="139:30024"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder1}
          />
        </div>
        <div
          className="absolute h-[18px] left-[65px] top-[441px] w-[20px]"
          data-node-id="139:30020"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder}
          />
        </div>
        <div
          className="absolute h-[18px] left-[80px] top-[451px] w-[20px]"
          data-node-id="139:30016"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder1}
          />
        </div>
        <div
          className="absolute h-[18px] left-[8px] top-[445px] w-[20px]"
          data-node-id="139:30012"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder}
          />
        </div>
        <div
          className="absolute h-[18px] left-[2px] top-[485px] w-[20px]"
          data-node-id="139:30008"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder1}
          />
        </div>
        <div
          className="absolute h-[18px] left-[84px] top-[493px] w-[20px]"
          data-node-id="139:30004"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder}
          />
        </div>
        <div
          className="absolute h-[18px] left-[44px] top-[516px] w-[20px]"
          data-node-id="139:30000"
          data-name="River boulder"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgRiverBoulder1}
          />
        </div>
        <div
          className="absolute h-[649px] left-[82px] top-[17px] w-[235.316px]"
          data-node-id="139:29999"
          data-name="Trail border"
        >
          <div className="absolute inset-[-2.7%_-7.44%]">
            <img
              alt=""
              className="block max-w-none size-full"
              src={imgTrailBorder}
            />
          </div>
        </div>
        <div
          className="absolute h-[649px] left-[82px] top-[17px] w-[235.316px]"
          data-node-id="139:29998"
          data-name="Golden trail"
        >
          <div className="absolute inset-[-2.39%_-6.59%]">
            <img
              alt=""
              className="block max-w-none size-full"
              src={imgGoldenTrail}
            />
          </div>
        </div>
        <div
          className="absolute h-[649px] left-[82px] top-[17px] w-[235.316px]"
          data-node-id="139:29997"
          data-name="Trail edge light"
        >
          <div className="absolute inset-[-1.93%_-5.31%]">
            <img
              alt=""
              className="block max-w-none size-full"
              src={imgTrailEdgeLight}
            />
          </div>
        </div>
        <div
          className="absolute h-[649px] left-[82px] top-[17px] w-[235.316px]"
          data-node-id="139:29996"
          data-name="Trail surface"
        >
          <div className="absolute inset-[-1.62%_-4.46%]">
            <img
              alt=""
              className="block max-w-none size-full"
              src={imgTrailSurface}
            />
          </div>
        </div>
        <div
          className="absolute h-[649px] left-[82px] top-[17px] w-[235.316px]"
          data-node-id="139:29995"
          data-name="Trail dotted line"
        >
          <div className="absolute inset-[0_-0.42%]">
            <img
              alt=""
              className="block max-w-none size-full"
              height="649.662"
              src={imgTrailDottedLine}
              width="237.306"
            />
          </div>
        </div>
        <div
          className="absolute h-[75px] left-[-20px] top-[-10px] w-[56.25px]"
          data-node-id="139:29986"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree}
          />
        </div>
        <div
          className="absolute h-[78px] left-[12px] top-[-10px] w-[58.5px]"
          data-node-id="139:29977"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree1}
          />
        </div>
        <div
          className="absolute h-[63px] left-[48px] top-[-10px] w-[47.25px]"
          data-node-id="139:29968"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree2}
          />
        </div>
        <div
          className="absolute h-[60px] left-[83px] top-[-10px] w-[45px]"
          data-node-id="139:29959"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree3}
          />
        </div>
        <div
          className="absolute h-[72px] left-[117px] top-[-10px] w-[54px]"
          data-node-id="139:29950"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree4}
          />
        </div>
        <div
          className="absolute h-[78px] left-[159px] top-[-10px] w-[58.5px]"
          data-node-id="139:29941"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree1}
          />
        </div>
        <div
          className="absolute h-[60px] left-[194px] top-[-10px] w-[45px]"
          data-node-id="139:29932"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree3}
          />
        </div>
        <div
          className="absolute h-[75px] left-[340px] top-[-10px] w-[56.25px]"
          data-node-id="139:29923"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree5}
          />
        </div>
        <div
          className="absolute h-[75px] left-[370px] top-px w-[56.25px]"
          data-node-id="139:29914"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree}
          />
        </div>
        <div
          className="absolute h-[72px] left-[-21px] top-[42px] w-[54px]"
          data-node-id="139:29905"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree6}
          />
        </div>
        <div
          className="absolute h-[69px] left-[-30px] top-[101px] w-[51.75px]"
          data-node-id="139:29896"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree7}
          />
        </div>
        <div
          className="absolute h-[81px] left-[-23px] top-[165px] w-[60.75px]"
          data-node-id="139:29887"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree8}
          />
        </div>
        <div
          className="absolute h-[81px] left-[-25px] top-[236px] w-[60.75px]"
          data-node-id="139:29878"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree9}
          />
        </div>
        <div
          className="absolute h-[63px] left-[-22px] top-[283px] w-[47.25px]"
          data-node-id="139:29869"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree2}
          />
        </div>
        <div
          className="absolute h-[69px] left-[348px] top-[60px] w-[51.75px]"
          data-node-id="139:29860"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree7}
          />
        </div>
        <div
          className="absolute h-[69px] left-[365px] top-[112px] w-[51.75px]"
          data-node-id="139:29851"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree7}
          />
        </div>
        <div
          className="absolute h-[78px] left-[346px] top-[186px] w-[58.5px]"
          data-node-id="139:29842"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree10}
          />
        </div>
        <div
          className="absolute h-[72px] left-[371px] top-[236px] w-[54px]"
          data-node-id="139:29833"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree6}
          />
        </div>
        <div
          className="absolute h-[72px] left-[339px] top-[258px] w-[54px]"
          data-node-id="139:29824"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree6}
          />
        </div>
        <div
          className="absolute h-[66px] left-[360px] top-[309px] w-[49.5px]"
          data-node-id="139:29815"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree11}
          />
        </div>
        <div
          className="absolute h-[78px] left-[363px] top-[390px] w-[58.5px]"
          data-node-id="139:29806"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree10}
          />
        </div>
        <div
          className="absolute h-[66px] left-[341px] top-[442px] w-[49.5px]"
          data-node-id="139:29797"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree11}
          />
        </div>
        <div
          className="absolute h-[78px] left-[366px] top-[494px] w-[58.5px]"
          data-node-id="139:29788"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree1}
          />
        </div>
        <div
          className="absolute h-[72px] left-[357px] top-[553px] w-[54px]"
          data-node-id="139:29779"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree6}
          />
        </div>
        <div
          className="absolute h-[84px] left-[323px] top-[600px] w-[63px]"
          data-node-id="139:29770"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree12}
          />
        </div>
        <div
          className="absolute h-[75px] left-[-24px] top-[482px] w-[56.25px]"
          data-node-id="139:29761"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree5}
          />
        </div>
        <div
          className="absolute h-[81px] left-[-26px] top-[540px] w-[60.75px]"
          data-node-id="139:29752"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree8}
          />
        </div>
        <div
          className="absolute h-[84px] left-[-13px] top-[595px] w-[63px]"
          data-node-id="139:29743"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree13}
          />
        </div>
        <div
          className="absolute h-[63px] left-[28px] top-[617px] w-[47.25px]"
          data-node-id="139:29734"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree14}
          />
        </div>
        <div
          className="absolute h-[66px] left-[15px] top-[8px] w-[49.5px]"
          data-node-id="139:29725"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree15}
          />
        </div>
        <div
          className="absolute h-[73.5px] left-[68px] top-0 w-[55.125px]"
          data-node-id="139:29716"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree16}
          />
        </div>
        <div
          className="absolute h-[81px] left-[126px] top-[-9px] w-[60.75px]"
          data-node-id="139:29707"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree8}
          />
        </div>
        <div
          className="absolute h-[66px] left-[179px] top-[2px] w-[49.5px]"
          data-node-id="139:29698"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree11}
          />
        </div>
        <div
          className="absolute h-[73.5px] left-[216px] top-[-30px] w-[55.125px]"
          data-node-id="139:29689"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree17}
          />
        </div>
        <div
          className="absolute h-[81px] left-[355px] top-[9px] w-[60.75px]"
          data-node-id="139:29680"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree8}
          />
        </div>
        <div
          className="absolute h-[66px] left-[-15px] top-[97px] w-[49.5px]"
          data-node-id="139:29671"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree11}
          />
        </div>
        <div
          className="absolute h-[73.5px] left-[-20px] top-[199px] w-[55.125px]"
          data-node-id="139:29662"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree16}
          />
        </div>
        <div
          className="absolute h-[81px] left-[7px] top-[226px] w-[60.75px]"
          data-node-id="139:29653"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree9}
          />
        </div>
        <div
          className="absolute h-[66px] left-[350px] top-[146px] w-[49.5px]"
          data-node-id="139:29644"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree11}
          />
        </div>
        <div
          className="absolute h-[73.5px] left-[368px] top-[206px] w-[55.125px]"
          data-node-id="139:29635"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree16}
          />
        </div>
        <div
          className="absolute h-[81px] left-[355px] top-[356px] w-[60.75px]"
          data-node-id="139:29626"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree8}
          />
        </div>
        <div
          className="absolute h-[66px] left-[360px] top-[471px] w-[49.5px]"
          data-node-id="139:29617"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree15}
          />
        </div>
        <div
          className="absolute h-[73.5px] left-[-11px] top-[558px] w-[55.125px]"
          data-node-id="139:29608"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree16}
          />
        </div>
        <div
          className="absolute h-[81px] left-[19px] top-[588px] w-[60.75px]"
          data-node-id="139:29599"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree8}
          />
        </div>
        <div
          className="absolute h-[66px] left-[355px] top-[608px] w-[49.5px]"
          data-node-id="139:29590"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree11}
          />
        </div>
      </div>
      <div
        className="absolute h-[640px] left-0 overflow-clip top-0 w-[390px]"
        data-node-id="139:29327"
        data-name="Camp and forest landmarks"
      >
        <div
          className="absolute h-[88px] left-[242px] top-[-20px] w-[100px]"
          data-node-id="139:29582"
          data-name="Golden temple"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgGoldenTemple}
          />
        </div>
        <div
          className="absolute h-[54px] left-[183px] top-0 w-[40.5px]"
          data-node-id="139:29573"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree18}
          />
        </div>
        <div
          className="absolute h-[51px] left-[91px] top-[40px] w-[38.25px]"
          data-node-id="139:29564"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree19}
          />
        </div>
        <div
          className="absolute h-[123px] left-[14px] overflow-clip top-[72px] w-[125px]"
          data-node-id="139:29544"
          data-name="Seva camp"
        >
          <div
            className="absolute h-[21px] left-[4px] top-[102px] w-[120px]"
            data-node-id="139:29563"
            data-name="Building shadow"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgBuildingShadow}
            />
          </div>
          <div
            className="absolute h-[86px] left-[9px] top-[26px] w-[90px]"
            data-node-id="139:29562"
            data-name="Cottage walls"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgCottageWalls}
            />
          </div>
          <div
            className="absolute h-[61px] left-[70px] top-[51px] w-[29px]"
            data-node-id="139:29561"
            data-name="Wall shade"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgWallShade}
            />
          </div>
          <div
            className="absolute h-[46px] left-px top-[17px] w-[111px]"
            data-node-id="139:29560"
            data-name="Roof outline"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRoofOutline}
            />
          </div>
          <div
            className="absolute h-[34px] left-[7px] top-[22px] w-[98px]"
            data-node-id="139:29559"
            data-name="Terracotta roof"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgTerracottaRoof}
            />
          </div>
          <div
            className="absolute h-[26px] left-[21px] top-[23px] w-[80px]"
            data-node-id="139:29558"
            data-name="Roof tile shadows"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRoofTileShadows}
            />
          </div>
          <div
            className="absolute h-[21px] left-[28px] top-[24px] w-[65px]"
            data-node-id="139:29557"
            data-name="Roof tile highlights"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRoofTileHighlights}
            />
          </div>
          <div
            className="absolute h-[22px] left-[70px] top-[6px] w-[12px]"
            data-node-id="139:29556"
            data-name="Chimney"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgChimney}
            />
          </div>
          <div
            className="absolute h-[32px] left-[45px] top-[73px] w-[15px]"
            data-node-id="139:29555"
            data-name="Door frame"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgDoorFrame}
            />
          </div>
          <div
            className="absolute h-[23px] left-[49px] top-[78px] w-[7px]"
            data-node-id="139:29554"
            data-name="Door light"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgDoorLight}
            />
          </div>
          <div
            className="absolute h-[35px] left-[20px] top-[47px] w-[22px]"
            data-node-id="139:29553"
            data-name="Window frames"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgWindowFrames}
            />
          </div>
          <div
            className="absolute h-[27px] left-[23px] top-[50px] w-[17px]"
            data-node-id="139:29552"
            data-name="Window panes"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgWindowPanes}
            />
          </div>
          <div
            className="absolute bg-[#694724] h-[40px] left-[69px] top-[83px] w-[4px]"
            data-node-id="139:29551"
            data-name="Signpost"
          />
          <div
            className="absolute bg-[#694724] h-[39px] left-[104px] top-[80px] w-[4px]"
            data-node-id="139:29550"
            data-name="Signpost"
          />
          <div
            className="absolute h-[41px] left-[62px] top-[62px] w-[49px]"
            data-node-id="139:29549"
            data-name="Camp sign"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgCampSign}
            />
          </div>
          <div
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold'] font-extrabold leading-[0] left-[86.5px] not-italic text-[#2b271a] text-[11px] text-center top-[69px] w-[43px]"
            data-node-id="139:29548"
          >
            <p className="leading-[1.05] mb-0">Seva</p>
            <p className="leading-[1.05]">Camp</p>
          </div>
          <div
            className="absolute h-[9px] left-[4px] top-[100px] w-[12px]"
            data-node-id="139:29545"
            data-name="Grass tuft"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgGrassTuft1}
            />
          </div>
        </div>
        <div
          className="absolute h-[48px] left-[62px] top-[173px] w-[36px]"
          data-node-id="139:29535"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree20}
          />
        </div>
        <div
          className="absolute h-[54px] left-[177px] top-[126px] w-[40.5px]"
          data-node-id="139:29526"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree18}
          />
        </div>
        <div
          className="absolute h-[54px] left-[325px] top-[221px] w-[40.5px]"
          data-node-id="139:29517"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree18}
          />
        </div>
        <div
          className="absolute h-[37.5px] left-[197px] top-[286px] w-[28.125px]"
          data-node-id="139:29508"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree21}
          />
        </div>
        <div
          className="absolute h-[46.5px] left-[21px] top-[268px] w-[34.875px]"
          data-node-id="139:29499"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree22}
          />
        </div>
        <div
          className="absolute h-[42px] left-[82px] top-[319px] w-[31.5px]"
          data-node-id="139:29490"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree23}
          />
        </div>
        <div
          className="absolute h-[51px] left-[290px] top-[297px] w-[38.25px]"
          data-node-id="139:29481"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree19}
          />
        </div>
        <div
          className="absolute h-[90px] left-[305px] top-[363px] w-[77px]"
          data-node-id="139:29472"
          data-name="Forest market stall"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgForestMarketStall}
          />
        </div>
        <div
          className="absolute h-[57px] left-[175px] top-[406px] w-[63px]"
          data-node-id="139:29463"
          data-name="Treasure chest"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgTreasureChest}
          />
        </div>
        <div
          className="absolute h-[57px] left-[34px] top-[506px] w-[42.75px]"
          data-node-id="139:29454"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree24}
          />
        </div>
        <div
          className="absolute h-[51px] left-[298px] top-[574px] w-[38.25px]"
          data-node-id="139:29445"
          data-name="Pixel tree"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPixelTree19}
          />
        </div>
        <div
          className="absolute h-[20px] left-[30px] overflow-clip top-[245px] w-[24px]"
          data-node-id="139:29429"
          data-name="Wildflowers"
        >
          <div
            className="absolute h-[12px] left-0 overflow-clip top-0 w-[8px]"
            data-node-id="139:29440"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29444"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29443"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29442"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29441"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[7px] overflow-clip top-[5px] w-[8px]"
            data-node-id="139:29435"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29439"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29438"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29437"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29436"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[14px] overflow-clip top-0 w-[8px]"
            data-node-id="139:29430"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29434"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29433"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29432"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29431"
              data-name="Flower center"
            />
          </div>
        </div>
        <div
          className="absolute h-[20px] left-[77px] overflow-clip top-[589px] w-[24px]"
          data-node-id="139:29413"
          data-name="Wildflowers"
        >
          <div
            className="absolute h-[12px] left-0 overflow-clip top-0 w-[8px]"
            data-node-id="139:29424"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29428"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#f4ace7] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29427"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f4ace7] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29426"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29425"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[7px] overflow-clip top-[5px] w-[8px]"
            data-node-id="139:29419"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29423"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#f4ace7] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29422"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f4ace7] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29421"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29420"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[14px] overflow-clip top-0 w-[8px]"
            data-node-id="139:29414"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29418"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#f4ace7] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29417"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f4ace7] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29416"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29415"
              data-name="Flower center"
            />
          </div>
        </div>
        <div
          className="absolute h-[20px] left-[334px] overflow-clip top-[570px] w-[24px]"
          data-node-id="139:29397"
          data-name="Wildflowers"
        >
          <div
            className="absolute h-[12px] left-0 overflow-clip top-0 w-[8px]"
            data-node-id="139:29408"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29412"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29411"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29410"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29409"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[7px] overflow-clip top-[5px] w-[8px]"
            data-node-id="139:29403"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29407"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29406"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29405"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29404"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[14px] overflow-clip top-0 w-[8px]"
            data-node-id="139:29398"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29402"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29401"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29400"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29399"
              data-name="Flower center"
            />
          </div>
        </div>
        <div
          className="absolute h-[20px] left-[162px] overflow-clip top-[340px] w-[24px]"
          data-node-id="139:29381"
          data-name="Wildflowers"
        >
          <div
            className="absolute h-[12px] left-0 overflow-clip top-0 w-[8px]"
            data-node-id="139:29392"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29396"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#f4ace7] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29395"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f4ace7] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29394"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29393"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[7px] overflow-clip top-[5px] w-[8px]"
            data-node-id="139:29387"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29391"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#f4ace7] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29390"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f4ace7] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29389"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29388"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[14px] overflow-clip top-0 w-[8px]"
            data-node-id="139:29382"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29386"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#f4ace7] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29385"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f4ace7] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29384"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29383"
              data-name="Flower center"
            />
          </div>
        </div>
        <div
          className="absolute h-[20px] left-[293px] overflow-clip top-[79px] w-[24px]"
          data-node-id="139:29365"
          data-name="Wildflowers"
        >
          <div
            className="absolute h-[12px] left-0 overflow-clip top-0 w-[8px]"
            data-node-id="139:29376"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29380"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29379"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29378"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29377"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[7px] overflow-clip top-[5px] w-[8px]"
            data-node-id="139:29371"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29375"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29374"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29373"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29372"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[14px] overflow-clip top-0 w-[8px]"
            data-node-id="139:29366"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29370"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29369"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29368"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29367"
              data-name="Flower center"
            />
          </div>
        </div>
        <div
          className="absolute h-[20px] left-[145px] overflow-clip top-[482px] w-[24px]"
          data-node-id="139:29349"
          data-name="Wildflowers"
        >
          <div
            className="absolute h-[12px] left-0 overflow-clip top-0 w-[8px]"
            data-node-id="139:29360"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29364"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#f4ace7] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29363"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f4ace7] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29362"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29361"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[7px] overflow-clip top-[5px] w-[8px]"
            data-node-id="139:29355"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29359"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#f4ace7] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29358"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f4ace7] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29357"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29356"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[14px] overflow-clip top-0 w-[8px]"
            data-node-id="139:29350"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29354"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#f4ace7] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29353"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f4ace7] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29352"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29351"
              data-name="Flower center"
            />
          </div>
        </div>
        <div
          className="absolute h-[20px] left-[209px] overflow-clip top-[590px] w-[24px]"
          data-node-id="139:29333"
          data-name="Wildflowers"
        >
          <div
            className="absolute h-[12px] left-0 overflow-clip top-0 w-[8px]"
            data-node-id="139:29344"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29348"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29347"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29346"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29345"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[7px] overflow-clip top-[5px] w-[8px]"
            data-node-id="139:29339"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29343"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29342"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29341"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29340"
              data-name="Flower center"
            />
          </div>
          <div
            className="absolute h-[12px] left-[14px] overflow-clip top-0 w-[8px]"
            data-node-id="139:29334"
            data-name="Flower"
          >
            <div
              className="absolute bg-[#277329] h-[7px] left-[3px] top-[5px] w-[2px]"
              data-node-id="139:29338"
              data-name="Stem"
            />
            <div
              className="absolute bg-[#ffe855] h-[4px] left-0 top-[2px] w-[8px]"
              data-node-id="139:29337"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#ffe855] h-[8px] left-[2px] top-0 w-[4px]"
              data-node-id="139:29336"
              data-name="Petals"
            />
            <div
              className="absolute bg-[#f8fbce] left-[3px] size-[2px] top-[3px]"
              data-node-id="139:29335"
              data-name="Flower center"
            />
          </div>
        </div>
        <div
          className="absolute h-[56px] left-[312px] top-[584px] w-[59px]"
          data-node-id="139:29328"
          data-name="Trail sign"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgTrailSign}
          />
        </div>
      </div>
      <div
        className="absolute h-[640px] left-0 top-0 w-[390px]"
        data-node-id="139:29244"
        data-name="Adventure progression"
      >
        <div
          className="absolute h-[48px] left-[210px] top-[65px] w-[47px]"
          data-node-id="139:29320"
          data-name="Locked level"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgLockedLevel}
          />
        </div>
        <div
          className="absolute h-[48px] left-[293px] top-[112px] w-[47px]"
          data-node-id="139:29313"
          data-name="Locked level"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgLockedLevel}
          />
        </div>
        <div
          className="absolute h-[76px] left-[80px] top-[567px] w-[60px]"
          data-node-id="139:29304"
          data-name="Completed level"
        >
          <div
            className="absolute h-[49px] left-0 top-[6px] w-[53px]"
            data-node-id="139:29312"
            data-name="Marker shadow"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerShadow}
            />
          </div>
          <div
            className="absolute h-[51px] left-0 top-0 w-[53px]"
            data-node-id="139:29311"
            data-name="Marker outline"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerOutline}
            />
          </div>
          <div
            className="absolute h-[46px] left-[3px] top-[2px] w-[47px]"
            data-node-id="139:29310"
            data-name="Level badge"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgLevelBadge}
            />
          </div>
          <div
            className="absolute h-[17.095px] left-[6px] top-[4px] w-[37px]"
            data-node-id="139:29309"
            data-name="Badge highlight"
          >
            <div className="absolute inset-[-5.85%_-2.16%_0_-2.7%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgBadgeHighlight}
              />
            </div>
          </div>
          <p
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold'] font-extrabold leading-[normal] left-[26.5px] not-italic text-[#fbffe8] text-[31px] text-center text-shadow-[1px_2px_0px_#2d6c14] top-[5px] w-[53px]"
            data-node-id="139:29308"
          >
            1
          </p>
          <div
            className="absolute left-[-3px] size-[18px] top-[45px]"
            data-node-id="139:29307"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[16px] size-[18px] top-[49px]"
            data-node-id="139:29306"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[35px] size-[18px] top-[45px]"
            data-node-id="139:29305"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute h-[76px] left-[239px] top-[515px] w-[60px]"
          data-node-id="139:29295"
          data-name="Completed level"
        >
          <div
            className="absolute h-[49px] left-0 top-[6px] w-[53px]"
            data-node-id="139:29303"
            data-name="Marker shadow"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerShadow}
            />
          </div>
          <div
            className="absolute h-[51px] left-0 top-0 w-[53px]"
            data-node-id="139:29302"
            data-name="Marker outline"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerOutline}
            />
          </div>
          <div
            className="absolute h-[46px] left-[3px] top-[2px] w-[47px]"
            data-node-id="139:29301"
            data-name="Level badge"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgLevelBadge}
            />
          </div>
          <div
            className="absolute h-[17.095px] left-[6px] top-[4px] w-[37px]"
            data-node-id="139:29300"
            data-name="Badge highlight"
          >
            <div className="absolute inset-[-5.85%_-2.16%_0_-2.7%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgBadgeHighlight}
              />
            </div>
          </div>
          <p
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold'] font-extrabold leading-[normal] left-[26.5px] not-italic text-[#fbffe8] text-[31px] text-center text-shadow-[1px_2px_0px_#2d6c14] top-[5px] w-[53px]"
            data-node-id="139:29299"
          >
            2
          </p>
          <div
            className="absolute left-[-3px] size-[18px] top-[45px]"
            data-node-id="139:29298"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[16px] size-[18px] top-[49px]"
            data-node-id="139:29297"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[35px] size-[18px] top-[45px]"
            data-node-id="139:29296"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute h-[76px] left-[94px] top-[404px] w-[60px]"
          data-node-id="139:29286"
          data-name="Completed level"
        >
          <div
            className="absolute h-[49px] left-0 top-[6px] w-[53px]"
            data-node-id="139:29294"
            data-name="Marker shadow"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerShadow}
            />
          </div>
          <div
            className="absolute h-[51px] left-0 top-0 w-[53px]"
            data-node-id="139:29293"
            data-name="Marker outline"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerOutline}
            />
          </div>
          <div
            className="absolute h-[46px] left-[3px] top-[2px] w-[47px]"
            data-node-id="139:29292"
            data-name="Level badge"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgLevelBadge}
            />
          </div>
          <div
            className="absolute h-[17.095px] left-[6px] top-[4px] w-[37px]"
            data-node-id="139:29291"
            data-name="Badge highlight"
          >
            <div className="absolute inset-[-5.85%_-2.16%_0_-2.7%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgBadgeHighlight}
              />
            </div>
          </div>
          <p
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold'] font-extrabold leading-[normal] left-[26.5px] not-italic text-[#fbffe8] text-[31px] text-center text-shadow-[1px_2px_0px_#2d6c14] top-[5px] w-[53px]"
            data-node-id="139:29290"
          >
            3
          </p>
          <div
            className="absolute left-[-3px] size-[18px] top-[45px]"
            data-node-id="139:29289"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[16px] size-[18px] top-[49px]"
            data-node-id="139:29288"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[35px] size-[18px] top-[45px]"
            data-node-id="139:29287"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute h-[76px] left-[239px] top-[321px] w-[60px]"
          data-node-id="139:29277"
          data-name="Completed level"
        >
          <div
            className="absolute h-[49px] left-0 top-[6px] w-[53px]"
            data-node-id="139:29285"
            data-name="Marker shadow"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerShadow}
            />
          </div>
          <div
            className="absolute h-[51px] left-0 top-0 w-[53px]"
            data-node-id="139:29284"
            data-name="Marker outline"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerOutline}
            />
          </div>
          <div
            className="absolute h-[46px] left-[3px] top-[2px] w-[47px]"
            data-node-id="139:29283"
            data-name="Level badge"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgLevelBadge}
            />
          </div>
          <div
            className="absolute h-[17.095px] left-[6px] top-[4px] w-[37px]"
            data-node-id="139:29282"
            data-name="Badge highlight"
          >
            <div className="absolute inset-[-5.85%_-2.16%_0_-2.7%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgBadgeHighlight}
              />
            </div>
          </div>
          <p
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold'] font-extrabold leading-[normal] left-[26.5px] not-italic text-[#fbffe8] text-[31px] text-center text-shadow-[1px_2px_0px_#2d6c14] top-[5px] w-[53px]"
            data-node-id="139:29281"
          >
            4
          </p>
          <div
            className="absolute left-[-3px] size-[18px] top-[45px]"
            data-node-id="139:29280"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[16px] size-[18px] top-[49px]"
            data-node-id="139:29279"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[35px] size-[18px] top-[45px]"
            data-node-id="139:29278"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute h-[76px] left-[136px] top-[220px] w-[60px]"
          data-node-id="139:29268"
          data-name="Completed level"
        >
          <div
            className="absolute h-[49px] left-0 top-[6px] w-[53px]"
            data-node-id="139:29276"
            data-name="Marker shadow"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerShadow}
            />
          </div>
          <div
            className="absolute h-[51px] left-0 top-0 w-[53px]"
            data-node-id="139:29275"
            data-name="Marker outline"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerOutline}
            />
          </div>
          <div
            className="absolute h-[46px] left-[3px] top-[2px] w-[47px]"
            data-node-id="139:29274"
            data-name="Level badge"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgLevelBadge}
            />
          </div>
          <div
            className="absolute h-[17.095px] left-[6px] top-[4px] w-[37px]"
            data-node-id="139:29273"
            data-name="Badge highlight"
          >
            <div className="absolute inset-[-5.85%_-2.16%_0_-2.7%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgBadgeHighlight}
              />
            </div>
          </div>
          <p
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold'] font-extrabold leading-[normal] left-[26.5px] not-italic text-[#fbffe8] text-[31px] text-center text-shadow-[1px_2px_0px_#2d6c14] top-[5px] w-[53px]"
            data-node-id="139:29272"
          >
            5
          </p>
          <div
            className="absolute left-[-3px] size-[18px] top-[45px]"
            data-node-id="139:29271"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[16px] size-[18px] top-[49px]"
            data-node-id="139:29270"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
          <div
            className="absolute left-[35px] size-[18px] top-[45px]"
            data-node-id="139:29269"
            data-name="Earned star"
          >
            <div className="absolute inset-[0_0_-11.11%_0]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgEarnedStar}
              />
            </div>
          </div>
        </div>
        <button
          aria-label={
            rewardClaimed ? "Level 6 reward claimed" : "Claim Level 6 reward"
          }
          className="pointer-events-auto absolute left-[238px] top-[170px] z-50 h-[76px] w-[60px] cursor-pointer border-0 bg-transparent p-0"
          data-node-id="139:29245"
          data-name="Current level"
          onClick={onLevelSix}
          type="button"
        >
          <div
            className="absolute left-[-30px] size-[112px] top-[-30px]"
            data-node-id="139:29267"
            data-name="Level glow"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgLevelGlow}
            />
          </div>
          <div
            className="absolute h-[1.38px] left-[55.99px] top-[25.31px] w-[26.008px]"
            data-node-id="139:29266"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam}
            />
          </div>
          <div
            className="absolute h-[5.998px] left-[53.45px] top-[36.84px] w-[13.206px]"
            data-node-id="139:29265"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam1}
            />
          </div>
          <div
            className="absolute left-[46.72px] size-[18.878px] top-[46.72px]"
            data-node-id="139:29264"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam2}
            />
          </div>
          <div
            className="absolute h-[13.206px] left-[36.84px] top-[53.45px] w-[5.998px]"
            data-node-id="139:29263"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam3}
            />
          </div>
          <div
            className="absolute h-[26.008px] left-[25.31px] top-[55.99px] w-[1.38px]"
            data-node-id="139:29262"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam4}
            />
          </div>
          <div
            className="absolute h-[13.206px] left-[9.16px] top-[53.45px] w-[5.998px]"
            data-node-id="139:29261"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam5}
            />
          </div>
          <div
            className="absolute left-[-13.6px] size-[18.878px] top-[46.72px]"
            data-node-id="139:29260"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam6}
            />
          </div>
          <div
            className="absolute h-[5.998px] left-[-14.65px] top-[36.84px] w-[13.206px]"
            data-node-id="139:29259"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam7}
            />
          </div>
          <div
            className="absolute h-[1.38px] left-[-30px] top-[25.31px] w-[26.008px]"
            data-node-id="139:29258"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam8}
            />
          </div>
          <div
            className="absolute h-[5.998px] left-[-14.65px] top-[9.16px] w-[13.206px]"
            data-node-id="139:29257"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam9}
            />
          </div>
          <div
            className="absolute left-[-13.6px] size-[18.878px] top-[-13.6px]"
            data-node-id="139:29256"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam10}
            />
          </div>
          <div
            className="absolute h-[13.206px] left-[9.16px] top-[-14.65px] w-[5.998px]"
            data-node-id="139:29255"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam11}
            />
          </div>
          <div
            className="absolute h-[26.008px] left-[25.31px] top-[-30px] w-[1.38px]"
            data-node-id="139:29254"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam12}
            />
          </div>
          <div
            className="absolute h-[13.206px] left-[36.84px] top-[-14.65px] w-[5.998px]"
            data-node-id="139:29253"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam13}
            />
          </div>
          <div
            className="absolute left-[46.72px] size-[18.878px] top-[-13.6px]"
            data-node-id="139:29252"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam14}
            />
          </div>
          <div
            className="absolute h-[5.998px] left-[53.45px] top-[9.16px] w-[13.206px]"
            data-node-id="139:29251"
            data-name="Radiant beam"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgRadiantBeam15}
            />
          </div>
          <div
            className="absolute h-[49px] left-0 top-[6px] w-[53px]"
            data-node-id="139:29250"
            data-name="Marker shadow"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerShadow}
            />
          </div>
          <div
            className="absolute h-[51px] left-0 top-0 w-[53px]"
            data-node-id="139:29249"
            data-name="Marker outline"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgMarkerOutline1}
            />
          </div>
          <div
            className="absolute h-[46px] left-[3px] top-[2px] w-[47px]"
            data-node-id="139:29248"
            data-name="Level badge"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgLevelBadge1}
            />
          </div>
          <div
            className="absolute h-[17.095px] left-[6px] top-[4px] w-[37px]"
            data-node-id="139:29247"
            data-name="Badge highlight"
          >
            <div className="absolute inset-[-5.85%_-2.16%_0_-2.7%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgBadgeHighlight1}
              />
            </div>
          </div>
          <p
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold'] font-extrabold leading-[normal] left-[26.5px] not-italic text-[#fbffe8] text-[31px] text-center text-shadow-[1px_2px_0px_#0751b7] top-[5px] w-[53px]"
            data-node-id="139:29246"
          >
            6
          </p>
        </button>
        {Object.entries(lockedLevelPositions).map(([level, position]) => {
          const levelNumber = Number(level)
          if (unlockedLevels.includes(levelNumber)) return null

          return (
            <div
              aria-label={`Level ${levelNumber} locked. Earn a volunteering badge to unlock it.`}
              className="pointer-events-auto absolute z-[60] h-[48px] w-[47px]"
              key={level}
              role="img"
              style={{ left: position.left, top: position.top }}
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgLockedLevel}
              />
            </div>
          )
        })}
        {Object.entries(unlockedLevelPositions).map(([level, position]) => {
          const levelNumber = Number(level)
          if (!unlockedLevels.includes(levelNumber)) return null

          return (
            <button
              aria-label={`View rewards for level ${levelNumber}`}
              className="absolute z-[70] h-[76px] w-[60px] cursor-pointer border-0 bg-transparent p-0"
              key={level}
              onClick={() => onLevelSelect(levelNumber)}
              style={{ left: position.left, top: position.top }}
              type="button"
            />
          )
        })}
      </div>
    </div>
  )
}
