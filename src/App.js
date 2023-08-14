import React , {useState} from 'react'
import * as XLSX from 'xlsx';

const App = () => {
  const [tabledata , setTableData] = useState()
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
  console.log(tabledata)
  return (
    <div>
      <input type="file" name="" id="" onChange={handlechange} />
    </div>
  )
}

export default App
