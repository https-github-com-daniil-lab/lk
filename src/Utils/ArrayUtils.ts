const diff = function (a1, a2) {
  return a1
    .filter((i) => !a2.includes(i))
    .concat(a2.filter((i) => !a1.includes(i)));
};
const compare = function (a1, a2) {
  return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
};

export default { diff, compare };
