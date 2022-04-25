import React, { useEffect } from "react";
import "./styles.css";
import "./loader.css";
import { useList, useStore } from "effector-react";
import { testModel } from "../model";

export type Character = {
  id: number;
  photo: string;
  name: string;
  birthYear: string;
};

export type Planet = {
  id: number;
  photo: string;
  name: string;
};

// https://www.swapi.tech/api/people

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="lds-dual-ring"/> */
}

export const GeneralPage: React.FC = () => {
  useEffect(() => {
    testModel.getCharacters([]);
    testModel.getPlanets();
  }, []);

  const planets = useStore(testModel.$planets);

  const isLoading = useStore(testModel.$isLoading);

  const handleCharClick = (char: Character) => {
    testModel.setCurrentCharacter(char);
  };

  const isPlanetTab = useStore(testModel.$isPlanetTab);

  const currentCharacter = useStore(testModel.$currentCharacter);

  const planetList = useList(testModel.$planets, (char) => {
    return (
      <>
        <div className="char_line">
          <img className="char_photo" src={char.photo} alt="" />
          <span>{char.name}</span>
        </div>
      </>
    );
  });

  const charList = useList(testModel.$list, (char) => {
    return (
      <>
        <div className="char_line">
          <img className="char_photo" src={char.photo} alt="" />
          <span>{char.name}</span>
        </div>
      </>
    );
  });

  const handleTabClick = (bool: boolean) => {
    testModel.setIsPlanetTab(bool);
  };

  const currentTab = isPlanetTab ? planetList : charList;

  console.log(charList);

  return (
    <div className="body">
      <div className="header">
        <div className="jedi_photo">
          <img src={currentCharacter?.photo} alt="" />
        </div>
        <div className="jedi_info">
          <div className="info_line">
            <span className="jedi_info_text">
              Name: {currentCharacter?.name}{" "}
            </span>
            <span className="jedi_info_text"></span>
          </div>
          <div className="info_line">
            <span className="jedi_info_text">
              Birth date: {currentCharacter?.birthYear}{" "}
            </span>
            <span className="jedi_info_text"></span>
          </div>
        </div>
      </div>
      <div className="jedi_list">
        <div style={{ marginBottom: "14px" }} className="tab_line">
          <button className="tab_button" onClick={() => handleTabClick(false)}>
            Characters
          </button>
          <button className="tab_button" onClick={() => handleTabClick(true)}>
            Planets
          </button>
        </div>
        {isLoading ? <div className="lds-dual-ring" /> : currentTab}
      </div>
    </div>
  );
};
