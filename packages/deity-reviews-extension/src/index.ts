export * from "./types";

/**
 * Review Extension
 */
export default () => ({
  resolvers: {
    BackendConfig: {
      // Returning an empty object to make ReviewConfig resolvers work
      review: () => ({})
    }
  }
});
