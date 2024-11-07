import React from "react";
import { db } from "../_lib/prisma";
import { Button } from "../_components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./_columns/index.tsx";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({}); //findAll do prisma
  return (
    <div className="p-6 space-y-6">
      <div className="flex w-full justify-between items-center">
        <h1 className="font-bold text-2xl">Transações</h1>
        <Button className="rounded-full font-bold">
          Adicionar Transação
          <ArrowDownUpIcon />
        </Button>
      </div>
      <DataTable columns={transactionsColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
