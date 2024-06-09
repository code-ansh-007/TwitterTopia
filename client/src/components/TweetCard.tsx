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
        <span>Hello</span>
      </div>
      <span className="text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
        ducimus fugit minus, a quaerat ut enim officiis deserunt autem
        cupiditate labore dolores. Perspiciatis dolor possimus explicabo
        delectus tempora amet modi ipsa, minus nisi quidem rem asperiores aut in
        itaque doloribus earum, non vel laudantium ab.
      </span>
    </main>
  );
};

export default TweetCard;
