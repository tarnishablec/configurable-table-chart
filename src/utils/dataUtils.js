export function sumByIndex(arr, indexField, indexValue, targetField) {
  let res = 0;
  arr.forEach(a => {
    if (a[indexField] === indexValue) {
      res += Number(a[targetField]);
    }
  });
  return res;
}

export function averageByIndex(arr, indexField, indexValue, targetField) {
  return sumByIndex(arr, indexField, indexValue, targetField) / arr.length;
}