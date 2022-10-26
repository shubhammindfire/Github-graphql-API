import { useMutation, useQuery } from "@apollo/client";
import { Avatar, Box, Container } from "@mui/material";
import { useState } from "react";
import ListItemContainer from "../components/listItemContainer";
import { changeUserStatusMutation } from "../gqlOperations/mutations";
import { MeQuery } from "../gqlOperations/queries";

interface cacheInterface {
  data: {
    viewer: {
      login: string;
      name: string;
      id: string;
      location: string;
      avatarUrl: string;
      bio: string;
      status: { message: string; emoji: string };
      repositories: {
        nodes: [
          {
            id: string;
            name: string;
            url: string;
            primaryLanguage: { color: string; name: string };
          }
        ];
        totalCount: number;
      };
    };
  };
}

const UserInfo = () => {
  const repositoriesFirst = 10;
  const { loading, error, data } = useQuery(MeQuery, {
    variables: { repositoriesFirst },
  });

  const [statusInput, updateStatusInput] = useState<string>("");

  const [
    changeUserStatus,
    {
      data: changeUserStatusData,
      loading: changeUserStatusLoading,
      error: changeUserStatusError,
    },
  ] = useMutation(changeUserStatusMutation, {
    // refetchQueries: [{ query: MeQuery, variables: { repositoriesFirst } }],
    update(cache, { data: updatedCacheData }) {
      const { data: readCacheData } = cache.readQuery<any>({
        query: MeQuery,
        variables: { repositoriesFirst },
      })!;
      console.log(`read cache data = ${JSON.stringify(readCacheData)}`);
      console.log(`updated cache data = ${JSON.stringify(updatedCacheData)}`);
      //   cache.writeQuery({
      //     query: MeQuery,
      //     data: {
      //       viewer: {
      //         changeUserStatus: {
      //           status: {
      //             message: updatedCacheData.changeUserStatus.message,
      //           },
      //         },
      //       },
      //     },
      //   });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const viewer = data.viewer;

  //   if (changeUserStatusLoading) return "Submitting...";
  //   if (changeUserStatusError)
  //     return `Submission error! ${changeUserStatusError.message}`;

  return (
    <Container key={viewer.id}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        className="d-flex flex-row justify-content-between"
      >
        <div>
          <h3>{viewer.name}</h3>
          <p>{viewer.login}</p>
        </div>
        <Avatar src={`${viewer.avatarUrl}`} />
      </Box>
      <br />
      <div className="d-flex flex-row align-items-baseline">
        <p>
          Status - {viewer.status.emoji} {viewer.status.message}
        </p>
        <input
          className="ms-3"
          value={statusInput}
          onChange={(e) => {
            e.preventDefault();
            updateStatusInput(e.target.value);
          }}
        />
        <button
          className="editStatus ms-2"
          onClick={(e) => {
            e.preventDefault();
            changeUserStatus({
              variables: {
                input: {
                  message: statusInput,
                  emoji: ":house:",
                },
              },
              //   optimisticResponse: true,
              //   update: (cache, { data }) => {
              //     const existingUserData = cache.readQuery({ query: MeQuery });
              //     console.log(
              //       `existing user data = ${JSON.stringify(existingUserData)}`
              //     );
              //     // cache.writeQuery({ query: MeQuery, data: { viewer: { status: { message: "tetet" } } } });
              //   },
            });
          }}
        >
          Edit
        </button>
      </div>
      <p>Bio - {viewer.bio}</p>
      <p>Location - {viewer.location}</p>
      <br />
      <h3>Repositories</h3>
      {viewer.repositories.nodes.map(
        ({ id, name, url, primaryLanguage }: any) => (
          <ListItemContainer
            key={id}
            name={name}
            url={url}
            primaryLanguage={primaryLanguage}
          />
        )
      )}
    </Container>
  );
};

export default UserInfo;
