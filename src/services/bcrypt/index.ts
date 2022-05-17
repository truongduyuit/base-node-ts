import bcryptjs from "bcryptjs";

/**
 *
 * @param data string to hash
 * @returns hash from data
 */
const hash = (data: string) => {
  const salt = bcryptjs.genSaltSync(10);
  const hashed = bcryptjs.hashSync(data, salt);
  return hashed;
};

/**
 *
 * @param data string to compare with hash
 * @param hashed hash to compare with string
 * @returns boolean
 */
const compare = (data: string, hashed: string) => {
  return bcryptjs.compareSync(data, hashed);
};

export { hash, compare };
