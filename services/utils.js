import fs from "fs";
import PDFDocument from "pdfkit";

export function readJsonFile(path) {
  const json = fs.readFileSync(path, "utf8");
  const data = JSON.parse(json);
  return data;
}

export function writeJsonFile(path, data) {
  const json = JSON.stringify(data, null, 4);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, json, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

export function writePDF(table, res) {
try{
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=bugsPDF.pdf");
    doc.pipe(fs.createWriteStream("./bugsPDF.pdf"));
    doc.pipe(res);
    
    doc.text("Bugs data");
    if (table) {
    const dataTable = [table.headers,...table.rows]
    console.log("🚀 ~ writePDF ~ dataTable:", dataTable)
    doc.table({data:[...dataTable]});
}
  else {doc.table("No bugs were found!")}
  doc.end();
    } catch (err) {
        console.error('Error in writePDF:', err);
        throw err;
    }

}

export function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}
