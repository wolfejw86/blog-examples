declare module NodeJS {
  interface Global {
    __MONGO_URI__: string;
  }
}
