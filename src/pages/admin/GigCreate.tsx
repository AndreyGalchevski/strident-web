import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";
import GigForm from "./GigForm";
import { Gig } from "../../api/types";
import { OnSaveClickParams } from "../../types";

const GigCreate: FunctionComponent = () => {
  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();

  async function handleSaveClick({
    formData,
    image,
  }: OnSaveClickParams<Gig>): Promise<void> {
    if (!image) {
      throw new Error("Must select a file");
    }

    await createResource({
      resourceName: "gigs",
      data: formData,
      image: image,
    });
  }

  return (
    <GigForm
      title="Create Gig"
      isSaving={createResourceLoading}
      onSaveClick={handleSaveClick}
    />
  );
};

export default observer(GigCreate);
