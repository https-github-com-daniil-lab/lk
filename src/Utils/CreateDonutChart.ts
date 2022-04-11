import { useEffect, useState } from "react";

const colors = [
  "#fd7f6f",
  "#7eb0d5",
  "#b2e061",
  "#bd7ebe",
  "#ffb55a",
  "#ffee65",
  "#beb9db",
  "#fdcce5",
  "#8bd3c7",
  "#b30000",
  "#7c1158",
  "#4421af",
  "#1a53ff",
  "#0d88e6",
  "#00b7c7",
  "#5ad45a",
  "#8be04e",
  "#ebdc78",
  "#e60049",
  "#0bb4ff",
  "#50e991",
  "#e6d800",
  "#9b19f5",
  "#ffa300",
  "#dc0ab4",
  "#b3d4ff",
  "#00bfa0",
  "#ea5545",
  "#f46a9b",
  "#ef9b20",
  "#edbf33",
  "#ede15b",
  "#bdcf32",
  "#87bc45",
  "#27aeef",
  "#b33dc6",
];

type arcradius = { x: number; y: number };

const CreateDonutChart = (data: string[] | number[]) => {
  const [chartData, setChartData] = useState<Array<any>>([]);

  const arcradius = (
    cx: number,
    cy: number,
    radius: number,
    degrees: number
  ): arcradius => {
    var radians = ((degrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + radius * Math.cos(radians),
      y: cy + radius * Math.sin(radians),
    };
  };

  const initOnLoad = (): void => {
    const radius = 15;
    const decimals = 4;

    let total = 0;
    let arr: any = [];
    let beg = 0;
    let end = 0;
    let count = 0;

    const array = data;

    array.forEach((v, i) => {
      total += v;
    });

    array.forEach((v, i) => {
      let tmp: any = {};

      let p = ((v + 1) / total) * 100;

      count += p;

      if (i === array.length - 1 && count < 100) p = p + (100 - count);

      end = beg + (360 / 100) * p;

      let b = arcradius(21, 21, radius, end);
      let e = arcradius(21, 21, radius, beg);
      let la = end - beg <= 180 ? 0 : 1;

      tmp.d = [
        "M",
        b.x.toFixed(decimals),
        b.y.toFixed(decimals),
        "A",
        radius,
        radius,
        0,
        la,
        0,
        e.x.toFixed(decimals),
        e.y.toFixed(decimals),
      ].join(" ");
      tmp.stroke =
        v === 5
          ? "transparent"
          : colors[Math.floor(Math.random() * colors.length)];
      arr.push(tmp);
      beg = end;
    });
    setChartData(arr);
  };

  useEffect(() => {
    initOnLoad();
  }, [data]);

  return { chartData };
};

export default CreateDonutChart;
