import React, { useState } from "react";
import { Avatar, Rating, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { AccountBox } from "@mui/icons-material";
import classNames from "classnames";
import axios from "axios";
import { useDarkMode } from "../../context/DarkModeContext";
import { Feedback } from "@/types/feedback";

interface FeedbackSectionProps {
  feedback: Feedback[];
  filmId: number | undefined;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedback, filmId }) => {
  const { darkMode } = useDarkMode();
  const [commentInput, setCommentInput] = useState("");
  const [valueVote, setValueVote] = useState(0);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(feedback);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value);
  };

  const handleSendFeedback = async () => {
    if (commentInput.trim() !== "" || valueVote > 0) {
      const newFeedback: Feedback = {
        filmId: filmId!,
        vote: valueVote,
        comment: commentInput,
        username: "You",
        classification: "Normal",
      };
      try {
        await axios.post(
          "http://localhost:8080/api/feedback/add",
          newFeedback,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setFeedbackList([...feedbackList, newFeedback]);
        setCommentInput("");
        setValueVote(0); // Reset the vote after sending
      } catch (error) {
        console.error("Error sending feedback:", error);
      }
    }
  };

  return (
    <div className="comment-by-fb mt-10 mx-24 p-6 rounded-lg shadow-md">
      <p
        className={classNames(
          "text-[20px] font-bold border-b-2 border-blue-300 pb-2",
          darkMode ? "text-blue-100" : "text-blue-400"
        )}
      >
        Feedback
      </p>
      <div className="mb-6">
        <div className="mt-4 space-y-4">
          {feedbackList.map((fb) => (
            <div
              key={fb.id}
              className={classNames(
                "p-2 border-b-[0.2px] flex items-center space-x-2",
                darkMode ? "text-blue-100" : "text-black"
              )}
            >
              <div className="flex items-center space-x-3 p-2 border-b border-gray-200 dark:border-gray-700">
                <Tooltip title={fb?.username}>
                  <Avatar className="bg-blue-500 text-white flex-shrink-0">
                    {fb?.username?.charAt(0) || "U"}
                  </Avatar>
                </Tooltip>
              </div>
              <Rating name="read-only" value={fb.vote || 0} readOnly size="small" />
              <span className="ml-2">{fb.comment}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-4 space-x-4">
          <p className={classNames(darkMode ? "text-blue-200" : "text-blue-400", "text-[16px]")}>
            Đánh giá:
          </p>
          <Rating
            name="size-large"
            defaultValue={0}
            value={valueVote}
            onChange={(event, newValue) => {
              setValueVote(newValue);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: !darkMode ? 0.55 : 1 }} fontSize="inherit" />
            }
          />
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <AccountBox fontSize="large" />
          <input
            type="text"
            value={commentInput}
            onChange={handleInputChange}
            className={classNames(
              "flex-1 p-1 border rounded",
              darkMode ? "bg-slate-700 text-white" : "bg-white text-black"
            )}
            placeholder="Thêm nhận xét ..."
          />
          <button
            onClick={handleSendFeedback}
            className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
