export const consolidateData = (prev: Root, cur: Root): Root => {
  const newItems = prev.value.filter((x) =>
    !cur.value.some((y) => y.id === x.id)
  );
  console.log(`${newItems.length} new items found!`);
  cur.value.push(...newItems);

  return cur;
};
