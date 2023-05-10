import React from "react";

export const Badge = ({ children, count }) => {
  const hasChild = React.Children.count(children) > 0;

  return (
    <div className="relative inline-flex items-center">
      {children}
      {hasChild && (
        <span className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 rounded-full bg-orange-600 text-white text-xs">
          {count}
        </span>
      )}
    </div>
  );
};
