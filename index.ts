import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
	name: "Weather Data Fetcher",
	version: "1.0.0",
});

server.registerTool(
	"trackPackage",
	{
		description: "Track delivery status using tracking number",
		inputSchema: {
			trackingNumber: z.string().describe("Package tracking number"),
		},
	},
	async ({ trackingNumber }) => ({
		content: [
			{
				type: "text",
				text: `Checking delivery status for: ${trackingNumber}`,
			},
		],
	}),
);

server.registerTool(
	"getWeatherDataByCityName",
	{
		description: "Get weather data by city name",
		inputSchema: {
			city: z.string().describe("The name of the city"),
		},
	},
	async ({ city }) => {
		const weatherData = await getWeatherByCity(city);
		return {
			content: [
				{
					type: "text",
					text: JSON.stringify(weatherData),
				},
			],
		};
	},
);

async function getWeatherByCity(city: string) {
	if (city.toLowerCase() === "new york") {
		return { temp: "22°C", forecast: "Partly cloudy with a breeze" };
	}
	if (city.toLowerCase() === "london") {
		return { temp: "16°C", forecast: "Rainy and overcast" };
	}
	return { temp: null, error: "Weather data not available for this city" };
}
