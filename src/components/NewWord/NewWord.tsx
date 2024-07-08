import React from "react";

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
    <div className="flex">
      <h2>Auteur</h2>
      <p>{formatDate(exampleDate)}</p>
    </div>
  );
};

export default NewWord;
