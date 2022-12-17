import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";
import useQueryResources from "../hooks/queries/useQueryResources";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";
import { getWebPImageURL } from "../utils/general";
import theme from "../utils/theme";

const Skeletons: FunctionComponent<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <SkeletonTheme
      baseColor={theme.colors.darkGrey}
      highlightColor={theme.colors.grey}
    >
      <MembersContainer isMobile={isMobile}>
        {[1, 2, 3, 4].map((it) => (
          <MemberItem key={it}>
            <Card>
              <Skeleton
                height={500}
                width={isMobile ? "100%" : 390}
                style={{
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <CardContent>
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 40 }} />
              </CardContent>
            </Card>
          </MemberItem>
        ))}
      </MembersContainer>
    </SkeletonTheme>
  );
};

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
      {membersLoading ? (
        <Skeletons isMobile={isMobile} />
      ) : (
        <MembersContainer isMobile={isMobile}>
          {membersData?.map((it) => (
            <MemberItem key={it.id}>
              <Card>
                <div>
                  <picture>
                    <source
                      srcSet={getWebPImageURL(it.image)}
                      type="image/webp"
                    />
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
      )}
    </Container>
  );
};

export default Members;
