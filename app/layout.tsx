"use client"
import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider,createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux'
import { store } from './store';
import Layout from './_component/Layout';
import Background from './_component/Background';


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
      <Provider store={store}>
        <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
