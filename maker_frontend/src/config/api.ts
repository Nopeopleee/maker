const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const v1Prefix = "api/v1/backend";

const Api = {
  backend: {
    admins: {
      index: `${BASE_URL}/${v1Prefix}/admins`,
      options: `${BASE_URL}/${v1Prefix}/admins/options`,
    },
    menus: {
      index: `${BASE_URL}/${v1Prefix}/menus`,
      options: `${BASE_URL}/${v1Prefix}/menus/options`,
    },
  },
};

export default Api;

export type ApiType = typeof Api;
