import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Merchandise } from "../../api/types";
import {
  fetchResource,
  updateResource,
  createResource,
  uploadImage,
} from "../../api/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FileInput from "../../components/FileInput";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";

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
  const [isLoading, setLoading] = useState(false);

  const modal = useModal();

  async function fetchMerchandise(merchandiseID: string): Promise<void> {
    setLoading(true);
    const resource = await fetchResource("merchandise", merchandiseID);
    setMerchandise(resource);
    setLoading(false);
  }

  useEffect(() => {
    if (params.id) {
      fetchMerchandise(params.id);
    }
  }, [params.id]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMerchandise({ ...merchandise, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSaveClick(): Promise<void> {
    setLoading(true);

    let imageURL = "";
    let ngImageURL = "";

    if (selectedFile) {
      const image = new FormData();
      image.append("merchandiseImage", selectedFile);
      try {
        const imageName = `${merchandise.name}-${merchandise.type}`;
        const result = await uploadImage("merchandise", imageName, image);
        imageURL = result.imageURL;
        ngImageURL = result.ngImageURL;
      } catch (e) {
        modal.showModal({
          modalType: "ERROR",
          errorMessage: (e as Error).message,
        });
        return;
      }
    }

    if (imageURL && ngImageURL) {
      merchandise.image = imageURL;
      merchandise.imageNG = ngImageURL;
    }

    if (params.id) {
      await updateResource<Merchandise>("merchandise", params.id, merchandise);
    } else {
      await createResource<Merchandise>("merchandise", merchandise);
    }

    setLoading(false);
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
