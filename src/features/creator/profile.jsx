import Link from "@/ui/link";

export default function CreatorProfile({ name, company, photo, www }) {
  return (
    <div className="flex gap-4 md:flex-col justify-center items-center mt-4">
      <img
        src={photo}
        className="rounded-full md:rounded-none block w-16 md:w-48 "
      />
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
