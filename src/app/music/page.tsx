import { IDKBRO } from "@/components/idk";
import { PageTitle } from "@/components/page-title";
import React from "react";

type Props = {};

const Music = (props: Props) => {
  return (
    <div className="space-y-8">
      <PageTitle title="listen" description="uhmmm " />
      <IDKBRO />
    </div>
  );
};

export default Music;
