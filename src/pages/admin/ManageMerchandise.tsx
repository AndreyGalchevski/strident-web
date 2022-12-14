import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Merchandise } from "../../api/types";
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
import useMutationUploadImage from "../../hooks/mutations/useMutationUploadImage";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageMerchandise: FunctionComponent = () => {
  const isMobile = useMediaQuery();
  const params = useParams<{ id: string }>();

  const [merchandise, setMerchandise] = useState<Merchandise>({
    id: "",
    name: "",
    type: "",
    price: 0,
    url: "",
    image: "",
    imageNG: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const modal = useModal();

  const { data: merchandiseData, isLoading } = useQuerySingleResource(
    "merchandise",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: uploadImage } = useMutationUploadImage();
  const { mutateAsync: createResource } = useMutationCreateResource();
  const { mutateAsync: updateResource } = useMutationUpdateResource();

  useEffect(() => {
    if (merchandiseData) {
      setMerchandise(merchandiseData);
    }
  }, [merchandiseData]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMerchandise({ ...merchandise, [e.target.name]: e.target.value });
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
      formData.append("folderName", "merchandise");

      imageURL = await uploadImage(formData);
    } catch (e) {
      modal.showModal({
        modalType: "ERROR",
        errorMessage: (e as Error).message,
      });
      return;
    }

    merchandise.image = imageURL;

    if (params.id) {
      await updateResource({
        resourceName: "merchandise",
        resourceID: params.id,
        data: merchandise,
      });
    } else {
      await createResource({ resourceName: "merchandise", data: merchandise });
    }

    modal.showModal({
      modalType: "RESOURCE_CREATED",
      resourceName: "merchandise",
    });
  }

  const action = params.id ? "Update" : "Create";

  return (
    <>
      <Container>
        <h2>{action} Merch</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="name"
                  type="text"
                  onChange={handleFormChange}
                  value={merchandise.name}
                />
                <Input
                  name="type"
                  type="text"
                  onChange={handleFormChange}
                  value={merchandise.type}
                />
                <Input
                  name="price"
                  type="number"
                  onChange={handleFormChange}
                  value={merchandise.price}
                />
                <Input
                  name="url"
                  type="text"
                  onChange={handleFormChange}
                  value={merchandise.url}
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

export default observer(ManageMerchandise);
