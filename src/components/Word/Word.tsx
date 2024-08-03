import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineSound, AiOutlineStar } from "react-icons/ai";
import { BsChatLeftTextFill } from "react-icons/bs";
import axios, { AxiosError } from "axios";
import { WordDto } from "../../Interfaces/index"; // Import WordDto

const NewWord: React.FC = () => {
  const { word } = useParams<{ word: string }>(); // Get the word from URL params
  const [wordData, setWordData] = useState<WordDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the word data
  const fetchWordData = async (word: string) => {
    try {
      const response = await axios.get<WordDto>(
        `http://localhost:5125/words/${word}`
      );
      setWordData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("Error fetching word data:", axiosError); // Log error
      if (axiosError.response?.status === 404) {
        // Fallback to "word of the day" if the specific word is not found
        fetchWordOfTheDay();
      } else {
        setError("Error fetching word data.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the "word of the day"
  const fetchWordOfTheDay = async () => {
    try {
      const response = await axios.get<WordDto>(
        "http://localhost:5125/words/wordoftheday"
      );
      setWordData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("Error fetching word of the day:", axiosError); // Log error
      setError("Error fetching word of the day.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (word) {
      fetchWordData(word);
    } else {
      fetchWordOfTheDay();
    }
  }, [word]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  // Function to handle text-to-speech
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-Speech is not supported in this browser.");
    }
  };

  // Display loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Display the word details if data is available
  if (!wordData) return <p>No word data available.</p>;

  return (
    <div className="w-full max-w-lg overflow-hidden bg-white border border-gray-200 shadow-md rounded-2xl">
      <div className="flex flex-col h-40 bg-gray-50">
        <div className="flex items-center justify-center flex-grow">
          <h2 className="text-6xl font-bold text-gray-900">
            {capitalizeFirstLetter(wordData.value)}
          </h2>
        </div>
        <div className="p-4 text-center">
          <p className="text-sm text-gray-500">
            {formatDate(wordData.dateAdded)}
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold text-gray-800 mr-4">
              {wordData.partOfSpeech}
            </h3>
            <AiOutlineSound
              size={24}
              className="text-blue-500 cursor-pointer hover:text-blue-600"
              onClick={() => speakText(wordData.value)}
              title="Speak word"
            />
          </div>
          <AiOutlineStar
            size={24}
            className="cursor-pointer text-gray-400 hover:text-yellow-500"
            title="Bookmark"
          />
        </div>
        <div className="mb-8">
          <h4 className="mb-3 text-lg font-medium text-gray-800">Definition</h4>
          <p className="leading-relaxed text-gray-700">{`1. ${wordData.definition}`}</p>
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
                <span className="flex-shrink-0 mr-3">{index + 1}.</span>
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
