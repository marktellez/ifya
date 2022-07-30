import { useState } from "react";
import { PencilIcon, LinkIcon, CashIcon } from "@heroicons/react/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";

import TextField from "@/ui/forms/text-field";
import Modal from "@/ui/modal";
import SmallButton from "@/ui/buttons/small";
import Notification from "@/ui/notifications";

import CreatorAdminForm from "./form";
import CreatorLinkAdminForm from "./link/form";
import CreatorProfile from "../profile";

const defaultLinkValues = (creator) => ({
  creator: creator._id,
  url: "",
  text: "",
});

export default function CreatorAdmin({ links = [], creator }) {
  const [_creator, setCreator] = useState(creator);
  const [showCreatorForm, setShowCreatorForm] = useState(
    !Boolean(_creator._id)
  );
  const [showCreatorSaved, setShowCreatorSaved] = useState(false);

  const [link, setLink] = useState(defaultLinkValues(creator));
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [showLinkSaved, setShowLinkSaved] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  const [_links, setLinks] = useState(links);
  const [query, setQuery] = useState("");

  function filter(links) {
    if (query.length < 1) return links;

    return links.filter(
      (link) =>
        link.url.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        link.text.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  return (
    <>
      <div className="mx-auto md:flex w-full min-h-[300px]">
        {_creator._id && (
          <>
            <div className="w-full md:w-1/3 md:p-8 mx-auto">
              <CreatorProfile {..._creator} />
              <div
                onClick={() => setShowCreatorForm(true)}
                className="w-full flex justify-center my-3">
                <div className="w-1/2 md:w-full">
                  <SmallButton>edit</SmallButton>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 md:mt-16 mt-8">
              <div className="md:my-4">
                <button
                  className="drop-shadow w-full text-lg md:text-3xl border bg-blue-500 hover:bg-blue-600 text-white py-1 px-8"
                  onClick={() => setShowLinkForm(true)}>
                  <div className="flex items-center  gap-2 justify-center ">
                    <div>create a</div>
                    <LinkIcon className="w-6 md:w-8" />
                    <div>get</div>
                    <CashIcon className="w-6 md:w-8" />
                  </div>
                </button>

                {showLinkSaved && (
                  <Notification onHide={() => setShowLinkSaved(false)}>
                    Link saved
                  </Notification>
                )}
              </div>

              {_links.length > 0 && (
                <>
                  <div className="my-2">
                    <TextField
                      placeholder="type to filter your links..."
                      value={query}
                      onChange={setQuery}
                      focused
                    />
                  </div>

                  <ul className="flex flex-col gap-2">
                    {filter(_links)
                      .slice(0, 10)
                      .sort((a, b) => a._id < b._id)
                      .map((link) => (
                        <li
                          key={link}
                          className="text-sm border border-gray-300 drop-shadow-sm p-4">
                          <div className="">
                            <div className="">
                              <div className="font-light">
                                {link.url.slice(0, 70)}
                              </div>
                              <div className="font-thin my-2 italic">
                                {link.text.slice(0, 180)}...
                              </div>
                            </div>
                            <div className="w-full flex flex-row-reverse items-center gap-1 cursor-pointer text-blue-600">
                              <PencilIcon
                                onClick={() => {
                                  setLink(link);
                                  setShowLinkForm(true);
                                }}
                                className="cursor-pointer w-4 h-4"
                              />
                              <CopyToClipboard
                                text={`${process.env.NEXT_PUBLIC_HOST}/get-it/${link._id}`}>
                                <LinkIcon
                                  onClick={() => setShowLinkCopied(true)}
                                  className="cursor-pointer w-4 h-4 "
                                />
                              </CopyToClipboard>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </>
              )}
              {showLinkCopied && (
                <Notification onHide={() => setShowLinkCopied(false)}>
                  Link copied to clipboard
                </Notification>
              )}

              {showCreatorSaved && (
                <Notification onHide={() => setShowCreatorSaved(false)}>
                  Creator info saved
                </Notification>
              )}
            </div>
          </>
        )}
      </div>

      <Modal
        noClose={!_creator._id}
        isOpen={showCreatorForm}
        close={() => setShowCreatorForm(false)}>
        <CreatorAdminForm
          {...{
            values: _creator,
            onChange: setCreator,
            onSave: () => {
              setCreator((prev) => ({
                ...prev,
                _id: persistCreatorValues(_creator),
              }));
              setShowCreatorForm(false);
              setShowCreatorSaved(true);
            },
          }}
        />
      </Modal>

      <Modal isOpen={showLinkForm} close={() => setShowLinkForm(false)}>
        <CreatorLinkAdminForm
          {...{
            values: link,
            onChange: setLink,
            onSave: () => {
              setLinks((prev) => {
                const links = prev.find((_link) => _link._id === link._id)
                  ? prev.map((_link) => (_link._id === link._id ? link : _link))
                  : [link, ...prev];

                return links;
              });
              persistLinkValues(link);
              setShowLinkForm(false);
              setLink(defaultLinkValues(creator));
              setShowLinkSaved(true);
            },
          }}
        />
      </Modal>
    </>
  );
}

async function persistCreatorValues(values) {
  const { _id } = await fetch(
    `/api/creators${values._id ? "/" + values._id : ""}`,
    {
      method: values._id ? "put" : "post",
      body: JSON.stringify({
        name: values.name,
        company: values.company,
        www: values.www,
        photo: values.photo,
        email: values.email,
      }),
    }
  );

  return _id;
}

async function persistLinkValues(values) {
  const url = `/api/links${values._id ? "/" + values._id : ""}`;

  await fetch(url, {
    method: values._id ? "put" : "post",
    body: JSON.stringify({
      creator: values.creator,
      url: values.url,
      text: values.text,
    }),
  });
}
