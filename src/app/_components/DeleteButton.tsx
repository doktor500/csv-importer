"use client";

import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";

type Props = {
  productId: number;
  onClickAction: (id: number) => Promise<void>;
};

export const DeleteButton = ({ productId, onClickAction: onClick }: Props) => {
  const { toast } = useToast();

  const handleClick = async () => {
    await onClick(productId).catch(() => {
      toast({ title: "Error deleting", description: "Please try again", variant: "negative" });
    });
  };

  return (
    <Button
      className="cursor-pointer rounded bg-red-700 px-3 py-1 text-white transition hover:bg-red-800"
      onClick={handleClick}
    >
      Delete
    </Button>
  );
};
