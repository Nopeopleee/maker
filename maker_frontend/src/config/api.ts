const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const v1Prefix = "api/v1/backend";

interface ApiWithOptions {
  backend: {
    [key: string]: {
      index: string;
      options?: string;
    };
  };
}

interface ApiWithoutOptions {
  backend: {
    [key: string]: {
      index: string;
    };
  };
}

interface Files {
  backend: {
    [key: string]: {
      index: string;
      delete: string;
      "create-folder": string;
    };
  };
}

const Api = {
  backend: {
    login: {
      index: `${BASE_URL}/${v1Prefix}/login`,
    },
    admins: {
      index: `${BASE_URL}/${v1Prefix}/admins`,
      options: `${BASE_URL}/${v1Prefix}/admins/options`,
    },
    users: {
      index: `${BASE_URL}/${v1Prefix}/users`,
      options: `${BASE_URL}/${v1Prefix}/users/options`,
    },
    menus: {
      index: `${BASE_URL}/${v1Prefix}/menus`,
      options: `${BASE_URL}/${v1Prefix}/menus/options`,
    },
    "file-manager": {
      index: `${BASE_URL}/${v1Prefix}/file-manager`,
      options: `${BASE_URL}/${v1Prefix}/file-manager/options`,
    },
    homepages: {
      index: `${BASE_URL}/${v1Prefix}/homepages`,
      options: `${BASE_URL}/${v1Prefix}/homepages/options`,
    },
    contents: {
      index: `${BASE_URL}/${v1Prefix}/contents`,
      options: `${BASE_URL}/${v1Prefix}/contents/options`,
    },
    files: {
      index: `${BASE_URL}/api/v1/file-service`,
      "create-folder": `${BASE_URL}/api/v1/file-service/create-folder`,
    },
  },
};

export default Api;

export type ApiType = ApiWithOptions | ApiWithoutOptions | Files;
