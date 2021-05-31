const regExpToString = (pattern: RegExp | string): string => (
  pattern.toString().replace(/\/$/, '').replace(/^\//, '')
);

export default regExpToString;