const apiKey = "የናንተን API key";
const cityInput = document.querySelector("#text-input");

async function checkWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found or invalid request");
        }
        
        const data = await response.json();
        console.log(data);

        if (data.weather[0].main === "Clear") {
            document.querySelector("#img").src = "images/sunny.png";
        } else if (data.weather[0].main === "Rain") {
            document.querySelector("#img").src = "images/rain.png";
        } else if (data.weather[0].main === "Snow") {
            document.querySelector("#img").src = "images/snow (1).png";
        } else if (data.weather[0].main === "Clouds") {
            document.querySelector("#img").src = "images/cloudy.png";
        } else if (data.weather[0].main === "Mist") {
            document.querySelector("#img").src = "images/dizeel.png";
        } else {
            document.querySelector("#img").src = "images/cloudy.png"; // Fallback image
        }

        // Update additional weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Unable to retrieve weather data. Please check the city name.");
    }
}

document.querySelector("#search").addEventListener("click", () => {
    const city = cityInput.value.trim(); // Get the value and trim whitespace
    if (city) {
        checkWeather(city); // Call the function with the city name
    } else {
        alert("Please enter a city name!");
    }
});
