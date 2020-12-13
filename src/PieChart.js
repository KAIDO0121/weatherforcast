import React, {useEffect, useRef} from "react";

const PieChart = (props) => {
  useEffect(() => {
    draw();
  }, []);
  const degsToRadians = (degs) => {
    return (degs / 360) * (2 * Math.PI);
  };
  const canvasRef = useRef(null);

  const draw = () => {
    const canvasObj = canvasRef.current;
    const color = "#b7b7a4";
    const size = 125;
    const c = canvasObj.getContext("2d");
    const center = size / 2;
    const radius = 62.5;

    let startAngle = degsToRadians(-90);
    // canvas畫arc的時候起始點預設是 3點鐘方向
    // 我們希望從12點鐘開始畫因此傳-90

    const section = (props.weather.humidity / 100) * 360;
    const endAngle = startAngle + degsToRadians(section);

    // 先畫資料的佔比

    c.fillStyle = color;
    c.beginPath();
    c.moveTo(center, center);
    c.arc(center, center, radius, startAngle, endAngle);
    c.closePath();
    c.fill();

    //   // 個別資料的占比( 角度 )
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        height={125}
        width={125}
        style={{ margin: "1rem" }}
      />
    </>
  );
};

export default PieChart;





