import React, { useEffect, useRef } from "react";

const BarChart = (props) => {
  useEffect(() => {
    draw();
  }, []);

  const canvasRef = useRef(null);

  const drawLine = (c, startX, startY, endX, endY, color, gridValue) => {
    c.save();
    c.strokeStyle = color;
    c.beginPath();
    c.moveTo(startX, startY);
    c.lineTo(endX, endY);
    c.stroke();
    c.restore();
  };

  const drawBar = (
    c,
    upperLeftCornerX,
    upperLeftCornerY,
    width,
    height,
    color
  ) => {
    c.save();
    c.fillStyle = color;
    // 30度 x: 20 y: 40 height: 115
    // 28度 x: 20 y: 46 height: 109
    // 度數越大 height越大
    // height > 正值 > 往下
   console.log('x:', upperLeftCornerX, 'y:', upperLeftCornerY, 'height:', height)
    c.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    c.restore();
  };

  const draw = () => {
    const canvasObj = canvasRef.current;
    const c = canvasObj.getContext("2d");
    var width = canvasObj.width;
    var height = canvasObj.height;

    var maxValue = 80;
    var minValue = -80

    var canvasActualHeight = height - props.padding * 2
    var canvasActualWidth = width - props.padding * 2;
   
    var gridValue = 0;


    while (gridValue <= maxValue) {
      var gridY =
        canvasActualHeight * (1 - gridValue / maxValue)  + props.padding;
      
      drawLine(c, 0, gridY - canvasObj.height/2, canvasObj.width, gridY - canvasObj.height/2, props.gridColor, gridValue);
   
      c.save();
      c.fillStyle = props.gridColor;
      c.font = "bold 10px Arial";
      c.fillText(gridValue, 0, gridY - 2 - canvasObj.height/2);
      c.restore();
     
      gridValue += props.gridScale;
    
    }
    gridValue = 0
    while (gridValue >= minValue) {
        gridY = canvasActualHeight * (1 - gridValue / Math.abs(minValue)) + props.padding 
        
    //  (c, startX, startY, endX, endY, color)
    //  零度線 : (0 , 155) - (150, 155)
    //  35度線 : (0 ,19.375) - (150, 19.375)

        drawLine(c, 0, gridY - canvasObj.height/2 , canvasObj.width, gridY - canvasObj.height/2 , props.gridColor, gridValue);
  
        c.save();
        c.fillStyle = props.gridColor;
        c.font = "bold 10px Arial";
        c.fillText(gridValue, 0, gridY - 2 - canvasObj.height/2);
        c.restore();
  
        gridValue -= props.gridScale;
    }
    
    var barIndex = 0;
    var numberOfBars = 2;
    var barSize = canvasActualWidth / numberOfBars;

    const temps = [
      props.weather.max_temp,
      props.weather.min_temp,
    ];
    for (var key in temps) {
      var val = temps[key];
      if(val < 0){
      var barHeight = Math.round(canvasActualHeight * val / minValue)
      var y_coordinate = 155
      }else{
        var barHeight = Math.round(canvasActualHeight * val / maxValue)
        var y_coordinate = canvasObj.height - barHeight - props.padding - canvasObj.height/2
      }
      
      // console.log('barHeight: ', barHeight, 'y_cor : ', y_coordinate )

      // 30度 x: 20 y: 40 height: 115
      // 28度 x: 20 y: 46 height: 109
      // 度數越大 height越大
      // height > 正值 > 往下
      // heith > 付的 > 往上

      drawBar(
        c,
        props.padding + barIndex * barSize,  
        y_coordinate,
        barSize,
        barHeight,
        props.colors[barIndex]
      );

      barIndex++;
    }
  };
  return (
    <>
        <canvas ref={canvasRef} height={350} width={150} style={{margin: '1rem'}}/>
    </>
  );
};

export default BarChart;





