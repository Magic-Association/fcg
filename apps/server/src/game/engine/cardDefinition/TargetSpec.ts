export type SelfTargetSpec = {
  type: "self";
};

export type AlliesTargetSpec = {
  type: "allies";
};

export type EnemiesTargetSpec = {
  type: "enemies";
};

export type AllTargetSpec = {
  type: "allCharacters";
};

export type TargetSpec =
  | SelfTargetSpec
  | AlliesTargetSpec
  | EnemiesTargetSpec
  | AllTargetSpec;
