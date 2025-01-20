import { useEffect, useRef, useState } from "react";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

interface CountdownProps {
  seconds: number;
}

export default function Countdown({ seconds }: CountdownProps) {
  const [countdown, setCountdown] = useState(seconds);
  const timerId = useRef(0)

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (countdown === 0 && timerId.current) {
      clearInterval(timerId.current);
    }
  }, [countdown]);

  return (
    <div className="bg-black w-96 h-56 absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
      <span className=" text-6xl text-yellow-500 font-">{formatTime(countdown)}</span>
    </div>
  );
}
