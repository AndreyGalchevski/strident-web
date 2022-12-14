import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Member } from "../../api/types";
import apiClient from "../../api/apiClient";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FileInput from "../../components/FileInput";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";
import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageMember: FunctionComponent = () => {
  const isMobile = useMediaQuery();
  const params = useParams<{ id: string }>();

  const [member, setMember] = useState<Member>({
    id: "",
    name: "",
    instrument: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const modal = useModal();

  const { data: memberData, isLoading } = useQuerySingleResource(
    "members",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: createResource } = useMutationCreateResource();
  const { mutateAsync: updateResource } = useMutationUpdateResource();

  useEffect(() => {
    if (memberData) {
      setMember(memberData);
    }
  }, [memberData]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSaveClick(): Promise<void> {
    if (!selectedFile) {
      modal.showModal({
        modalType: "ERROR",
        errorMessage: "Must select a file",
      });
      return;
    }

    let imageURL = "";

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("folderName", "members");

      imageURL = await apiClient.uploadImage(formData);
    } catch (e) {
      modal.showModal({
        modalType: "ERROR",
        errorMessage: (e as Error).message,
      });
      return;
    }

    member.image = imageURL;

    if (params.id) {
      await updateResource({
        resourceName: "members",
        resourceID: params.id,
        data: member,
      });
    } else {
      await createResource({ resourceName: "members", data: member });
    }

    modal.showModal({
      modalType: "RESOURCE_CREATED",
      resourceName: "members",
    });
  }

  const action = params.id ? "Update" : "Create";

  return (
    <>
      <Container>
        <h2>{action} Member</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="name"
                  type="text"
                  onChange={handleFormChange}
                  value={member.name}
                />
                <Input
                  name="instrument"
                  type="text"
                  onChange={handleFormChange}
                  value={member.instrument}
                />
                <FileInput onChange={handleImageChange} />
              </CardContent>
              <CardAction>
                <Button handleClick={handleSaveClick}>Save</Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default observer(ManageMember);
