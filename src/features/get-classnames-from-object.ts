const getClassnamesFromObject = (classObj: object): string => {
  return Object.entries(classObj)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(' ');
}

export { getClassnamesFromObject };