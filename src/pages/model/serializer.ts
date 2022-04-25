import { Character, Planet } from "../general";

export const serializeJedi = (list: any[]): Character[] => {
  return list.map((item) => {
    return {
      birthYear: item.birthYear,
      name: item.name,
      id: item.uid,
      photo: `https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`,
    };
  });
};

export const serializePlanet = (list: any[]): Planet[] => {
  return list.map((item) => {
    return {
      id: item.uid,
      name: item.name,
      photo: `https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`,
    };
  });
};
