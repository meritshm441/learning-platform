import { TrackForm } from "@/components/admin-dashboard/tracks/track-form"

export default function AdminEditTrackPage() {
  // In a real implementation, you would fetch the track data based on the ID
  const mockData = {
    title: "Software Engineering Track",
    price: "380.00",
    instructor: "Benjamin",
    duration: "12 weeks",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  }

  return <TrackForm mode="update" initialData={mockData} />
}
