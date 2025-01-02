import Image from "next/image"
export default function RecentFlip(){
return(
    <div className="relative flex justify-center items-center min-h-screen  overflow-hidden">
     <div className="recentflip md:w-[560px] md:h-[374px] md:min-w-[280px]
  md:max-w-[560px]  w-[90%] h-[374px] min-w-[280px]
  max-w-[95%]   ">
<h2 className="w-[512px] md:h-[116px] h-[100px] text-2xl">MY RECENT FLIPS</h2>
<div >
<div className="flex items-center justify-between content">
<div className="flex items-center gap-4">
<Image alt="Description of the image"  src="/happy_coin.png" width={49} height={51}/>
<p className=" ">You flipped 0.01 and doubled</p>
</div>
<p className="text-[#333] text-xs">5 minutes ago</p>
</div>
<hr style={{ border: '1px solid lightgray' }} />

<div className="flex items-center justify-between content">
<div className="flex items-center gap-2">
<Image alt="Description of the image"  src="/sad_coin.png" width={66} height={65} className="ml-[-3.5%] md:ml-[-3%]"/>
<p className=" ">You flipped 2.5 and got rugged</p>
</div>
<p className="text-[#333] text-xs">7 minutes ago</p>
</div>
<hr style={{ border: '1px solid lightgray' }} />

<div className="flex items-center justify-between content">
<div className="flex items-center gap-4">
<Image alt="Description of the image"  src="/happy_coin.png" width={49} height={51}/>
<p className=" ">You flipped 6 and doubled</p>
</div>
<p className="text-[#333] text-xs">10 minutes ago</p>
</div>

</div>

<div className="mt-5">
    <button  className="bg-[rgba(242, 199, 28, 1)] text-sm font-semibold w-[100%] 
h-[40px] btns
">
GO BACK
    </button>
</div>
     </div>


    </div>
)

}