export type SelfTargetSpec = {
  type: "self";
};

export type AlliesTargetSpec = {
  type: "allies";
};

export type EnemiesTargetSpec = {
  type: "enemies";
};

export type CharacterTargetSpec = SelfTargetSpec | AlliesTargetSpec | EnemiesTargetSpec;
