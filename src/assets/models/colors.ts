export class Color {
  name: string = "";
  code: string = "";
  isHex: boolean = false;

  constructor(color?: any) {
    if (color) {
      const { name, code } = color;
      this.name = name;
      this.code = code;
      this.isHex = (code + "").charAt(0) === "#";
    }
  }
}
