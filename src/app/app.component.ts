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
    const doc = new jsPDF('l', 'px', 'a4');

    var data = document.getElementById("pdfTable");

    html2canvas(data, {scale : 5}).then(canvas => {
      var imgWidth = 650;
      var pageHeight = 1980;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/jpg', 1.0);

      const imgProps= doc.getImageProperties(contentDataURL);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      var height = data.offsetHeight;
      var width = data.offsetWidth;

      var Height = doc.internal.pageSize.getHeight();
      var Width = doc.internal.pageSize.getWidth();
      var ratio = Height / Width;

      console.log(doc.orientation);

      //                                   x, y, width, height
      doc.addImage(contentDataURL, 'jpg', 0, 0, pdfWidth, 400);
      //doc.addImage(contentDataURL, 'jpg', 0, 0, Width-20, (ratio*Width)-20);
      //doc.addImage(contentDataURL, 'jpg', 0, 0, imgWidth, imgHeight);
      //doc.addImage(contentDataURL, 'jpg', 0, 0, pdfWidth, pdfHeight);

      doc.save('tableToPdf.pdf');
    });
  }
}

