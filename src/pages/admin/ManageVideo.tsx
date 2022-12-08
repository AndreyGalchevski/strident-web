import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Video } from "../../api/types";
import { fetchResource, updateResource, createResource } from "../../api/utils";
import { formatDate } from "../../utils/general";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageVideo: FunctionComponent = () => {
  const isMobile = useMediaQuery();
  const params = useParams<{ id: string }>();

  const [video, setVideo] = useState<Video>({
    id: "",
    name: "",
    url: "",
    date: new Date(),
  });
  const [isLoading, setLoading] = useState(false);

  const modal = useModal();

  useEffect(() => {
    async function fetchVideo(videoID: string): Promise<void> {
      setLoading(true);
      const resource = await fetchResource("videos", videoID);
      setVideo({ ...resource, date: new Date(resource.date) });
      setLoading(false);
    }

    if (params.id) {
      fetchVideo(params.id);
    }
  }, [params.id]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setVideo({ ...video, [e.target.name]: e.target.value });
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement>): void {
    setVideo({ ...video, date: new Date(e.target.value) });
  }

  async function handleSaveClick(): Promise<void> {
    setLoading(true);
    if (params.id) {
      await updateResource<Video>("videos", params.id, video);
    } else {
      await createResource<Video>("videos", video);
    }
    setLoading(false);
    modal.showModal({ modalType: "RESOURCE_CREATED", resourceName: "videos" });
  }

  const action = params.id ? "Update" : "Create";

  return (
    <>
      <Container>
        <h2>{action} Video</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="name"
                  type="text"
                  onChange={handleFormChange}
                  value={video.name}
                />
                <Input
                  name="url"
                  type="text"
                  onChange={handleFormChange}
                  value={video.url}
                />
                <Input
                  name="date"
                  type="date"
                  onChange={handleDateChange}
                  value={formatDate(video.date)}
                />
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

export default observer(ManageVideo);
