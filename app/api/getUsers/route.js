export const dynamic = "force-dynamic";
import axios from "axios";

async function getToken() {
    var options = {
        method: 'POST',
        url: `https://${process.env.AUTH0_API_URL}/oauth/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_API_CLIENT_ID,
            client_secret: process.env.AUTH0_API_CLIENT_SECRET,
            audience: `https://${process.env.AUTH0_API_URL}/api/v2/`
        })
    };

    var response = await axios.request(options);

    return response.data.access_token;
}

export async function GET() {
    var token = await getToken();

    const options = {
        method: "GET",
        url: `https://${process.env.AUTH0_API_URL}/api/v2/users`,
        headers: { "Authorization": `Bearer ${token}`, "content-type": "application/json" },
    };

    try {
        const response = await axios.request(options);
        return new Response(
            JSON.stringify(response.data), // Forward the API's response as JSON
            {
                status: 200, // Use the status from the API response if needed
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );


    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401 }
        );
    }
}