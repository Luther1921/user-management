const bcrypt = require("bcryptjs");

const hasher = (value: any, salt: number) => bcrypt.hash(value, salt);

const matchChecker = (value: any, dbValue: any) => {
  let compare = bcrypt.compare(value, dbValue);
  return compare;
};

export { hasher, matchChecker };
