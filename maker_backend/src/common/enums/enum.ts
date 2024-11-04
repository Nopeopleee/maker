export class Enum {
  static MAP = {};

  static get TEXT(): { get: (key: number | string) => string } {
    return {
      get: (key: number | string): string => this.MAP[key],
    };
  }

  static get LIST(): { get: () => { id: number | string; title: string }[] } {
    return {
      get: (): { id: number | string; title: string }[] => {
        return Object.keys(this.MAP).map(
          (key): { id: number | string; title: string } => ({
            id: key,
            title: this.MAP[key],
          }),
        );
      },
    };
  }
}
