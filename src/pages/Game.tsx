import { TouchEvent, useRef, useState } from "react";
import { useAllStore } from "entities/stores";

interface ClickPosition {
  x: number;
  y: number;
  id: number;
  damage: number;
}

const Game = () => {
  const { balance, energy, maxEnergy, tap } = useAllStore();
  const timeoutIdRef = useRef<number | null>(null);
  const nextIdRef = useRef(0);
  const [clickPositions, setClickPositions] = useState<ClickPosition[]>([]);

  const handleClickCoin = (e: TouchEvent<HTMLDivElement>) => {
    Array.from(e.changedTouches).forEach((touch) => {
      const target = e.target as HTMLDivElement;

      const rect = target.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const id = nextIdRef.current++;

      setClickPositions((positions) => [...positions, { x, y, id, damage: 5 }]);

      tap();

      setTimeout(() => {
        setClickPositions((prev) => prev.filter((pos) => pos.id !== id));
      }, 1000);

      target.classList.add("tapcoin__active");

      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = window.setTimeout(() => {
        target.classList.remove("tapcoin__active");
        timeoutIdRef.current = null;
      }, 100);
    });
  };

  return (
    <div className="game">
      <div className="balance">
        <img src="/src/pages/coin.png" alt="" />
        {balance}
      </div>

      <div className="coin">
        {clickPositions.map(({ x, y, id, damage }) => (
          <div
            key={id}
            className={"point"}
            style={{
              left: x,
              top: y,
            }}
          >
            {damage}
          </div>
        ))}
        <img
          onTouchStartCapture={handleClickCoin}
          className="tapcoin"
          src="/src/pages/tapcoin.png"
          alt=""
        />
      </div>

      <div className="progress">
        <svg
          width="22"
          height="28"
          viewBox="0 0 22 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5553 11.949L15.5426 10.5324C15.1334 10.4167 14.9013 9.98645 15.031 9.58384L17.4213 2.16351C17.7807 1.69513 17.7693 1.02362 17.3613 0.56416C16.8973 0.0423184 16.097 -0.00809713 15.5735 0.45209L0.644622 13.5818C0.121224 14.0421 0.0730053 14.8387 0.536852 15.361C0.701382 15.5467 0.917237 15.6801 1.15732 15.7444C1.20104 15.7561 1.2454 15.7645 1.28994 15.7715C1.33224 15.7878 1.37556 15.8023 1.42037 15.8144L5.1745 16.8203C5.63039 16.9424 5.8625 17.4476 5.6566 17.8696L1.81964 25.734C1.39781 26.1756 1.34956 26.8694 1.73568 27.3689C1.90512 27.5888 2.14269 27.747 2.41141 27.8188C2.77924 27.9173 3.18707 27.8505 3.51183 27.602L20.9165 14.2894C21.0769 14.1667 21.2051 14.0073 21.2903 13.8246C21.3503 13.7275 21.3989 13.6213 21.4314 13.5061C21.6209 12.8364 21.2286 12.1393 20.5553 11.949Z"
            fill="url(#paint0_linear_591_3229)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_591_3229"
              x1="14.659"
              y1="-0.376884"
              x2="14.659"
              y2="21.0731"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#6CFFA5" />
              <stop offset="1" stop-color="#108E75" />
            </linearGradient>
          </defs>
        </svg>
        <div className="energy">
          {energy}/{maxEnergy}
        </div>
        <div className="line__wrapper">
          <div
            className="line"
            style={{ width: `${(energy / maxEnergy) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
