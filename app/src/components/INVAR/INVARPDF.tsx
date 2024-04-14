import { Document, Page, pdfjs } from "react-pdf";
import { usePDFStore } from "./INVARStore";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

export const INVARPDF = () => {
  const documentURL = usePDFStore((state) => state.documentURL);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.js",
      import.meta.url
    ).toString();
  }, []);

  return (
    <>
      {documentURL ? (
        <Box w="100px">
          <Document file={documentURL}>
            <Page pageNumber={1} />
          </Document>
        </Box>
      ) : (
        "Start demo to load sample file."
      )}
    </>
  );
};
