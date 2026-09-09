import { Merchant } from "../../../merchant.mock";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BusinessDocumentsTab({ merchant }: { merchant: Merchant }) {
  const documents = [
    {
      id: "doc_1",
      name: "Certificate of Incorporation",
      type: "Registration Document",
      uploadedAt: "10 Sep 2023",
      status: "VERIFIED",
      fileType: "PDF",
      size: "2.4 MB"
    },
    {
      id: "doc_2",
      name: "GST Registration Certificate",
      type: "Tax Document",
      uploadedAt: "10 Sep 2023",
      status: "VERIFIED",
      fileType: "PDF",
      size: "1.1 MB"
    },
    {
      id: "doc_3",
      name: "Board Resolution",
      type: "Authorization",
      uploadedAt: "12 Sep 2023",
      status: "PENDING",
      fileType: "PDF",
      size: "3.5 MB"
    },
    {
      id: "doc_4",
      name: "Cancelled Cheque",
      type: "Bank Proof",
      uploadedAt: "12 Sep 2023",
      status: "VERIFIED",
      fileType: "JPG",
      size: "800 KB"
    }
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "VERIFIED") return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200/50"><CheckCircle2 className="mr-1 h-3 w-3" /> Verified</Badge>;
    if (status === "PENDING") return <Badge className="bg-amber-50 text-amber-600 border-amber-200/50"><Clock className="mr-1 h-3 w-3" /> Pending Review</Badge>;
    return <Badge className="bg-red-50 text-red-600 border-red-200/50">Rejected</Badge>;
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="shadow-none border-slate-200/60 dark:border-slate-800">
          <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{doc.name}</h4>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span>{doc.type}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>Uploaded {doc.uploadedAt}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 sm:justify-end">
              <StatusBadge status={doc.status} />
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
