import darkTheme from "./darkTheme";
import defaultTheme from "./defaultTheme";
import lightTheme from "./lightTheme";


declare module '@mui/material/styles' {
    interface Palette {
      fontColor: Palette['primary'];
      borderColor :Palette['primary'];
      backgroundliner : Palette['primary'];
      tableHeader :  Palette['primary'];
      cardBg : Palette['primary'];
    }
  
    interface PaletteOptions {
      fontColor?: PaletteOptions['primary'];
      borderColor?: PaletteOptions['primary'];
      backgroundliner?: PaletteOptions['primary'];
      tableHeader?: PaletteOptions['primary'];
      cardBg? : PaletteOptions['primary'];
    }
  }

  export {
    defaultTheme,
    darkTheme,
    lightTheme,

}