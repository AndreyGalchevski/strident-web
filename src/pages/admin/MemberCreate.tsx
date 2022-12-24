import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";
import MemberForm from "./MemberForm";
import { MemberFormData } from "../../api/types";
import { OnSaveClickParams } from "../../types";
import { FILE_NOT_SELECTED_ERROR } from "../../utils/constants";

const MemberCreate: FunctionComponent = () => {
  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();

  async function handleSaveClick({
    formData,
    image,
  }: OnSaveClickParams<MemberFormData>): Promise<void> {
    if (!image) {
      throw new Error(FILE_NOT_SELECTED_ERROR);
    }

    await createResource({
      resourceName: "members",
      data: formData,
      image,
    });
  }

  return (
    <MemberForm
      title="Create Member"
      isSaving={createResourceLoading}
      onSaveClick={handleSaveClick}
    />
  );
};

export default observer(MemberCreate);
