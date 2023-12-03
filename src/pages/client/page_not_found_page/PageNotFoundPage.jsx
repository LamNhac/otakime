import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFoundPage() {
  return (
    <div className="w-[100%] min-h-screen flex flex-col items-center justify-center gap-2">
      Page Not Found
      <Link to="/">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
