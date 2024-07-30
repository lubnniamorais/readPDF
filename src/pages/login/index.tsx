// import { Document, Page, pdfjs } from 'react-pdf';
// import 'pdfjs-dist/webpack';
import * as pdfJS from 'pdfjs-dist';
// import { useState } from 'react';
// import { randomUUID } from 'crypto';
// import pdfJSWorkerURL from 'pdfjs-dist/build/pdf.worker?url';
// import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

export default function PDFPage() {
  // async function teste() {
  //   const pdfPath =
  //     process.argv[2] || '../../web/compressed.tracemonkey-pldi-09.pdf';

  //   pdfJS.getDocument(pdfPath).promise.then(function (doc) {
  //     const numPages = doc.numPages;
  //     console.log('# Document Loaded');
  //     console.log('Number of Pages: ' + numPages);
  //   });
  // }

  async function getNumberOfPages() {
    const inputFileUrl = document.getElementById('pdfFile').value; // gets the link from input
    // fetch file from server
    const f = await fetch(inputFileUrl);
    const response = await f.blob();

    // create a file reader
    const fileReader = new FileReader();

    fileReader.onload = function () {
      const typedarray = new Uint8Array(this.result);

      const loadingTask = pdfJS.getDocument(typedarray);
      loadingTask.promise.then((pdf) => {
        document.getElementById('result').innerHTML =
          'The number of Pages inside pdf document is ' + pdf.numPages;
      });
    };
    // read file
    fileReader.readAsArrayBuffer(response);

    document.getElementById('btn').addEventListener('click', function () {
      getNumberOfPages();
    });
  }

  return (
    <>
      <h1
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '1.5rem',
          padding: '1rem',
        }}
      >
        Teste de ler quantidade de páginas
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '1.5rem',
          padding: '1rem',
          gap: '1rem',
        }}
      >
        <h1>Contar páginas dentro do documento PDF</h1>
        <div>
          <input
            placeholder="URL do documento"
            type="text"
            accept=".pdf"
            required
            id="pdfFile"
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0 auto',
              border: '1px solid',
            }}
          />
          <button
            onClick={() => {}}
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0 auto',
              border: '1px solid',
              marginTop: '1rem',
              background: '#17ec1794',
            }}
          >
            Clique para saber o número de páginas do documento
          </button>
        </div>
        <br />
        <h1 id="result"></h1>
      </div>
    </>
  );
}
