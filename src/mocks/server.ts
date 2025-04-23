import { Server } from 'miragejs';

//type AppRegistry = Registry<{}, Record<string, never>>;
//export type AppSchema = Schema<AppRegistry>;

export function mockApiServer(): void {
  const originalConsoleLog = console.log;
  console.log = function (...args) {
    if (
      !args.some(
        (arg) => typeof arg === 'string' && arg.includes('Mirage: Passthrough request for'),
      )
    ) {
      originalConsoleLog.apply(console, args);
    }
  };

  new Server({
    models: {},

    seeds(server): void {
      server.db.loadData({});
    },

    routes(): void {
      this.passthrough();
      this.passthrough('http://localhost:4200/*');
    },
  });
}
