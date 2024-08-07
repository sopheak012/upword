import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WordDto } from "../../Interfaces/index";

const AllWords: React.FC = () => {
  const [words, setWords] = useState<WordDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAllWords = async () => {
    try {
      const response = await axios.get<WordDto[]>(
        `${import.meta.env.VITE_API_URL}/words`
      );
      setWords(response.data);
    } catch (err) {
      console.error("Error fetching all words:", err);
      setError("Error fetching all words.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWords();
  }, []);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const handleClick = (wordValue: string) => {
    navigate(`/words/${wordValue}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {words.map((word) => (
          <div
            key={word.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
            onClick={() => handleClick(word.value)}
          >
            <h2 className="text-2xl font-bold text-center text-gray-900">
              {capitalizeFirstLetter(word.value)}
            </h2>
            <p className="text-sm text-right text-gray-500">
              {formatDate(word.dateAdded)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllWords;
