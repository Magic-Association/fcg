export type SelfTargetSpec = {
  type: "self";
};

export type AlliesTargetSpec = {
  type: "allies";
};

export type EnemiesTargetSpec = {
  type: "enemies";
};

export type TargetSpec = SelfTargetSpec | AlliesTargetSpec | EnemiesTargetSpec;
