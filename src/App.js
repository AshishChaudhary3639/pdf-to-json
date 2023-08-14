import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const App = () => {
  const [tabledata, setTableData] = useState();

  const handlechange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setTableData(jsonData);
    };

    reader.readAsBinaryString(file);
  };
  useEffect(() => {
    setTimeout(() => {
      if (tabledata) {
        for (let i = 0; i < tabledata.length; i+=2) {
          let array = tabledata[i];
          for (let j = 0; j < array.length; j++) {
            let elem = array[j];
            if (typeof elem === 'string' && elem.includes('N')) {
              const name = elem.slice(elem.indexOf('N'), elem.length);
              console.log(name);
            }
          }
        }
      }
    }, 1000);
  }, [tabledata]);
  
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (tabledata) {
  //       for (let i = 1; i < tabledata.length; i+=2) {
  //         let array = tabledata[i];
  //         for (let j = 0; j < array.length; j++) {
  //           let elem = array[j];
  //           if (typeof elem === 'string' && elem.includes("Father's")) {
  //             const name = elem.slice(elem.indexOf(''), elem.length);
  //             console.log(name);
  //           }
  //         }
  //       }
  //     }
  //   }, 1000);
  // }, [tabledata]);
 
// console.log(tabledata)
// console.log(tabledata[0])
// console.log(tabledata[2])
  return (
    <div>
      <input type="file" name="" id="" onChange={handlechange} />
    </div>
  );
};

export default App;
