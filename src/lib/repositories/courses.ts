const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export async function fetchTracks() {
  try {
    console.log("Fetching tracks from API...");

    const response = await fetch(`${API_BASE_URL}/tracks`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log(`API Response: Found ${data.count} tracks`);

    if (!data.success || !Array.isArray(data.tracks)) {
      console.error("Invalid API response structure:", data);
      throw new Error("Invalid API response structure");
    }

    return data;
  } catch (error) {
    console.error("Error in fetchTracks:", error);
    throw error;
  }
}

export async function fetchTrackById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching track ${id}:`, error);
    throw error;
  }
}
