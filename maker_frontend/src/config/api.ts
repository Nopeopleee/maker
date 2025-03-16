import { initLanguage } from "./page";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const v1Prefix = "api/v1/backend";
const isClient = typeof window !== "undefined";
const language = isClient
  ? localStorage.getItem("language") || initLanguage
  : initLanguage;

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
      upload: string;
      download: string;
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
    contacts: {
      index: `${BASE_URL}/${v1Prefix}/settings/contacts`,
    },
    websites: {
      index: `${BASE_URL}/${v1Prefix}/settings/websites`,
      options: `${BASE_URL}/${v1Prefix}/settings/websites/options`,
    },
    files: {
      index: `${BASE_URL}/api/v1/file-service`,
      "create-folder": `${BASE_URL}/api/v1/file-service/create-folder`,
      upload: `${BASE_URL}/api/v1/file-service/upload`,
      download: `${BASE_URL}/api/v1/file-service/download`,
    },
  },
  frontend: {
    home: {
      menu: `${BASE_URL}/api/v1/frontend/home/${language}/menu`,
      homepage: `${BASE_URL}/api/v1/frontend/home/${language}/home`,
      contact: `${BASE_URL}/api/v1/frontend/home/contact-settings`,
      website: `${BASE_URL}/api/v1/frontend/home/website-settings`,
    },
    content: {
      list: `${BASE_URL}/api/v1/frontend/contents/list`,
      inner: `${BASE_URL}/api/v1/frontend/contents/inner`,
    },
  },
};

export default Api;

export type ApiType = ApiWithOptions | ApiWithoutOptions | Files;
