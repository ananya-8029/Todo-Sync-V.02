"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./redux/store";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head suppressHydrationWarning>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
