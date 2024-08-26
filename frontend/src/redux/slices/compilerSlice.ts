import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
  isOwner: boolean;
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Browser</title>
</head>

<body>
  <h1>
    Write, edit and run HTML, CSS and JavaScript code online.
  </h1>
  <p>
    Our HTML editor updates the webview automatically in real-time as you write code.
  </p>
  <script src="script.js"></script>
</body>
    `,
    css: `
body {
  margin: 20px;
}
          
    `,
    javascript: `
console.log("from script file");
  
    `,
  },
  currentLanguage: "html",
  isOwner: false,
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateIsOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload;
    },
    updateFullCode: (
      state,
      action: PayloadAction<CompilerSliceStateType["fullCode"]>
    ) => {
      state.fullCode = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const {
  updateCurrentLanguage,
  updateCodeValue,
  updateFullCode,
  updateIsOwner,
} = compilerSlice.actions;