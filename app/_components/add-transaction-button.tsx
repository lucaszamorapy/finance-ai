"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";

const AddTransactionButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full font-bold"
      >
        Adicionar Transação
        <ArrowDownUpIcon />
      </Button>
      <UpsertTransactionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default AddTransactionButton;
