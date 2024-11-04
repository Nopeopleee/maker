declare module 'passport-google-oauth20' {
  import { Strategy as PassportStrategy } from 'passport';
  import { Request } from 'express';

  interface Profile {
    id: string;
    displayName: string;
    name: {
      familyName: string;
      givenName: string;
    };
    emails: Array<{
      value: string;
      verified?: boolean;
    }>;
    photos: Array<{
      value: string;
    }>;
    provider: string;
    _raw: string;
    _json: any;
  }

  interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    passReqToCallback?: boolean;
    scope?: string[];
  }

  interface VerifyCallback {
    (error: any, user?: any, info?: any): void;
  }

  interface VerifyFunction {
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ): void;
  }

  interface VerifyFunctionWithRequest {
    (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ): void;
  }

  class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyFunction);
    constructor(
      options: StrategyOptions & { passReqToCallback: true },
      verify: VerifyFunctionWithRequest,
    );
  }
}
