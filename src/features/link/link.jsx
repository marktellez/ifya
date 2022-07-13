import HeartIcon from "@/ui/icons/heart";

export default function Link({ url, paid = false }) {
  return (
    <div>
      {paid && (
        <div className="flex items-center mb-4">
          <HeartIcon className="transform -rotate-6 text-red-500  h-32 w-32" />
          <div className="mt-4 text-red-500 text-5xl">Thank you!</div>
        </div>
      )}
      <h2 className="my-2 text-lg text-blue-500 font-medium">
        Here is your link!
      </h2>
      <a className="text-red-500 cursor-pointer" href={url}>
        {url}
      </a>
    </div>
  );
}
