'use client'
import React from 'react';
import { Card, CardTitle } from "@/components/ui/card";

type Props = {
  widgetName: string,
  widgetId: string
}

const Widget: React.FC<Props> = ({ widgetName, widgetId }) => {
  return (
    <a href={`player/${widgetId}`}>
      <Card className="h-80 w-50 p-4 border-2 border-gray-600 hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
        <CardTitle>{widgetName}</CardTitle>
      </Card>
    </a>
  );
}

export default Widget;
