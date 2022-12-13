const wait = (start: Date, timeout = 1050) => {
  return new Promise((resolve) => setTimeout(resolve, timeout - (Date.now() - start.getTime())));
};

export default wait;
