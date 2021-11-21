# Health Tracker
****
HealthTracker is an end-to-end solution to worker safety. HealthTracker warns workers of potentially harmful conditions and notifies managers and rescue teams should an accident happen, even in the absence of direct network connection.     

**Products**
* [Server API] - Server application for controlling data
* [Mobile App] - Mobile application
* [Monitoring Dashboard] - The Rescue Team Dashboard         

![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/1.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/2.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/3.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/4.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/5.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/6.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/8.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/9.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/11.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/10.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/12.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/13.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/15.png)
![](https://github.com/Sakerini/Health-Tracker-Android-MVVM/blob/master/Docs/16.png)
# Further development!
  - P2P-based system
  - Graphical representation of sensor performance history
  - History of sensors
  - Sensors support
And of course physical access control system     
          
   [Monitoring Dashboard]: <https://github.com/outsidious/health-tracker-monitoring-dashboard>     
   [Server API]: <https://github.com/q00Dree/HealthTracker-Backend-WebAPI>     
   [Mobile App]: <https://github.com/Sakerini/Health-Tracker-Android-MVVM>      

_______________________________________________________________________________________________________________________________________________       
_______________________________________________________________________________________________________________________________________________
_______________________________________________________________________________________________________________________________________________
         
# Monitoring Dashboard
Creating on a map markers from `https://lg.perf.group/` with **http get** every `'environments.update_time'`. If user is offline - grey marker.  

![err](demo/demo.png) 

 Dialog components with info getting by ***http get*** opening by clicking on a marker. Sensors values with alert state dedicated with red. 
 Dialog is updating each `'environments.sensors_update_time'`.
  
![err](demo/demo3.png) 
  
 If one of user's sensors alert state is true - red marker and alarm.  
   
  ![err](demo/demo4.png) 

**using ngx-leaflet with Angular CLI** [see more](https://asymmetrik.com/ngx-leaflet-tutorial-angular-cli/)

