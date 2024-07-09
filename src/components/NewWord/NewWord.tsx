import React from "react";
import { AiOutlineSound } from "react-icons/ai";
import { BsChatLeftTextFill } from "react-icons/bs";

const NewWord: React.FC = () => {
  // Example data
  const exampleDate: Date = new Date(); // Today's date

  // Function to format the date
  const formatDate = (date: Date): string => {
    return date
      .toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center p-4 mb-3 bg-gray-200">
        <h2>Auteur</h2>
        <p>{formatDate(exampleDate)}</p>
      </div>
      <div className="p-4 bg-gray-400 rounded-lg">
        <div className="flex items-center mb-3">
          <h3 className="mr-2">Auteur</h3>
          <AiOutlineSound size={24} />
        </div>
        <h4 className="mb-2">NOUN</h4>
        <p className="mb-4">
          A filmmaker whose personal influence and artistic control over a movie
          are so great that the filmmaker is regarded as the author of the
          movie.
        </p>
      </div>
      <div className="p-4 mt-4 bg-gray-400 rounded-lg">
        <div className="flex items-center mb-3">
          <BsChatLeftTextFill size={24} className="mr-2" />
          <h3 className="mr-2">Example Sentences</h3>
        </div>
        <div className="flex flex-col">
          <div className="flex items-start mb-2">
            <AiOutlineSound size={24} className="mr-2" />
            <p>
              “Kathryn aimed to become an auteur whose films would be instantly
              recognizable.”
            </p>
          </div>
          <div className="flex items-start mb-2">
            <AiOutlineSound size={24} className="mr-2" />
            <p>
              “Kathryn aimed to become an auteur whose films would be instantly
              recognizable.”
            </p>
          </div>
          <div className="flex items-start mb-2">
            <AiOutlineSound size={24} className="mr-2" />
            <p>
              “Kathryn aimed to become an auteur whose films would be instantly
              recognizable.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWord;
