import { Injectable } from '@angular/core';


@Injectable()
export class AppService {

    downloadFile(data, filename='data') {
        let csvData = this.ConvertToCSV(data, ['priority', 'registered_email', 'referral_link', 'noReferred','createdAt']);
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    ConvertToCSV(objArray, headerList) {
         let headers = ['Priority', 'Email', 'Referal Token', 'Total Referred','Signup Date']
         let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
         let str = '';
         let row = '';

        
         for (let index in headers) {
             row = row + headers[index] + ',';
         }

         row = row.slice(0, -1);
         if(objArray.length == 0) {
            str += row + '\r\n' + "No records found";
            return str;
         } else{
            str += row + '\r\n';
         }
         for (let i = 0; i < array.length; i++) {
             let line = '';
             for (let index in headerList) {
                let head = headerList[index];
                line = line + array[i][head] + ','
             }
             str += line + '\r\n';
         }
         return str;
     }
}