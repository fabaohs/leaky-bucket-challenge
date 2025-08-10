import bcrypt from "bcryptjs";

const hashString = (string: string): string => {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(string, salt);

  return hash;
};

const compareString = (string: string, hashToCompare: string): boolean => {
  return bcrypt.compareSync(string, hashToCompare);
};

export default {
  hashString,
  compareString,
};
