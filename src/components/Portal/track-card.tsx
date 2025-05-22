import Image from "next/image"

interface TrackCardProps {
  title: string
  description: string
  imageSrc: string
}

export function TrackCard({ title, description, imageSrc }: TrackCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} width={200} height={150} className="object-contain" />
        </div>

        <div className="md:w-2/3 p-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
      </div>
    </div>
  )
}
