import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <div>
      <ScrollArea className="col-span-2 rounded-md border pb-6">
        <CardHeader>
          <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {expensesPerCategory.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABELS[item.category]}
                </p>
                <p className="text-sm font-bold">{item.percentageOfTotal}%</p>
              </div>
              <Progress value={item.percentageOfTotal} />
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </div>
  );
};

export default ExpensesPerCategory;
