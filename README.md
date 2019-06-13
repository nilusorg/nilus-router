README
======

running the services
======================

* start docker pg_gis and graphhopper # this exposes pg port and graphhopper at port 8989
* cd router-api && node app.js # this exposes port 3000 and internally invokes the jar router for now
* http-server jsprit.vrp\input -p 8080 --cors='*'
* http-server router-webui -p 8081


test jar for jsprit.vrp
======================

* build jsprit.vrp and then
* java -jar projects\nilus\nilus-router\jsprit.vrp\out\artifacts\jsprit_vrp_jar\jsprit.vrp.jar "jsprit.vrp\input\bicycle_messenger_demand.txt" "jsprit.vrp\input\bicycle_messenger_supply.txt"