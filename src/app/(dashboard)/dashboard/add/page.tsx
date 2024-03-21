import AddFriendButton from "@/components/AddFriendButton";
import { FC } from "react";

const page: FC = () => {
  return (
    <section className="pt-5">
      <h1 className="font-bold text-3xl md:text-5xl mb-8">Add a friend</h1>
      <AddFriendButton />
    </section>
  );
};

export default page;
