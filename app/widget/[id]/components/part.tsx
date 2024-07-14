"use client"
import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PartCardProps = {
  project: any;
  displayVideo: any;
  onClick: () => void;
};

const PartCard: React.FC<PartCardProps> = ({ project, displayVideo, onClick }) => {
  return (
    <div className="p-1" onClick={onClick}>
      <Card className="w-48 h-30 p-4 mr-2 border-2 border-gray-600 hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
        <Badge className="bg-slate-400">Draft</Badge>
        {displayVideo && displayVideo ? (
          <video style={{ width: "50px" }}>
            <source src={displayVideo} type="video/mp4" />
          </video>
        ) : displayVideo ? (
          <div>Loading...</div>
        ) : null}
        <CardTitle>{project.name}</CardTitle>
      </Card>
    </div>
  );
};

export default PartCard;
