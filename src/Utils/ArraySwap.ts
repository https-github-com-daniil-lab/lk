const Swap = (arrr: any): [] => {
  [arrr[0], arrr[arrr.length - 1]] = [arrr[arrr.length - 1], arrr[0]];
  return arrr;
};

export default Swap;
