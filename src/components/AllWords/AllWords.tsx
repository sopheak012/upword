import React, { useEffect, useState } from "react";
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

const AllWords: React.FC = () => {
  const [words, setWords] = useState<WordDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all words
  const fetchAllWords = async () => {
    try {
      const response = await axios.get<WordDto[]>(
        "http://localhost:5125/words"
      );
      setWords(response.data);
    } catch (err) {
      console.error("Error fetching all words:", err); // Log error
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

  // Display loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Display the words in a grid
  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {words.map((word) => (
          <div
            key={word.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
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
