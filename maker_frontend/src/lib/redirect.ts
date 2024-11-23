import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

let router: ReturnType<typeof useRouter>;

export const setRouter = (nextRouter: AppRouterInstance) => {
  router = nextRouter;
};

export const redirectToSignIn = () => {
  if (router) {
    router.push("/backend/sign-in");
  } else {
    window.location.href = "/backend/sign-in";
  }
};
