import React, { useEffect, useState } from "react";
import { AiOutlineSound } from "react-icons/ai";
import { BsChatLeftTextFill } from "react-icons/bs";
import axios from "axios";

// Define types for the word data
interface WordDto {
  id: string;
  value: string;
  definition: string;
  partOfSpeech: string;
  pronunciation: string;
  exampleSentences: string[];
  dateAdded: string;
}

const NewWord: React.FC = () => {
  const [wordData, setWordData] = useState<WordDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the word of the day
  const fetchWordOfTheDay = async () => {
    try {
      const response = await axios.get<WordDto>(
        "http://localhost:5125/words/wordoftheday"
      );
      setWordData(response.data);
    } catch (err) {
      console.error("Error fetching word of the day:", err); // Log error
      setError("Error fetching word of the day.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formatted = date.toLocaleDateString("en-US", options);

    // Check if the day matches
    if (date.getDate() !== day) {
      console.warn(
        `Date mismatch: input was ${dateString}, but formatted as ${formatted}`
      );
      // Adjust the date if needed
      date.setDate(day);
      return date.toLocaleDateString("en-US", options);
    }

    return formatted;
  };

  // Display loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Display the word details if data is available
  if (!wordData) return <p>No word data available.</p>;

  return (
    <div className="w-full max-w-lg overflow-hidden bg-white border border-gray-200 shadow-md rounded-2xl">
      <div className="p-10 text-center bg-gray-50">
        <h2 className="mb-2 text-6xl font-bold text-gray-900">
          {wordData.value}
        </h2>
        <p className="text-sm text-gray-500">
          {formatDate(wordData.dateAdded)}
        </p>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {wordData.partOfSpeech}
          </h3>
          <AiOutlineSound
            size={24}
            className="text-blue-500 cursor-pointer hover:text-blue-600"
          />
        </div>
        <div className="mb-8">
          <h4 className="mb-3 text-lg font-medium text-gray-800">Definition</h4>
          <p className="leading-relaxed text-gray-700">{wordData.definition}</p>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center mb-4">
            <BsChatLeftTextFill size={20} className="mr-2 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-800">
              Example Sentences
            </h3>
          </div>
          <div className="space-y-4">
            {wordData.exampleSentences.map((sentence, index) => (
              <div className="flex items-start" key={index}>
                <AiOutlineSound
                  size={20}
                  className="flex-shrink-0 mt-1 mr-3 text-blue-500 cursor-pointer hover:text-blue-600"
                />
                <p className="leading-relaxed text-gray-700">{sentence}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWord;
