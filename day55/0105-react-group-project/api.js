const useMutation = async (url) => {
  const json = await (await fetch(url)).json();
  const results = await json.data.results;
  return results;
};

export default useMutation;
