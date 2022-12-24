import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Member, MemberFormData } from "../../api/types";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FileInput from "../../components/FileInput";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";
import useQueryResources from "../../hooks/queries/useQueryResources";
import { OnSaveClickParams } from "../../types";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

interface Props {
  title: string;
  isSaving: boolean;
  onSaveClick: (params: OnSaveClickParams<MemberFormData>) => Promise<void>;
  isLoading?: boolean;
  initialData?: Member;
}

const MemberForm: FunctionComponent<Props> = ({
  title,
  isSaving,
  onSaveClick,
  isLoading = false,
  initialData,
}) => {
  const isMobile = useMediaQuery();

  const [member, setMember] = useState<MemberFormData>({
    name: "",
    instrument: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const modal = useModal();

  useQueryResources("members");

  useEffect(() => {
    if (initialData) {
      setMember({ name: initialData.name, instrument: initialData.instrument });
    }
  }, [initialData]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSaveClick(): Promise<void> {
    try {
      await onSaveClick({ formData: member, image: selectedFile });
      modal.showModal({
        modalType: "RESOURCE_SAVED",
        resourceName: "members",
      });
    } catch (e) {
      modal.showModal({
        modalType: "ERROR",
        errorMessage: (e as Error).message,
      });
    }
  }

  return (
    <>
      <Container>
        <h2>{title}</h2>
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
                <Button
                  onClick={handleSaveClick}
                  isLoading={isSaving}
                  fullWidth
                >
                  Save
                </Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default observer(MemberForm);
