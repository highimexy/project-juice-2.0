import "./Wheel.css";

function Wheel() {
  interface WheelSegment {
    id: number;
    value: number;
    color: string;
  }

  const WHEEL_DATA: WheelSegment[] = [
    { id: 1, value: 10, color: "#FFD700" },
    { id: 2, value: 50, color: "#FF6347" },
    { id: 3, value: 100, color: "#4682B4" },
    { id: 4, value: 5, color: "#3CB371" },
    { id: 5, value: 20, color: "#DA70D6" },
    { id: 6, value: 75, color: "#FFA07A" },
    { id: 7, value: 25, color: "#B0C4DE" },
    { id: 8, value: 500, color: "#CD5C5C" },
    { id: 9, value: 15, color: "#F0E68C" },
    { id: 10, value: 60, color: "#9370DB" },
    { id: 11, value: 30, color: "#ADD8E6" },
    { id: 12, value: 0, color: "#D2B48C" },
  ];

  return (
    <>
      <div className=""></div>
    </>
  );
}

export default Wheel;
