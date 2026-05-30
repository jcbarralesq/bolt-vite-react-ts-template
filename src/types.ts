export interface Stamp {
  id: string;
  number: number;
  name: string;
  teamId: string;
  rarity: "common" | "rare" | "legendary";
}

export interface Team {
  id: string;
  name: string;
  flag: string;
  group: string;
  confederation: string;
}
