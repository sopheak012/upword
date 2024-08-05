import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyWords: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (!userJson) {
      setError("User information not found.");
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(userJson);

      if (!user.id) {
        setError("Invalid user ID.");
        setLoading(false);
        return;
      }

      const userId = user.id;

      const fetchUserWords = async (userId: string) => {
        try {
          const response = await axios.get<string[]>(
            `http://localhost:5125/userwords/${userId}`
          );
          setWords(response.data);
          setMessage(null);
        } catch (err) {
          console.error("Error fetching user words:", err);
          setError("Error fetching your words.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserWords(userId);
    } catch (error) {
      console.error("Error parsing user information:", error);
      setError("Error parsing user information.");
      setLoading(false);
    }
  }, []);

  const handleClick = (wordValue: string) => {
    navigate(`/words/${wordValue}`);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container p-4 mx-auto">
      {words.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {words.map((word: string) => (
            <div
              key={word}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              onClick={() => handleClick(word)}
            >
              <h2 className="text-2xl font-bold text-center text-gray-900">
                {capitalizeFirstLetter(word)}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mb-4">
          <p>You don't have any words in your collection yet.</p>
          <p>Add words to your collection to see them here!</p>
        </div>
      )}
    </div>
  );
};

export default MyWords;
