window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let weatherIcon = document.getElementById("icon");
  // If geolocation is allowed.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      // API authentication.
      const key = "82f2b32be2524bfe68b2f923bc2e6537";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
      // Fetch API data.
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const location = data.name;
          const country = data.sys.country;
          const temperature = data.main.temp;
          const feelsLike = data.main.feels_like;
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
          locationTimezone.textContent = location + ", " + country;
          temperatureDegree.textContent = Math.trunc(temperature) + "°";
          temperatureDescription.textContent =
            description + ", feels like: " + Math.trunc(feelsLike) + "° C";
          weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
          // Convert C to F.
          let fahrenheit = temperature * 1.8 + 32;
          let feelsLikeFahrenheit = feelsLike * 1.8 + 32;
          // Change unit to C or F.
          temperatureSection.addEventListener("click", () => {
            console.log(temperatureSpan);
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.trunc(fahrenheit) + "°";
              temperatureDescription.textContent =
                description +
                ", feels like: " +
                Math.trunc(feelsLikeFahrenheit) +
                "° F";
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.trunc(temperature) + "°";
              temperatureDescription.textContent =
                description + ", feels like: " + Math.trunc(feelsLike) + "° C";
            }
          });
        });
    });
  }
});
