SOC 8 SENTRA — V1 DASHBOARD
=============================

Files:
- index.html
- style.css
- script.js

RUN LOCALLY
-----------
Option 1:
Double-click index.html.

Option 2 (recommended for SeaTalk-style web testing):
Open PowerShell in this folder and run:

py -m http.server 5000

Then open:
http://localhost:5000

If "py" does not work, try:
python -m http.server 5000

IMPORTANT
---------
This is V1 DEMO mode. The SCADA, Reject and WCS values are dummy values.
No real bot/API is connected yet.

NEXT PHASE
----------
1. Test the dashboard locally.
2. Put it on a PC/server with a reachable URL.
3. Enter the Web URL in the SeaTalk Workspace App.
4. Confirm it opens inside SeaTalk.
5. Replace demo data with real APIs:
   - SCADADOO / SCADA
   - Reject Bot / Google Sheets or API
   - Sundot / WCS
