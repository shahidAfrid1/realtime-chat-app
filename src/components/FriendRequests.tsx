"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import NoItems from "./ui/NoItems";
import Image from "next/image";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    const friendRequestHandler = ({
      senderId,
      senderName,
      senderImage,
    }: IncomingFriendRequest) => {
      setFriendRequests((prev) => [
        ...prev,
        { senderId, senderName, senderImage },
      ]);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accept", { id: senderId });
    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );
    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });
    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );
    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <NoItems />
      ) : (
        friendRequests.map((request) => (
          // <div key={request.senderId} className="flex gap-4 items-center">
          //   <UserPlus className="text-black" />
          //   <p className="font-medium text-lg">{request.senderEmail}</p>
          //   <button
          //     onClick={() => acceptFriend(request.senderId)}
          //     aria-label="accept friend"
          //     className="text-blue-600 mr-2"
          //   >
          //     <Check className="font-semibold text-white w-3/4 h-3/4" />
          //   </button>

          //   <button
          //     onClick={() => denyFriend(request.senderId)}
          //     aria-label="deny friend"
          //     className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
          //   >
          //     <X className="font-semibold text-white w-3/4 h-3/4" />
          //   </button>
          // </div>
          <div
            className="flex justify-center items-center"
            key={request.senderId}
          >
            <div className="relative h-20 w-20 md:h-12 md:w-12  bg-gray-50 mr-5">
              <Image
                fill
                referrerPolicy="no-referrer"
                className="rounded-full"
                src={request.senderImage || ""}
                alt="Your profile picture"
              />
            </div>
            <div className="w-4/5">
              <div>
                <span className="font-semibold text-gray-800 mr-2 block md:inline">
                  {request.senderName}
                </span>
                <span className="text-gray-400">wants to be your friend</span>
              </div>
              <div className="font-semibold flex items-center">
                <button
                  onClick={() => acceptFriend(request.senderId)}
                  aria-label="accept friend"
                  className="text-blue-600 mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => denyFriend(request.senderId)}
                  aria-label="deny friend"
                  className="text-gray-400"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
