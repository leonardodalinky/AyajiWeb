import * as React from "react";

function SvgProxy(props) {
  return ( <svg
      xmlns = "http://www.w3.org/2000/svg"
      width = "1em"
      height = "1em"
      viewBox = "0 0 512 512" {...props } >
      <image width = { 512 }
             height = { 512 }
             href = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWcluWxpF8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZmlsbD0iIzBFODNDRCIgZD0iTTI1Ni40LDI1LjhsLTIwMCwxMTUuNUw1NiwzNzEuNWwxOTkuNiwxMTQuN2wyMDAtMTE1LjVsMC40LTIzMC4yTDI1Ni40LDI1Ljh6IE0zNDksMzU0LjZsLTE4LjQsMTAuNwoJbC0xOC42LTExVjI3NUgyMDB2NzkuNmwtMTguNCwxMC43bC0xOC42LTExdi0xOTdsMTguNS0xMC42bDE4LjUsMTAuOFYyMzdoMTEydi03OS42bDE4LjUtMTAuNmwxOC41LDEwLjhWMzU0LjZ6Ii8+Cjwvc3ZnPgo=" />
    </svg>
  );
}

export default SvgProxy;