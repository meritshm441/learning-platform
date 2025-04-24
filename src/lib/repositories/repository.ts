
const API_BASE_URL = "https://tmp-se-projectapi.azurewebsites.net/api"

export async function fetchTracks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks`, {
      cache: "no-store", // Don't cache the response to always get fresh data
      next: { revalidate: 60 }, // Revalidate every 60 seconds as a fallback
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    console.log(`API Response: ${data.count} tracks found`)
    return data
  } catch (error) {
    console.error("Error fetching tracks:", error)
    throw error
  }
}

export async function fetchTrackById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks/${id}`, {
      cache: "no-store",
      next: { revalidate: 60 }, // Revalidate every 60 seconds as a fallback
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching track ${id}:`, error)
    throw error
  }
}
