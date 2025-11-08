import { useState } from "react";

function RandomBtn() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="content-wrapper ">
        <div className="randombtn-container">
          <button onClick={() => setCount((count) => count + 1)}>
            Random juice number {count}
          </button>
        </div>
      </div>
    </>
  );
}

export default RandomBtn;
