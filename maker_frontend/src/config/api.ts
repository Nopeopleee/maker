const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Api = {
  backend: {
    admins: {
      index: `${BASE_URL}/admins`,
      options: `${BASE_URL}/admins/options`,
    },
  },
};
