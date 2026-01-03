export type Gamemode = {
  name: string;
  teamSetup: TeamSetup;
};

type TeamSetup = {
  size: number;
}[];

const oneVsOne: TeamSetup = [{ size: 1 }, { size: 1 }];

export const Gamemodes = {
  Standard: {
    name: "Standard",
    teamSetup: oneVsOne,
  },
  Classic: {
    name: "Classic",
    teamSetup: oneVsOne,
  },
  Custom: {
    name: "Custom",
    teamSetup: [{ size: 3 }], // for example
  },
} as const satisfies Record<string, Gamemode>;
