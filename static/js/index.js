window.onload = function(){
   function geoFindMe() {
      const status = document.querySelector('#status');
      const lon = document.querySelector("#lon")
      const lat = document.querySelector("#lat")
      function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        if(lon.value == '' || lat.value == ''){
            lon.value = longitude;
            lat.value = latitude;
        }

        $.ajax({url: "https://api.openweathermap.org/data/2.5/weather?lat="+lat.value+"&lon="+lon.value+"&appid=809d866831ecf5cf6a3105f32a0754b0&units=metric",
        	success: function(res){
        	    console.log(res);
        	    w = res.weather[0]['main'];
                s = res.wind['speed'];
        	    if((w == 'Clear' || w=='Clouds') && s < 10.7){
        	        document.getElementById("road_condition").value = 1;
        	        document.getElementById("weather_condition").value = 1;
        	    }
        	    else if((w == 'Clear' || w=='Clouds') && s > 10.7){
        	        document.getElementById("road_condition").value = 1;
        	        document.getElementById("weather_condition").value = 4;
        	    }
        	    else if(w == 'Rain' && s < 10.7){
        	        document.getElementById("road_condition").value = 2;
        	        document.getElementById("weather_condition").value = 2;
        	    }
        	    else if(w == 'Rain' && s > 10.7){
        	        document.getElementById("road_condition").value = 2;
        	        document.getElementById("weather_condition").value = 5;
        	    }
        	    else if(w == 'Snow' && s < 10.7){
        	        document.getElementById("road_condition").value = 3;
        	        document.getElementById("weather_condition").value = 3;
        	    }
        	    else if(w == 'Snow' && s > 10.7 ){
        	        document.getElementById("road_condition").value = 3;
        	        document.getElementById("weather_condition").value =6;
        	    }
        	    else if(w == 'Fog' || w == 'Mist'){
        	        document.getElementById("road_condition").value = 2;
        	        document.getElementById("weather_condition").value = 7;
        	    }
        	    else{
        	        document.getElementById("road_condition").value = 1;
        	        document.getElementById("weather_condition").value = 1;
        	    }

        	    const date = new Date();
        	    const hour = date.getHours();
        	    if(hour <= 6 || hour >= 19){
        	        document.getElementById("light").value = 4;
        	    }
        	    else{
        	        document.getElementById("light").value = 1;
        	    }
        	    const day = date.getDay();
        	    document.getElementById("day_of_the_week").value = day+1;

        }});

      }

      function error() {
        status.textContent = 'Unable to retrieve your location';
      }

      if(!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
      } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
      }

    }

        document.querySelector('#find-me').addEventListener('click', geoFindMe);
    }