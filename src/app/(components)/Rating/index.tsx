import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => {
        const color = i <= rating ? "#FFC107" : "#E4E5E9";

        return <Star key={i} size={16} stroke={color} className="mr-1" />;
      })}
    </div>
  );
};

export default Rating;
