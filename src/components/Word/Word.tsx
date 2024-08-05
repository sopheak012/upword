import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineSound, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsChatLeftTextFill } from "react-icons/bs";
import axios, { AxiosError } from "axios";
import { WordDto } from "../../Interfaces/index";

const NewWord: React.FC = () => {
  const { word } = useParams<{ word: string }>();
  const [wordData, setWordData] = useState<WordDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userWords, setUserWords] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Retrieve user ID from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserId(userData.id);
    }
  }, []);

  // Fetch the user's words from the backend
  const fetchUserWords = async (userId: string) => {
    try {
      const response = await axios.get<string[]>(
        `http://localhost:5125/userwords/${userId}`
      );
      setUserWords(response.data);
    } catch (err) {
      console.error("Error fetching user's words:", err);
    }
  };

  // Fetch word data from the backend
  const fetchWordData = async (word: string) => {
    try {
      const response = await axios.get<WordDto>(
        `http://localhost:5125/words/${word}`
      );
      setWordData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("Error fetching word data:", axiosError);
      if (axiosError.response?.status === 404) {
        fetchWordOfTheDay();
      } else {
        setError("Error fetching word data.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch the "word of the day" from the backend
  const fetchWordOfTheDay = async () => {
    try {
      const response = await axios.get<WordDto>(
        "http://localhost:5125/words/wordoftheday"
      );
      setWordData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("Error fetching word of the day:", axiosError);
      setError("Error fetching word of the day.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle user's word status
  const toggleUserWord = async (word: string) => {
    if (!userId) return;

    try {
      const isUserWord = userWords.includes(word);

      if (isUserWord) {
        // Remove from user's words
        await axios.delete(`http://localhost:5125/userwords/${userId}/${word}`);
        setUserWords((prevWords) =>
          prevWords.filter((userWord) => userWord !== word)
        );
      } else {
        // Add to user's words
        await axios.post(`http://localhost:5125/userwords`, {
          UserId: userId,
          WordValue: word,
        });
        setUserWords((prevWords) => [...prevWords, word]);
      }
    } catch (err) {
      console.error("Error updating user's words:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserWords(userId);
    }
    if (word) {
      fetchWordData(word);
    } else {
      fetchWordOfTheDay();
    }
  }, [word, userId]);

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

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-Speech is not supported in this browser.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!wordData) return <p>No word data available.</p>;

  const isUserWord = userWords.includes(wordData.value);

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
          {userId && (
            <div
              className="cursor-pointer"
              onClick={() => toggleUserWord(wordData.value)}
            >
              {isUserWord ? (
                <AiFillStar
                  size={24}
                  className="text-yellow-500"
                  title="Remove from bookmarks"
                />
              ) : (
                <AiOutlineStar
                  size={24}
                  className="text-gray-400 hover:text-yellow-500"
                  title="Add to bookmarks"
                />
              )}
            </div>
          )}
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
