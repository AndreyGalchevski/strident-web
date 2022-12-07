import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Video } from "../../api/types";
import { fetchResource, updateResource, createResource } from "../../api/utils";
import { formatDate } from "../../utils/general";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageVideo: FunctionComponent = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [video, setVideo] = useState<Video>({
    id: "",
    name: "",
    url: "",
    date: new Date(),
  });
  const [isLoading, setLoading] = useState(false);

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
    let res = "";
    setLoading(true);
    if (params.id) {
      res = await updateResource<Video>("videos", params.id, video);
    } else {
      res = await createResource<Video>("videos", video);
    }
    setLoading(false);
    navigate("/videos");
    window.alert(res);
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

export default ManageVideo;
