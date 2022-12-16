import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useMediaQuery from "../hooks/useMediaQuery";
import Container from "../styled/Container";
import {
  Card,
  CardTitle,
  CardContent,
  CardImage,
  CardAction,
} from "../styled/Card";
import Button from "../components/Button";
import Header from "../components/Header";
import Fab from "../components/Fab";
import Loader from "../components/Loader";
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";
import useQueryResources from "../hooks/queries/useQueryResources";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";

const MembersContainer = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  WebkitFlexDirection: isMobile ? "column" : "row",
}));

const MemberItem = styled.div({
  paddingRight: "2vh",
  paddingLeft: "2vh",
});

const Members: FunctionComponent = () => {
  const auth = useAuth();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: membersData, isLoading: membersLoading } =
    useQueryResources("members");

  const modal = useModal();

  function handleUpdateClick(memberID: string): void {
    navigate(`/admin/members/edit/${memberID}`);
  }

  function handleDeleteClick(memberID: string): void {
    modal.showModal({
      modalType: "CONFIRM_DELETION",
      resourceID: memberID,
      resourceName: "members",
    });
  }

  return (
    <Container>
      <Header title="Members" />
      {auth.isAuthenticated && <Fab url="/admin/members/create" />}
      <Loader isLoading={membersLoading}>
        <MembersContainer isMobile={isMobile}>
          {membersData?.map((it) => (
            <MemberItem key={it.id}>
              <Card>
                <div>
                  <picture>
                    <source srcSet={it.image} type="image/jpeg" />
                    <CardImage src={it.image} alt="" />
                  </picture>
                </div>
                <CardContent>
                  <CardTitle>{it.name}</CardTitle>
                  <p>{it.instrument}</p>
                </CardContent>
                {auth.isAuthenticated && (
                  <CardAction>
                    <Button
                      isPrimary={false}
                      onClick={() => handleUpdateClick(it.id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      isPrimary={false}
                      onClick={() => handleDeleteClick(it.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </CardAction>
                )}
              </Card>
            </MemberItem>
          ))}
        </MembersContainer>
      </Loader>
    </Container>
  );
};

export default Members;
