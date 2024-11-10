"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import Markdown from "react-markdown";

interface AiReportButtonProps {
  month: string;
}

const AiReportButton = ({ month }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  const handleGenerateReportClick = async () => {
    try {
      setLoading(true);
      const aiReport = await generateAiReport(month);
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setReport(null);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="ghost" className="font-bold">
            <BotIcon />
            Relatório IA
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Relatório com IA</DialogTitle>
            <DialogDescription>
              Use inteligência artificial para gerar um relatório com insights
              sobre suas finanças.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-[450px] text-white">
            <Markdown>{report}</Markdown>
          </ScrollArea>
          <DialogFooter>
            <DialogClose>
              <Button variant="ghost" className="font-bold">
                Cancelar
              </Button>
            </DialogClose>
            <Button onClick={handleGenerateReportClick} disabled={loading}>
              {loading && <Loader2Icon className="animate-spin" />}
              Gerar relatório
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AiReportButton;
