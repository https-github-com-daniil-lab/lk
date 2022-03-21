const ArrayGroups = (array: any[]): any[] => {
  const g = array.reduce((groups, transaction) => {
    const createAt = transaction.createAt.split("T")[0];
    if (!groups[createAt]) {
      groups[createAt] = [];
    }
    groups[createAt].push(transaction);
    return groups;
  }, {});

  const res = Object.keys(g).map((createAt) => {
    return {
      createAt,
      transactions: g[createAt],
    };
  });

  return res;
};

export default ArrayGroups;
