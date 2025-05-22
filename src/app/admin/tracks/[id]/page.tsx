import { TrackDetails } from "@/components/admin-dashboard/tracks/track-details"

type AdminTrackDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminTrackDetailsPage({ params }: AdminTrackDetailsPageProps) {
  const { id } = await params
  return <TrackDetails id={id} />
}
