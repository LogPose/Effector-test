import {
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
  sample,
} from "effector";
import { Character, Planet } from "../general";
import { serializeJedi, serializePlanet } from "./serializer";

const getCharacters = createEvent<Character[]>();

const getCharactersFx = createEffect(async () => {
  const response = await fetch("https://www.swapi.tech/api/people")
    .then((response) => response.text())
    .then((response) => JSON.parse(response));
  return serializeJedi(response.results);
});

const $list = restore<Character[]>(getCharactersFx, []);

forward({
  from: getCharacters,
  to: getCharactersFx,
});

const $isLoading = getCharactersFx.pending;

const setCurrentCharacter = createEvent<Character>();

const $currentCharacter = createStore<Character | null>(null).on(
  setCurrentCharacter,
  (_, state) => state
);

const getPlanetsFx = createEffect(async () => {
  const response = await fetch("https://www.swapi.tech/api/planets")
    .then((response) => response.text())
    .then((response) => JSON.parse(response));

  return serializePlanet(response.results);
});

const getPlanets = createEvent();

forward({
  from: getPlanets,
  to: getPlanetsFx,
});

const $planets = createStore<Planet[]>([]);

sample({
  clock: getPlanetsFx.doneData,
  fn: (clock) => clock,
  target: $planets,
});

const setIsPlanetTab = createEvent<boolean>();

const $isPlanetTab = restore(setIsPlanetTab, false);

export const testModel = {
  $currentCharacter,
  $list,
  getCharacters,
  $isLoading,
  setCurrentCharacter,
  getPlanets,
  $planets,
  $isPlanetTab,
  setIsPlanetTab,
};
