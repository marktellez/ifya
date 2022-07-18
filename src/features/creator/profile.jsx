import Link from "@/ui/link";

export default function CreatorProfile({ name, company, photo, www }) {
  return (
    <div className="flex flex-col items-center mt-4">
      <img src={photo} className="block w-48" />
      <div className="mt-4">
        <div className="font-serif font-medium text-xl">{name}</div>
        <div className="font-thin">{company}</div>
        <div className="font-thin text-sm">
          <Link target="_blank" href={www}>
            {www}
          </Link>
        </div>
      </div>
    </div>
  );
}
