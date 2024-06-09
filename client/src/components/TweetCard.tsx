import React from "react";

interface TweetCardProps {
  tweet: object;
}

const TweetCard = ({ tweet }: TweetCardProps) => {
  return (
    <main>
      <div>
        <img
          src="/placeholder.png"
          alt="user pic"
          className="w-8 h-8 rounded-full"
        />
        <span></span>
      </div>
    </main>
  );
};

export default TweetCard;
