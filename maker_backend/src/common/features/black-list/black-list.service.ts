import { Injectable } from '@nestjs/common';

@Injectable()
export class BlackListService {
  constructor() {}

  private tokenBlackList = [];

  /**
   * @description Add token to black list
   * @param {string} token
   * @returns {void}
   */
  addToken(token: string): void {
    this.tokenBlackList.push(token);
  }

  /**
   * @description Check if token is in black list
   * @param {string} token
   * @returns {boolean}
   */
  isTokenInBlackList(token: string): boolean {
    return this.tokenBlackList.includes(token);
  }
}
