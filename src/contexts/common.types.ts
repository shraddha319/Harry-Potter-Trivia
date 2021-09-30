export type MongooseObjectId = string;

export type APIError = { [key: string]: any };

// export type APIValidationError = {
//   message: string;
//   errors: [{ [key: string]: string }];
//   type: string;
//   statusCode: number;
//   name: string;
// };

export type UserType = {
  _id: MongooseObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
};
