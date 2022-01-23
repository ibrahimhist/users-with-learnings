import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchValue: string, fieldNames?: string[]): any[] {
    const returnList: any[] = [];

    if (!searchValue) {
      return items;
    }

    items.forEach((item) => {
      let defaultFieldNames: string[] = Object.keys(item);
      if (fieldNames) {
        defaultFieldNames = fieldNames;
      }

      defaultFieldNames.forEach((itemKey) => {
        if (item[itemKey] === null) {
          return;
        }
        const columnName = this.makeStringLocaleChar(item[itemKey].toString());
        const searchInputValue = this.makeStringLocaleChar(
          searchValue.toString()
        );
        if (
          columnName.indexOf(searchInputValue) !== -1 &&
          !returnList.includes(item)
        ) {
          returnList.push(item);
        }
      });
    });
    return returnList;
  }

  makeStringLocaleChar(stringValue: string) {
    const letters: any = {
      İ: 'i',
      I: 'i',
      Ş: 'ş',
      Ğ: 'ğ',
      Ü: 'ü',
      Ö: 'ö',
      Ç: 'ç',
      ı: 'i',
    };
    stringValue = stringValue.replace(/(([İIŞĞÜÇÖı]))/g, (letter) => {
      return letters[letter];
    });
    return stringValue.toLowerCase();
  }
}
