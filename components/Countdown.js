import { useEffect, useState } from "react";

export default function Countdown() {


  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [raffleTime, setRaffleTime] = useState(false)
  

  function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

  useEffect(() => {
    const target = new Date("12/31/2022 23:59:59");
    // const target = (raffleTime * 1000);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      setDays(addLeadingZeros(d, 2))

      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setHours(addLeadingZeros(h, 2))

      const m = Math.floor((difference % (1000 * 60 * 60 )) / (1000 * 60));
      setMinutes(addLeadingZeros(m, 2))

      const s = Math.floor((difference % (1000 * 60 )) / (1000));
      setSeconds(addLeadingZeros(s, 2))

      if(d <= 0 && h <= 0 && m <= 0 && s <= 0){
        setRaffleTime(true)
      }


    }, 1000);
    return () => clearInterval(interval);
  }, [])




  return (
                <div className="flex justify-center my-8 mx-auto"> 
                  <div className="flex my-auto text-center">
                    <div className="flex flex-col border-white border-2 rounded-[6px] px-1">
                      <span className="flex front-bold text-3xl pt-1">{days}</span>
                      <span className="label font-extralight text-xs pb-1">D</span>
                    </div>
                    <span className="flex front-bold text-3xl  mx-1 mt-1">:</span>
                    <div className="flex flex-col border-white border-2 rounded-[6px] px-1">
                      <span className="flex front-bold text-3xl pt-1">{hours}</span>
                      <span className="label font-extralight text-xs pb-1">H</span>
                    </div>
                    <span className="flex front-bold text-3xl  mx-1 mt-1">:</span>
                    <div className="flex flex-col border-white border-2 rounded-[6px] px-1">
                      <span className="flex front-bold text-3xl pt-1">{minutes}</span>
                      <span className="label font-extralight text-xs pb-1">M</span>
                    </div>
                    <span className="flex front-bold text-3xl mx-1 mt-1">:</span>
                    <div className="flex flex-col border-white border-2 rounded-[6px] px-1">
                      <span className="flex front-bold text-3xl pt-1">{seconds}</span>
                      <span className="label font-extralight text-xs pb-1">S</span>
                    </div>
                  </div>
                </div>
    )
  }