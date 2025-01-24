import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Shield, Lock } from "lucide-react";

interface CategoryData {
  user: string;
  scores: Record<string, number>;
}

interface CategoryScoresData {
  web: CategoryData | null;
  pwn: CategoryData | null;
  crypto: CategoryData | null;
}

interface CategoryScoresDisplayProps {
  data: CategoryScoresData;
  error?: string;
}

export function CategoryScoresDisplay({ data, error }: CategoryScoresDisplayProps) {
  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-500">
            Greška
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Rezultati po kategorijama
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CategoryItem
            icon={Globe}
            label="Web"
            categoryData={data.web}
            color="text-blue-500"
          />
          <CategoryItem
            icon={Shield}
            label="PWN"
            categoryData={data.pwn}
            color="text-green-500"
          />
          <CategoryItem
            icon={Lock}
            label="Crypto"
            categoryData={data.crypto}
            color="text-purple-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface CategoryItemProps {
  icon: React.ElementType;
  label: string;
  categoryData: CategoryData | null;
  color: string;
}

function CategoryItem({ icon: Icon, label, categoryData, color }: CategoryItemProps) {
  const totalScore = categoryData?.scores
    ? Object.values(categoryData.scores).reduce((sum, score) => sum + score, 0)
    : 0;

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <Icon className={`w-8 h-8 ${color}`} />
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{label}</p>
        <p className={`text-lg font-semibold ${color}`}>{totalScore}</p>
      </div>
      {categoryData?.scores && Object.entries(categoryData.scores).length > 0 && (
        <div className="text-xs text-muted-foreground">
          {Object.entries(categoryData.scores).map(([challenge, score]) => (
            <p key={challenge}>
              {challenge}: {score}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}