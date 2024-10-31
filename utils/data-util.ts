import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

// Utility to replace _id with id in an array of objects
export const replaceMongoIdInArray = (
  array: Array<{ _id: any }>
): Array<Record<string, any>> => {
  const mappedArray = array
    .map((item) => ({
      id: item._id.toString(),
      ...item,
    }))
    .map(({ _id, ...rest }) => rest);
  return mappedArray;

  // const transformedData = array.map((item: any) => ({
  //   ...item,
  //   id: item._id, // Assign _id to id
  //   _id: undefined,
  // }));
  // return transformedData;
};

export const replaceMongoIdInObject = <T extends { _id: any }>(
  obj: T
): Omit<T, "_id"> & { id: string } => {
  const { _id, ...updatedObj } = obj;
  return { ...updatedObj, id: _id.toString() };
};

export const userData = async () => {
  const session = await getServerSession(authOptions);
  console.log("trending product data", session?.user);
  const userName: string | null | undefined = session?.user?.name;

  return userName;
};

// Utility to replace _id with id in a single object
// export const replaceMongoIdInObject = (obj: { _id: any }): Record<string, any> => {
//   const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
//   return updatedObj;
// };

// Check if a date is between two dates
// export const isDateInbetween = (date: Date | string, from: Date | string, to: Date | string): boolean => {
//   return new Date(date).getTime() >= new Date(from).getTime() && new Date(date).getTime() <= new Date(to).getTime();
// };

// Calculate day difference between two dates
// export const getDayDifference = (from: Date | string, to: Date | string): number => {
//   return (new Date(to).getTime() - new Date(from).getTime()) / (24 * 60 * 60 * 1000) + 1;
// };
