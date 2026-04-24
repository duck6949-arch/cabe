export type Element = 'Pyro' | 'Hydro' | 'Anemo' | 'Electro' | 'Dendro' | 'Cryo' | 'Geo';
export type Weapon = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type Rarity = 4 | 5;

export interface Character {
  id: string;
  name: string;
  title: string;
  element: Element;
  weapon: Weapon;
  rarity: Rarity;
  description: string;
  constellation: string;
  affiliation: string;
  portraitUrl: string;
  iconUrl: string;
  color: string;
  story?: string;
  // Stats for Battle Chronicle
  level: number;
  friendship: number;
  hp: number;
  atk: number;
  def: number;
  em: number;
  critRate: string;
  critDmg: string;
  weaponName: string;
  weaponRefinement: number;
  weaponLevel: number;
}
