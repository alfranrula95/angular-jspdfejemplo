import { Component, ViewChild, ElementRef } from '@angular/core';
import html2canvas from "html2canvas";
import {jsPDF} from 'jspdf';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular Html To Pdf ';

  public downloadAsPDF() {
    //                    portrait/landscape, unidades, relacion
    const doc = new jsPDF('p', 'px', 'a4');

    var data = document.getElementById("pdfTable");
    html2canvas(data, {scale : 5}).then(canvas => {
      var imgWidth = 100;
      var pageHeight = 1980;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/jpg');

      const imgProps= doc.getImageProperties(contentDataURL);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      //console.log("canvas.height : ", canvas.height,  "imgWidth", imgWidth, "canvas.width", canvas.width, "imgHeight", imgHeight);
      
      //                                   x, y, width, height
      doc.addImage(contentDataURL, 'jpg', 2, 100, pdfWidth, pdfHeight);
      doc.save('tableToPdf.pdf');
    });
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
  }
}
