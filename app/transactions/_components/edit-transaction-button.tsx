"use client";

import React, { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
        <PencilIcon size="icon" className="text-muted-foreground" />
      </Button>
      <UpsertTransactionDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editValues={{ ...transaction, amount: Number(transaction.amount) }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
