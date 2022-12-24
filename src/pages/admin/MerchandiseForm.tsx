import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Merchandise, MerchandiseFormData } from "../../api/types";
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
  onSaveClick: (
    params: OnSaveClickParams<MerchandiseFormData>
  ) => Promise<void>;
  isLoading?: boolean;
  initialData?: Merchandise;
}

const MerchandiseForm: FunctionComponent<Props> = ({
  title,
  isSaving,
  onSaveClick,
  isLoading = false,
  initialData,
}) => {
  const isMobile = useMediaQuery();

  const [merchandise, setMerchandise] = useState<MerchandiseFormData>({
    name: "",
    type: "",
    price: 0,
    url: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const modal = useModal();

  useQueryResources("merchandise");

  useEffect(() => {
    if (initialData) {
      setMerchandise({
        name: initialData.name,
        type: initialData.type,
        price: initialData.price,
        url: initialData.url,
      });
    }
  }, [initialData]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMerchandise({ ...merchandise, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSaveClick(): Promise<void> {
    try {
      await onSaveClick({ formData: merchandise, image: selectedFile });
      modal.showModal({
        modalType: "RESOURCE_SAVED",
        resourceName: "merchandise",
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

export default observer(MerchandiseForm);
