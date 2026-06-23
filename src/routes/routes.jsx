import LayoutProvider from "@/layout/LayoutProvider";
import HomePage from "@/pages/Home/HomePage";
import { createBrowserRouter } from "react-router";

export const routing = createBrowserRouter([ 
  {
    path: "/",
    element: <LayoutProvider />,
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      }
    ],
  }
]); 