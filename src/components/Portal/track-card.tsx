import Image from "next/image"

interface TrackCardProps {
  title: string
  description: string
  imageSrc: string
}

export function TrackCard({ title, description, imageSrc }: TrackCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="p-4 md:w-1/3">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            width={200}
            height={150}
            className="object-contain"
          />
        </div>

        <div className="p-4 md:w-2/3">
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="mb-4 text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}
