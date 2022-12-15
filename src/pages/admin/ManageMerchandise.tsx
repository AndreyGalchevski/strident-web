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
import useQueryResources from "../../hooks/queries/useQueryResources";

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

  useQueryResources("merchandise");

  const { data: merchandiseData, isLoading } = useQuerySingleResource(
    "merchandise",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();
  const { mutateAsync: updateResource, isLoading: updateResourceLoading } =
    useMutationUpdateResource();

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
    if (!selectedFile && params.id) {
      modal.showModal({
        modalType: "ERROR",
        errorMessage: "Must select a file",
      });
      return;
    }

    if (params.id) {
      await updateResource({
        resourceName: "merchandise",
        resourceID: params.id,
        data: merchandise,
        image: selectedFile,
      });
    } else {
      await createResource({
        resourceName: "merchandise",
        data: merchandise,
        image: selectedFile,
      });
    }

    modal.showModal({
      modalType: "RESOURCE_SAVED",
      resourceName: "merchandise",
    });
  }

  const action = params.id ? "Update" : "Create";

  const isSaving = createResourceLoading || updateResourceLoading;

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
                <Button onClick={handleSaveClick} isLoading={isSaving}>
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

export default observer(ManageMerchandise);
